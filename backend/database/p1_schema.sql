-- Leadership Intelligence Wrapper (LIW) - P1 Features Database Schema
-- Version: 1.1
-- Purpose: Authentication, RBAC, and Integration tracking

-- ============================================================================
-- AUTHENTICATION & USER MANAGEMENT
-- ============================================================================

-- Users: System users with authentication
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Basic Info
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL UNIQUE,
    full_name VARCHAR(255),

    -- Authentication
    hashed_password VARCHAR(255) NOT NULL,
    password_salt VARCHAR(255),

    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    is_superuser BOOLEAN DEFAULT FALSE,

    -- Profile
    department VARCHAR(255),
    job_title VARCHAR(255),
    phone VARCHAR(50),

    -- Security
    last_login TIMESTAMP WITH TIME ZONE,
    failed_login_attempts INTEGER DEFAULT 0,
    locked_until TIMESTAMP WITH TIME ZONE,

    -- MFA
    mfa_enabled BOOLEAN DEFAULT FALSE,
    mfa_secret VARCHAR(255),

    -- API Access
    api_key VARCHAR(255) UNIQUE,
    api_key_created_at TIMESTAMP WITH TIME ZONE,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Roles: Permission groups
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Role Info
    name VARCHAR(100) NOT NULL UNIQUE,
    display_name VARCHAR(255),
    description TEXT,

    -- Hierarchy
    level INTEGER DEFAULT 0, -- 0=lowest, 100=highest

    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    is_system_role BOOLEAN DEFAULT FALSE, -- Cannot be deleted

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Permissions: Granular access rights
CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Permission Info
    name VARCHAR(100) NOT NULL UNIQUE,
    resource VARCHAR(100) NOT NULL, -- 'workspace', 'source', 'analysis', etc.
    action VARCHAR(50) NOT NULL, -- 'create', 'read', 'update', 'delete', 'export'
    description TEXT,

    -- Status
    is_active BOOLEAN DEFAULT TRUE,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT unique_resource_action UNIQUE (resource, action)
);

-- User Roles: Many-to-many relationship
CREATE TABLE user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,

    -- Assignment Info
    assigned_by UUID REFERENCES users(id),
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,

    -- Context
    workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE, -- Role specific to workspace

    CONSTRAINT unique_user_role_workspace UNIQUE (user_id, role_id, workspace_id)
);

-- Role Permissions: Many-to-many relationship
CREATE TABLE role_permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT unique_role_permission UNIQUE (role_id, permission_id)
);

-- Sessions: Active user sessions
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,

    -- Session Info
    token_hash VARCHAR(255) NOT NULL UNIQUE,
    refresh_token_hash VARCHAR(255) UNIQUE,

    -- Context
    ip_address INET,
    user_agent TEXT,
    device_info JSONB,

    -- Lifecycle
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    revoked_at TIMESTAMP WITH TIME ZONE
);

-- ============================================================================
-- ZERO-PERSISTENCE MODE TRACKING
-- ============================================================================

-- Deleted Sources: Track deleted documents for compliance
CREATE TABLE deleted_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Original Source Reference
    original_source_id UUID NOT NULL,
    workspace_id UUID REFERENCES workspaces(id),

    -- Retained Metadata
    title VARCHAR(500),
    source_type VARCHAR(100),
    file_hash VARCHAR(64),
    is_authoritative BOOLEAN,
    version VARCHAR(50),
    author VARCHAR(255),
    document_date TIMESTAMP WITH TIME ZONE,

    -- Deletion Info
    deletion_reason VARCHAR(100), -- 'zero_persistence', 'user_request', 'retention_policy'
    deleted_by UUID REFERENCES users(id),
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Compliance
    retention_end_date TIMESTAMP WITH TIME ZONE,
    legal_hold BOOLEAN DEFAULT FALSE,

    -- Provenance
    used_in_analyses JSONB, -- Array of analysis IDs that used this source
    export_count INTEGER DEFAULT 0
);

-- ============================================================================
-- INTEGRATION TRACKING
-- ============================================================================

