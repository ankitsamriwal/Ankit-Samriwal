# LIW P1 Features - Complete Implementation Guide

## Overview

This document describes the complete implementation of P1 (Priority 1) features for the Leadership Intelligence Wrapper system. These features add enterprise-grade security, authentication, and integration capabilities.

---

## ✅ P1 Features Implemented

### 1. **Role-Based Access Control (RBAC)** ✅

Complete permission system with:
- User authentication with JWT tokens
- Role-based permissions
- Workspace-level access control
- Granular resource permissions

#### Components

**Database Tables**:
- `users`: System users with authentication
- `roles`: Permission groups (Superadmin, Admin, Analyst, Contributor, Viewer)
- `permissions`: Granular access rights (resource.action format)
- `user_roles`: Many-to-many user-role assignments
- `role_permissions`: Many-to-many role-permission assignments
- `sessions`: Active user sessions with JWT tokens
- `workspace_members`: User access to specific workspaces

**Models**: `/backend/models/user.py`
- User, Role, Permission, UserRole, RolePermission, Session, WorkspaceMember

**Services**: `/backend/services/auth_service.py`
- Password hashing (bcrypt with salt)
- JWT token creation and validation
- API key generation
- Account security (lockout after failed attempts)

**Middleware**: `/backend/middleware/rbac.py`
- `get_current_user()`: Extract user from JWT
- `get_current_active_user()`: Verify user is active and verified
- `get_current_superuser()`: Superuser-only access
- `require_permission(resource, action)`: Decorator for permission checks
- `check_workspace_access()`: Workspace-level authorization

**API Routes**: `/backend/routes/auth.py`
```
POST   /api/auth/register        - Register new user
POST   /api/auth/login           - Login (returns JWT tokens)
POST   /api/auth/refresh         - Refresh access token
POST   /api/auth/logout          - Revoke session
GET    /api/auth/me              - Get current user info
POST   /api/auth/change-password - Change password
POST   /api/auth/generate-api-key- Generate API key
DELETE /api/auth/revoke-api-key  - Revoke API key
```

#### Default Roles

| Role | Level | Permissions |
|------|-------|-------------|
| **Superadmin** | 100 | All permissions |
| **Admin** | 80 | All except user management |
| **Analyst** | 50 | Create analyses, upload sources, read workspaces |
| **Contributor** | 30 | Upload sources, read workspaces and analyses |
| **Viewer** | 10 | Read-only access |

#### Permission Format

Permissions follow the pattern: `resource.action`

**Resources**: workspace, source, analysis, user, integration

**Actions**: create, read, update, delete, export, score, sync

**Examples**:
- `workspace.create` - Create new workspaces
- `analysis.export` - Export to NotebookLM
- `integration.sync` - Trigger document synchronization

#### Usage Example

```python
from backend.middleware.rbac import require_permission, get_current_active_user

# Require specific permission
@router.post("/analyses")
async def create_analysis(
    current_user: User = Depends(require_permission("analysis", "create"))
):
    # User is authorized
    pass

# Check workspace access
@router.get("/workspaces/{workspace_id}")
async def get_workspace(
    workspace_id: str,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    # Check access
    await check_workspace_access(workspace_id, "viewer", current_user, db)
    # User has access
    pass
```

---

### 2. **Zero-Persistence Mode** ✅

Board compliance feature that deletes document content while retaining metadata for audit purposes.

#### Components

**Database Table**: `deleted_sources`
- Tracks deleted documents
- Retains essential metadata (title, type, hash, author, date)
- Records deletion reason and who deleted
- Links to analyses that used the source
- Legal hold support

**Service**: `/backend/services/zero_persistence.py`

**Features**:
- Delete source content after export
- Retain full metadata for compliance
- Batch deletion operations
- Retention policy management
- Compliance reporting

#### Key Functions

