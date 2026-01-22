"""
Authentication API routes - User registration, login, and token management
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime, timedelta

from ..models.base import get_db
from ..models.user import User, Session as UserSession
from ..services.auth_service import auth_service
from ..middleware.rbac import get_current_user, get_current_active_user

router = APIRouter(prefix="/api/auth", tags=["authentication"])


# ============================================================================
# Pydantic Models
# ============================================================================

class UserRegister(BaseModel):
    email: EmailStr
    username: str
    password: str
    full_name: Optional[str] = None
    department: Optional[str] = None
    job_title: Optional[str] = None


class UserLogin(BaseModel):
    email: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str
    expires_in: int


class RefreshTokenRequest(BaseModel):
    refresh_token: str


class PasswordChange(BaseModel):
    old_password: str
    new_password: str


class UserResponse(BaseModel):
    id: str
    email: str
    username: str
    full_name: Optional[str]
    is_active: bool
    is_verified: bool
    created_at: str

    class Config:
        from_attributes = True


# ============================================================================
# Authentication Routes
# ============================================================================

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register_user(
    user_data: UserRegister,
    db: Session = Depends(get_db)
):
    """
    Register a new user

    Args:
        user_data: User registration data
        db: Database session

    Returns:
        Created user object
    """
    # Check if email already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Check if username already exists
    existing_username = db.query(User).filter(User.username == user_data.username).first()
    if existing_username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken"
        )

    # Hash password
    hashed_password, salt = auth_service.hash_password(user_data.password)

    # Create new user
    new_user = User(
        email=user_data.email,
        username=user_data.username,
        full_name=user_data.full_name,
        department=user_data.department,
        job_title=user_data.job_title,
        hashed_password=hashed_password,
        password_salt=salt,
        is_active=True,
        is_verified=False  # Require email verification
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user.to_dict()


@router.post("/login", response_model=TokenResponse)
async def login(
    credentials: UserLogin,
    db: Session = Depends(get_db)
):
    """
    User login - returns JWT tokens

    Args:
        credentials: Login credentials
        db: Database session

    Returns:
        Access and refresh tokens
    """
    # Find user
    user = db.query(User).filter(User.email == credentials.email).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # Check if account is locked
    if user.locked_until and user.locked_until > datetime.utcnow():
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Account locked until {user.locked_until.isoformat()}"
        )

    # Verify password
    if not auth_service.verify_password(credentials.password, user.hashed_password, user.password_salt):
        # Increment failed login attempts
        user.failed_login_attempts += 1

        # Lock account if too many failures
        if auth_service.should_lock_account(user.failed_login_attempts):
            lock_duration = auth_service.calculate_lock_duration(user.failed_login_attempts)
            user.locked_until = datetime.utcnow() + lock_duration

        db.commit()

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # Check if user is active
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is disabled"
        )

    # Reset failed login attempts
    user.failed_login_attempts = 0
    user.last_login = datetime.utcnow()
    db.commit()

    # Create tokens
    token_data = {
        "sub": str(user.id),
        "email": user.email,
        "username": user.username,
        "is_superuser": user.is_superuser
    }

    tokens = auth_service.create_token_pair(token_data)

    # Store session
    token_hash = auth_service.hash_token(tokens["access_token"])
    refresh_hash = auth_service.hash_token(tokens["refresh_token"])

    session = UserSession(
        user_id=user.id,
        token_hash=token_hash,
        refresh_token_hash=refresh_hash,
        expires_at=datetime.utcnow() + timedelta(minutes=30)
    )

    db.add(session)
    db.commit()

    return tokens


@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(
    refresh_data: RefreshTokenRequest,
    db: Session = Depends(get_db)
):
    """
    Refresh access token using refresh token

    Args:
        refresh_data: Refresh token
        db: Database session

    Returns:
        New access and refresh tokens
    """
    # Decode refresh token
    payload = auth_service.decode_token(refresh_data.refresh_token)

    if not payload or payload.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )

    # Get user
    user_id = payload.get("sub")
    user = db.query(User).filter(User.id == user_id, User.is_active == True).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive"
        )

    # Verify session exists and is valid
    refresh_hash = auth_service.hash_token(refresh_data.refresh_token)
    session = db.query(UserSession).filter(
        UserSession.user_id == user_id,
        UserSession.refresh_token_hash == refresh_hash,
        UserSession.revoked_at.is_(None)
    ).first()

    if not session:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or revoked refresh token"
        )

    # Create new tokens
    token_data = {
        "sub": str(user.id),
        "email": user.email,
        "username": user.username,
        "is_superuser": user.is_superuser
    }

    tokens = auth_service.create_token_pair(token_data)

    # Update session
    session.token_hash = auth_service.hash_token(tokens["access_token"])
    session.refresh_token_hash = auth_service.hash_token(tokens["refresh_token"])
    session.expires_at = datetime.utcnow() + timedelta(minutes=30)
    session.last_activity = datetime.utcnow()

    db.commit()

    return tokens


@router.post("/logout")
async def logout(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Logout - revoke current session

    Args:
        current_user: Current authenticated user
        db: Database session

    Returns:
        Success message
    """
    # Revoke all active sessions for user
    sessions = db.query(UserSession).filter(
        UserSession.user_id == current_user.id,
        UserSession.revoked_at.is_(None)
    ).all()

    for session in sessions:
        session.revoked_at = datetime.utcnow()

    db.commit()

    return {"message": "Logged out successfully"}


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    current_user: User = Depends(get_current_active_user)
):
    """
    Get current user information

    Args:
        current_user: Current authenticated user

    Returns:
        User object
    """
    return current_user.to_dict()


@router.post("/change-password")
async def change_password(
    password_data: PasswordChange,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Change user password

    Args:
        password_data: Old and new passwords
        current_user: Current authenticated user
        db: Database session

    Returns:
        Success message
    """
    # Verify old password
    if not auth_service.verify_password(
        password_data.old_password,
        current_user.hashed_password,
        current_user.password_salt
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid current password"
        )

    # Hash new password
    hashed_password, salt = auth_service.hash_password(password_data.new_password)

    # Update user
    current_user.hashed_password = hashed_password
    current_user.password_salt = salt

    # Revoke all existing sessions (force re-login)
    sessions = db.query(UserSession).filter(
        UserSession.user_id == current_user.id,
        UserSession.revoked_at.is_(None)
    ).all()

    for session in sessions:
        session.revoked_at = datetime.utcnow()

    db.commit()

    return {"message": "Password changed successfully. Please login again."}


@router.post("/generate-api-key")
async def generate_api_key(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Generate new API key for user

    Args:
        current_user: Current authenticated user
        db: Database session

    Returns:
        New API key
    """
    # Generate API key
    api_key = auth_service.generate_api_key()

    # Update user
    current_user.api_key = api_key
    current_user.api_key_created_at = datetime.utcnow()

    db.commit()

    return {
        "api_key": api_key,
        "created_at": current_user.api_key_created_at.isoformat(),
        "message": "Store this API key securely. It won't be shown again."
    }


@router.delete("/revoke-api-key")
async def revoke_api_key(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Revoke user's API key

    Args:
        current_user: Current authenticated user
        db: Database session

    Returns:
        Success message
    """
    current_user.api_key = None
    current_user.api_key_created_at = None

    db.commit()

    return {"message": "API key revoked successfully"}
