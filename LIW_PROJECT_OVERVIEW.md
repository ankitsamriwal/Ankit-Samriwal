# Leadership Intelligence Wrapper (LIW)
## Technical Blueprint Implementation - Complete System

---

## 🎯 Executive Summary

The **Leadership Intelligence Wrapper (LIW)** is a governance system for leadership thinking that ensures executive decisions are built on complete, authoritative, and rigorous documentation.

### The Problem
- Leadership teams make decisions based on incomplete documentation
- No visibility into document quality or conflicts
- Missing audit trail for strategic choices
- Unclear which documents are authoritative

### The Solution
LIW acts as a **Pre-Processor** and **Post-Processor** for NotebookLM:

1. **Pre-Process**: Assess document completeness with the Readiness Engine
2. **Score**: Calculate RigorScore™ (0-100) based on quality metrics
3. **Package**: Export curated context bundles for NotebookLM
4. **Audit**: Track complete provenance of all decisions

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                     FRONTEND (React/TypeScript)                   │
│                  Dashboard & Visualization Layer                  │
│                                                                    │
│  • RigorScore™ Dashboard                                         │
│  • Source Management                                              │
│  • Analysis Creation                                              │
│  • Readiness Visualization                                        │
└──────────────────────────┬───────────────────────────────────────┘
                           │
                           │ REST API
                           │
┌──────────────────────────▼───────────────────────────────────────┐
│                    BACKEND (FastAPI/Python)                       │
│                                                                    │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                    CORE SERVICES                            │  │
│  │                                                              │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐  │  │
│  │  │   Ingest    │  │  Readiness   │  │   NotebookLM     │  │  │
│  │  │   Service   │  │    Engine    │  │    Packager      │  │  │
│  │  │             │  │              │  │                  │  │  │
│  │  │ • SharePoint│  │ • AI Checks  │  │ • ZIP Creation   │  │  │
│  │  │ • GDrive    │  │ • Criteria   │  │ • Prompt Gen     │  │  │
│  │  │ • Upload    │  │ • Scoring    │  │ • Metadata       │  │  │
│  │  └─────────────┘  └──────────────┘  └──────────────────┘  │  │
│  │                                                              │  │
│  │  ┌──────────────────────────────────────────────────────┐  │  │
│  │  │          RigorScore™ Algorithm (Strategic IP)         │  │  │
│  │  │                                                        │  │  │
│  │  │  Formula: (0.4 × V) + (0.3 × C) + (0.3 × L)          │  │  │
│  │  │                                                        │  │  │
│  │  │  V = Source Veracity (Authority + Type + Recency)    │  │  │
│  │  │  C = Conflict Detection (Contradictions)              │  │  │
│  │  │  L = Logic Presence (Executive Keywords)              │  │  │
│  │  └──────────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                    │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                    API ENDPOINTS                            │  │
│  │                                                              │  │
│  │  /api/workspaces    - Workspace management                 │  │
│  │  /api/sources       - Document upload & management         │  │
│  │  /api/analyses      - Analysis creation & scoring          │  │
│  │  /api/prompts       - Prompt pack registry                 │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────┬───────────────────────────────────────┘
                           │
                           │
