"""
Leadership Intelligence Wrapper (LIW) - Main FastAPI Application

A Pre-Processor and Post-Processor for NotebookLM that ensures
leadership thinking is documented with rigor and provenance.
"""
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import uvicorn
import os

from .models.base import create_tables
from .routes import (
    workspaces_router,
    sources_router,
    analyses_router,
    prompts_router,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan - startup and shutdown events"""
    # Startup: Create database tables
    print("🚀 Starting Leadership Intelligence Wrapper...")
    print("📊 Creating database tables...")
    try:
        create_tables()
        print("✅ Database tables created successfully")
    except Exception as e:
        print(f"⚠️  Database initialization warning: {e}")

    yield

    # Shutdown
    print("👋 Shutting down Leadership Intelligence Wrapper...")


# Create FastAPI application
app = FastAPI(
    title="Leadership Intelligence Wrapper",
    description="""
    A governance system for leadership thinking that tracks the provenance
    and readiness of strategic documents.

    ## Key Features
    - **Multi-Source Ingest**: Upload from SharePoint, Google Drive, or direct upload
    - **Readiness Engine**: AI-powered completeness checking
    - **RigorScore™**: Quantified quality assessment
    - **NotebookLM Integration**: One-click export of context bundles

    ## Use Cases
    - Post-Mortem Analysis
    - Strategy Review
    - Decision Quality Assessment
    - Risk Evaluation
    """,
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Exception handlers
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Global exception handler"""
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "message": str(exc),
            "type": type(exc).__name__
        }
    )


# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "Leadership Intelligence Wrapper",
        "version": "1.0.0"
    }


# Root endpoint
@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Leadership Intelligence Wrapper API",
        "version": "1.0.0",
        "docs": "/api/docs",
        "health": "/health",
        "endpoints": {
            "workspaces": "/api/workspaces",
            "sources": "/api/sources",
            "analyses": "/api/analyses",
            "prompts": "/api/prompts",
        }
    }


# Register routers
app.include_router(workspaces_router)
app.include_router(sources_router)
app.include_router(analyses_router)
app.include_router(prompts_router)


# Run application
if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")

    uvicorn.run(
        "backend.main:app",
        host=host,
        port=port,
        reload=True,  # Enable auto-reload in development
        log_level="info"
    )
