# Leadership Intelligence Wrapper (LIW) - Backend

> A governance system for leadership thinking that tracks the provenance and readiness of strategic documents.

## Overview

The Leadership Intelligence Wrapper acts as a **Pre-Processor** and **Post-Processor** for NotebookLM, ensuring that executive analysis is built on complete, authoritative, and rigorous documentation.

### The Problem It Solves

Leadership teams often make decisions based on incomplete documentation:
- ✗ Missing decision rationale
- ✗ Conflicting data across documents
- ✗ No audit trail for strategic choices
- ✗ Unclear document authority

### The Solution

LIW provides:
- ✓ **RigorScore™**: Quantified quality assessment (0-100)
- ✓ **Readiness Engine**: AI-powered completeness checking
- ✓ **Provenance Tracking**: Know exactly which docs informed each decision
- ✓ **NotebookLM Integration**: One-click export of curated context

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Frontend (React/TypeScript)                   │
│                   Dashboard & Visualization                      │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           │ REST API
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Backend (FastAPI/Python)                      │
│                                                                   │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────────────┐ │
│  │   Ingest    │  │  Readiness   │  │  NotebookLM Packager   │ │
│  │   Service   │  │    Engine    │  │                        │ │
│  └─────────────┘  └──────────────┘  └────────────────────────┘ │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              RigorScore™ Algorithm                        │  │
│  │  V = Source Veracity (40%)                               │  │
│  │  C = Conflict Detection (30%)                            │  │
│  │  L = Logic Presence (30%)                                │  │
│  │  RigorScore = (0.4×V) + (0.3×C) + (0.3×L)              │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
                   ┌───────────────┐
                   │  PostgreSQL   │
                   │   Database    │
                   └───────────────┘
```

---

## Database Schema

### Core Tables

- **`workspaces`**: Segregate data by organizational context (Board, Product, etc.)
- **`sources`**: Track every document with full metadata and provenance
- **`analyses`**: Link Prompt Packs to Source bundles
- **`readiness_logs`**: Time-series evolution of RigorScore
- **`readiness_checks`**: Individual criterion pass/fail results
- **`prompt_registry`**: Version-locked Prompt Packs
- **`audit_trail`**: Complete action history
- **`document_access_log`**: Security-critical access tracking

See `database/schema.sql` for complete schema.

---

## API Endpoints

### Workspaces

```
GET    /api/workspaces          - List all workspaces
GET    /api/workspaces/{id}     - Get workspace details
POST   /api/workspaces          - Create new workspace
DELETE /api/workspaces/{id}     - Soft delete workspace
```

### Sources

```
GET    /api/sources/workspace/{id}  - List sources in workspace
GET    /api/sources/{id}            - Get source details
POST   /api/sources/upload          - Upload new document
PATCH  /api/sources/{id}/authoritative - Mark as authoritative
DELETE /api/sources/{id}             - Delete source
```

### Analyses

```
GET    /api/analyses/workspace/{id}  - List analyses
GET    /api/analyses/{id}            - Get analysis details
POST   /api/analyses                 - Create new analysis
POST   /api/analyses/{id}/score      - Calculate RigorScore
POST   /api/analyses/{id}/readiness  - Run readiness checks
POST   /api/analyses/{id}/export     - Export to NotebookLM
GET    /api/analyses/{id}/readiness-history - Score evolution
```

### Prompt Packs

```
GET    /api/prompts              - List all prompt packs
GET    /api/prompts/{id}         - Get prompt pack details
```

---

## Installation & Setup

### Prerequisites

- Python 3.11+
- PostgreSQL 14+
- (Optional) Anthropic API key for Readiness Engine

### 1. Database Setup

```bash
# Create database
createdb liw_db

# Run schema
psql liw_db < database/schema.sql
```

### 2. Backend Setup

```bash
# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Run application
python -m backend.main
```

The API will be available at `http://localhost:8000`

API Documentation: `http://localhost:8000/api/docs`

### 3. Environment Variables

Key variables to configure in `.env`:

```env
DATABASE_URL="postgresql://user:pass@localhost:5432/liw_db"
ANTHROPIC_API_KEY="sk-ant-..."  # For Readiness Engine
STORAGE_PATH="/path/to/uploads"
EXPORT_PATH="/path/to/exports"
```

---

## Usage Example

### 1. Create a Workspace

```bash
curl -X POST http://localhost:8000/api/workspaces \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Q4 Strategy Review",
    "visibility_level": "board"
  }'
```

### 2. Upload Sources

```bash
curl -X POST http://localhost:8000/api/sources/upload \
  -F "file=@strategic_plan.pdf" \
  -F "workspace_id=<workspace_id>" \
  -F "is_authoritative=true" \
  -F "author=CEO"
```

### 3. Create Analysis

