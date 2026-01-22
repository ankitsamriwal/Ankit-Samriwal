"""
SharePoint Connector - Integration service for Microsoft SharePoint

This service handles:
- Authentication with SharePoint
- Document discovery and listing
- Document download and synchronization
- Metadata extraction
"""
from typing import List, Dict, Any, Optional
from datetime import datetime
import requests
from requests.auth import HTTPBasicAuth
import msal


class SharePointConnector:
    """
    Microsoft SharePoint integration connector
    """

    def __init__(
        self,
        tenant_id: str,
        client_id: str,
        client_secret: str,
        site_url: str
    ):
        """
        Initialize SharePoint connector

        Args:
            tenant_id: Microsoft tenant ID
            client_id: Application (client) ID
            client_secret: Client secret
            site_url: SharePoint site URL (e.g., https://contoso.sharepoint.com/sites/mysite)
        """
        self.tenant_id = tenant_id
        self.client_id = client_id
        self.client_secret = client_secret
        self.site_url = site_url.rstrip('/')
        self.access_token = None

    async def authenticate(self) -> bool:
        """
        Authenticate with SharePoint using OAuth 2.0

        Returns:
            True if authentication successful
        """
        try:
            authority = f"https://login.microsoftonline.com/{self.tenant_id}"
            app = msal.ConfidentialClientApplication(
                client_id=self.client_id,
                client_credential=self.client_secret,
                authority=authority
            )

            # Get token for SharePoint
            scopes = [f"{self.site_url}/.default"]
            result = app.acquire_token_for_client(scopes=scopes)

            if "access_token" in result:
                self.access_token = result["access_token"]
                return True
            else:
                error = result.get("error")
                error_description = result.get("error_description")
                print(f"Authentication failed: {error} - {error_description}")
                return False

        except Exception as e:
            print(f"Authentication error: {str(e)}")
            return False

    async def list_documents(
        self,
        folder_path: str = "",
        file_types: Optional[List[str]] = None
    ) -> List[Dict[str, Any]]:
        """
        List documents in a SharePoint folder

        Args:
            folder_path: Relative path to folder (e.g., "Shared Documents/Strategy")
            file_types: Optional list of file extensions to filter (e.g., ['.pdf', '.docx'])

        Returns:
            List of document metadata dictionaries
        """
        if not self.access_token:
            await self.authenticate()

        try:
            # Build API URL
            if folder_path:
                api_url = f"{self.site_url}/_api/web/GetFolderByServerRelativeUrl('{folder_path}')/Files"
            else:
                api_url = f"{self.site_url}/_api/web/lists/getbytitle('Documents')/items"

            headers = {
                "Authorization": f"Bearer {self.access_token}",
                "Accept": "application/json;odata=verbose"
            }

            response = requests.get(api_url, headers=headers)
            response.raise_for_status()

            data = response.json()
            files = data.get("d", {}).get("results", [])

            # Transform to standard format
            documents = []
            for file in files:
                # Filter by file type if specified
                if file_types:
                    file_ext = f".{file.get('Name', '').split('.')[-1].lower()}"
                    if file_ext not in file_types:
                        continue

                doc = {
                    "external_id": file.get("UniqueId"),
                    "title": file.get("Name"),
                    "file_name": file.get("Name"),
                    "file_size_bytes": file.get("Length", 0),
                    "external_url": f"{self.site_url}{file.get('ServerRelativeUrl', '')}",
                    "author": file.get("Author", {}).get("Title", "Unknown"),
                    "created_at": file.get("TimeCreated"),
                    "modified_at": file.get("TimeLastModified"),
                    "version": file.get("MajorVersion"),
                    "mime_type": file.get("MimeType"),
                    "external_metadata": file
                }
                documents.append(doc)

            return documents

        except Exception as e:
            print(f"Error listing documents: {str(e)}")
            return []

    async def download_document(
        self,
        file_url: str,
        destination_path: str
    ) -> Optional[str]:
        """
        Download a document from SharePoint

        Args:
            file_url: SharePoint file URL
            destination_path: Local path to save file

        Returns:
            Downloaded file path or None if failed
        """
        if not self.access_token:
            await self.authenticate()

        try:
            headers = {
                "Authorization": f"Bearer {self.access_token}"
            }

            response = requests.get(file_url, headers=headers, stream=True)
            response.raise_for_status()

            with open(destination_path, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)

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
            file_id: SharePoint file unique ID

        Returns:
            Document metadata dictionary or None if not found
        """
        if not self.access_token:
            await self.authenticate()

        try:
            api_url = f"{self.site_url}/_api/web/GetFileById('{file_id}')"

            headers = {
                "Authorization": f"Bearer {self.access_token}",
                "Accept": "application/json;odata=verbose"
            }

            response = requests.get(api_url, headers=headers)
            response.raise_for_status()

            data = response.json()
            file = data.get("d", {})

            return {
                "external_id": file.get("UniqueId"),
                "title": file.get("Name"),
                "file_size_bytes": file.get("Length", 0),
                "external_url": f"{self.site_url}{file.get('ServerRelativeUrl', '')}",
                "created_at": file.get("TimeCreated"),
                "modified_at": file.get("TimeLastModified"),
                "version": file.get("MajorVersion"),
                "checked_out": file.get("CheckOutType") != 0,
                "external_metadata": file
            }

        except Exception as e:
            print(f"Error getting document metadata: {str(e)}")
            return None

    async def sync_folder(
        self,
        folder_path: str,
        workspace_id: str,
        file_types: Optional[List[str]] = None
    ) -> Dict[str, Any]:
        """
        Synchronize an entire folder from SharePoint

        Args:
            folder_path: SharePoint folder path
            workspace_id: LIW workspace ID
            file_types: Optional file type filter

        Returns:
            Sync result summary
        """
        documents = await self.list_documents(folder_path, file_types)

        return {
            "folder_path": folder_path,
            "workspace_id": workspace_id,
            "total_documents": len(documents),
            "documents": documents,
            "sync_timestamp": datetime.utcnow().isoformat(),
            "status": "completed"
        }

    async def test_connection(self) -> Dict[str, Any]:
        """
        Test SharePoint connection

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

            # Try to access site root
            api_url = f"{self.site_url}/_api/web"
            headers = {
                "Authorization": f"Bearer {self.access_token}",
                "Accept": "application/json;odata=verbose"
            }

            response = requests.get(api_url, headers=headers)
            response.raise_for_status()

            data = response.json()
            site_info = data.get("d", {})

            return {
                "status": "success",
                "message": "Connection successful",
                "site_title": site_info.get("Title"),
                "site_url": site_info.get("Url"),
                "timestamp": datetime.utcnow().isoformat()
            }

        except Exception as e:
            return {
                "status": "failed",
                "message": f"Connection test failed: {str(e)}",
                "timestamp": datetime.utcnow().isoformat()
            }


async def create_sharepoint_connector(
    credentials: Dict[str, Any]
) -> SharePointConnector:
    """
    Create and initialize SharePoint connector

    Args:
        credentials: Dictionary with tenant_id, client_id, client_secret, site_url

    Returns:
        Initialized SharePointConnector
    """
    connector = SharePointConnector(
        tenant_id=credentials.get("tenant_id"),
        client_id=credentials.get("client_id"),
        client_secret=credentials.get("client_secret"),
        site_url=credentials.get("site_url")
    )

    await connector.authenticate()
    return connector
