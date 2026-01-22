"""
Source model - Metadata for every document
"""
from sqlalchemy import Column, String, Text, Boolean, Integer, BigInteger, TIMESTAMP, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid

from .base import Base


class Source(Base):
    __tablename__ = "sources"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspaces.id", ondelete="CASCADE"))

    # Document Metadata
    title = Column(String(500), nullable=False)
    source_type = Column(String(100), nullable=False)  # 'transcript', 'deck', 'spreadsheet', 'pdf', 'word'
    file_path = Column(Text)
    file_size_bytes = Column(BigInteger)
    file_hash = Column(String(64))  # SHA-256 hash

    # Provenance & Authority
    is_authoritative = Column(Boolean, default=False)
    version = Column(String(50))
    status = Column(String(50), default="draft")  # 'draft', 'final', 'archived'

    # Source Attribution
    author = Column(String(255))
    department = Column(String(255))
    uploaded_by = Column(String(255))

    # Content Analysis
    word_count = Column(Integer)
    page_count = Column(Integer)
    language = Column(String(10), default="en")

    # External Integration
    external_url = Column(Text)
    sharepoint_id = Column(String(255))
    google_drive_id = Column(String(255))

    # Timestamps
    document_date = Column(TIMESTAMP(timezone=True))
    uploaded_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())

    # Security & Compliance
    contains_pii = Column(Boolean, default=False)
    retention_policy = Column(String(100))

    # Relationships
    workspace = relationship("Workspace", backref="sources")

    def __repr__(self):
        return f"<Source(id={self.id}, title={self.title}, type={self.source_type})>"

    def to_dict(self):
        """Convert source to dictionary"""
        return {
            "id": str(self.id),
            "workspace_id": str(self.workspace_id),
            "title": self.title,
            "source_type": self.source_type,
            "file_path": self.file_path,
            "file_size_bytes": self.file_size_bytes,
            "file_hash": self.file_hash,
            "is_authoritative": self.is_authoritative,
            "version": self.version,
            "status": self.status,
            "author": self.author,
            "department": self.department,
            "uploaded_by": self.uploaded_by,
            "word_count": self.word_count,
            "page_count": self.page_count,
            "language": self.language,
            "external_url": self.external_url,
            "sharepoint_id": self.sharepoint_id,
            "google_drive_id": self.google_drive_id,
            "document_date": self.document_date.isoformat() if self.document_date else None,
            "uploaded_at": self.uploaded_at.isoformat() if self.uploaded_at else None,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "contains_pii": self.contains_pii,
            "retention_policy": self.retention_policy,
        }