```python
# Delete source after export
await delete_source_after_export(
    source=source_dict,
    analysis_id=analysis_id,
    deleted_by=user_id
)

# Export and delete (zero-persistence workflow)
result = await zero_persistence_service.export_and_delete(
    analysis=analysis,
    sources=sources,
    export_path="/path/to/export.zip",
    deleted_by=user_id
)

# Generate compliance report
report = await zero_persistence_service.create_compliance_report(
    workspace_id=workspace_id,
    deleted_sources=deleted_sources
)
```

#### Configuration

Enable zero-persistence mode:

```python
# In code
from backend.services.zero_persistence import enable_zero_persistence
await enable_zero_persistence()

# Or set in environment
ENABLE_ZERO_PERSISTENCE_MODE=true
```

#### Compliance Features

- **Retention Period**: Default 7 years for metadata
- **Legal Hold**: Prevent purging of specific documents
- **Audit Trail**: Complete log of deletions
- **Provenance**: Track which analyses used each source

---

### 3. **SharePoint Integration** ✅

Connect to Microsoft SharePoint Online to sync documents directly into LIW.

#### Components

**Service**: `/backend/services/sharepoint_connector.py`

**Features**:
- OAuth 2.0 authentication with Microsoft
- List documents in SharePoint folders
- Download documents
- Extract metadata
- Folder synchronization
- Connection testing

#### Configuration

```python
credentials = {
    "tenant_id": "your-tenant-id",
    "client_id": "your-app-client-id",
    "client_secret": "your-client-secret",
    "site_url": "https://contoso.sharepoint.com/sites/mysite"
}

connector = await create_sharepoint_connector(credentials)
```

#### Usage Example

```python
# Test connection
result = await connector.test_connection()

# List documents
documents = await connector.list_documents(
    folder_path="Shared Documents/Strategy",
    file_types=['.pdf', '.docx']
)

# Download document
await connector.download_document(
    file_url="https://...",
    destination_path="/local/path/doc.pdf"
)

# Sync entire folder
result = await connector.sync_folder(
    folder_path="Shared Documents/Q4",
    workspace_id="workspace-uuid",
    file_types=['.pdf', '.pptx']
)
```

#### Setup Requirements

1. **Register Azure AD Application**:
   - Go to Azure Portal → Azure Active Directory → App registrations
   - Create new registration
   - Add API permissions: `Sites.Read.All`
   - Generate client secret

2. **Configure SharePoint Site**:
   - Grant app permissions to site
   - Note site URL

3. **Store Credentials**:
   - Use `credentials` field in `integration_connections` table
   - Credentials are JSON: `{tenant_id, client_id, client_secret, site_url}`

---

### 4. **Google Drive Integration** ✅

Connect to Google Drive to sync documents directly into LIW.

#### Components

**Service**: `/backend/services/google_drive_connector.py`

**Features**:
- Service account authentication
- List documents in Drive folders
- Download documents (including Google Docs export)
- Extract metadata
- Full-text search
- Folder synchronization

#### Configuration

```python
credentials = {
    # Service account JSON from Google Cloud Console
    "type": "service_account",
    "project_id": "your-project",
    "private_key_id": "...",
    "private_key": "...",
    "client_email": "...",
    "client_id": "...",
    # ... rest of service account JSON
}

connector = await create_google_drive_connector(credentials)
```

#### Usage Example

```python
# Test connection
result = await connector.test_connection()

# List documents
documents = await connector.list_documents(
    folder_id="1234567890abcdef",
    file_types=[
        'application/pdf',
        'application/vnd.google-apps.document'
    ]
)

# Download document
await connector.download_document(
    file_id="doc-id",
    destination_path="/local/path/doc.pdf"
)

# Export Google Doc as PDF
await connector.download_document(
    file_id="doc-id",
    destination_path="/local/path/doc.pdf",
    export_mime_type="application/pdf"
)

# Search documents
results = await connector.search_documents(
    query="strategy 2024",
    max_results=50
)

# Sync folder
result = await connector.sync_folder(
    folder_id="folder-id",
    workspace_id="workspace-uuid"
)
```

#### Setup Requirements

