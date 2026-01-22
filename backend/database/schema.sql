-- Leadership Intelligence Wrapper (LIW) Database Schema
-- Version: 1.0
-- Purpose: Track provenance and readiness of leadership thinking documents

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- CORE TABLES
-- ============================================================================

-- Workspaces: Segregation of data (e.g., "Board Level" vs. "Product Strategy")
CREATE TABLE workspaces (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    visibility_level VARCHAR(50) DEFAULT 'internal', -- 'board', 'internal', 'confidential'
    created_by VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE,

    CONSTRAINT unique_workspace_name UNIQUE (name)
);

-- Sources: Metadata for every document
CREATE TABLE sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,

    -- Document Metadata
    title VARCHAR(500) NOT NULL,
    source_type VARCHAR(100) NOT NULL, -- 'transcript', 'deck', 'spreadsheet', 'pdf', 'word'
    file_path TEXT,
    file_size_bytes BIGINT,
    file_hash VARCHAR(64), -- SHA-256 hash for deduplication

    -- Provenance & Authority
    is_authoritative BOOLEAN DEFAULT FALSE,
    version VARCHAR(50),
    status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'final', 'archived'

    -- Source Attribution
    author VARCHAR(255),
    department VARCHAR(255),
    uploaded_by VARCHAR(255),

    -- Content Analysis
    word_count INTEGER,
    page_count INTEGER,
    language VARCHAR(10) DEFAULT 'en',

    -- External Integration
    external_url TEXT,
    sharepoint_id VARCHAR(255),
    google_drive_id VARCHAR(255),

    -- Timestamps
    document_date TIMESTAMP WITH TIME ZONE,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Security & Compliance
    contains_pii BOOLEAN DEFAULT FALSE,
    retention_policy VARCHAR(100),

    CONSTRAINT unique_file_hash_per_workspace UNIQUE (workspace_id, file_hash)
);

-- Analyses: The central object linking Prompt Packs to Sources
CREATE TABLE analyses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,

    -- Analysis Metadata
    analysis_name VARCHAR(500) NOT NULL,
    analysis_type VARCHAR(100), -- 'post-mortem', 'strategy', 'decision', 'risk-assessment'
    description TEXT,

    -- Prompt Pack Reference
    prompt_pack_id UUID REFERENCES prompt_registry(id),
    prompt_version VARCHAR(10),

    -- Status & Results
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'in_progress', 'completed', 'failed'
    rigor_score FLOAT, -- Overall RigorScore (0-100)
    confidence_level FLOAT, -- AI confidence (0-1.0)

    -- Execution Details
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    execution_time_seconds INTEGER,

    -- Results Storage
    summary_text TEXT,
    key_findings JSONB,
    recommendations JSONB,
    detected_conflicts JSONB,

    -- Audit Trail
    created_by VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- NotebookLM Integration
    notebooklm_package_url TEXT,
    exported_at TIMESTAMP WITH TIME ZONE
);

-- Analysis Sources: Many-to-many relationship between Analyses and Sources
CREATE TABLE analysis_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    analysis_id UUID REFERENCES analyses(id) ON DELETE CASCADE,
    source_id UUID REFERENCES sources(id) ON DELETE CASCADE,

    -- Source weighting for this analysis
    weight FLOAT DEFAULT 1.0,
    inclusion_reason TEXT,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT unique_analysis_source UNIQUE (analysis_id, source_id)
);

-- Readiness Logs: Time-series log showing evolution of thinking
CREATE TABLE readiness_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    analysis_id UUID REFERENCES analyses(id) ON DELETE CASCADE,

    -- Snapshot Data
    snapshot_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    rigor_score FLOAT,
    source_count INTEGER,
    authoritative_source_count INTEGER,

    -- Score Components
    source_veracity_score FLOAT,
    conflict_detection_score FLOAT,
    logic_presence_score FLOAT,

    -- Changes
    delta_from_previous FLOAT,
    new_sources_added INTEGER,
    trigger_event VARCHAR(255), -- 'source_added', 'reanalysis', 'manual_trigger'

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- READINESS ENGINE TABLES
-- ============================================================================

