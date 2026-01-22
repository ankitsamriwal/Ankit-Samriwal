"""
Multi-Source Ingest Service - Document ingestion from multiple sources

Supports:
- SharePoint
- Google Drive
- Manual PDF/Word uploads
- Local file system

Uses Unstructured.io to parse and clean documents
"""
from typing import Dict, Any, Optional, BinaryIO
import hashlib
import mimetypes
from pathlib import Path
from datetime import datetime
import os


class DocumentIngestor:
    """
    Handles document ingestion from multiple sources
    """

    SUPPORTED_TYPES = {
        "application/pdf": "pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "word",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation": "deck",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "spreadsheet",
        "text/plain": "text",
        "application/json": "json",
    }

    def __init__(self, storage_path: str = "/tmp/liw_uploads"):
        """
        Initialize document ingestor

        Args:
            storage_path: Base path for storing uploaded documents
        """
        self.storage_path = Path(storage_path)
        self.storage_path.mkdir(parents=True, exist_ok=True)

    async def ingest_file(
        self,
        file: BinaryIO,
        filename: str,
        workspace_id: str,
        metadata: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Ingest a file upload

        Args:
            file: File binary data
            filename: Original filename
            workspace_id: Workspace ID for organization
            metadata: Optional metadata (author, department, etc.)

        Returns:
            Source document metadata
        """
        # Read file content
        content = await self._read_file(file)

        # Calculate hash for deduplication
        file_hash = self._calculate_hash(content)

        # Detect MIME type
        mime_type = mimetypes.guess_type(filename)[0] or "application/octet-stream"
        source_type = self.SUPPORTED_TYPES.get(mime_type, "unknown")

        # Save file to storage
        file_path = await self._save_file(content, filename, workspace_id, file_hash)

        # Extract text content
        extracted_text, word_count, page_count = await self._extract_content(
            file_path, source_type
        )

        # Build source metadata
        source_data = {
            "workspace_id": workspace_id,
            "title": filename,
            "source_type": source_type,
            "file_path": str(file_path),
            "file_size_bytes": len(content),
            "file_hash": file_hash,
            "word_count": word_count,
            "page_count": page_count,
            "uploaded_at": datetime.utcnow(),
            "content": extracted_text,  # For processing, not stored in DB
            **(metadata or {})
        }

        return source_data

    async def ingest_from_sharepoint(
        self,
        sharepoint_url: str,
        workspace_id: str,
        credentials: Dict[str, str]
    ) -> Dict[str, Any]:
        """
        Ingest document from SharePoint

        Args:
            sharepoint_url: SharePoint document URL
            workspace_id: Workspace ID
            credentials: SharePoint authentication credentials

        Returns:
            Source document metadata
        """
        # TODO: Implement SharePoint integration
        # This would use Office365-REST-Python-Client or similar
        raise NotImplementedError("SharePoint integration coming soon")

    async def ingest_from_google_drive(
        self,
        drive_file_id: str,
        workspace_id: str,
        credentials: Dict[str, str]
    ) -> Dict[str, Any]:
        """
        Ingest document from Google Drive

        Args:
            drive_file_id: Google Drive file ID
            workspace_id: Workspace ID
            credentials: Google Drive authentication credentials

        Returns:
            Source document metadata
        """
        # TODO: Implement Google Drive integration
        # This would use google-api-python-client
        raise NotImplementedError("Google Drive integration coming soon")

    async def _read_file(self, file: BinaryIO) -> bytes:
        """Read file content"""
        if hasattr(file, 'read'):
            content = file.read()
            if isinstance(content, str):
                content = content.encode('utf-8')
            return content
        return file

    def _calculate_hash(self, content: bytes) -> str:
        """Calculate SHA-256 hash of file content"""
        return hashlib.sha256(content).hexdigest()

    async def _save_file(
        self,
        content: bytes,
        filename: str,
        workspace_id: str,
        file_hash: str
    ) -> Path:
        """
        Save file to storage

        Args:
            content: File content
            filename: Original filename
            workspace_id: Workspace ID
            file_hash: File hash for unique naming

        Returns:
            Path to saved file
        """
        # Create workspace directory
        workspace_dir = self.storage_path / workspace_id
        workspace_dir.mkdir(parents=True, exist_ok=True)

        # Save with hash-based name to avoid collisions
        file_ext = Path(filename).suffix
        save_path = workspace_dir / f"{file_hash}{file_ext}"

        # Write file
        with open(save_path, 'wb') as f:
            f.write(content)

        return save_path

    async def _extract_content(
        self,
        file_path: Path,
        source_type: str
    ) -> tuple[str, int, int]:
        """
        Extract text content from document

        Args:
            file_path: Path to document
            source_type: Type of source document

        Returns:
            Tuple of (extracted_text, word_count, page_count)
        """
        try:
            # In production, use Unstructured.io for robust extraction
            # For now, basic text extraction
            if source_type == "pdf":
                return await self._extract_pdf(file_path)
            elif source_type == "word":
                return await self._extract_docx(file_path)
            elif source_type == "text":
                return await self._extract_text(file_path)
            else:
                # For other types, return minimal metadata
                return "", 0, 0
        except Exception as e:
            print(f"Error extracting content from {file_path}: {e}")
            return "", 0, 0

    async def _extract_pdf(self, file_path: Path) -> tuple[str, int, int]:
        """Extract text from PDF using PyPDF2 or pdfplumber"""
        try:
            # Placeholder - in production use pdfplumber or Unstructured.io
            import PyPDF2

            with open(file_path, 'rb') as f:
                reader = PyPDF2.PdfReader(f)
                page_count = len(reader.pages)

                text = ""
                for page in reader.pages:
                    text += page.extract_text() + "\n"

                word_count = len(text.split())

                return text, word_count, page_count
        except:
            # Fallback if PyPDF2 not available
            return f"PDF document: {file_path.name}", 0, 0

    async def _extract_docx(self, file_path: Path) -> tuple[str, int, int]:
        """Extract text from Word document using python-docx"""
        try:
            # Placeholder - in production use python-docx
            import docx

            doc = docx.Document(file_path)
            text = "\n".join([para.text for para in doc.paragraphs])
            word_count = len(text.split())
            page_count = max(1, word_count // 250)  # Rough estimate

            return text, word_count, page_count
        except:
            # Fallback if python-docx not available
            return f"Word document: {file_path.name}", 0, 0

    async def _extract_text(self, file_path: Path) -> tuple[str, int, int]:
        """Extract text from plain text file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                text = f.read()
                word_count = len(text.split())
                page_count = max(1, word_count // 250)

                return text, word_count, page_count
        except:
            return "", 0, 0

    def clean_transcript(self, text: str) -> str:
        """
        Clean Teams/Zoom transcripts
        Removes timestamps, speaker labels, and noise

        This is where Unstructured.io would shine in production
        """
        # Basic cleaning - remove common transcript artifacts
        import re

        # Remove timestamps like [00:15:23]
        text = re.sub(r'\[\d{2}:\d{2}:\d{2}\]', '', text)

        # Remove speaker labels like "John Doe:"
        text = re.sub(r'^[A-Z][a-z]+ [A-Z][a-z]+:', '', text, flags=re.MULTILINE)

        # Remove multiple whitespaces
        text = re.sub(r'\s+', ' ', text)

        return text.strip()


# Singleton instance
document_ingestor = DocumentIngestor()


async def ingest_document(
    file: BinaryIO,
    filename: str,
    workspace_id: str,
    metadata: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """
    Convenience function to ingest a document

    Args:
        file: File binary data
        filename: Original filename
        workspace_id: Workspace ID
        metadata: Optional metadata

    Returns:
        Source document metadata
    """
    return await document_ingestor.ingest_file(file, filename, workspace_id, metadata)