1. **Create Google Cloud Project**:
   - Go to Google Cloud Console
   - Create new project
   - Enable Google Drive API

2. **Create Service Account**:
   - IAM & Admin → Service Accounts
   - Create service account
   - Download JSON key file

3. **Grant Drive Access**:
   - Share Drive folders with service account email
   - Grant at least "Viewer" access

4. **Store Credentials**:
   - Use `credentials` field in `integration_connections` table
   - Credentials are the full service account JSON

---

## Integration Management API

### Routes

**File**: `/backend/routes/integrations.py`

```
POST   /api/integrations                       - Create integration
GET    /api/integrations                       - List integrations
GET    /api/integrations/{id}                  - Get integration
PATCH  /api/integrations/{id}                  - Update integration
DELETE /api/integrations/{id}                  - Delete integration

POST   /api/integrations/{id}/sync             - Trigger sync
GET    /api/integrations/{id}/sync-history     - Get sync history
POST   /api/integrations/{id}/test             - Test connection
```

### Creating an Integration

```bash
curl -X POST http://localhost:8000/api/integrations \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Company SharePoint",
    "provider": "sharepoint",
    "credentials": {
      "tenant_id": "...",
      "client_id": "...",
      "client_secret": "...",
      "site_url": "https://contoso.sharepoint.com/sites/leadership"
    },
    "workspace_id": "workspace-uuid"
  }'
```

### Triggering Synchronization

```bash
curl -X POST http://localhost:8000/api/integrations/{id}/sync \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "job_type": "manual",
    "folder_path": "Shared Documents/Strategy",
    "file_types": [".pdf", ".docx", ".pptx"]
  }'
```

---

## Database Schema Updates

### New Tables (P1)

Run the P1 schema:

```bash
psql liw_db < backend/database/p1_schema.sql
```

This adds:
- Authentication & user management tables (8 tables)
- Integration tracking tables (3 tables)
- Zero-persistence compliance table
- Workspace access control table

Total: **13 new tables**

---

## Security Features

### Password Security

- **Hashing**: bcrypt with individual salt per user
- **Lockout**: Progressive lockout after failed attempts
  - 5 attempts: 5 minutes
  - 7 attempts: 15 minutes
  - 10 attempts: 30 minutes
  - 15 attempts: 1 hour
  - 20+ attempts: 24 hours

### Token Security

- **JWT**: HS256 algorithm with secret key
- **Access Token**: 30-minute expiration
- **Refresh Token**: 7-day expiration
- **Token Storage**: SHA-256 hashed in database
- **Revocation**: All sessions can be revoked on logout or password change

### API Key Security

- **Format**: `liw_{32_random_bytes}`
- **Generation**: Cryptographically secure random
- **Storage**: Hashed in database
- **Revocation**: Can be revoked and regenerated

---

## Configuration

### Environment Variables

Add to `.env`:

```env
# Authentication
SECRET_KEY="your-secret-key-here"  # Use secrets.token_urlsafe(32)
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# Zero-Persistence Mode
ENABLE_ZERO_PERSISTENCE_MODE=false
RETENTION_YEARS=7

# SharePoint (if using)
SHAREPOINT_TENANT_ID=""
SHAREPOINT_CLIENT_ID=""
SHAREPOINT_CLIENT_SECRET=""

# Google Drive (if using)
GOOGLE_DRIVE_CREDENTIALS_PATH="/path/to/service-account.json"
```

---

## Usage Workflows

### 1. User Registration & Login

```python
# Register
POST /api/auth/register
{
  "email": "analyst@company.com",
  "username": "analyst1",
  "password": "SecurePassword123!",
  "full_name": "Jane Analyst",
  "department": "Strategy"
}

# Login
POST /api/auth/login
{
  "email": "analyst@company.com",
  "password": "SecurePassword123!"
}

# Response
{
  "access_token": "eyJ...",
  "refresh_token": "eyJ...",
  "token_type": "bearer",
  "expires_in": 1800
}

# Use token in subsequent requests
Authorization: Bearer eyJ...
```

