"""
Integration models - External service connections and sync tracking
"""
from sqlalchemy import Column, String, Boolean, Integer, TIMESTAMP, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid

from .base import Base


class IntegrationConnection(Base):
    """External service connections (SharePoint, Google Drive, etc.)"""
    __tablename__ = "integration_connections"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    # Connection Info
    name = Column(String(255), nullable=False)
    provider = Column(String(50), nullable=False)  # 'sharepoint', 'google_drive', 'onedrive'

    # Credentials (encrypted)
    credentials = Column(JSONB, nullable=False)  # Store encrypted tokens/keys

    # Configuration
    settings = Column(JSONB)  # Provider-specific settings

    # Status
    is_active = Column(Boolean, default=True)
    last_sync_at = Column(TIMESTAMP(timezone=True))
    last_sync_status = Column(String(50))  # 'success', 'failed', 'partial'
    last_error = Column(Text)

    # Ownership
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspaces.id"))
    created_by = Column(UUID(as_uuid=True), ForeignKey("users.id"))

    # Timestamps
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    workspace = relationship("Workspace", backref="integrations")
    creator = relationship("User")
    sync_jobs = relationship("SyncJob", back_populates="connection", cascade="all, delete-orphan")
    source_mappings = relationship("ExternalSourceMapping", back_populates="connection")

    def __repr__(self):
        return f"<IntegrationConnection(id={self.id}, name={self.name}, provider={self.provider})>"

    def to_dict(self, include_credentials=False):
        """Convert integration connection to dictionary"""
        data = {
            "id": str(self.id),
            "name": self.name,
            "provider": self.provider,
            "settings": self.settings,
            "is_active": self.is_active,
            "last_sync_at": self.last_sync_at.isoformat() if self.last_sync_at else None,
            "last_sync_status": self.last_sync_status,
            "last_error": self.last_error,
            "workspace_id": str(self.workspace_id) if self.workspace_id else None,
            "created_by": str(self.created_by) if self.created_by else None,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }

        if include_credentials:
            data["credentials"] = self.credentials

        return data


class SyncJob(Base):
    """Document synchronization job tracking"""
    __tablename__ = "sync_jobs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    connection_id = Column(UUID(as_uuid=True), ForeignKey("integration_connections.id", ondelete="CASCADE"))

    # Job Info
    job_type = Column(String(50))  # 'full_sync', 'incremental', 'manual'
    status = Column(String(50), default='pending')  # 'pending', 'running', 'completed', 'failed'

    # Progress
    total_items = Column(Integer)
    processed_items = Column(Integer, default=0)
    failed_items = Column(Integer, default=0)
    new_sources = Column(Integer, default=0)
    updated_sources = Column(Integer, default=0)

    # Timing
    started_at = Column(TIMESTAMP(timezone=True))
    completed_at = Column(TIMESTAMP(timezone=True))
    duration_seconds = Column(Integer)

    # Results
    error_message = Column(Text)
    results = Column(JSONB)

    # Timestamps
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    # Relationships
    connection = relationship("IntegrationConnection", back_populates="sync_jobs")

    def __repr__(self):
        return f"<SyncJob(id={self.id}, connection_id={self.connection_id}, status={self.status})>"

    def to_dict(self):
        """Convert sync job to dictionary"""
        return {
            "id": str(self.id),
            "connection_id": str(self.connection_id),
            "job_type": self.job_type,
            "status": self.status,
            "total_items": self.total_items,
            "processed_items": self.processed_items,
            "failed_items": self.failed_items,
            "new_sources": self.new_sources,
            "updated_sources": self.updated_sources,
            "started_at": self.started_at.isoformat() if self.started_at else None,
            "completed_at": self.completed_at.isoformat() if self.completed_at else None,
            "duration_seconds": self.duration_seconds,
            "error_message": self.error_message,
            "results": self.results,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }


class ExternalSourceMapping(Base):
    """Link external documents to internal sources"""
    __tablename__ = "external_source_mapping"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    # Internal Reference
    source_id = Column(UUID(as_uuid=True), ForeignKey("sources.id", ondelete="CASCADE"))

    # External Reference
    connection_id = Column(UUID(as_uuid=True), ForeignKey("integration_connections.id"))
    external_id = Column(String(500), nullable=False)  # SharePoint/Drive file ID
    external_url = Column(Text)

    # Sync Info
    last_synced_at = Column(TIMESTAMP(timezone=True))
    external_modified_at = Column(TIMESTAMP(timezone=True))
    sync_status = Column(String(50))  # 'synced', 'out_of_sync', 'deleted'

    # Metadata
    external_metadata = Column(JSONB)

    # Timestamps
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    source = relationship("Source", backref="external_mappings")
    connection = relationship("IntegrationConnection", back_populates="source_mappings")

    def __repr__(self):
        return f"<ExternalSourceMapping(source_id={self.source_id}, external_id={self.external_id})>"

    def to_dict(self):
        """Convert external source mapping to dictionary"""
        return {
            "id": str(self.id),
            "source_id": str(self.source_id),
            "connection_id": str(self.connection_id),
            "external_id": self.external_id,
            "external_url": self.external_url,
            "last_synced_at": self.last_synced_at.isoformat() if self.last_synced_at else None,
            "external_modified_at": self.external_modified_at.isoformat() if self.external_modified_at else None,
            "sync_status": self.sync_status,
            "external_metadata": self.external_metadata,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }


class DeletedSource(Base):
    """Audit trail for deleted documents (zero-persistence mode)"""
    __tablename__ = "deleted_sources"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    # Original Source Reference
    original_source_id = Column(UUID(as_uuid=True), nullable=False)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspaces.id"))

    # Retained Metadata
    title = Column(String(500))
    source_type = Column(String(100))
    file_hash = Column(String(64))
    is_authoritative = Column(Boolean)
    version = Column(String(50))
    author = Column(String(255))
    document_date = Column(TIMESTAMP(timezone=True))

    # Deletion Info
    deletion_reason = Column(String(100))  # 'zero_persistence', 'user_request', 'retention_policy'
    deleted_by = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    deleted_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    # Compliance
    retention_end_date = Column(TIMESTAMP(timezone=True))
    legal_hold = Column(Boolean, default=False)

    # Provenance
    used_in_analyses = Column(JSONB)  # Array of analysis IDs that used this source
    export_count = Column(Integer, default=0)

    # Relationships
    workspace = relationship("Workspace")
    deleted_by_user = relationship("User")

    def __repr__(self):
        return f"<DeletedSource(id={self.id}, original_id={self.original_source_id})>"

    def to_dict(self):
        """Convert deleted source to dictionary"""
        return {
            "id": str(self.id),
            "original_source_id": str(self.original_source_id),
            "workspace_id": str(self.workspace_id) if self.workspace_id else None,
            "title": self.title,
            "source_type": self.source_type,
            "file_hash": self.file_hash,
            "is_authoritative": self.is_authoritative,
            "version": self.version,
            "author": self.author,
            "document_date": self.document_date.isoformat() if self.document_date else None,
            "deletion_reason": self.deletion_reason,
            "deleted_by": str(self.deleted_by) if self.deleted_by else None,
            "deleted_at": self.deleted_at.isoformat() if self.deleted_at else None,
            "retention_end_date": self.retention_end_date.isoformat() if self.retention_end_date else None,
            "legal_hold": self.legal_hold,
            "used_in_analyses": self.used_in_analyses,
            "export_count": self.export_count,
        }
