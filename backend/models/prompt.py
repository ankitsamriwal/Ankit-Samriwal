"""
Prompt Registry model - Version-controlled prompt packs
"""
from sqlalchemy import Column, String, Text, Boolean, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
import uuid

from .base import Base


class PromptRegistry(Base):
    __tablename__ = "prompt_registry"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    # Version Control
    version_tag = Column(String(10), nullable=False)  # e.g., "v1.4-PM"
    use_case = Column(String(50), nullable=False)  # "post-mortem", "strategy", "decision"

    # Prompt Content
    system_prompt = Column(Text, nullable=False)
    logic_blocks = Column(JSONB)  # The specific sub-prompts

    # Readiness Criteria
    required_criteria = Column(JSONB)  # Array of criteria that must be checked

    # Metadata
    description = Column(Text)
    created_by = Column(String(255))
    is_locked = Column(Boolean, default=True)
    is_active = Column(Boolean, default=True)

    # Timestamps
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())
    deprecated_at = Column(TIMESTAMP(timezone=True))

    def __repr__(self):
        return f"<PromptRegistry(id={self.id}, version={self.version_tag}, use_case={self.use_case})>"

    def to_dict(self):
        """Convert prompt registry to dictionary"""
        return {
            "id": str(self.id),
            "version_tag": self.version_tag,
            "use_case": self.use_case,
            "system_prompt": self.system_prompt,
            "logic_blocks": self.logic_blocks,
            "required_criteria": self.required_criteria,
            "description": self.description,
            "created_by": self.created_by,
            "is_locked": self.is_locked,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "deprecated_at": self.deprecated_at.isoformat() if self.deprecated_at else None,
        }
