"""
Workspace model - Segregation of data by organizational context
"""
from sqlalchemy import Column, String, Text, Boolean, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid

from .base import Base


class Workspace(Base):
    __tablename__ = "workspaces"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False, unique=True)
    description = Column(Text)
    visibility_level = Column(String(50), default="internal")  # 'board', 'internal', 'confidential'
    created_by = Column(String(255))
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())
    is_active = Column(Boolean, default=True)

    def __repr__(self):
        return f"<Workspace(id={self.id}, name={self.name}, visibility={self.visibility_level})>"

    def to_dict(self):
        """Convert workspace to dictionary"""
        return {
            "id": str(self.id),
            "name": self.name,
            "description": self.description,
            "visibility_level": self.visibility_level,
            "created_by": self.created_by,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "is_active": self.is_active,
        }