-- Integration Connections: External service connections
CREATE TABLE integration_connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Connection Info
    name VARCHAR(255) NOT NULL,
    provider VARCHAR(50) NOT NULL, -- 'sharepoint', 'google_drive', 'onedrive'

    -- Credentials (encrypted)
    credentials JSONB NOT NULL, -- Store encrypted tokens/keys

    -- Configuration
    settings JSONB, -- Provider-specific settings

    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    last_sync_at TIMESTAMP WITH TIME ZONE,
    last_sync_status VARCHAR(50), -- 'success', 'failed', 'partial'
    last_error TEXT,

    -- Ownership
    workspace_id UUID REFERENCES workspaces(id),
    created_by UUID REFERENCES users(id),

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sync Jobs: Track document synchronization
CREATE TABLE sync_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    connection_id UUID REFERENCES integration_connections(id) ON DELETE CASCADE,

    -- Job Info
    job_type VARCHAR(50), -- 'full_sync', 'incremental', 'manual'
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'running', 'completed', 'failed'

    -- Progress
    total_items INTEGER,
    processed_items INTEGER DEFAULT 0,
    failed_items INTEGER DEFAULT 0,
    new_sources INTEGER DEFAULT 0,
    updated_sources INTEGER DEFAULT 0,

    -- Timing
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    duration_seconds INTEGER,

    -- Results
    error_message TEXT,
    results JSONB,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- External Source Mapping: Link external docs to internal sources
CREATE TABLE external_source_mapping (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Internal Reference
    source_id UUID REFERENCES sources(id) ON DELETE CASCADE,

    -- External Reference
    connection_id UUID REFERENCES integration_connections(id),
    external_id VARCHAR(500) NOT NULL, -- SharePoint/Drive file ID
    external_url TEXT,

    -- Sync Info
    last_synced_at TIMESTAMP WITH TIME ZONE,
    external_modified_at TIMESTAMP WITH TIME ZONE,
    sync_status VARCHAR(50), -- 'synced', 'out_of_sync', 'deleted'

    -- Metadata
    external_metadata JSONB,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT unique_external_source UNIQUE (connection_id, external_id)
);

-- ============================================================================
-- WORKSPACE ACCESS CONTROL
-- ============================================================================

-- Workspace Members: User access to workspaces
CREATE TABLE workspace_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,

    -- Access Level
    access_level VARCHAR(50) NOT NULL, -- 'owner', 'admin', 'editor', 'viewer'

    -- Permissions
    can_invite BOOLEAN DEFAULT FALSE,
    can_export BOOLEAN DEFAULT FALSE,
    can_delete BOOLEAN DEFAULT FALSE,

    -- Status
    is_active BOOLEAN DEFAULT TRUE,

    -- Invitation
    invited_by UUID REFERENCES users(id),
    invited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    accepted_at TIMESTAMP WITH TIME ZONE,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT unique_workspace_user UNIQUE (workspace_id, user_id)
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_active ON users(is_active);
CREATE INDEX idx_users_api_key ON users(api_key);

-- Roles
CREATE INDEX idx_roles_name ON roles(name);
CREATE INDEX idx_roles_active ON roles(is_active);
CREATE INDEX idx_roles_level ON roles(level);

-- Permissions
CREATE INDEX idx_permissions_resource ON permissions(resource);
CREATE INDEX idx_permissions_action ON permissions(action);

-- User Roles
CREATE INDEX idx_user_roles_user ON user_roles(user_id);
CREATE INDEX idx_user_roles_role ON user_roles(role_id);
CREATE INDEX idx_user_roles_workspace ON user_roles(workspace_id);

-- Role Permissions
CREATE INDEX idx_role_permissions_role ON role_permissions(role_id);
CREATE INDEX idx_role_permissions_permission ON role_permissions(permission_id);

-- Sessions
CREATE INDEX idx_sessions_user ON sessions(user_id);
CREATE INDEX idx_sessions_token ON sessions(token_hash);
CREATE INDEX idx_sessions_expires ON sessions(expires_at);

-- Deleted Sources
CREATE INDEX idx_deleted_sources_original ON deleted_sources(original_source_id);
CREATE INDEX idx_deleted_sources_workspace ON deleted_sources(workspace_id);
CREATE INDEX idx_deleted_sources_hash ON deleted_sources(file_hash);
CREATE INDEX idx_deleted_sources_deleted_at ON deleted_sources(deleted_at DESC);

-- Integration Connections
CREATE INDEX idx_integration_connections_provider ON integration_connections(provider);
CREATE INDEX idx_integration_connections_workspace ON integration_connections(workspace_id);
CREATE INDEX idx_integration_connections_active ON integration_connections(is_active);

-- Sync Jobs
CREATE INDEX idx_sync_jobs_connection ON sync_jobs(connection_id);
CREATE INDEX idx_sync_jobs_status ON sync_jobs(status);
CREATE INDEX idx_sync_jobs_created_at ON sync_jobs(created_at DESC);