-- Readiness Checks: Individual criterion checks for each analysis
CREATE TABLE readiness_checks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    analysis_id UUID REFERENCES analyses(id) ON DELETE CASCADE,

    -- Criterion Details
    criterion_name VARCHAR(255) NOT NULL, -- e.g., "Decision Log Present"
    criterion_category VARCHAR(100), -- 'completeness', 'quality', 'consistency'

    -- Check Results
    status BOOLEAN DEFAULT FALSE,
    confidence_score FLOAT, -- AI-generated score 0-1.0
    reasoning TEXT, -- "Why this failed/passed"

    -- Evidence
    evidence_source_ids JSONB, -- Array of source IDs that support/contradict
    evidence_snippets JSONB, -- Key quotes or data points

    -- Timestamps
    checked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Prompt Registry: Version-controlled prompt packs
CREATE TABLE prompt_registry (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Version Control
    version_tag VARCHAR(10) NOT NULL, -- e.g., "v1.4-PM"
    use_case VARCHAR(50) NOT NULL, -- "post-mortem", "strategy", "decision"

    -- Prompt Content
    system_prompt TEXT NOT NULL,
    logic_blocks JSONB, -- The specific sub-prompts

    -- Readiness Criteria
    required_criteria JSONB, -- Array of criteria that must be checked

    -- Metadata
    description TEXT,
    created_by VARCHAR(255),
    is_locked BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deprecated_at TIMESTAMP WITH TIME ZONE,

    CONSTRAINT unique_version_usecase UNIQUE (version_tag, use_case)
);

-- ============================================================================
-- AUDIT & COMPLIANCE TABLES
-- ============================================================================

