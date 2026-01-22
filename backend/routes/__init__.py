"""
API Routes for Leadership Intelligence Wrapper
"""
from .workspaces import router as workspaces_router
from .sources import router as sources_router
from .analyses import router as analyses_router
from .prompts import router as prompts_router

__all__ = [
    "workspaces_router",
    "sources_router",
    "analyses_router",
    "prompts_router",
]
