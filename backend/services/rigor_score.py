"""
RigorScore™ Algorithm - Strategic IP for Leadership Intelligence Assessment

The RigorScore is calculated using three weighted components:
1. Source Veracity (40%): Quality and authority of sources
2. Conflict Detection (30%): Identifying contradictory information
3. Logic Presence (30%): Presence of executive reasoning keywords

Final Score: RigorScore = (0.4 × V) + (0.3 × C) + (0.3 × L)
"""
from typing import List, Dict, Any, Tuple
from datetime import datetime
import re


class RigorScoreCalculator:
    """
    Calculates the RigorScore™ for a set of sources in an analysis
    """

    # Executive keywords that indicate high-quality strategic thinking
    EXECUTIVE_KEYWORDS = [
        "risk", "tradeoff", "alternative", "mitigation", "stakeholder",
        "constraint", "assumption", "dependency", "contingency", "scenario",
        "impact", "likelihood", "consequence", "opportunity cost", "decision",
        "rationale", "justification", "evidence", "data-driven", "metric",
        "kpi", "benchmark", "baseline", "variance", "forecast"
    ]

    # Source type weights (higher is more authoritative)
    SOURCE_TYPE_WEIGHTS = {
        "pdf": 1.0,          # Final documents
        "deck": 0.9,         # Presentations
        "spreadsheet": 0.8,  # Data/Analysis
        "transcript": 0.6,   # Meeting notes
        "word": 0.5,         # Draft documents
    }

    # Status weights (higher is more authoritative)
    STATUS_WEIGHTS = {
        "final": 1.0,
        "draft": 0.5,
        "archived": 0.3,
    }

    def __init__(self):
        self.executive_keywords_pattern = re.compile(
            r'\b(' + '|'.join(self.EXECUTIVE_KEYWORDS) + r')\b',
            re.IGNORECASE
        )

    def calculate(
        self,
        sources: List[Dict[str, Any]],
        detected_conflicts: List[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Calculate the RigorScore for a set of sources

        Args:
            sources: List of source dictionaries with metadata
            detected_conflicts: List of detected conflicts between sources

        Returns:
            Dictionary with scores and breakdown
        """
        if not sources:
            return {
                "rigor_score": 0.0,
                "source_veracity_score": 0.0,
                "conflict_detection_score": 0.0,
                "logic_presence_score": 0.0,
                "breakdown": {
                    "total_sources": 0,
                    "authoritative_sources": 0,
                    "conflicts_detected": 0,
                    "logic_density": 0.0
                }
            }

        # Calculate component scores
        veracity_score = self._calculate_source_veracity(sources)
        conflict_score = self._calculate_conflict_detection(sources, detected_conflicts or [])
        logic_score = self._calculate_logic_presence(sources)

        # Calculate weighted RigorScore (0-100 scale)
        rigor_score = (0.4 * veracity_score) + (0.3 * conflict_score) + (0.3 * logic_score)

        # Prepare breakdown
        authoritative_count = sum(1 for s in sources if s.get("is_authoritative", False))
        total_words = sum(s.get("word_count", 0) for s in sources)
        logic_keyword_count = sum(
            len(self.executive_keywords_pattern.findall(s.get("content", "")))
            for s in sources if s.get("content")
        )

        return {
            "rigor_score": round(rigor_score, 2),
            "source_veracity_score": round(veracity_score, 2),
            "conflict_detection_score": round(conflict_score, 2),
            "logic_presence_score": round(logic_score, 2),
            "breakdown": {
                "total_sources": len(sources),
                "authoritative_sources": authoritative_count,
                "conflicts_detected": len(detected_conflicts or []),
                "logic_density": round((logic_keyword_count / total_words * 1000) if total_words > 0 else 0, 2),
                "total_words": total_words,
                "executive_keywords_found": logic_keyword_count
            }
        }

    def _calculate_source_veracity(self, sources: List[Dict[str, Any]]) -> float:
        """
        Component 1: Source Veracity (0-100)
        Weights final PDFs higher than draft Word docs

        Formula:
        V = Σ(AuthorityWeight × TypeWeight × StatusWeight × RecencyFactor) / SourceCount × 100
        """
        if not sources:
            return 0.0

        total_weight = 0.0

        for source in sources:
            # Base weight from authority
            authority_weight = 1.5 if source.get("is_authoritative", False) else 1.0

            # Type weight
            source_type = source.get("source_type", "").lower()
            type_weight = self.SOURCE_TYPE_WEIGHTS.get(source_type, 0.5)

            # Status weight
            status = source.get("status", "draft").lower()
            status_weight = self.STATUS_WEIGHTS.get(status, 0.5)

            # Recency factor (newer documents get slight boost)
            recency_factor = self._calculate_recency_factor(source.get("document_date"))

            # Combined weight
            source_weight = authority_weight * type_weight * status_weight * recency_factor
            total_weight += source_weight

        # Normalize to 0-100 scale
        # Max theoretical weight per source is 1.5 * 1.0 * 1.0 * 1.2 = 1.8
        max_possible_weight = len(sources) * 1.8
        veracity_score = (total_weight / max_possible_weight) * 100

        return min(veracity_score, 100.0)

    def _calculate_conflict_detection(
        self,
        sources: List[Dict[str, Any]],
        detected_conflicts: List[Dict[str, Any]]
    ) -> float:
        """
        Component 2: Conflict Detection (0-100)
        Fewer conflicts = higher score

        Formula:
        C = max(0, 100 - (ConflictCount × ConflictSeverityMultiplier))
        """
        if not sources:
            return 0.0

        if not detected_conflicts:
            # No conflicts detected = perfect score
            return 100.0

        # Severity multipliers
        severity_weights = {
            "critical": 15,  # Major contradictions (dates, figures, decisions)
            "high": 10,      # Significant inconsistencies
            "medium": 5,     # Minor discrepancies
            "low": 2,        # Trivial differences
        }

        # Calculate penalty based on conflicts
        total_penalty = 0
        for conflict in detected_conflicts:
            severity = conflict.get("severity", "medium").lower()
            penalty = severity_weights.get(severity, 5)
            total_penalty += penalty

        # Score decreases with more conflicts
        conflict_score = max(0, 100 - total_penalty)

        return conflict_score

    def _calculate_logic_presence(self, sources: List[Dict[str, Any]]) -> float:
        """
        Component 3: Logic Presence (0-100)
        Identifies "Executive" keywords (Risk, Tradeoff, Alternative)

        Formula:
        L = min(100, (KeywordCount / TotalWords) × 1000 × QualityMultiplier)
        """
        if not sources:
            return 0.0

        total_words = 0
        total_keyword_matches = 0
        sources_with_logic = 0

        for source in sources:
            content = source.get("content", "")
            word_count = source.get("word_count", 0)

            if not content or word_count == 0:
                continue

            # Count executive keywords
            keyword_matches = len(self.executive_keywords_pattern.findall(content))
            total_keyword_matches += keyword_matches
            total_words += word_count

            if keyword_matches > 0:
                sources_with_logic += 1

        if total_words == 0:
            return 0.0

        # Keyword density (per 1000 words)
        keyword_density = (total_keyword_matches / total_words) * 1000

        # Quality multiplier based on how many sources contain logic
        quality_multiplier = sources_with_logic / len(sources) if sources else 0

        # Final logic score
        logic_score = min(100, keyword_density * 10 * (1 + quality_multiplier))

        return logic_score

    def _calculate_recency_factor(self, document_date: Any) -> float:
        """
        Calculate recency factor (1.0 - 1.2 based on age)
        Newer documents get slight boost
        """
        if not document_date:
            return 1.0

        try:
            if isinstance(document_date, str):
                doc_date = datetime.fromisoformat(document_date.replace('Z', '+00:00'))
            else:
                doc_date = document_date

            days_old = (datetime.now(doc_date.tzinfo) - doc_date).days

            # Recency scoring:
            # < 30 days: 1.2x
            # 30-90 days: 1.1x
            # 90-180 days: 1.05x
            # > 180 days: 1.0x
            if days_old < 30:
                return 1.2
            elif days_old < 90:
                return 1.1
            elif days_old < 180:
                return 1.05
            else:
                return 1.0
        except:
            return 1.0


# Singleton instance
rigor_score_calculator = RigorScoreCalculator()


def calculate_rigor_score(
    sources: List[Dict[str, Any]],
    detected_conflicts: List[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """
    Convenience function to calculate RigorScore

    Args:
        sources: List of source dictionaries
        detected_conflicts: Optional list of detected conflicts

    Returns:
        Dictionary with RigorScore and component breakdown
    """
    return rigor_score_calculator.calculate(sources, detected_conflicts)