-- Audit Trail: Complete history of all actions
CREATE TABLE audit_trail (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Action Details
    action_type VARCHAR(100) NOT NULL, -- 'create', 'update', 'delete', 'export', 'access'
    entity_type VARCHAR(100) NOT NULL, -- 'source', 'analysis', 'workspace'
    entity_id UUID,

    -- User Context
    user_id VARCHAR(255),
    user_role VARCHAR(100),
    ip_address INET,

    -- Change Details
    old_values JSONB,
    new_values JSONB,
    change_description TEXT,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Document Access Log: Track who accessed which documents (for Board mode)
CREATE TABLE document_access_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id UUID REFERENCES sources(id) ON DELETE CASCADE,

    -- Access Details
    accessed_by VARCHAR(255) NOT NULL,
    access_type VARCHAR(50), -- 'view', 'download', 'export', 'delete'
    access_context VARCHAR(100), -- 'analysis_creation', 'manual_view', 'export'

    -- Session Context
    session_id VARCHAR(255),
    analysis_id UUID REFERENCES analyses(id),

    -- Timestamps
    accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Workspaces
CREATE INDEX idx_workspaces_visibility ON workspaces(visibility_level);
CREATE INDEX idx_workspaces_active ON workspaces(is_active);

-- Sources
CREATE INDEX idx_sources_workspace ON sources(workspace_id);
CREATE INDEX idx_sources_type ON sources(source_type);
CREATE INDEX idx_sources_authoritative ON sources(is_authoritative);
CREATE INDEX idx_sources_status ON sources(status);
CREATE INDEX idx_sources_hash ON sources(file_hash);
CREATE INDEX idx_sources_uploaded_at ON sources(uploaded_at DESC);

-- Analyses
CREATE INDEX idx_analyses_workspace ON analyses(workspace_id);
CREATE INDEX idx_analyses_status ON analyses(status);
CREATE INDEX idx_analyses_type ON analyses(analysis_type);
CREATE INDEX idx_analyses_created_at ON analyses(created_at DESC);
CREATE INDEX idx_analyses_rigor_score ON analyses(rigor_score DESC);

-- Analysis Sources
CREATE INDEX idx_analysis_sources_analysis ON analysis_sources(analysis_id);
CREATE INDEX idx_analysis_sources_source ON analysis_sources(source_id);

-- Readiness Logs
CREATE INDEX idx_readiness_logs_analysis ON readiness_logs(analysis_id);
CREATE INDEX idx_readiness_logs_timestamp ON readiness_logs(snapshot_timestamp DESC);

-- Readiness Checks
CREATE INDEX idx_readiness_checks_analysis ON readiness_checks(analysis_id);
CREATE INDEX idx_readiness_checks_status ON readiness_checks(status);
CREATE INDEX idx_readiness_checks_category ON readiness_checks(criterion_category);

-- Prompt Registry
CREATE INDEX idx_prompt_registry_usecase ON prompt_registry(use_case);
CREATE INDEX idx_prompt_registry_active ON prompt_registry(is_active);

-- Audit Trail
CREATE INDEX idx_audit_trail_entity ON audit_trail(entity_type, entity_id);
CREATE INDEX idx_audit_trail_user ON audit_trail(user_id);
CREATE INDEX idx_audit_trail_created_at ON audit_trail(created_at DESC);

-- Document Access Log
CREATE INDEX idx_document_access_source ON document_access_log(source_id);
CREATE INDEX idx_document_access_user ON document_access_log(accessed_by);
CREATE INDEX idx_document_access_timestamp ON document_access_log(accessed_at DESC);

-- ============================================================================
-- VIEWS FOR COMMON QUERIES
-- ============================================================================

-- View: Analysis Summary with Source Count
CREATE VIEW v_analysis_summary AS
SELECT
    a.id,
    a.workspace_id,
    w.name as workspace_name,
    a.analysis_name,
    a.analysis_type,
    a.status,
    a.rigor_score,
    a.confidence_level,
    COUNT(DISTINCT asrc.source_id) as total_sources,
    COUNT(DISTINCT CASE WHEN s.is_authoritative THEN asrc.source_id END) as authoritative_sources,
    a.created_at,
    a.completed_at
FROM analyses a
LEFT JOIN workspaces w ON a.workspace_id = w.id
LEFT JOIN analysis_sources asrc ON a.id = asrc.analysis_id
LEFT JOIN sources s ON asrc.source_id = s.id
GROUP BY a.id, w.name;

-- View: Readiness Evolution
CREATE VIEW v_readiness_evolution AS
SELECT
    rl.analysis_id,
    a.analysis_name,
    rl.snapshot_timestamp,
    rl.rigor_score,
    rl.source_veracity_score,
    rl.conflict_detection_score,
    rl.logic_presence_score,
    rl.source_count,
    rl.trigger_event,
    LAG(rl.rigor_score) OVER (PARTITION BY rl.analysis_id ORDER BY rl.snapshot_timestamp) as previous_score
FROM readiness_logs rl
JOIN analyses a ON rl.analysis_id = a.id
ORDER BY rl.analysis_id, rl.snapshot_timestamp DESC;

-- ============================================================================
-- TRIGGERS FOR AUTOMATIC TIMESTAMP UPDATES
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to tables with updated_at
CREATE TRIGGER update_workspaces_updated_at BEFORE UPDATE ON workspaces
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sources_updated_at BEFORE UPDATE ON sources
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_analyses_updated_at BEFORE UPDATE ON analyses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_prompt_registry_updated_at BEFORE UPDATE ON prompt_registry
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- INITIAL DATA: Prompt Pack v1.0
-- ============================================================================

-- Insert default prompt packs
INSERT INTO prompt_registry (version_tag, use_case, system_prompt, logic_blocks, required_criteria, description, created_by, is_locked, is_active)
VALUES
(
    'v1.0-PM',
    'post-mortem',
    'You are an expert analyst reviewing a project post-mortem. Your role is to assess the completeness and rigor of the provided documentation. You must strictly cite sources for all claims. Focus on identifying what went well, what went wrong, and actionable lessons learned.',
    '{
        "project_overview": "Summarize the project objectives, scope, and timeline",
        "outcomes_analysis": "Evaluate what was achieved vs. planned outcomes",
        "issue_identification": "Identify root causes of problems or delays",
        "decision_quality": "Assess quality of decisions made during the project",
        "lessons_learned": "Extract actionable insights for future projects"
    }'::jsonb,
    '[
        {"name": "Project Timeline Present", "category": "completeness"},
        {"name": "Decision Log Exists", "category": "completeness"},
        {"name": "Risk Register Referenced", "category": "completeness"},
        {"name": "Budget Variance Documented", "category": "quality"},
        {"name": "Stakeholder Feedback Included", "category": "quality"},
        {"name": "Root Cause Analysis Present", "category": "quality"}
    ]'::jsonb,
    'Post-Mortem Analysis v1.0 - Comprehensive project review',
    'system',
    true,
    true
),
(
    'v1.0-STRAT',
    'strategy',
    'You are a strategic advisor analyzing strategic planning documents. Assess the rigor of strategic thinking, clarity of vision, and feasibility of execution plans. All assertions must be backed by citations from the provided sources.',
    '{
        "vision_clarity": "Evaluate clarity and ambition of strategic vision",
        "market_analysis": "Assess depth of market and competitive analysis",
        "resource_alignment": "Review resource allocation and capability gaps",
        "risk_assessment": "Evaluate identification and mitigation of strategic risks",
        "success_metrics": "Assess clarity and measurability of success criteria"
    }'::jsonb,
    '[
        {"name": "Vision Statement Present", "category": "completeness"},
        {"name": "Market Analysis Included", "category": "completeness"},
        {"name": "Competitive Landscape Documented", "category": "completeness"},
        {"name": "Resource Requirements Defined", "category": "quality"},
        {"name": "Success Metrics Quantified", "category": "quality"},
        {"name": "Risk Mitigation Strategy Present", "category": "quality"}
    ]'::jsonb,
    'Strategy Review v1.0 - Strategic planning document analysis',
    'system',
    true,
    true
),
(
    'v1.0-DEC',
    'decision',
    'You are a decision analysis expert. Evaluate the quality of decision-making processes documented in the provided sources. Focus on whether alternatives were considered, tradeoffs analyzed, and decisions justified with data.',
    '{
        "problem_definition": "Assess clarity of problem or opportunity being addressed",
        "alternatives_analysis": "Evaluate breadth and depth of options considered",
        "tradeoff_assessment": "Review how tradeoffs between options were analyzed",
        "decision_rationale": "Assess quality of justification for chosen path",
        "implementation_plan": "Evaluate clarity of execution approach"
    }'::jsonb,
    '[
        {"name": "Problem Statement Clear", "category": "completeness"},
        {"name": "Multiple Alternatives Considered", "category": "quality"},
        {"name": "Tradeoff Analysis Present", "category": "quality"},
        {"name": "Data-Driven Rationale", "category": "quality"},
        {"name": "Implementation Timeline Defined", "category": "completeness"},
        {"name": "Decision Maker Identified", "category": "completeness"}
    ]'::jsonb,
    'Decision Analysis v1.0 - Decision quality assessment',
    'system',
    true,
    true
);

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE workspaces IS 'Segregation of data by organizational context (Board Level, Product Strategy, etc.)';
COMMENT ON TABLE sources IS 'Metadata for every document, tracking provenance and authority';
COMMENT ON TABLE analyses IS 'Central object linking Prompt Packs to Source bundles';
COMMENT ON TABLE readiness_logs IS 'Time-series log showing evolution of RigorScore as sources are added';
COMMENT ON TABLE readiness_checks IS 'Individual criterion checks performed by the Readiness Engine';
COMMENT ON TABLE prompt_registry IS 'Version-controlled library of prompt packs with locked logic';
COMMENT ON TABLE audit_trail IS 'Complete audit log of all system actions';
COMMENT ON TABLE document_access_log IS 'Security-critical log of document access (for Board mode compliance)';