┌──────────────────────────▼───────────────────────────────────────┐
│                     DATABASE (PostgreSQL)                         │
│                                                                    │
│  Core Tables:                                                     │
│  • workspaces          - Data segregation                        │
│  • sources             - Document metadata & provenance          │
│  • analyses            - Link prompt packs to sources            │
│  • readiness_logs      - Time-series score evolution            │
│  • readiness_checks    - Individual criterion results           │
│  • prompt_registry     - Version-locked prompt packs            │
│  • audit_trail         - Complete action history                │
│  • document_access_log - Security-critical access tracking      │
└──────────────────────────────────────────────────────────────────┘
```

---

## 📊 Database Schema Highlights

### Governance Model

The schema tracks not just files, but the **provenance and readiness** of leadership thinking:

#### Core Entities

1. **Workspaces** - Segregate data (Board Level vs Product Strategy)
2. **Sources** - Every document with full metadata
3. **Analyses** - Central object linking Prompt Packs to Sources
4. **Readiness Logs** - Evolution of thinking as docs are added

#### Strategic Tables

- **`readiness_checks`**: Individual criterion pass/fail with AI reasoning
- **`prompt_registry`**: Version-controlled, locked prompt packs
- **`audit_trail`**: Immutable record of all actions
- **`document_access_log`**: Who accessed what and when

See `/backend/database/schema.sql` for complete DDL.

---

## 🚀 Feature Implementation Status

### P0 Features (✅ COMPLETED)

#### 1. Multi-Source Ingest ✅
**Location**: `/backend/services/ingest_service.py`

Capabilities:
- ✅ Manual file upload (PDF, Word, Excel, etc.)
- ✅ File hash deduplication
- ✅ Content extraction and word counting
- ✅ Metadata tracking (author, department, etc.)
- 🚧 SharePoint integration (ready for implementation)
- 🚧 Google Drive integration (ready for implementation)

#### 2. Readiness Engine ✅
**Location**: `/backend/services/readiness_engine.py`

Capabilities:
- ✅ AI-powered completeness checking
- ✅ Criterion-by-criterion validation
- ✅ Confidence scoring (0.0-1.0)
- ✅ Evidence extraction
- ✅ Warning generation
- ✅ Support for multiple use cases (Post-Mortem, Strategy, Decision)

#### 3. NotebookLM Packager ✅
**Location**: `/backend/services/notebooklm_packager.py`

Creates ZIP packages containing:
- ✅ Cleaned source documents
- ✅ System prompt file
- ✅ Metadata JSON with provenance
- ✅ README with usage instructions
- ✅ Strict citation instructions

#### 4. RigorScore™ Algorithm ✅
**Location**: `/backend/services/rigor_score.py`

Formula:
```
RigorScore = (0.4 × V) + (0.3 × C) + (0.3 × L)
```

Components:
- ✅ **V (Veracity)**: Authority × Type × Status × Recency
- ✅ **C (Conflict)**: Detects contradictions, decreases score
- ✅ **L (Logic)**: Scans for executive keywords

### P1 Features (🚧 Ready for Development)

- 🚧 Role-Based Access Control
- 🚧 Zero-Persistence Mode (Board compliance)
- 🚧 SharePoint connector
- 🚧 Google Drive connector

---

## 🔌 API Endpoints

### Workspaces
```
GET    /api/workspaces          - List workspaces
POST   /api/workspaces          - Create workspace
GET    /api/workspaces/{id}     - Get workspace
DELETE /api/workspaces/{id}     - Delete workspace
```

### Sources
```
GET    /api/sources/workspace/{id}  - List sources
POST   /api/sources/upload          - Upload document
GET    /api/sources/{id}            - Get source
PATCH  /api/sources/{id}/authoritative - Mark authoritative
DELETE /api/sources/{id}             - Delete source
```

### Analyses
```
GET    /api/analyses/workspace/{id}       - List analyses
POST   /api/analyses                      - Create analysis
GET    /api/analyses/{id}                 - Get analysis
POST   /api/analyses/{id}/score           - Calculate RigorScore
POST   /api/analyses/{id}/readiness       - Run readiness checks
POST   /api/analyses/{id}/export          - Export to NotebookLM
GET    /api/analyses/{id}/readiness-history - Score evolution
```

### Prompt Packs
```
GET    /api/prompts              - List prompt packs
GET    /api/prompts/{id}         - Get prompt pack
```

---

## 💡 How It Works: End-to-End Flow

### 1. Create Workspace
```bash
POST /api/workspaces
{
  "name": "Q4 Strategy Review",
  "visibility_level": "board"
}
```

### 2. Upload Sources
```bash
POST /api/sources/upload
- Strategic Plan (Final).pdf [AUTHORITATIVE]
- Budget Analysis.xlsx
- Meeting Transcript.txt
```

### 3. Create Analysis
```bash
POST /api/analyses
{
  "analysis_name": "Q4 Strategy Assessment",
  "analysis_type": "strategy",
  "prompt_pack_id": "<v1.0-STRAT>",
  "source_ids": [...]
}
```

### 4. Run Readiness Check
```bash
POST /api/analyses/{id}/readiness

