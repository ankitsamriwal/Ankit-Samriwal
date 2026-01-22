"""
Zero-Persistence Mode Service - Board compliance feature

This service ensures that sensitive documents can be deleted after export
while retaining metadata for audit purposes.
"""
from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta
from pathlib import Path
import os
import json


class ZeroPersistenceService:
    """
    Manages document deletion for Board-level compliance while maintaining
    complete audit trail and metadata
    """

    def __init__(self, enabled: bool = False):
        """
        Initialize zero-persistence service

        Args:
            enabled: Enable zero-persistence mode (default: False)
        """
        self.enabled = enabled

    async def delete_source_content(
        self,
        source: Dict[str, Any],
        analysis_ids: List[str],
        deleted_by: str,
        deletion_reason: str = "zero_persistence"
    ) -> Dict[str, Any]:
        """
        Delete source document content while retaining metadata

        Args:
            source: Source document dictionary
            analysis_ids: List of analysis IDs that used this source
            deleted_by: User ID who initiated deletion
            deletion_reason: Reason for deletion

        Returns:
            Deleted source metadata record
        """
        # Extract essential metadata to retain
        retained_metadata = {
            "id": source.get("id"),
            "original_source_id": source.get("id"),
            "workspace_id": source.get("workspace_id"),
            "title": source.get("title"),
            "source_type": source.get("source_type"),
            "file_hash": source.get("file_hash"),
            "is_authoritative": source.get("is_authoritative", False),
            "version": source.get("version"),
            "author": source.get("author"),
            "document_date": source.get("document_date"),
            "deletion_reason": deletion_reason,
            "deleted_by": deleted_by,
            "deleted_at": datetime.utcnow().isoformat(),
            "used_in_analyses": analysis_ids,
            "export_count": len(analysis_ids),
        }

        # Delete physical file
        file_path = source.get("file_path")
        if file_path and os.path.exists(file_path):
            try:
                os.remove(file_path)
                retained_metadata["file_deleted"] = True
            except Exception as e:
                retained_metadata["file_deleted"] = False
                retained_metadata["deletion_error"] = str(e)
        else:
            retained_metadata["file_deleted"] = False
            retained_metadata["deletion_error"] = "File not found"

        return retained_metadata

    async def batch_delete_sources(
        self,
        sources: List[Dict[str, Any]],
        analysis_id: str,
        deleted_by: str,
        deletion_reason: str = "zero_persistence"
    ) -> Dict[str, Any]:
        """
        Delete multiple source documents after analysis export

        Args:
            sources: List of source documents
            analysis_id: Analysis ID that used these sources
            deleted_by: User ID who initiated deletion
            deletion_reason: Reason for deletion

        Returns:
            Summary of deletion operation
        """
        deleted_count = 0
        failed_count = 0
        deleted_records = []
        errors = []

        for source in sources:
            try:
                deleted_record = await self.delete_source_content(
                    source=source,
                    analysis_ids=[analysis_id],
                    deleted_by=deleted_by,
                    deletion_reason=deletion_reason
                )

                if deleted_record.get("file_deleted"):
                    deleted_count += 1
                else:
                    failed_count += 1

                deleted_records.append(deleted_record)

            except Exception as e:
                failed_count += 1
                errors.append({
                    "source_id": source.get("id"),
                    "error": str(e)
                })

        return {
            "total_sources": len(sources),
            "deleted_count": deleted_count,
            "failed_count": failed_count,
            "deleted_records": deleted_records,
            "errors": errors,
            "timestamp": datetime.utcnow().isoformat()
        }

    async def export_and_delete(
        self,
        analysis: Dict[str, Any],
        sources: List[Dict[str, Any]],
        export_path: str,
        deleted_by: str
    ) -> Dict[str, Any]:
        """
        Export analysis and then delete source content (zero-persistence workflow)

        Args:
            analysis: Analysis metadata
            sources: List of source documents
            export_path: Path where export was saved
            deleted_by: User ID who initiated operation

        Returns:
            Operation result with export and deletion info
        """
        result = {
            "analysis_id": analysis.get("id"),
            "export_path": export_path,
            "export_timestamp": datetime.utcnow().isoformat(),
            "deletion_enabled": self.enabled,
        }

        # Only delete if zero-persistence is enabled
        if self.enabled:
            deletion_result = await self.batch_delete_sources(
                sources=sources,
                analysis_id=analysis.get("id"),
                deleted_by=deleted_by,
                deletion_reason="zero_persistence"
            )

            result["deletion_result"] = deletion_result
            result["sources_deleted"] = deletion_result["deleted_count"]
        else:
            result["deletion_result"] = None
            result["sources_deleted"] = 0
            result["message"] = "Zero-persistence mode disabled, sources retained"

        return result

    def calculate_retention_end_date(
        self,
        document_date: datetime,
        retention_years: int = 7
    ) -> datetime:
        """
        Calculate retention end date for compliance

        Args:
            document_date: Original document date
            retention_years: Number of years to retain metadata (default: 7)

        Returns:
            Retention end date
        """
        if not document_date:
            document_date = datetime.utcnow()

        return document_date + timedelta(days=365 * retention_years)

    def should_purge_metadata(
        self,
        deleted_source: Dict[str, Any]
    ) -> bool:
        """
        Check if metadata should be purged based on retention policy

        Args:
            deleted_source: Deleted source record

        Returns:
            True if metadata can be purged
        """
        # Never purge if legal hold
        if deleted_source.get("legal_hold", False):
            return False

        # Check retention end date
        retention_end = deleted_source.get("retention_end_date")
        if retention_end:
            if isinstance(retention_end, str):
                retention_end = datetime.fromisoformat(retention_end)

            return datetime.utcnow() > retention_end

        return False

    async def create_compliance_report(
        self,
        workspace_id: str,
        deleted_sources: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        """
        Create compliance report for deleted sources

        Args:
            workspace_id: Workspace ID
            deleted_sources: List of deleted source records

        Returns:
            Compliance report
        """
        total_deleted = len(deleted_sources)

        # Group by deletion reason
        by_reason = {}
        for ds in deleted_sources:
            reason = ds.get("deletion_reason", "unknown")
            by_reason[reason] = by_reason.get(reason, 0) + 1

        # Group by author
        by_author = {}
        for ds in deleted_sources:
            author = ds.get("author", "Unknown")
            by_author[author] = by_author.get(author, 0) + 1

        # Count legal holds
        legal_holds = sum(1 for ds in deleted_sources if ds.get("legal_hold", False))

        # Calculate total exports
        total_exports = sum(ds.get("export_count", 0) for ds in deleted_sources)

        return {
            "workspace_id": workspace_id,
            "report_date": datetime.utcnow().isoformat(),
            "total_deleted_sources": total_deleted,
            "deletion_reasons": by_reason,
            "sources_by_author": by_author,
            "legal_holds": legal_holds,
            "total_exports": total_exports,
            "oldest_deletion": min(
                (ds.get("deleted_at") for ds in deleted_sources),
                default=None
            ),
            "newest_deletion": max(
                (ds.get("deleted_at") for ds in deleted_sources),
                default=None
            ),
        }


# Singleton instance
zero_persistence_service = ZeroPersistenceService(enabled=False)


async def enable_zero_persistence():
    """Enable zero-persistence mode"""
    zero_persistence_service.enabled = True


async def disable_zero_persistence():
    """Disable zero-persistence mode"""
    zero_persistence_service.enabled = False


async def delete_source_after_export(
    source: Dict[str, Any],
    analysis_id: str,
    deleted_by: str
) -> Dict[str, Any]:
    """
    Convenience function to delete source after export

    Args:
        source: Source document
        analysis_id: Analysis ID
        deleted_by: User ID

    Returns:
        Deletion result
    """
    return await zero_persistence_service.delete_source_content(
        source=source,
        analysis_ids=[analysis_id],
        deleted_by=deleted_by,
        deletion_reason="zero_persistence"
    )
