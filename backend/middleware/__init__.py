"""
Middleware for Leadership Intelligence Wrapper (LIW)
"""
from .rbac import (
    get_current_user,
    get_current_active_user,
    get_current_superuser,
    get_user_permissions,
    require_permission,
    check_workspace_access,
    # Convenience permission checkers
    require_workspace_create,
    require_workspace_delete,
    require_source_create,
    require_source_delete,
    require_analysis_create,
    require_analysis_export,
    require_integration_create,
    require_user_create,
)

__all__ = [
    "get_current_user",
    "get_current_active_user",
    "get_current_superuser",
    "get_user_permissions",
    "require_permission",
    "check_workspace_access",
    "require_workspace_create",
    "require_workspace_delete",
    "require_source_create",
    "require_source_delete",
    "require_analysis_create",
    "require_analysis_export",
    "require_integration_create",
    "require_user_create",
]
