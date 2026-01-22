"""
Audit models - Complete history and compliance tracking
"""
from sqlalchemy import Column, String, Text, TIMESTAMP, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB, INET
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid

from .base import Base


class AuditTrail(Base):
    """Complete history of all actions"""
    __tablename__ = "audit_trail"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    # Action Details
    action_type = Column(String(100), nullable=False)  # 'create', 'update', 'delete', 'export', 'access'
    entity_type = Column(String(100), nullable=False)  # 'source', 'analysis', 'workspace'
    entity_id = Column(UUID(as_uuid=True))

    # User Context
    user_id = Column(String(255))
    user_role = Column(String(100))
    ip_address = Column(INET)

    # Change Details
    old_values = Column(JSONB)
    new_values = Column(JSONB)
    change_description = Column(Text)

    # Timestamps
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    def __repr__(self):
        return f"<AuditTrail(id={self.id}, action={self.action_type}, entity={self.entity_type})>"

    def to_dict(self):
        """Convert audit trail to dictionary"""
        return {
            "id": str(self.id),
            "action_type": self.action_type,
            "entity_type": self.entity_type,
            "entity_id": str(self.entity_id) if self.entity_id else None,
            "user_id": self.user_id,
            "user_role": self.user_role,
            "ip_address": str(self.ip_address) if self.ip_address else None,
            "old_values": self.old_values,
            "new_values": self.new_values,
            "change_description": self.change_description,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }


class DocumentAccessLog(Base):
    """Track who accessed which documents (for Board mode)"""
    __tablename__ = "document_access_log"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    source_id = Column(UUID(as_uuid=True), ForeignKey("sources.id", ondelete="CASCADE"))

    # Access Details
    accessed_by = Column(String(255), nullable=False)
    access_type = Column(String(50))  # 'view', 'download', 'export', 'delete'
    access_context = Column(String(100))  # 'analysis_creation', 'manual_view', 'export'

    # Session Context
    session_id = Column(String(255))
    analysis_id = Column(UUID(as_uuid=True), ForeignKey("analyses.id"))

    # Timestamps
    accessed_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    # Relationships
    source = relationship("Source", backref="access_logs")
    analysis = relationship("Analysis", backref="access_logs")

    def __repr__(self):
        return f"<DocumentAccessLog(id={self.id}, source_id={self.source_id}, accessed_by={self.accessed_by})>"

    def to_dict(self):
        """Convert document access log to dictionary"""
        return {
            "id": str(self.id),
            "source_id": str(self.source_id),
            "accessed_by": self.accessed_by,
            "access_type": self.access_type,
            "access_context": self.access_context,
            "session_id": self.session_id,
            "analysis_id": str(self.analysis_id) if self.analysis_id else None,
            "accessed_at": self.accessed_at.isoformat() if self.accessed_at else None,
        }
