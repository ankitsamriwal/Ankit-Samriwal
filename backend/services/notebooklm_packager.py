"""
NotebookLM Packager - Export service for creating Context Bundles

Creates a package containing:
1. Cleaned PDFs (or source documents)
2. System prompt text file
3. Metadata file with provenance information
4. Optional: Citation instructions
"""
from typing import List, Dict, Any
from pathlib import Path
import json
import zipfile
from datetime import datetime
import shutil


class NotebookLMPackager:
    """
    Packages analysis sources and prompts for NotebookLM
    """

    def __init__(self, export_path: str = "/tmp/liw_exports"):
        """
        Initialize NotebookLM packager

        Args:
            export_path: Base path for exports
        """
        self.export_path = Path(export_path)
        self.export_path.mkdir(parents=True, exist_ok=True)

    async def create_package(
        self,
        analysis: Dict[str, Any],
        sources: List[Dict[str, Any]],
        prompt_pack: Dict[str, Any],
        include_metadata: bool = True,
        strict_citation: bool = True
    ) -> Dict[str, Any]:
        """
        Create a NotebookLM-ready package

        Args:
            analysis: Analysis metadata
            sources: List of source documents
            prompt_pack: Prompt pack with system instructions
            include_metadata: Include provenance metadata
            strict_citation: Inject strict citation instructions

        Returns:
            Package information with download URL
        """
        # Create unique package directory
        package_id = analysis.get("id", "unknown")
        timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
        package_name = f"liw_package_{package_id}_{timestamp}"
        package_dir = self.export_path / package_name

        package_dir.mkdir(parents=True, exist_ok=True)

        # Copy source documents
        sources_dir = package_dir / "sources"
        sources_dir.mkdir()

        copied_sources = []
        for idx, source in enumerate(sources, 1):
            source_path = Path(source.get("file_path", ""))
            if source_path.exists():
                dest_name = f"{idx:02d}_{source_path.name}"
                dest_path = sources_dir / dest_name
                shutil.copy2(source_path, dest_path)
                copied_sources.append({
                    "id": source.get("id"),
                    "title": source.get("title"),
                    "filename": dest_name,
                    "is_authoritative": source.get("is_authoritative", False)
                })

        # Create system prompt file
        prompt_file = package_dir / "system_prompt.txt"
        prompt_content = self._build_prompt_content(
            prompt_pack=prompt_pack,
            analysis=analysis,
            sources=sources,
            strict_citation=strict_citation
        )
        prompt_file.write_text(prompt_content, encoding='utf-8')

        # Create metadata file
        if include_metadata:
            metadata_file = package_dir / "metadata.json"
            metadata = self._build_metadata(analysis, sources, prompt_pack)
            metadata_file.write_text(
                json.dumps(metadata, indent=2, default=str),
                encoding='utf-8'
            )

        # Create README
        readme_file = package_dir / "README.md"
        readme_content = self._build_readme(analysis, sources, prompt_pack)
        readme_file.write_text(readme_content, encoding='utf-8')

        # Create ZIP archive
        zip_path = self.export_path / f"{package_name}.zip"
        await self._create_zip(package_dir, zip_path)

        # Clean up directory
        shutil.rmtree(package_dir)

        return {
            "package_id": package_id,
            "package_name": package_name,
            "zip_path": str(zip_path),
            "download_url": f"/api/exports/{package_name}.zip",
            "created_at": datetime.utcnow().isoformat(),
            "sources_count": len(copied_sources),
            "sources": copied_sources,
            "size_bytes": zip_path.stat().st_size if zip_path.exists() else 0
        }

    def _build_prompt_content(
        self,
        prompt_pack: Dict[str, Any],
        analysis: Dict[str, Any],
        sources: List[Dict[str, Any]],
        strict_citation: bool
    ) -> str:
        """Build the complete system prompt content"""
        lines = []

        # Header
        lines.append("=" * 80)
        lines.append(f"LEADERSHIP INTELLIGENCE WRAPPER - ANALYSIS PROMPT")
        lines.append(f"Analysis: {analysis.get('analysis_name', 'Unknown')}")
        lines.append(f"Type: {analysis.get('analysis_type', 'general')}")
        lines.append(f"Generated: {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')}")
        lines.append("=" * 80)
        lines.append("")

        # Strict citation instruction (if enabled)
        if strict_citation:
            lines.append("## CRITICAL: STRICT CITATION REQUIREMENT")
            lines.append("")
            lines.append("You MUST cite sources for ALL claims, findings, and recommendations.")
            lines.append("Every assertion must reference specific documents by name.")
            lines.append("Do not make claims without explicit source attribution.")
            lines.append("Format citations as: [Source: Document Name, Page/Section X]")
            lines.append("")

        # System prompt from prompt pack
        lines.append("## SYSTEM INSTRUCTIONS")
        lines.append("")
        lines.append(prompt_pack.get("system_prompt", ""))
        lines.append("")

        # Logic blocks
        logic_blocks = prompt_pack.get("logic_blocks", {})
        if logic_blocks:
            lines.append("## ANALYSIS FRAMEWORK")
            lines.append("")
            for block_name, block_description in logic_blocks.items():
                lines.append(f"### {block_name.replace('_', ' ').title()}")
                lines.append(block_description)
                lines.append("")

        # Source context
        lines.append("## SOURCE DOCUMENTS")
        lines.append("")
        lines.append(f"You have access to {len(sources)} source document(s):")
        lines.append("")
        for idx, source in enumerate(sources, 1):
            auth_marker = " [AUTHORITATIVE]" if source.get("is_authoritative") else ""
            lines.append(
                f"{idx}. {source.get('title', 'Untitled')} "
                f"({source.get('source_type', 'unknown')}){auth_marker}"
            )
        lines.append("")

        # Quality standards
        lines.append("## QUALITY STANDARDS")
        lines.append("")
        lines.append("- Prioritize authoritative sources over drafts")
        lines.append("- Identify and flag any conflicting information")
        lines.append("- Note gaps or missing information")
        lines.append("- Provide confidence levels for key findings")
        lines.append("- Focus on evidence-based conclusions")
        lines.append("")

        # Footer
        lines.append("=" * 80)
        lines.append("END OF SYSTEM PROMPT")
        lines.append("=" * 80)

        return "\n".join(lines)

    def _build_metadata(
        self,
        analysis: Dict[str, Any],
        sources: List[Dict[str, Any]],
        prompt_pack: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Build metadata file content"""
        return {
            "package_version": "1.0",
            "created_at": datetime.utcnow().isoformat(),
            "analysis": {
                "id": analysis.get("id"),
                "name": analysis.get("analysis_name"),
                "type": analysis.get("analysis_type"),
                "rigor_score": analysis.get("rigor_score"),
                "created_by": analysis.get("created_by"),
            },
            "prompt_pack": {
                "version": prompt_pack.get("version_tag"),
                "use_case": prompt_pack.get("use_case"),
                "description": prompt_pack.get("description"),
            },
            "sources": [
                {
                    "id": s.get("id"),
                    "title": s.get("title"),
                    "type": s.get("source_type"),
                    "is_authoritative": s.get("is_authoritative", False),
                    "author": s.get("author"),
                    "document_date": s.get("document_date"),
                    "word_count": s.get("word_count"),
                }
                for s in sources
            ],
            "provenance": {
                "workspace_id": analysis.get("workspace_id"),
                "generated_by": "Leadership Intelligence Wrapper v1.0",
                "rigor_score_components": {
                    "source_veracity": analysis.get("source_veracity_score"),
                    "conflict_detection": analysis.get("conflict_detection_score"),
                    "logic_presence": analysis.get("logic_presence_score"),
                }
            }
        }

    def _build_readme(
        self,
        analysis: Dict[str, Any],
        sources: List[Dict[str, Any]],
        prompt_pack: Dict[str, Any]
    ) -> str:
        """Build README content"""
        lines = [
            "# NotebookLM Context Package",
            "",
            f"**Analysis:** {analysis.get('analysis_name', 'Unknown')}",
            f"**Type:** {analysis.get('analysis_type', 'general')}",
            f"**Generated:** {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')}",
            "",
            "## Contents",
            "",
            "- `system_prompt.txt` - Complete system instructions for NotebookLM",
            f"- `sources/` - {len(sources)} source document(s)",
            "- `metadata.json` - Provenance and analysis metadata",
            "",
            "## How to Use with NotebookLM",
            "",
            "1. Go to [NotebookLM](https://notebooklm.google.com)",
            "2. Create a new notebook",
            "3. Upload all documents from the `sources/` folder",
            "4. Copy the contents of `system_prompt.txt`",
            "5. Paste as the first prompt or use as system instructions",
            "6. Begin your analysis",
            "",
            "## Source Documents",
            "",
        ]

        for idx, source in enumerate(sources, 1):
            auth = " (Authoritative)" if source.get("is_authoritative") else ""
            lines.append(f"{idx}. **{source.get('title', 'Untitled')}**{auth}")
            lines.append(f"   - Type: {source.get('source_type', 'unknown')}")
            if source.get('author'):
                lines.append(f"   - Author: {source.get('author')}")
            if source.get('document_date'):
                lines.append(f"   - Date: {source.get('document_date')}")
            lines.append("")

        lines.extend([
            "## Rigor Score",
            "",
            f"This analysis has a RigorScore of **{analysis.get('rigor_score', 'N/A')}**/100",
            "",
            "---",
            "",
            "*Generated by Leadership Intelligence Wrapper v1.0*"
        ])

        return "\n".join(lines)

    async def _create_zip(self, source_dir: Path, zip_path: Path):
        """Create ZIP archive of package"""
        with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for file_path in source_dir.rglob('*'):
                if file_path.is_file():
                    arcname = file_path.relative_to(source_dir.parent)
                    zipf.write(file_path, arcname)


# Singleton instance
notebooklm_packager = NotebookLMPackager()


async def create_notebooklm_package(
    analysis: Dict[str, Any],
    sources: List[Dict[str, Any]],
    prompt_pack: Dict[str, Any],
    include_metadata: bool = True,
    strict_citation: bool = True
) -> Dict[str, Any]:
    """
    Convenience function to create NotebookLM package

    Args:
        analysis: Analysis metadata
        sources: List of source documents
        prompt_pack: Prompt pack
        include_metadata: Include metadata file
        strict_citation: Add strict citation instructions

    Returns:
        Package information
    """
    return await notebooklm_packager.create_package(
        analysis, sources, prompt_pack, include_metadata, strict_citation
    )
