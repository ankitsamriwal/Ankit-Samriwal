"""
Analysis models - Central object linking Prompt Packs to Sources
"""
from sqlalchemy import Column, String, Text, Float, Integer, TIMESTAMP, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid

from .base import Base


class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspaces.id", ondelete="CASCADE"))

    # Analysis Metadata
    analysis_name = Column(String(500), nullable=False)
    analysis_type = Column(String(100))  # 'post-mortem', 'strategy', 'decision', 'risk-assessment'
    description = Column(Text)

    # Prompt Pack Reference
    prompt_pack_id = Column(UUID(as_uuid=True), ForeignKey("prompt_registry.id"))
    prompt_version = Column(String(10))

    # Status & Results
    status = Column(String(50), default="pending")  # 'pending', 'in_progress', 'completed', 'failed'
    rigor_score = Column(Float)  # Overall RigorScore (0-100)
    confidence_level = Column(Float)  # AI confidence (0-1.0)

    # Execution Details
    started_at = Column(TIMESTAMP(timezone=True))
    completed_at = Column(TIMESTAMP(timezone=True))
    execution_time_seconds = Column(Integer)

    # Results Storage
    summary_text = Column(Text)
    key_findings = Column(JSONB)
    recommendations = Column(JSONB)
    detected_conflicts = Column(JSONB)

    # Audit Trail
    created_by = Column(String(255))
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())

    # NotebookLM Integration
    notebooklm_package_url = Column(Text)
    exported_at = Column(TIMESTAMP(timezone=True))

    # Relationships
    workspace = relationship("Workspace", backref="analyses")
    prompt_pack = relationship("PromptRegistry", backref="analyses")

    def __repr__(self):
        return f"<Analysis(id={self.id}, name={self.analysis_name}, status={self.status})>"

    def to_dict(self):
        """Convert analysis to dictionary"""
        return {
            "id": str(self.id),
            "workspace_id": str(self.workspace_id),
            "analysis_name": self.analysis_name,
            "analysis_type": self.analysis_type,
            "description": self.description,
            "prompt_pack_id": str(self.prompt_pack_id) if self.prompt_pack_id else None,
            "prompt_version": self.prompt_version,
            "status": self.status,
            "rigor_score": self.rigor_score,
            "confidence_level": self.confidence_level,
            "started_at": self.started_at.isoformat() if self.started_at else None,
            "completed_at": self.completed_at.isoformat() if self.completed_at else None,
            "execution_time_seconds": self.execution_time_seconds,
            "summary_text": self.summary_text,
            "key_findings": self.key_findings,
            "recommendations": self.recommendations,
            "detected_conflicts": self.detected_conflicts,
            "created_by": self.created_by,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "notebooklm_package_url": self.notebooklm_package_url,
            "exported_at": self.exported_at.isoformat() if self.exported_at else None,
        }


class AnalysisSource(Base):
    """Many-to-many relationship between Analyses and Sources"""
    __tablename__ = "analysis_sources"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    analysis_id = Column(UUID(as_uuid=True), ForeignKey("analyses.id", ondelete="CASCADE"), nullable=False)
    source_id = Column(UUID(as_uuid=True), ForeignKey("sources.id", ondelete="CASCADE"), nullable=False)

    # Source weighting for this analysis
    weight = Column(Float, default=1.0)
    inclusion_reason = Column(Text)
    added_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    # Relationships
    analysis = relationship("Analysis", backref="analysis_sources")
    source = relationship("Source", backref="analysis_sources")

    def __repr__(self):
        return f"<AnalysisSource(analysis_id={self.analysis_id}, source_id={self.source_id})>"

    def to_dict(self):
        """Convert analysis source to dictionary"""
        return {
            "id": str(self.id),
            "analysis_id": str(self.analysis_id),
            "source_id": str(self.source_id),
            "weight": self.weight,
            "inclusion_reason": self.inclusion_reason,
            "added_at": self.added_at.isoformat() if self.added_at else None,
        }
