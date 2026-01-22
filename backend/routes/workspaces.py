"""
Workspace API routes
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel

from ..models.base import get_db
from ..models.workspace import Workspace

router = APIRouter(prefix="/api/workspaces", tags=["workspaces"])


# Pydantic models for request/response
class WorkspaceCreate(BaseModel):
    name: str
    description: str = None
    visibility_level: str = "internal"
    created_by: str = None


class WorkspaceResponse(BaseModel):
    id: str
    name: str
    description: str = None
    visibility_level: str
    created_by: str = None
    is_active: bool
    created_at: str
    updated_at: str

    class Config:
        from_attributes = True


@router.get("/", response_model=List[WorkspaceResponse])
async def list_workspaces(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """List all workspaces"""
    workspaces = db.query(Workspace).filter(
        Workspace.is_active == True
    ).offset(skip).limit(limit).all()

    return [w.to_dict() for w in workspaces]


@router.get("/{workspace_id}", response_model=WorkspaceResponse)
async def get_workspace(
    workspace_id: str,
    db: Session = Depends(get_db)
):
    """Get a specific workspace"""
    workspace = db.query(Workspace).filter(Workspace.id == workspace_id).first()

    if not workspace:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Workspace not found"
        )

    return workspace.to_dict()


@router.post("/", response_model=WorkspaceResponse, status_code=status.HTTP_201_CREATED)
async def create_workspace(
    workspace: WorkspaceCreate,
    db: Session = Depends(get_db)
):
    """Create a new workspace"""
    # Check if workspace with same name exists
    existing = db.query(Workspace).filter(Workspace.name == workspace.name).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Workspace with this name already exists"
        )

    # Create workspace
    new_workspace = Workspace(
        name=workspace.name,
        description=workspace.description,
        visibility_level=workspace.visibility_level,
        created_by=workspace.created_by
    )

    db.add(new_workspace)
    db.commit()
    db.refresh(new_workspace)

    return new_workspace.to_dict()


@router.delete("/{workspace_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_workspace(
    workspace_id: str,
    db: Session = Depends(get_db)
):
    """Delete (soft delete) a workspace"""
    workspace = db.query(Workspace).filter(Workspace.id == workspace_id).first()

    if not workspace:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Workspace not found"
        )

    # Soft delete
    workspace.is_active = False
    db.commit()

    return None