### 2. Setting Up SharePoint Integration

```python
# 1. Create integration
POST /api/integrations
{
  "name": "Leadership SharePoint",
  "provider": "sharepoint",
  "credentials": {...},
  "workspace_id": "workspace-uuid"
}

# 2. Test connection
POST /api/integrations/{id}/test

# 3. Trigger sync
POST /api/integrations/{id}/sync
{
  "job_type": "manual",
  "folder_path": "Shared Documents/Board"
}

# 4. Check sync status
GET /api/integrations/{id}/sync-history
```

### 3. Zero-Persistence Workflow

```python
# 1. Create analysis with Board visibility
POST /api/analyses
{
  "workspace_id": "board-workspace-uuid",
  "analysis_name": "Q4 Board Review",
  "source_ids": [...]
}

# 2. Export to NotebookLM
POST /api/analyses/{id}/export

# 3. If zero-persistence enabled, sources are automatically deleted
# Check deleted sources
GET /api/deleted-sources?workspace_id=board-workspace-uuid

# 4. Generate compliance report
GET /api/deleted-sources/compliance-report?workspace_id=board-workspace-uuid
```

---

## Testing

### Test Authentication

```bash
# Register user
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "username": "testuser", "password": "Test123!"}'

# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "Test123!"}'

# Use token
TOKEN="<access_token_from_login>"
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8000/api/auth/me
```

### Test Integration

```bash
# Test SharePoint connection
curl -X POST http://localhost:8000/api/integrations/{id}/test \
  -H "Authorization: Bearer $TOKEN"

# Expected response
{
  "status": "success",
  "message": "Connection successful",
  "site_title": "Leadership Portal",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## Performance Considerations

### Authentication

- JWT tokens are stateless (no database lookup after validation)
- Session table tracks active sessions for revocation
- Index on `users.email` and `users.username` for fast lookups

### Integrations

- Sync jobs run asynchronously (in production, use Celery or similar)
- Batch document processing
- Incremental sync support (only changed files)

### Zero-Persistence

- File deletion is async
- Metadata retained indefinitely (or per retention policy)
- Indexed on `file_hash` for quick lookups

---

## Deployment Checklist

### P1 Feature Deployment

- [ ] Run P1 database migration: `psql liw_db < backend/database/p1_schema.sql`
- [ ] Set `SECRET_KEY` in production environment
- [ ] Configure CORS for authentication endpoints
- [ ] Set up SSL/TLS for API (HTTPS only)
- [ ] Enable zero-persistence mode if required
- [ ] Configure SharePoint Azure AD app (if using)
- [ ] Configure Google Cloud service account (if using)
- [ ] Test all authentication flows
- [ ] Test integration connections
- [ ] Set up monitoring for failed login attempts
- [ ] Configure rate limiting on auth endpoints
- [ ] Set up backup for `deleted_sources` table

---

## Troubleshooting

### Authentication Issues

**Problem**: "Invalid or expired token"
- **Solution**: Token may have expired. Use refresh token to get new access token.

**Problem**: "Account locked"
- **Solution**: Wait for lockout period or contact admin to reset `locked_until`.

### Integration Issues

**Problem**: SharePoint authentication fails
- **Solution**: Verify Azure AD app permissions and client secret hasn't expired.

**Problem**: Google Drive returns 403
- **Solution**: Ensure service account has access to shared folders.

### Zero-Persistence Issues

**Problem**: Files not deleting
- **Solution**: Check file permissions and that `ENABLE_ZERO_PERSISTENCE_MODE=true`.

---

## Next Steps (Phase 2)

Planned enhancements:
- Multi-factor authentication (MFA)
- Single Sign-On (SSO) with SAML/OAuth
- OneDrive integration
- Box.com integration
- Real-time sync webhooks
- Advanced audit analytics

---

**P1 Features are production-ready!** 🎉

All authentication, RBAC, zero-persistence, and integration features are fully implemented and tested.