Returns:
{
  "is_ready": true,
  "readiness_score": 85.0,
  "checks_passed": 5,
  "checks_total": 6,
  "missing_criteria": ["Success Metrics Quantified"]
}
```

### 5. Calculate RigorScore
```bash
POST /api/analyses/{id}/score

Returns:
{
  "rigor_score": 78.5,
  "source_veracity_score": 82.0,
  "conflict_detection_score": 100.0,
  "logic_presence_score": 55.2
}
```

### 6. Export to NotebookLM
```bash
POST /api/analyses/{id}/export

Returns:
{
  "download_url": "/api/exports/liw_package_xyz.zip",
  "sources_count": 3,
  "package_name": "liw_package_xyz"
}
```

### 7. Use with NotebookLM
1. Download ZIP
2. Upload all docs from `sources/` to NotebookLM
3. Copy `system_prompt.txt` as first prompt
4. Begin analysis with full context and strict citations

---

## 🧠 The RigorScore™ Algorithm (Strategic IP)

### Formula Breakdown

```python
def calculate_rigor_score(sources, conflicts):
    # Component 1: Source Veracity (40% weight)
    V = Σ(Authority × Type × Status × Recency) / SourceCount × 100

    # Component 2: Conflict Detection (30% weight)
    C = max(0, 100 - Σ(ConflictSeverity))

    # Component 3: Logic Presence (30% weight)
    L = min(100, (KeywordCount / TotalWords) × 1000 × QualityMultiplier)

    return (0.4 × V) + (0.3 × C) + (0.3 × L)
```

### Weights & Factors

#### Source Type Weights
- PDF (Final): 1.0
- Presentation: 0.9
- Spreadsheet: 0.8
- Transcript: 0.6
- Word (Draft): 0.5

#### Recency Boost
- < 30 days: 1.2×
- 30-90 days: 1.1×
- 90-180 days: 1.05×
- > 180 days: 1.0×

#### Executive Keywords
Risk, Tradeoff, Alternative, Mitigation, Contingency, Impact, Evidence, Data-driven, Rationale, Stakeholder, etc.

---

## 🔒 Security & Compliance

### Zero-Persistence Mode
For Board-level analyses:
- Document text deleted after export
- Only metadata and hashes retained
- Full audit trail maintained
- Satisfies CIO "Shadow AI" concerns

### Audit Trail
Every action logged:
- User ID, role, IP address
- Entity type and ID
- Old/new values
- Timestamp

### Document Access Log
Security-critical tracking:
- Who accessed which documents
- Access type (view/download/export)
- Context (analysis creation, manual view)
- Session information

---

## 📦 Deployment

### Local Development

```bash
# Backend
cd backend
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your settings
python -m backend.main

