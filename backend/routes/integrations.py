"""
Integration API routes - Manage SharePoint and Google Drive connections
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

from ..models.base import get_db
from ..models.user import User
from ..models.integration import IntegrationConnection, SyncJob
from ..middleware.rbac import get_current_active_user, require_integration_create
from ..services.sharepoint_connector import create_sharepoint_connector
from ..services.google_drive_connector import create_google_drive_connector

router = APIRouter(prefix="/api/integrations", tags=["integrations"])


# ============================================================================
# Pydantic Models
# ============================================================================

class IntegrationCreate(BaseModel):
    name: str
    provider: str  # 'sharepoint' or 'google_drive'
    credentials: dict
    settings: Optional[dict] = None
    workspace_id: Optional[str] = None


class IntegrationUpdate(BaseModel):
    name: Optional[str] = None
    credentials: Optional[dict] = None
    settings: Optional[dict] = None
    is_active: Optional[bool] = None


class SyncRequest(BaseModel):
    job_type: str = "manual"  # 'full_sync', 'incremental', 'manual'
    folder_path: Optional[str] = None  # SharePoint folder path
    folder_id: Optional[str] = None  # Google Drive folder ID
    file_types: Optional[List[str]] = None


# ============================================================================
# Integration Management Routes
# ============================================================================

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_integration(
    integration_data: IntegrationCreate,
    current_user: User = Depends(require_integration_create),
    db: Session = Depends(get_db)
):
    """
    Create a new integration connection

    Args:
        integration_data: Integration configuration
        current_user: Current authenticated user
        db: Database session

    Returns:
        Created integration
    """
    # Validate provider
    if integration_data.provider not in ['sharepoint', 'google_drive', 'onedrive']:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid provider. Must be 'sharepoint', 'google_drive', or 'onedrive'"
        )

    # Test connection before saving
    if integration_data.provider == 'sharepoint':
        connector = await create_sharepoint_connector(integration_data.credentials)
        test_result = await connector.test_connection()
    elif integration_data.provider == 'google_drive':
        connector = await create_google_drive_connector(integration_data.credentials)
        test_result = await connector.test_connection()
    else:
        test_result = {"status": "failed", "message": "Provider not implemented yet"}

    if test_result["status"] != "success":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Connection test failed: {test_result.get('message')}"
        )

    # Create integration
    integration = IntegrationConnection(
        name=integration_data.name,
        provider=integration_data.provider,
        credentials=integration_data.credentials,  # Should be encrypted in production
        settings=integration_data.settings,
        workspace_id=integration_data.workspace_id,
        created_by=current_user.id,
        last_sync_status="not_synced",
        is_active=True
    )

    db.add(integration)
    db.commit()
    db.refresh(integration)

    return integration.to_dict(include_credentials=False)


@router.get("/")
async def list_integrations(
    workspace_id: Optional[str] = None,
    provider: Optional[str] = None,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    List all integration connections

    Args:
        workspace_id: Optional workspace filter
        provider: Optional provider filter
        current_user: Current authenticated user
        db: Database session

    Returns:
        List of integrations
    """
    query = db.query(IntegrationConnection)

    # Filter by workspace if specified
    if workspace_id:
        query = query.filter(IntegrationConnection.workspace_id == workspace_id)

    # Filter by provider if specified
    if provider:
        query = query.filter(IntegrationConnection.provider == provider)

    # Non-superusers only see their own integrations
    if not current_user.is_superuser:
        query = query.filter(IntegrationConnection.created_by == current_user.id)

    integrations = query.all()

    return [i.to_dict(include_credentials=False) for i in integrations]


@router.get("/{integration_id}")
async def get_integration(
    integration_id: str,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Get integration details

    Args:
        integration_id: Integration ID
        current_user: Current authenticated user
        db: Database session

    Returns:
        Integration details
    """
    integration = db.query(IntegrationConnection).filter(
        IntegrationConnection.id == integration_id
    ).first()

    if not integration:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Integration not found"
        )

    # Check access
    if not current_user.is_superuser and integration.created_by != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No access to this integration"
        )

    return integration.to_dict(include_credentials=False)


@router.patch("/{integration_id}")
async def update_integration(
    integration_id: str,
    update_data: IntegrationUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Update integration configuration

    Args:
        integration_id: Integration ID
        update_data: Update data
        current_user: Current authenticated user
        db: Database session

    Returns:
        Updated integration
    """
    integration = db.query(IntegrationConnection).filter(
        IntegrationConnection.id == integration_id
    ).first()

    if not integration:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Integration not found"
        )

    # Check access
    if not current_user.is_superuser and integration.created_by != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No access to this integration"
        )

    # Update fields
    if update_data.name is not None:
        integration.name = update_data.name

    if update_data.credentials is not None:
        integration.credentials = update_data.credentials

    if update_data.settings is not None:
        integration.settings = update_data.settings

    if update_data.is_active is not None:
        integration.is_active = update_data.is_active

    db.commit()
    db.refresh(integration)

    return integration.to_dict(include_credentials=False)


