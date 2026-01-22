"""
Role-Based Access Control (RBAC) Middleware
"""
from fastapi import Depends, HTTPException, status, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from typing import Optional, List
from functools import wraps
from datetime import datetime

from ..models.base import get_db
from ..models.user import User, Role, Permission, WorkspaceMember
from ..services.auth_service import auth_service, permission_checker


# Security scheme
security = HTTPBearer()


class RBACMiddleware:
    """
    Role-Based Access Control middleware for FastAPI
    """

    @staticmethod
    async def get_current_user(
        credentials: HTTPAuthorizationCredentials = Security(security),
        db: Session = Depends(get_db)
    ) -> User:
        """
        Get current authenticated user from JWT token

        Args:
            credentials: HTTP authorization credentials
            db: Database session

        Returns:
            User object

        Raises:
            HTTPException: If token is invalid or user not found
        """
        token = credentials.credentials

        # Decode token
        payload = auth_service.decode_token(token)
        if not payload:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired token",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Get user from token
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token payload",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Fetch user from database
        user = db.query(User).filter(User.id == user_id, User.is_active == True).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found or inactive",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Check if account is locked
        if user.locked_until and user.locked_until > datetime.utcnow():
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Account locked until {user.locked_until.isoformat()}",
            )

        return user

    @staticmethod
    async def get_current_active_user(
        current_user: User = Depends(get_current_user)
    ) -> User:
        """
        Get current active user (must be verified)

        Args:
            current_user: Current user from token

        Returns:
            User object

        Raises:
            HTTPException: If user is not verified
        """
        if not current_user.is_verified:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Email not verified"
            )
        return current_user

    @staticmethod
    async def get_current_superuser(
        current_user: User = Depends(get_current_active_user)
    ) -> User:
        """
        Get current superuser

        Args:
            current_user: Current active user

        Returns:
            User object

        Raises:
            HTTPException: If user is not a superuser
        """
        if not current_user.is_superuser:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not enough permissions"
            )
        return current_user

    @staticmethod
    async def get_user_permissions(
        current_user: User = Depends(get_current_active_user),
        db: Session = Depends(get_db)
    ) -> List[dict]:
        """
        Get all permissions for current user

        Args:
            current_user: Current active user
            db: Database session

        Returns:
            List of permission dictionaries
        """
        # If superuser, grant all permissions
        if current_user.is_superuser:
            all_permissions = db.query(Permission).filter(Permission.is_active == True).all()
            return [p.to_dict() for p in all_permissions]

        # Get permissions from roles
        permissions = []
        for user_role in current_user.roles:
            role = db.query(Role).filter(Role.id == user_role.role_id).first()
            if role and role.is_active:
                for role_perm in role.permissions:
                    perm = db.query(Permission).filter(
                        Permission.id == role_perm.permission_id,
                        Permission.is_active == True
                    ).first()
                    if perm:
                        permissions.append(perm.to_dict())

        return permissions

    @staticmethod
    def require_permission(resource: str, action: str):
        """
        Decorator to require specific permission

        Args:
            resource: Required resource (e.g., 'workspace')
            action: Required action (e.g., 'create')

        Returns:
            Decorated function

        Usage:
            @require_permission('workspace', 'create')
            async def create_workspace(...):
                ...
        """
        async def permission_dependency(
            current_user: User = Depends(RBACMiddleware.get_current_active_user),
            user_permissions: List[dict] = Depends(RBACMiddleware.get_user_permissions)
        ):
            # Superusers have all permissions
            if current_user.is_superuser:
                return current_user

            # Check if user has required permission
            has_permission = permission_checker.check_permission(
                user_permissions, resource, action
            )

            if not has_permission:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=f"Permission denied: {resource}.{action} required"
                )

            return current_user

        return permission_dependency

    @staticmethod
    async def check_workspace_access(
        workspace_id: str,
        required_level: str = "viewer",
        current_user: User = Depends(get_current_active_user),
        db: Session = Depends(get_db)
    ) -> bool:
        """
        Check if user has access to a workspace

        Args:
            workspace_id: Workspace ID to check
            required_level: Required access level (viewer, editor, admin, owner)
            current_user: Current active user
            db: Database session

        Returns:
            True if user has access

        Raises:
            HTTPException: If user doesn't have access
        """
        # Superusers have access to all workspaces
        if current_user.is_superuser:
            return True

        # Check workspace membership
        member = db.query(WorkspaceMember).filter(
            WorkspaceMember.user_id == current_user.id,
            WorkspaceMember.workspace_id == workspace_id,
            WorkspaceMember.is_active == True
        ).first()

        if not member:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No access to this workspace"
            )

        # Check access level
        level_hierarchy = {
            "viewer": 1,
            "editor": 2,
            "admin": 3,
            "owner": 4
        }

        user_level = level_hierarchy.get(member.access_level, 0)
        required = level_hierarchy.get(required_level, 0)

        if user_level < required:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Insufficient access level (required: {required_level})"
            )

        return True


# Convenience dependencies
get_current_user = RBACMiddleware.get_current_user
get_current_active_user = RBACMiddleware.get_current_active_user
get_current_superuser = RBACMiddleware.get_current_superuser
get_user_permissions = RBACMiddleware.get_user_permissions
require_permission = RBACMiddleware.require_permission
check_workspace_access = RBACMiddleware.check_workspace_access


# Permission decorators for common operations
require_workspace_create = require_permission("workspace", "create")
require_workspace_delete = require_permission("workspace", "delete")
require_source_create = require_permission("source", "create")
require_source_delete = require_permission("source", "delete")
require_analysis_create = require_permission("analysis", "create")
require_analysis_export = require_permission("analysis", "export")
require_integration_create = require_permission("integration", "create")
require_user_create = require_permission("user", "create")
