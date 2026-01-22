"""
Analysis API routes
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

from ..models.base import get_db
from ..models.analysis import Analysis, AnalysisSource
from ..models.source import Source
from ..models.prompt import PromptRegistry
from ..models.readiness import ReadinessLog, ReadinessCheck
from ..services.rigor_score import calculate_rigor_score
from ..services.readiness_engine import scan_readiness
from ..services.notebooklm_packager import create_notebooklm_package

router = APIRouter(prefix="/api/analyses", tags=["analyses"])


# Pydantic models
class AnalysisCreate(BaseModel):
    workspace_id: str
    analysis_name: str
    analysis_type: str
    description: str = None
    prompt_pack_id: str
    source_ids: List[str]
    created_by: str = None


class AnalysisResponse(BaseModel):
    id: str
    workspace_id: str
    analysis_name: str
    analysis_type: str
    status: str
    rigor_score: float = None
    confidence_level: float = None
    created_at: str
    completed_at: str = None

    class Config:
        from_attributes = True


@router.get("/workspace/{workspace_id}", response_model=List[AnalysisResponse])
async def list_analyses(
    workspace_id: str,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """List all analyses in a workspace"""
    analyses = db.query(Analysis).filter(
        Analysis.workspace_id == workspace_id
    ).offset(skip).limit(limit).all()

    return [a.to_dict() for a in analyses]


@router.get("/{analysis_id}", response_model=AnalysisResponse)
async def get_analysis(
    analysis_id: str,
    db: Session = Depends(get_db)
):
    """Get a specific analysis"""
    analysis = db.query(Analysis).filter(Analysis.id == analysis_id).first()

    if not analysis:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis not found"
        )

    return analysis.to_dict()


@router.post("/", response_model=AnalysisResponse, status_code=status.HTTP_201_CREATED)
async def create_analysis(
    analysis_data: AnalysisCreate,
    db: Session = Depends(get_db)
):
    """Create a new analysis"""
    # Validate prompt pack exists
    prompt_pack = db.query(PromptRegistry).filter(
        PromptRegistry.id == analysis_data.prompt_pack_id
    ).first()

    if not prompt_pack:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Prompt pack not found"
        )

    # Validate sources exist
    sources = db.query(Source).filter(
        Source.id.in_(analysis_data.source_ids)
    ).all()

    if len(sources) != len(analysis_data.source_ids):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="One or more sources not found"
        )

    # Create analysis
    new_analysis = Analysis(
        workspace_id=analysis_data.workspace_id,
        analysis_name=analysis_data.analysis_name,
        analysis_type=analysis_data.analysis_type,
        description=analysis_data.description,
        prompt_pack_id=analysis_data.prompt_pack_id,
        prompt_version=prompt_pack.version_tag,
        created_by=analysis_data.created_by,
        status="pending",
        started_at=datetime.utcnow()
    )

    db.add(new_analysis)
    db.flush()

    # Link sources to analysis
    for source in sources:
        analysis_source = AnalysisSource(
            analysis_id=new_analysis.id,
            source_id=source.id,
            weight=1.5 if source.is_authoritative else 1.0
        )
        db.add(analysis_source)

    db.commit()
    db.refresh(new_analysis)

    return new_analysis.to_dict()


@router.post("/{analysis_id}/score", response_model=dict)
async def calculate_score(
    analysis_id: str,
    db: Session = Depends(get_db)
):
    """Calculate RigorScore for an analysis"""
    analysis = db.query(Analysis).filter(Analysis.id == analysis_id).first()

    if not analysis:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis not found"
        )

    # Get associated sources
    source_links = db.query(AnalysisSource).filter(
        AnalysisSource.analysis_id == analysis_id
    ).all()

    source_ids = [link.source_id for link in source_links]
    sources = db.query(Source).filter(Source.id.in_(source_ids)).all()

    # Convert to dict format for scoring
    sources_data = [s.to_dict() for s in sources]

    # Calculate RigorScore
    score_result = calculate_rigor_score(
        sources=sources_data,
        detected_conflicts=analysis.detected_conflicts or []
    )

    # Update analysis
    analysis.rigor_score = score_result["rigor_score"]
    analysis.status = "completed"
    analysis.completed_at = datetime.utcnow()

    # Create readiness log entry
    readiness_log = ReadinessLog(
        analysis_id=analysis.id,
        rigor_score=score_result["rigor_score"],
        source_count=score_result["breakdown"]["total_sources"],
        authoritative_source_count=score_result["breakdown"]["authoritative_sources"],
        source_veracity_score=score_result["source_veracity_score"],
        conflict_detection_score=score_result["conflict_detection_score"],
        logic_presence_score=score_result["logic_presence_score"],
        trigger_event="score_calculation"
    )
    db.add(readiness_log)

    db.commit()
    db.refresh(analysis)

    return {
        "analysis_id": str(analysis.id),
        "rigor_score": score_result["rigor_score"],
        "breakdown": score_result
    }


@router.post("/{analysis_id}/readiness", response_model=dict)
async def check_readiness(
    analysis_id: str,
    db: Session = Depends(get_db)
):
    """Run readiness checks for an analysis"""
    analysis = db.query(Analysis).filter(Analysis.id == analysis_id).first()

    if not analysis:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis not found"
        )

    # Get prompt pack
    prompt_pack = db.query(PromptRegistry).filter(
        PromptRegistry.id == analysis.prompt_pack_id
    ).first()

    # Get sources
    source_links = db.query(AnalysisSource).filter(
        AnalysisSource.analysis_id == analysis_id
    ).all()
    source_ids = [link.source_id for link in source_links]
    sources = db.query(Source).filter(Source.id.in_(source_ids)).all()

    # Run readiness scan
    readiness_result = await scan_readiness(
        sources=[s.to_dict() for s in sources],
        prompt_pack=prompt_pack.to_dict(),
        analysis_type=analysis.analysis_type
    )

    # Save readiness checks
    for check in readiness_result["checks"]:
        readiness_check = ReadinessCheck(
            analysis_id=analysis.id,
            criterion_name=check["criterion_name"],
            criterion_category=check["criterion_category"],
            status=check["status"],
            confidence_score=check["confidence_score"],
            reasoning=check["reasoning"],
            evidence_source_ids=check["evidence_source_ids"],
            evidence_snippets=check["evidence_snippets"]
        )
        db.add(readiness_check)

    db.commit()

    return readiness_result


@router.post("/{analysis_id}/export", response_model=dict)
async def export_to_notebooklm(
    analysis_id: str,
    db: Session = Depends(get_db)
):
    """Export analysis as NotebookLM package"""
    analysis = db.query(Analysis).filter(Analysis.id == analysis_id).first()

    if not analysis:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis not found"
        )

    # Get prompt pack
    prompt_pack = db.query(PromptRegistry).filter(
        PromptRegistry.id == analysis.prompt_pack_id
    ).first()

    # Get sources
    source_links = db.query(AnalysisSource).filter(
        AnalysisSource.analysis_id == analysis_id
    ).all()
    source_ids = [link.source_id for link in source_links]
    sources = db.query(Source).filter(Source.id.in_(source_ids)).all()

    # Create package
    package_info = await create_notebooklm_package(
        analysis=analysis.to_dict(),
        sources=[s.to_dict() for s in sources],
        prompt_pack=prompt_pack.to_dict()
    )

    # Update analysis
    analysis.notebooklm_package_url = package_info["download_url"]
    analysis.exported_at = datetime.utcnow()
    db.commit()

    return package_info


@router.get("/{analysis_id}/readiness-history", response_model=List[dict])
async def get_readiness_history(
    analysis_id: str,
    db: Session = Depends(get_db)
):
    """Get readiness score evolution over time"""
    logs = db.query(ReadinessLog).filter(
        ReadinessLog.analysis_id == analysis_id
    ).order_by(ReadinessLog.snapshot_timestamp.desc()).all()

    return [log.to_dict() for log in logs]