```bash
curl -X POST http://localhost:8000/api/analyses \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "<workspace_id>",
    "analysis_name": "Q4 Strategy Assessment",
    "analysis_type": "strategy",
    "prompt_pack_id": "<prompt_pack_id>",
    "source_ids": ["<source1_id>", "<source2_id>"]
  }'
```

### 4. Calculate RigorScore

```bash
curl -X POST http://localhost:8000/api/analyses/<analysis_id>/score
```

### 5. Export to NotebookLM

```bash
curl -X POST http://localhost:8000/api/analyses/<analysis_id>/export
```

This generates a ZIP file with:
- Cleaned source documents
- System prompt file
- Metadata JSON
- README instructions

---

## The RigorScore™ Algorithm

### Formula

```
RigorScore = (0.4 × V) + (0.3 × C) + (0.3 × L)

Where:
  V = Source Veracity (0-100)
  C = Conflict Detection (0-100)
  L = Logic Presence (0-100)
```

### Component Breakdown

#### 1. Source Veracity (40%)

Weights sources by:
- **Authority**: Authoritative sources get 1.5x weight
- **Type**: PDFs > Decks > Spreadsheets > Transcripts > Word
- **Status**: Final > Draft > Archived
- **Recency**: Documents <30 days get boost

#### 2. Conflict Detection (30%)

Identifies contradictions in:
- Dates and timelines
- Budget figures
- Strategic decisions
- Stakeholder positions

Score decreases with more conflicts.

#### 3. Logic Presence (30%)

Scans for executive keywords:
- Risk, Tradeoff, Alternative
- Mitigation, Contingency, Scenario
- Impact, Likelihood, Consequence
- Data-driven, Evidence, Rationale

Higher density = higher score.

---

## Readiness Engine

The Readiness Engine checks if sources meet Prompt Pack requirements.

### Example Criteria for Post-Mortem

- ✓ Project Timeline Present
- ✓ Decision Log Exists
- ✓ Risk Register Referenced
- ✓ Budget Variance Documented
- ✓ Stakeholder Feedback Included
- ✓ Root Cause Analysis Present

Each criterion gets:
- **Status**: Pass/Fail
- **Confidence**: 0.0-1.0
- **Reasoning**: Why it passed/failed
- **Evidence**: Supporting quotes

---

## NotebookLM Integration

### Export Package Contents

```
liw_package_<id>_<timestamp>.zip
├── sources/
│   ├── 01_strategic_plan.pdf
│   ├── 02_budget_analysis.xlsx
│   └── 03_meeting_transcript.pdf
├── system_prompt.txt
├── metadata.json
└── README.md
```

### Using with NotebookLM

1. Download the ZIP package
2. Go to [NotebookLM](https://notebooklm.google.com)
3. Upload all documents from `sources/`
4. Copy `system_prompt.txt` as first prompt
5. Begin analysis with full context

---

## Security Features

### Zero-Persistence Option

For Board-level analyses:
- Document text deleted after export
- Only metadata retained
- Full audit trail maintained
- Compliant with data governance

### Audit Trail

Every action is logged:
- Who accessed which documents
- When analyses were created
- What changed and why
- IP addresses and user roles

---

## Development

### Project Structure

```
backend/
├── main.py                 # FastAPI application
├── models/                 # SQLAlchemy models
│   ├── workspace.py
│   ├── source.py
│   ├── analysis.py
│   ├── readiness.py
│   ├── prompt.py
│   └── audit.py
├── routes/                 # API endpoints
│   ├── workspaces.py
│   ├── sources.py
│   ├── analyses.py
│   └── prompts.py
├── services/               # Business logic
│   ├── rigor_score.py
│   ├── readiness_engine.py
│   ├── ingest_service.py
│   └── notebooklm_packager.py
├── database/
│   └── schema.sql
└── requirements.txt
```

### Running Tests

```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run tests
pytest
```

### Code Quality

```bash
# Format code
black .

# Lint
flake8 .

# Type checking
mypy .
```

---

## Deployment

### Docker

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY backend/ ./backend/
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Environment Variables for Production

```env
ENVIRONMENT="production"
DATABASE_URL="postgresql://..."
ALLOWED_ORIGINS="https://yourdomain.com"
ENABLE_ZERO_PERSISTENCE_MODE=true
LOG_LEVEL="WARNING"
```

---

## Roadmap

### P0 Features (✅ Complete)
- ✅ Multi-Source Ingest
- ✅ Readiness Engine
- ✅ NotebookLM Packager
- ✅ RigorScore™ Algorithm

### P1 Features (Coming Soon)
- Role-Based Access Control
- SharePoint Integration
- Google Drive Integration
- Real-time Collaboration

### Future Enhancements
- ML-powered conflict detection
- Natural language query interface
- Browser extension for direct NotebookLM integration
- Mobile app

---

## License

Proprietary - All Rights Reserved

---

## Support

For questions or issues:
- Documentation: `/api/docs`
- Health Check: `/health`
- API Status: `GET /`

---

**Built with ❤️ for leadership teams who value rigorous thinking**
