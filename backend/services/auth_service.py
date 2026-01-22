"""
Authentication Service - JWT token handling, password hashing, and session management
"""
from datetime import datetime, timedelta
from typing import Optional, Dict, Any
import secrets
import hashlib
import jwt
from passlib.context import CryptContext

# Password hashing configuration
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT configuration
SECRET_KEY = secrets.token_urlsafe(32)  # In production, load from environment
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7


class AuthService:
    """
    Authentication service for user management and JWT tokens
    """

    def __init__(self, secret_key: str = SECRET_KEY, algorithm: str = ALGORITHM):
        """
        Initialize authentication service

        Args:
            secret_key: Secret key for JWT signing
            algorithm: JWT algorithm (default: HS256)
        """
        self.secret_key = secret_key
        self.algorithm = algorithm

    # ========================================================================
    # Password Management
    # ========================================================================

    def hash_password(self, password: str) -> tuple[str, str]:
        """
        Hash a password with a salt

        Args:
            password: Plain text password

        Returns:
            Tuple of (hashed_password, salt)
        """
        salt = secrets.token_hex(16)
        hashed = pwd_context.hash(password + salt)
        return hashed, salt

    def verify_password(self, plain_password: str, hashed_password: str, salt: str) -> bool:
        """
        Verify a password against its hash

        Args:
            plain_password: Plain text password to verify
            hashed_password: Stored hashed password
            salt: Stored salt

        Returns:
            True if password matches, False otherwise
        """
        return pwd_context.verify(plain_password + salt, hashed_password)

    # ========================================================================
    # JWT Token Management
    # ========================================================================

    def create_access_token(
        self,
        data: Dict[str, Any],
        expires_delta: Optional[timedelta] = None
    ) -> str:
        """
        Create a JWT access token

        Args:
            data: Dictionary of claims to encode
            expires_delta: Optional expiration time delta

        Returns:
            Encoded JWT token
        """
        to_encode = data.copy()

        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

        to_encode.update({
            "exp": expire,
            "iat": datetime.utcnow(),
            "type": "access"
        })

        encoded_jwt = jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)
        return encoded_jwt

    def create_refresh_token(
        self,
        data: Dict[str, Any],
        expires_delta: Optional[timedelta] = None
    ) -> str:
        """
        Create a JWT refresh token

        Args:
            data: Dictionary of claims to encode
            expires_delta: Optional expiration time delta

        Returns:
            Encoded JWT refresh token
        """
        to_encode = data.copy()

        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)

        to_encode.update({
            "exp": expire,
            "iat": datetime.utcnow(),
            "type": "refresh"
        })

        encoded_jwt = jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)
        return encoded_jwt

    def decode_token(self, token: str) -> Optional[Dict[str, Any]]:
        """
        Decode and verify a JWT token

        Args:
            token: JWT token to decode

        Returns:
            Decoded token payload or None if invalid
        """
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            return payload
        except jwt.ExpiredSignatureError:
            return None
        except jwt.JWTError:
            return None

    def create_token_pair(self, user_data: Dict[str, Any]) -> Dict[str, str]:
        """
        Create both access and refresh tokens

        Args:
            user_data: User data to encode in tokens

        Returns:
            Dictionary with 'access_token' and 'refresh_token'
        """
        access_token = self.create_access_token(data=user_data)
        refresh_token = self.create_refresh_token(data={"sub": user_data.get("sub")})

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
            "expires_in": ACCESS_TOKEN_EXPIRE_MINUTES * 60
        }

    # ========================================================================
    # Token Hashing for Storage
    # ========================================================================

    def hash_token(self, token: str) -> str:
        """
        Hash a token for secure storage in database

        Args:
            token: JWT token to hash

        Returns:
            SHA-256 hash of the token
        """
        return hashlib.sha256(token.encode()).hexdigest()

    # ========================================================================
    # API Key Management
    # ========================================================================

    def generate_api_key(self) -> str:
        """
        Generate a secure API key

        Returns:
            Random API key
        """
        return f"liw_{secrets.token_urlsafe(32)}"

    def hash_api_key(self, api_key: str) -> str:
        """
        Hash an API key for storage

        Args:
            api_key: API key to hash

        Returns:
            SHA-256 hash of the API key
        """
        return hashlib.sha256(api_key.encode()).hexdigest()

    # ========================================================================
    # Account Security
    # ========================================================================

    def should_lock_account(self, failed_attempts: int, max_attempts: int = 5) -> bool:
        """
        Check if account should be locked due to failed login attempts

        Args:
            failed_attempts: Number of failed login attempts
            max_attempts: Maximum allowed attempts before locking

        Returns:
            True if account should be locked
        """
        return failed_attempts >= max_attempts

    def calculate_lock_duration(self, failed_attempts: int) -> timedelta:
        """
        Calculate how long to lock account based on failed attempts

        Args:
            failed_attempts: Number of failed login attempts

        Returns:
            Time delta for lock duration
        """
        # Progressive lockout: 5 min, 15 min, 30 min, 1 hour, 24 hours
        if failed_attempts <= 5:
            return timedelta(minutes=5)
        elif failed_attempts <= 7:
            return timedelta(minutes=15)
        elif failed_attempts <= 10:
            return timedelta(minutes=30)
        elif failed_attempts <= 15:
            return timedelta(hours=1)
        else:
            return timedelta(hours=24)


class PermissionChecker:
    """
    Helper class for checking user permissions
    """

    @staticmethod
    def check_permission(
        user_permissions: list,
        required_resource: str,
        required_action: str
    ) -> bool:
        """
        Check if user has a specific permission

        Args:
            user_permissions: List of user's permissions
            required_resource: Required resource (e.g., 'workspace')
            required_action: Required action (e.g., 'create')

        Returns:
            True if user has permission
        """
        for perm in user_permissions:
            if (perm.get("resource") == required_resource and
                perm.get("action") == required_action):
                return True
        return False

    @staticmethod
    def check_workspace_access(
        user_id: str,
        workspace_id: str,
        workspace_members: list,
        required_level: str = "viewer"
    ) -> bool:
        """
        Check if user has access to a workspace

        Args:
            user_id: User ID
            workspace_id: Workspace ID
            workspace_members: List of workspace members
            required_level: Required access level

        Returns:
            True if user has access
        """
        level_hierarchy = {
            "viewer": 1,
            "editor": 2,
            "admin": 3,
            "owner": 4
        }

        for member in workspace_members:
            if (member.get("user_id") == user_id and
                member.get("workspace_id") == workspace_id and
                member.get("is_active")):

                user_level = level_hierarchy.get(member.get("access_level"), 0)
                required = level_hierarchy.get(required_level, 0)

                return user_level >= required

        return False

    @staticmethod
    def can_export(
        user_id: str,
        workspace_id: str,
        workspace_members: list
    ) -> bool:
        """
        Check if user can export from a workspace

        Args:
            user_id: User ID
            workspace_id: Workspace ID
            workspace_members: List of workspace members

        Returns:
            True if user can export
        """
        for member in workspace_members:
            if (member.get("user_id") == user_id and
                member.get("workspace_id") == workspace_id and
                member.get("is_active")):

                return member.get("can_export", False)

        return False


# Singleton instances
auth_service = AuthService()
permission_checker = PermissionChecker()


def get_auth_service() -> AuthService:
    """Get the authentication service instance"""
    return auth_service


def get_permission_checker() -> PermissionChecker:
    """Get the permission checker instance"""
    return permission_checker