@router.delete("/{integration_id}")
async def delete_integration(
    integration_id: str,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Delete integration connection

    Args:
        integration_id: Integration ID
        current_user: Current authenticated user
        db: Database session

    Returns:
        Success message
    """
    integration = db.query(IntegrationConnection).filter(
        IntegrationConnection.id == integration_id
    ).first()

    if not integration:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Integration not found"
        )

    # Check access
    if not current_user.is_superuser and integration.created_by != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No access to this integration"
        )

    db.delete(integration)
    db.commit()

    return {"message": "Integration deleted successfully"}


# ============================================================================
# Synchronization Routes
# ============================================================================

@router.post("/{integration_id}/sync")
async def trigger_sync(
    integration_id: str,
    sync_data: SyncRequest,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Trigger document synchronization

    Args:
        integration_id: Integration ID
        sync_data: Sync configuration
        current_user: Current authenticated user
        db: Database session

    Returns:
        Sync job details
    """
    integration = db.query(IntegrationConnection).filter(
        IntegrationConnection.id == integration_id
    ).first()

    if not integration:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Integration not found"
        )

    # Check access
    if not current_user.is_superuser and integration.created_by != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No access to this integration"
        )

    # Check if integration is active
    if not integration.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Integration is not active"
        )

    # Create sync job
    sync_job = SyncJob(
        connection_id=integration_id,
        job_type=sync_data.job_type,
        status="pending",
        started_at=datetime.utcnow()
    )

    db.add(sync_job)
    db.commit()
    db.refresh(sync_job)

    # Perform sync (in production, this should be async/background task)
    try:
        if integration.provider == 'sharepoint':
            connector = await create_sharepoint_connector(integration.credentials)
            result = await connector.sync_folder(
                folder_path=sync_data.folder_path or "",
                workspace_id=integration.workspace_id,
                file_types=sync_data.file_types
            )
        elif integration.provider == 'google_drive':
            connector = await create_google_drive_connector(integration.credentials)
            result = await connector.sync_folder(
                folder_id=sync_data.folder_id or "root",
                workspace_id=integration.workspace_id,
                file_types=sync_data.file_types
            )
        else:
            raise Exception(f"Provider {integration.provider} not implemented")

        # Update sync job
        sync_job.status = "completed"
        sync_job.completed_at = datetime.utcnow()
        sync_job.total_items = result["total_documents"]
        sync_job.processed_items = result["total_documents"]
        sync_job.new_sources = result["total_documents"]  # Simplified
        sync_job.results = result

        # Update integration
        integration.last_sync_at = datetime.utcnow()
        integration.last_sync_status = "success"

    except Exception as e:
        sync_job.status = "failed"
        sync_job.completed_at = datetime.utcnow()
        sync_job.error_message = str(e)

        integration.last_sync_at = datetime.utcnow()
        integration.last_sync_status = "failed"
        integration.last_error = str(e)

    db.commit()
    db.refresh(sync_job)

    return sync_job.to_dict()


@router.get("/{integration_id}/sync-history")
async def get_sync_history(
    integration_id: str,
    limit: int = 10,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Get synchronization history

    Args:
        integration_id: Integration ID
        limit: Number of jobs to return
        current_user: Current authenticated user
        db: Database session

    Returns:
        List of sync jobs
    """
    integration = db.query(IntegrationConnection).filter(
        IntegrationConnection.id == integration_id
    ).first()

    if not integration:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Integration not found"
        )

    # Check access
    if not current_user.is_superuser and integration.created_by != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No access to this integration"
        )

    # Get sync jobs
    jobs = db.query(SyncJob).filter(
        SyncJob.connection_id == integration_id
    ).order_by(SyncJob.created_at.desc()).limit(limit).all()

    return [job.to_dict() for job in jobs]


@router.post("/{integration_id}/test")
async def test_integration_connection(
    integration_id: str,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Test integration connection

    Args:
        integration_id: Integration ID
        current_user: Current authenticated user
        db: Database session

    Returns:
        Connection test result
    """
    integration = db.query(IntegrationConnection).filter(
        IntegrationConnection.id == integration_id
    ).first()

    if not integration:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Integration not found"
        )

    # Check access
    if not current_user.is_superuser and integration.created_by != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No access to this integration"
        )

    # Test connection
    try:
        if integration.provider == 'sharepoint':
            connector = await create_sharepoint_connector(integration.credentials)
            result = await connector.test_connection()
        elif integration.provider == 'google_drive':
            connector = await create_google_drive_connector(integration.credentials)
            result = await connector.test_connection()
        else:
            result = {"status": "failed", "message": "Provider not implemented"}

        return result

    except Exception as e:
        return {
            "status": "failed",
            "message": str(e),
            "timestamp": datetime.utcnow().isoformat()
        }