-- External Source Mapping
CREATE INDEX idx_external_mapping_source ON external_source_mapping(source_id);
CREATE INDEX idx_external_mapping_connection ON external_source_mapping(connection_id);
CREATE INDEX idx_external_mapping_external_id ON external_source_mapping(external_id);

-- Workspace Members
CREATE INDEX idx_workspace_members_workspace ON workspace_members(workspace_id);
CREATE INDEX idx_workspace_members_user ON workspace_members(user_id);
CREATE INDEX idx_workspace_members_access_level ON workspace_members(access_level);

-- ============================================================================
-- VIEWS FOR COMMON QUERIES
-- ============================================================================

-- View: User Permissions (flattened)
CREATE VIEW v_user_permissions AS
SELECT DISTINCT
    u.id as user_id,
    u.email,
    u.full_name,
    r.name as role_name,
    p.resource,
    p.action,
    ur.workspace_id
FROM users u
JOIN user_roles ur ON u.id = ur.user_id
JOIN roles r ON ur.role_id = r.id
JOIN role_permissions rp ON r.id = rp.role_id
JOIN permissions p ON rp.permission_id = p.id
WHERE u.is_active = TRUE
  AND r.is_active = TRUE
  AND p.is_active = TRUE
  AND (ur.expires_at IS NULL OR ur.expires_at > NOW());

-- View: Workspace Access Summary
CREATE VIEW v_workspace_access AS
SELECT
    w.id as workspace_id,
    w.name as workspace_name,
    w.visibility_level,
    wm.user_id,
    u.email,
    u.full_name,
    wm.access_level,
    wm.can_export,
    wm.is_active
FROM workspaces w
JOIN workspace_members wm ON w.id = wm.workspace_id
JOIN users u ON wm.user_id = u.id
WHERE w.is_active = TRUE
  AND wm.is_active = TRUE;

-- View: Integration Health
CREATE VIEW v_integration_health AS
SELECT
    ic.id as connection_id,
    ic.name,
    ic.provider,
    ic.workspace_id,
    w.name as workspace_name,
    ic.is_active,
    ic.last_sync_at,
    ic.last_sync_status,
    COUNT(sj.id) as total_jobs,
    COUNT(CASE WHEN sj.status = 'completed' THEN 1 END) as completed_jobs,
    COUNT(CASE WHEN sj.status = 'failed' THEN 1 END) as failed_jobs,
    MAX(sj.completed_at) as last_successful_sync
FROM integration_connections ic
LEFT JOIN workspaces w ON ic.workspace_id = w.id
LEFT JOIN sync_jobs sj ON ic.id = sj.connection_id
GROUP BY ic.id, w.name;

-- ============================================================================
-- TRIGGERS FOR AUTOMATIC UPDATES
-- ============================================================================

-- Update users updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Update roles updated_at
CREATE TRIGGER update_roles_updated_at BEFORE UPDATE ON roles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Update integration_connections updated_at
CREATE TRIGGER update_integration_connections_updated_at BEFORE UPDATE ON integration_connections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Update workspace_members updated_at
CREATE TRIGGER update_workspace_members_updated_at BEFORE UPDATE ON workspace_members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- INITIAL DATA: DEFAULT ROLES AND PERMISSIONS
-- ============================================================================

-- Insert default permissions
INSERT INTO permissions (name, resource, action, description) VALUES
-- Workspace permissions
('workspace.create', 'workspace', 'create', 'Create new workspaces'),
('workspace.read', 'workspace', 'read', 'View workspace details'),
('workspace.update', 'workspace', 'update', 'Modify workspace settings'),
('workspace.delete', 'workspace', 'delete', 'Delete workspaces'),

-- Source permissions
('source.create', 'source', 'create', 'Upload new sources'),
('source.read', 'source', 'read', 'View source details'),
('source.update', 'source', 'update', 'Modify source metadata'),
('source.delete', 'source', 'delete', 'Delete sources'),
('source.export', 'source', 'export', 'Export source documents'),

-- Analysis permissions
('analysis.create', 'analysis', 'create', 'Create new analyses'),
('analysis.read', 'analysis', 'read', 'View analysis results'),
('analysis.update', 'analysis', 'update', 'Modify analysis settings'),
('analysis.delete', 'analysis', 'delete', 'Delete analyses'),
('analysis.export', 'analysis', 'export', 'Export to NotebookLM'),
('analysis.score', 'analysis', 'score', 'Calculate RigorScore'),

