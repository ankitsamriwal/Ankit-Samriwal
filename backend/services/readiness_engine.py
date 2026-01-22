"""
Readiness Engine - AI-powered scoring service that checks if a Source Bundle
meets Prompt Pack requirements

This service uses a lightweight LLM (GPT-4o-mini or Claude Haiku) to perform
completeness checks without analyzing the full strategy.
"""
from typing import List, Dict, Any, Optional
from datetime import datetime
import json
import os


class ReadinessEngine:
    """
    Scans a Source Bundle against Prompt Pack requirements
    and generates readiness scores
    """

    def __init__(self, llm_provider: str = "anthropic"):
        """
        Initialize the Readiness Engine

        Args:
            llm_provider: "anthropic" (Claude Haiku) or "openai" (GPT-4o-mini)
        """
        self.llm_provider = llm_provider
        self.api_key = self._get_api_key()

    def _get_api_key(self) -> str:
        """Get API key from environment"""
        if self.llm_provider == "anthropic":
            return os.getenv("ANTHROPIC_API_KEY", "")
        elif self.llm_provider == "openai":
            return os.getenv("OPENAI_API_KEY", "")
        return ""

    async def scan_sources(
        self,
        sources: List[Dict[str, Any]],
        prompt_pack: Dict[str, Any],
        analysis_type: str = "general"
    ) -> Dict[str, Any]:
        """
        Scan sources against prompt pack requirements

        Args:
            sources: List of source documents with metadata and content
            prompt_pack: Prompt pack with required_criteria
            analysis_type: Type of analysis being performed

        Returns:
            Dictionary with readiness results and checks
        """
        required_criteria = prompt_pack.get("required_criteria", [])

        if not required_criteria:
            return {
                "is_ready": True,
                "readiness_score": 100.0,
                "checks": [],
                "missing_criteria": [],
                "warnings": ["No required criteria defined in prompt pack"]
            }

        # Perform checks for each criterion
        checks = []
        for criterion in required_criteria:
            check_result = await self._check_criterion(
                sources=sources,
                criterion=criterion,
                analysis_type=analysis_type
            )
            checks.append(check_result)

        # Calculate overall readiness
        passed_checks = sum(1 for c in checks if c["status"])
        total_checks = len(checks)
        readiness_score = (passed_checks / total_checks * 100) if total_checks > 0 else 0

        # Identify missing criteria
        missing_criteria = [
            c["criterion_name"]
            for c in checks
            if not c["status"]
        ]

        # Determine if ready (e.g., 80% threshold)
        is_ready = readiness_score >= 80.0

        return {
            "is_ready": is_ready,
            "readiness_score": round(readiness_score, 2),
            "checks_passed": passed_checks,
            "checks_total": total_checks,
            "checks": checks,
            "missing_criteria": missing_criteria,
            "warnings": self._generate_warnings(checks, sources)
        }

    async def _check_criterion(
        self,
        sources: List[Dict[str, Any]],
        criterion: Dict[str, Any],
        analysis_type: str
    ) -> Dict[str, Any]:
        """
        Check a single criterion against sources

        Args:
            sources: List of source documents
            criterion: Criterion definition with name and category
            analysis_type: Type of analysis

        Returns:
            Check result dictionary
        """
        criterion_name = criterion.get("name", "Unknown")
        criterion_category = criterion.get("category", "completeness")

        # Build a summary of sources for LLM
        sources_summary = self._build_sources_summary(sources)

        # Create check prompt
        check_prompt = self._build_check_prompt(
            criterion_name=criterion_name,
            criterion_category=criterion_category,
            sources_summary=sources_summary,
            analysis_type=analysis_type
        )

        # For now, we'll use a rule-based approach
        # In production, this would call the LLM API
        result = self._rule_based_check(
            criterion_name=criterion_name,
            sources=sources
        )

        return {
            "criterion_name": criterion_name,
            "criterion_category": criterion_category,
            "status": result["status"],
            "confidence_score": result["confidence"],
            "reasoning": result["reasoning"],
            "evidence_source_ids": result["evidence_sources"],
            "evidence_snippets": result["evidence_snippets"],
            "checked_at": datetime.utcnow().isoformat()
        }

    def _build_sources_summary(self, sources: List[Dict[str, Any]]) -> str:
        """Build a concise summary of sources for LLM context"""
        summary_lines = []
        for idx, source in enumerate(sources, 1):
            source_info = (
                f"{idx}. {source.get('title', 'Untitled')} "
                f"({source.get('source_type', 'unknown')}) - "
                f"{source.get('word_count', 0)} words"
            )
            if source.get('is_authoritative'):
                source_info += " [AUTHORITATIVE]"
            summary_lines.append(source_info)

        return "\n".join(summary_lines)

    def _build_check_prompt(
        self,
        criterion_name: str,
        criterion_category: str,
        sources_summary: str,
        analysis_type: str
    ) -> str:
        """Build prompt for LLM to check criterion"""
        return f"""You are a document completeness analyzer. Your task is to determine if the provided sources meet a specific criterion.

Criterion to check: {criterion_name}
Category: {criterion_category}
Analysis Type: {analysis_type}

Available Sources:
{sources_summary}

Task: Determine if the sources contain the required information for this criterion.

Respond with a JSON object:
{{
    "status": true/false,
    "confidence": 0.0-1.0,
    "reasoning": "Brief explanation",
    "evidence_source_indices": [1, 2, ...],
    "key_evidence": ["Quote 1", "Quote 2"]
}}

Focus on completeness, not quality of analysis. Only check if the required information is present."""

    def _rule_based_check(
        self,
        criterion_name: str,
        sources: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        """
        Rule-based criterion checking (fallback for demo/testing)

        In production, this would call an LLM API
        """
        criterion_lower = criterion_name.lower()

        # Simple keyword matching for different criteria
        checks = {
            "timeline": ["timeline", "schedule", "date", "milestone", "deadline"],
            "decision": ["decision", "choice", "selected", "approved", "decided"],
            "risk": ["risk", "threat", "vulnerability", "mitigation", "contingency"],
            "budget": ["budget", "cost", "expense", "financial", "price", "funding"],
            "stakeholder": ["stakeholder", "sponsor", "customer", "user", "team"],
            "vision": ["vision", "mission", "goal", "objective", "target"],
            "market": ["market", "competitive", "industry", "sector", "landscape"],
            "metrics": ["metric", "kpi", "measure", "indicator", "target", "goal"],
            "alternative": ["alternative", "option", "approach", "solution", "choice"],
            "tradeoff": ["tradeoff", "trade-off", "compromise", "balance", "pros and cons"],
        }

        # Find matching keywords
        matched_keywords = []
        for key, keywords in checks.items():
            if any(k in criterion_lower for k in keywords):
                matched_keywords = keywords
                break

        # Search for keywords in sources
        evidence_sources = []
        evidence_snippets = []
        total_matches = 0

        for source in sources:
            content = source.get("content", "").lower()
            title = source.get("title", "").lower()

            if not matched_keywords:
                # If no specific keywords, do general check
                matched_keywords = ["relevant", "information", "data"]

            matches = sum(1 for kw in matched_keywords if kw in content or kw in title)
            if matches > 0:
                total_matches += matches
                evidence_sources.append(source.get("id"))
                # Extract snippet (simplified)
                evidence_snippets.append(f"Found {matches} relevant terms in {source.get('title', 'document')}")

        # Determine status based on matches
        status = total_matches >= 2  # At least 2 keyword matches
        confidence = min(0.95, 0.5 + (total_matches * 0.1))

        reasoning = (
            f"Found {total_matches} relevant indicators across {len(evidence_sources)} source(s). "
            f"{'Criterion appears to be met.' if status else 'Insufficient evidence for this criterion.'}"
        )

        return {
            "status": status,
            "confidence": round(confidence, 2),
            "reasoning": reasoning,
            "evidence_sources": evidence_sources[:3],  # Top 3
            "evidence_snippets": evidence_snippets[:3]
        }

    def _generate_warnings(
        self,
        checks: List[Dict[str, Any]],
        sources: List[Dict[str, Any]]
    ) -> List[str]:
        """Generate warnings based on check results"""
        warnings = []

        # Warn if no authoritative sources
        authoritative_count = sum(1 for s in sources if s.get("is_authoritative", False))
        if authoritative_count == 0:
            warnings.append("No authoritative sources found. Consider marking final documents as authoritative.")

        # Warn if many checks failed
        failed_count = sum(1 for c in checks if not c["status"])
        if failed_count > len(checks) * 0.5:
            warnings.append(f"{failed_count} criteria checks failed. Analysis may lack sufficient documentation.")

        # Warn if low confidence
        low_confidence_checks = [c for c in checks if c["confidence_score"] < 0.6]
        if low_confidence_checks:
            warnings.append(f"{len(low_confidence_checks)} checks have low confidence scores.")

        # Warn if too few sources
        if len(sources) < 3:
            warnings.append("Few sources provided. Consider adding more documentation for comprehensive analysis.")

        return warnings


# Singleton instance
readiness_engine = ReadinessEngine()


async def scan_readiness(
    sources: List[Dict[str, Any]],
    prompt_pack: Dict[str, Any],
    analysis_type: str = "general"
) -> Dict[str, Any]:
    """
    Convenience function to scan sources for readiness

    Args:
        sources: List of source documents
        prompt_pack: Prompt pack with requirements
        analysis_type: Type of analysis

    Returns:
        Readiness scan results
    """
    return await readiness_engine.scan_sources(sources, prompt_pack, analysis_type)
