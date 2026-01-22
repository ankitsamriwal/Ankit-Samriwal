"""
Readiness models - Tracking evolution of thinking and criterion checks
"""
from sqlalchemy import Column, String, Float, Integer, Boolean, Text, TIMESTAMP, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid

from .base import Base


class ReadinessLog(Base):
    """Time-series log showing evolution of RigorScore"""
    __tablename__ = "readiness_logs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    analysis_id = Column(UUID(as_uuid=True), ForeignKey("analyses.id", ondelete="CASCADE"))

    # Snapshot Data
    snapshot_timestamp = Column(TIMESTAMP(timezone=True), server_default=func.now())
    rigor_score = Column(Float)
    source_count = Column(Integer)
    authoritative_source_count = Column(Integer)

    # Score Components
    source_veracity_score = Column(Float)
    conflict_detection_score = Column(Float)
    logic_presence_score = Column(Float)

    # Changes
    delta_from_previous = Column(Float)
    new_sources_added = Column(Integer)
    trigger_event = Column(String(255))  # 'source_added', 'reanalysis', 'manual_trigger'

    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    # Relationships
    analysis = relationship("Analysis", backref="readiness_logs")

    def __repr__(self):
        return f"<ReadinessLog(id={self.id}, analysis_id={self.analysis_id}, score={self.rigor_score})>"

    def to_dict(self):
        """Convert readiness log to dictionary"""
        return {
            "id": str(self.id),
            "analysis_id": str(self.analysis_id),
            "snapshot_timestamp": self.snapshot_timestamp.isoformat() if self.snapshot_timestamp else None,
            "rigor_score": self.rigor_score,
            "source_count": self.source_count,
            "authoritative_source_count": self.authoritative_source_count,
            "source_veracity_score": self.source_veracity_score,
            "conflict_detection_score": self.conflict_detection_score,
            "logic_presence_score": self.logic_presence_score,
            "delta_from_previous": self.delta_from_previous,
            "new_sources_added": self.new_sources_added,
            "trigger_event": self.trigger_event,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }


class ReadinessCheck(Base):
    """Individual criterion checks for each analysis"""
    __tablename__ = "readiness_checks"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    analysis_id = Column(UUID(as_uuid=True), ForeignKey("analyses.id", ondelete="CASCADE"))

    # Criterion Details
    criterion_name = Column(String(255), nullable=False)  # e.g., "Decision Log Present"
    criterion_category = Column(String(100))  # 'completeness', 'quality', 'consistency'

    # Check Results
    status = Column(Boolean, default=False)
    confidence_score = Column(Float)  # AI-generated score 0-1.0
    reasoning = Column(Text)  # "Why this failed/passed"

    # Evidence
    evidence_source_ids = Column(JSONB)  # Array of source IDs that support/contradict
    evidence_snippets = Column(JSONB)  # Key quotes or data points

    # Timestamps
    checked_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    # Relationships
    analysis = relationship("Analysis", backref="readiness_checks")

    def __repr__(self):
        return f"<ReadinessCheck(id={self.id}, criterion={self.criterion_name}, status={self.status})>"

    def to_dict(self):
        """Convert readiness check to dictionary"""
        return {
            "id": str(self.id),
            "analysis_id": str(self.analysis_id),
            "criterion_name": self.criterion_name,
            "criterion_category": self.criterion_category,
            "status": self.status,
            "confidence_score": self.confidence_score,
            "reasoning": self.reasoning,
            "evidence_source_ids": self.evidence_source_ids,
            "evidence_snippets": self.evidence_snippets,
            "checked_at": self.checked_at.isoformat() if self.checked_at else None,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