-- User management permissions
('user.create', 'user', 'create', 'Create new users'),
('user.read', 'user', 'read', 'View user details'),
('user.update', 'user', 'update', 'Modify user settings'),
('user.delete', 'user', 'delete', 'Delete users'),

-- Integration permissions
('integration.create', 'integration', 'create', 'Create integration connections'),
('integration.read', 'integration', 'read', 'View integration settings'),
('integration.update', 'integration', 'update', 'Modify integration settings'),
('integration.delete', 'integration', 'delete', 'Delete integration connections'),
('integration.sync', 'integration', 'sync', 'Trigger synchronization');

-- Insert default roles
INSERT INTO roles (name, display_name, description, level, is_system_role) VALUES
('superadmin', 'Super Administrator', 'Full system access', 100, TRUE),
('admin', 'Administrator', 'Workspace administration', 80, TRUE),
('analyst', 'Analyst', 'Create and manage analyses', 50, TRUE),
('contributor', 'Contributor', 'Upload and manage sources', 30, TRUE),
('viewer', 'Viewer', 'Read-only access', 10, TRUE);

-- Assign permissions to roles
WITH role_ids AS (
    SELECT id, name FROM roles
),
perm_ids AS (
    SELECT id, name FROM permissions
)
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM role_ids r, perm_ids p
WHERE
    -- Superadmin gets all permissions
    (r.name = 'superadmin')

    -- Admin gets all except user management
    OR (r.name = 'admin' AND p.name NOT LIKE 'user.%')

    -- Analyst gets analysis and source read/create/update, workspace read
    OR (r.name = 'analyst' AND p.name IN (
        'workspace.read',
        'source.read', 'source.create', 'source.update',
        'analysis.create', 'analysis.read', 'analysis.update', 'analysis.score', 'analysis.export',
        'integration.read'
    ))

    -- Contributor gets source and workspace read, source create/update
    OR (r.name = 'contributor' AND p.name IN (
        'workspace.read',
        'source.create', 'source.read', 'source.update',
        'analysis.read'
    ))

    -- Viewer gets only read permissions
    OR (r.name = 'viewer' AND p.name LIKE '%.read');

-- ============================================================================
-- FUNCTIONS FOR COMMON OPERATIONS
-- ============================================================================

-- Function: Check if user has permission
CREATE OR REPLACE FUNCTION user_has_permission(
    p_user_id UUID,
    p_resource VARCHAR,
    p_action VARCHAR,
    p_workspace_id UUID DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    has_perm BOOLEAN;
BEGIN
    SELECT EXISTS(
        SELECT 1
        FROM v_user_permissions
        WHERE user_id = p_user_id
          AND resource = p_resource
          AND action = p_action
          AND (workspace_id = p_workspace_id OR workspace_id IS NULL)
    ) INTO has_perm;

    RETURN has_perm;
END;
$$ LANGUAGE plpgsql;

-- Function: Get user workspace access level
CREATE OR REPLACE FUNCTION get_workspace_access_level(
    p_user_id UUID,
    p_workspace_id UUID
)
RETURNS VARCHAR AS $$
DECLARE
    access_level VARCHAR;
BEGIN
    SELECT wm.access_level
    INTO access_level
    FROM workspace_members wm
    WHERE wm.user_id = p_user_id
      AND wm.workspace_id = p_workspace_id
      AND wm.is_active = TRUE;

    RETURN access_level;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE users IS 'System users with authentication and profile information';
COMMENT ON TABLE roles IS 'Permission groups for RBAC';
COMMENT ON TABLE permissions IS 'Granular access rights';
COMMENT ON TABLE user_roles IS 'User-to-role assignments (many-to-many)';
COMMENT ON TABLE role_permissions IS 'Role-to-permission assignments (many-to-many)';
COMMENT ON TABLE sessions IS 'Active user sessions with JWT tokens';
COMMENT ON TABLE deleted_sources IS 'Audit trail for deleted documents (zero-persistence mode)';
COMMENT ON TABLE integration_connections IS 'External service connections (SharePoint, Google Drive)';
COMMENT ON TABLE sync_jobs IS 'Document synchronization job tracking';
COMMENT ON TABLE external_source_mapping IS 'Links external documents to internal sources';
COMMENT ON TABLE workspace_members IS 'User access control for workspaces';
