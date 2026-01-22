"""
Prompt Pack API routes
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel

from ..models.base import get_db
from ..models.prompt import PromptRegistry

router = APIRouter(prefix="/api/prompts", tags=["prompts"])


# Pydantic models
class PromptResponse(BaseModel):
    id: str
    version_tag: str
    use_case: str
    description: str = None
    is_active: bool
    created_at: str

    class Config:
        from_attributes = True


@router.get("/", response_model=List[PromptResponse])
async def list_prompt_packs(
    use_case: str = None,
    active_only: bool = True,
    db: Session = Depends(get_db)
):
    """List all prompt packs"""
    query = db.query(PromptRegistry)

    if active_only:
        query = query.filter(PromptRegistry.is_active == True)

    if use_case:
        query = query.filter(PromptRegistry.use_case == use_case)

    prompts = query.all()

    return [p.to_dict() for p in prompts]


@router.get("/{prompt_id}", response_model=dict)
async def get_prompt_pack(
    prompt_id: str,
    db: Session = Depends(get_db)
):
    """Get a specific prompt pack with full details"""
    prompt = db.query(PromptRegistry).filter(PromptRegistry.id == prompt_id).first()

    if not prompt:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Prompt pack not found"
        )

    return prompt.to_dict()
