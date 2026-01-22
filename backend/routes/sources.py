"""
Source API routes
"""
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel

from ..models.base import get_db
from ..models.source import Source
from ..services.ingest_service import document_ingestor

router = APIRouter(prefix="/api/sources", tags=["sources"])


# Pydantic models
class SourceResponse(BaseModel):
    id: str
    workspace_id: str
    title: str
    source_type: str
    file_path: str = None
    file_size_bytes: int = None
    is_authoritative: bool
    status: str
    author: str = None
    word_count: int = None
    page_count: int = None
    uploaded_at: str

    class Config:
        from_attributes = True


@router.get("/workspace/{workspace_id}", response_model=List[SourceResponse])
async def list_sources(
    workspace_id: str,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """List all sources in a workspace"""
    sources = db.query(Source).filter(
        Source.workspace_id == workspace_id
    ).offset(skip).limit(limit).all()

    return [s.to_dict() for s in sources]


@router.get("/{source_id}", response_model=SourceResponse)
async def get_source(
    source_id: str,
    db: Session = Depends(get_db)
):
    """Get a specific source"""
    source = db.query(Source).filter(Source.id == source_id).first()

    if not source:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Source not found"
        )

    return source.to_dict()


@router.post("/upload", response_model=SourceResponse, status_code=status.HTTP_201_CREATED)
async def upload_source(
    file: UploadFile = File(...),
    workspace_id: str = Form(...),
    is_authoritative: bool = Form(False),
    author: str = Form(None),
    department: str = Form(None),
    db: Session = Depends(get_db)
):
    """Upload a new source document"""
    # Ingest the file
    source_data = await document_ingestor.ingest_file(
        file=file.file,
        filename=file.filename,
        workspace_id=workspace_id,
        metadata={
            "is_authoritative": is_authoritative,
            "author": author,
            "department": department,
            "uploaded_by": "api_user"  # TODO: Get from auth
        }
    )

    # Remove content before storing in DB
    content = source_data.pop("content", "")

    # Create source record
    new_source = Source(**source_data)
    db.add(new_source)
    db.commit()
    db.refresh(new_source)

    return new_source.to_dict()


@router.patch("/{source_id}/authoritative", response_model=SourceResponse)
async def mark_authoritative(
    source_id: str,
    is_authoritative: bool,
    db: Session = Depends(get_db)
):
    """Mark a source as authoritative or not"""
    source = db.query(Source).filter(Source.id == source_id).first()

    if not source:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Source not found"
        )

    source.is_authoritative = is_authoritative
    db.commit()
    db.refresh(source)

    return source.to_dict()


@router.delete("/{source_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_source(
    source_id: str,
    db: Session = Depends(get_db)
):
    """Delete a source"""
    source = db.query(Source).filter(Source.id == source_id).first()

    if not source:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Source not found"
        )

    db.delete(source)
    db.commit()

    return None
