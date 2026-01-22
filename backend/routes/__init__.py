"""
API Routes for Leadership Intelligence Wrapper
"""
from .auth import router as auth_router
from .integrations import router as integrations_router
from .workspaces import router as workspaces_router
from .sources import router as sources_router
from .analyses import router as analyses_router
from .prompts import router as prompts_router

__all__ = [
    "auth_router",
    "integrations_router",
    "workspaces_router",
    "sources_router",
    "analyses_router",
    "prompts_router",
]