# Database
createdb liw_db
psql liw_db < database/schema.sql
```

### Docker

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY backend/ ./backend/
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Production Checklist

- [ ] Set `ENVIRONMENT=production` in `.env`
- [ ] Configure `ALLOWED_ORIGINS` for CORS
- [ ] Use production database URL with SSL
- [ ] Set secure `SECRET_KEY`
- [ ] Enable `ENABLE_ZERO_PERSISTENCE_MODE` for Board workspaces
- [ ] Configure LLM API keys (Anthropic/OpenAI)
- [ ] Set up monitoring (Sentry, New Relic)
- [ ] Configure cloud storage (S3, Azure Blob)

---

## 📁 Project Structure

```
/
├── backend/                       # FastAPI backend
│   ├── main.py                   # Application entry point
│   ├── models/                   # SQLAlchemy ORM models
│   │   ├── workspace.py
│   │   ├── source.py
│   │   ├── analysis.py
│   │   ├── readiness.py
│   │   ├── prompt.py
│   │   └── audit.py
│   ├── routes/                   # API endpoints
│   │   ├── workspaces.py
│   │   ├── sources.py
│   │   ├── analyses.py
│   │   └── prompts.py
│   ├── services/                 # Business logic
│   │   ├── rigor_score.py       # RigorScore™ algorithm
│   │   ├── readiness_engine.py  # AI completeness checks
│   │   ├── ingest_service.py    # Document upload/processing
│   │   └── notebooklm_packager.py # Export generation
│   ├── database/
│   │   └── schema.sql           # Complete PostgreSQL schema
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md
│
├── components/                   # React components (frontend)
├── App.tsx                      # Main React app
├── LIW_PROJECT_OVERVIEW.md     # This file
└── README.md                    # Project README
```

---

## 🎓 Use Cases

### 1. Post-Mortem Analysis
**Prompt Pack**: `v1.0-PM`

Required Criteria:
- ✓ Project Timeline Present
- ✓ Decision Log Exists
- ✓ Risk Register Referenced
- ✓ Budget Variance Documented
- ✓ Stakeholder Feedback Included
- ✓ Root Cause Analysis Present

### 2. Strategy Review
**Prompt Pack**: `v1.0-STRAT`

Required Criteria:
- ✓ Vision Statement Present
- ✓ Market Analysis Included
- ✓ Competitive Landscape Documented
- ✓ Resource Requirements Defined
- ✓ Success Metrics Quantified
- ✓ Risk Mitigation Strategy Present

### 3. Decision Quality Assessment
**Prompt Pack**: `v1.0-DEC`

Required Criteria:
- ✓ Problem Statement Clear
- ✓ Multiple Alternatives Considered
- ✓ Tradeoff Analysis Present
- ✓ Data-Driven Rationale
- ✓ Implementation Timeline Defined
- ✓ Decision Maker Identified

---

## 🔮 Roadmap

### Phase 1: Foundation ✅ COMPLETE
- ✅ Database schema
- ✅ Core API endpoints
- ✅ RigorScore™ algorithm
- ✅ Readiness Engine
- ✅ NotebookLM packager

### Phase 2: Integration (Next Sprint)
- 🚧 SharePoint connector
- 🚧 Google Drive connector
- 🚧 Frontend dashboard
- 🚧 Real-time score updates

### Phase 3: Intelligence (Future)
- ML-powered conflict detection
- Natural language query interface
- Browser extension
- Mobile app

---

## 📊 Success Metrics

### For Users
- **Time to Analysis**: < 10 minutes from upload to NotebookLM export
- **Rigor Visibility**: 100% of analyses have quantified scores
- **Audit Confidence**: Complete provenance for all decisions

### For Organizations
- **Decision Quality**: Measurable improvement in documentation completeness
- **Risk Reduction**: Early detection of conflicts and gaps
- **Compliance**: Full audit trail for governance requirements

---

## 🤝 Contributing

This is a proprietary system. Internal contributions welcome.

---

## 📞 Support

- **API Docs**: http://localhost:8000/api/docs
- **Health Check**: http://localhost:8000/health
- **Backend README**: `/backend/README.md`

---

## 📄 License

Proprietary - All Rights Reserved

---

**Leadership Intelligence Wrapper v1.0**
*Built for leadership teams who value rigorous thinking*

---

## Technical Implementation Checklist

### Backend ✅
- [x] Database schema (PostgreSQL)
- [x] SQLAlchemy models
- [x] FastAPI application
- [x] API routes (workspaces, sources, analyses, prompts)
- [x] RigorScore™ algorithm
- [x] Readiness Engine
- [x] Multi-Source Ingest
- [x] NotebookLM Packager
- [x] Environment configuration
- [x] Requirements.txt

### Frontend (Next Phase)
- [ ] React dashboard
- [ ] RigorScore visualization
- [ ] Source management UI
- [ ] Analysis creation wizard
- [ ] Readiness timeline chart
- [ ] Export download interface

### Deployment
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Cloud deployment (AWS/Azure)
- [ ] Monitoring setup
- [ ] Backup strategy

---

**The system is ready for first dev sprint!** 🚀
