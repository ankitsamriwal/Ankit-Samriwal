"""
Google Drive Connector - Integration service for Google Drive

This service handles:
- Authentication with Google Drive API
- Document discovery and listing
- Document download and synchronization
- Metadata extraction
"""
from typing import List, Dict, Any, Optional
from datetime import datetime
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload
import io


class GoogleDriveConnector:
    """
    Google Drive integration connector
    """

    def __init__(
        self,
        credentials_json: Dict[str, Any],
        scopes: Optional[List[str]] = None
    ):
        """
        Initialize Google Drive connector

        Args:
            credentials_json: Service account credentials JSON
            scopes: Optional API scopes (default: Drive read-only)
        """
        self.credentials_json = credentials_json

        if scopes is None:
            self.scopes = ['https://www.googleapis.com/auth/drive.readonly']
        else:
            self.scopes = scopes

        self.service = None

    async def authenticate(self) -> bool:
        """
        Authenticate with Google Drive API

        Returns:
            True if authentication successful
        """
        try:
            credentials = service_account.Credentials.from_service_account_info(
                self.credentials_json,
                scopes=self.scopes
            )

            self.service = build('drive', 'v3', credentials=credentials)
            return True

        except Exception as e:
            print(f"Authentication error: {str(e)}")
            return False

    async def list_documents(
        self,
        folder_id: Optional[str] = None,
        file_types: Optional[List[str]] = None,
        max_results: int = 100
    ) -> List[Dict[str, Any]]:
        """
        List documents in a Google Drive folder

        Args:
            folder_id: Google Drive folder ID (None for root)
            file_types: Optional list of MIME types to filter
            max_results: Maximum number of results to return

        Returns:
            List of document metadata dictionaries
        """
        if not self.service:
            await self.authenticate()

        try:
            # Build query
            query_parts = []

            if folder_id:
                query_parts.append(f"'{folder_id}' in parents")
            else:
                query_parts.append("'root' in parents")

            # Filter by file types if specified
            if file_types:
                mime_filters = [f"mimeType='{mt}'" for mt in file_types]
                query_parts.append(f"({' or '.join(mime_filters)})")

            # Exclude trashed files
            query_parts.append("trashed=false")

            query = " and ".join(query_parts)

            # Execute query
            results = self.service.files().list(
                q=query,
                pageSize=max_results,
                fields="files(id, name, mimeType, size, createdTime, modifiedTime, "
                       "owners, version, webViewLink, webContentLink, description, "
                       "lastModifyingUser, fileExtension, md5Checksum)"
            ).execute()

            files = results.get('files', [])

            # Transform to standard format
            documents = []
            for file in files:
                owners = file.get('owners', [])
                owner_name = owners[0].get('displayName', 'Unknown') if owners else 'Unknown'

                last_modifier = file.get('lastModifyingUser', {})
                modifier_name = last_modifier.get('displayName', owner_name)

                doc = {
                    "external_id": file.get('id'),
                    "title": file.get('name'),
                    "file_name": file.get('name'),
                    "file_size_bytes": int(file.get('size', 0)) if file.get('size') else 0,
                    "external_url": file.get('webViewLink'),
                    "download_url": file.get('webContentLink'),
                    "author": owner_name,
                    "last_modified_by": modifier_name,
                    "created_at": file.get('createdTime'),
                    "modified_at": file.get('modifiedTime'),
                    "version": file.get('version'),
                    "mime_type": file.get('mimeType'),
                    "file_extension": file.get('fileExtension'),
                    "description": file.get('description'),
                    "md5_checksum": file.get('md5Checksum'),
                    "external_metadata": file
                }
                documents.append(doc)

            return documents

        except Exception as e:
            print(f"Error listing documents: {str(e)}")
            return []

    async def download_document(
        self,
        file_id: str,
        destination_path: str,
        export_mime_type: Optional[str] = None
    ) -> Optional[str]:
        """
        Download a document from Google Drive

        Args:
            file_id: Google Drive file ID
            destination_path: Local path to save file
            export_mime_type: Optional MIME type for export (for Google Docs, Sheets, etc.)

        Returns:
            Downloaded file path or None if failed
        """
        if not self.service:
            await self.authenticate()

        try:
            # Check if we need to export (for Google native formats)
            if export_mime_type:
                request = self.service.files().export_media(
                    fileId=file_id,
                    mimeType=export_mime_type
                )
            else:
                request = self.service.files().get_media(fileId=file_id)

            fh = io.FileIO(destination_path, 'wb')
            downloader = MediaIoBaseDownload(fh, request)

            done = False
            while not done:
                status, done = downloader.next_chunk()

            fh.close()
            return destination_path

        except Exception as e:
            print(f"Error downloading document: {str(e)}")
            return None

    async def get_document_metadata(
        self,
        file_id: str
    ) -> Optional[Dict[str, Any]]:
        """
        Get detailed metadata for a specific document

        Args:
            file_id: Google Drive file ID

        Returns:
            Document metadata dictionary or None if not found
        """
        if not self.service:
            await self.authenticate()

        try:
            file = self.service.files().get(
                fileId=file_id,
                fields="id, name, mimeType, size, createdTime, modifiedTime, "
                       "owners, version, webViewLink, webContentLink, description, "
                       "lastModifyingUser, fileExtension, md5Checksum, parents, "
                       "permissions, shared"
            ).execute()

            owners = file.get('owners', [])
            owner_name = owners[0].get('displayName', 'Unknown') if owners else 'Unknown'

            return {
                "external_id": file.get('id'),
                "title": file.get('name'),
                "file_size_bytes": int(file.get('size', 0)) if file.get('size') else 0,
                "external_url": file.get('webViewLink'),
                "author": owner_name,
                "created_at": file.get('createdTime'),
                "modified_at": file.get('modifiedTime'),
                "version": file.get('version'),
                "mime_type": file.get('mimeType'),
                "is_shared": file.get('shared', False),
                "parent_folders": file.get('parents', []),
                "external_metadata": file
            }

        except Exception as e:
            print(f"Error getting document metadata: {str(e)}")
            return None

    async def search_documents(
        self,
        query: str,
        max_results: int = 50
    ) -> List[Dict[str, Any]]:
        """
        Search for documents by name or content

        Args:
            query: Search query
            max_results: Maximum number of results

        Returns:
            List of matching documents
        """
        if not self.service:
            await self.authenticate()

        try:
            # Build search query
            search_query = f"name contains '{query}' or fullText contains '{query}'"
            search_query += " and trashed=false"

            results = self.service.files().list(
                q=search_query,
                pageSize=max_results,
                fields="files(id, name, mimeType, size, createdTime, modifiedTime, "
                       "webViewLink)"
            ).execute()

            files = results.get('files', [])

            documents = []
            for file in files:
                doc = {
                    "external_id": file.get('id'),
                    "title": file.get('name'),
                    "mime_type": file.get('mimeType'),
                    "external_url": file.get('webViewLink'),
                    "modified_at": file.get('modifiedTime'),
                }
                documents.append(doc)

            return documents

        except Exception as e:
            print(f"Error searching documents: {str(e)}")
            return []

    async def sync_folder(
        self,
        folder_id: str,
        workspace_id: str,
        file_types: Optional[List[str]] = None
    ) -> Dict[str, Any]:
        """
        Synchronize an entire folder from Google Drive

        Args:
            folder_id: Google Drive folder ID
            workspace_id: LIW workspace ID
            file_types: Optional MIME type filter

        Returns:
            Sync result summary
        """
        documents = await self.list_documents(folder_id, file_types)

        return {
            "folder_id": folder_id,
            "workspace_id": workspace_id,
            "total_documents": len(documents),
            "documents": documents,
            "sync_timestamp": datetime.utcnow().isoformat(),
            "status": "completed"
        }

    async def test_connection(self) -> Dict[str, Any]:
        """
        Test Google Drive connection

        Returns:
            Connection test result
        """
        try:
            auth_success = await self.authenticate()

            if not auth_success:
                return {
                    "status": "failed",
                    "message": "Authentication failed",
                    "timestamp": datetime.utcnow().isoformat()
                }

            # Try to access Drive info
            about = self.service.about().get(fields="user, storageQuota").execute()

            user = about.get('user', {})

            return {
                "status": "success",
                "message": "Connection successful",
                "user_email": user.get('emailAddress'),
                "user_name": user.get('displayName'),
                "timestamp": datetime.utcnow().isoformat()
            }

        except Exception as e:
            return {
                "status": "failed",
                "message": f"Connection test failed: {str(e)}",
                "timestamp": datetime.utcnow().isoformat()
            }

    def get_export_mime_type(self, google_mime_type: str) -> Optional[str]:
        """
        Get appropriate export MIME type for Google native formats

        Args:
            google_mime_type: Google Drive MIME type

        Returns:
            Export MIME type or None
        """
        export_map = {
            'application/vnd.google-apps.document': 'application/pdf',
            'application/vnd.google-apps.spreadsheet': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.google-apps.presentation': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        }

        return export_map.get(google_mime_type)


async def create_google_drive_connector(
    credentials: Dict[str, Any]
) -> GoogleDriveConnector:
    """
    Create and initialize Google Drive connector

    Args:
        credentials: Service account credentials JSON

    Returns:
        Initialized GoogleDriveConnector
    """
    connector = GoogleDriveConnector(credentials_json=credentials)
    await connector.authenticate()
    return connector
