import { Decision, DecisionConfidence } from "./decisionTypes";
import {
  generateConfidenceNarrative,
  ConfidenceNarrative,
} from "./decisionConfidenceNarratives";

export interface DecisionReviewSnapshot {
  decisionId: string;
  evaluatedAt: string;

  state: string;

  confidence: {
    score: number;
    label: string;
    trend: ConfidenceNarrative["trend"];
    narrative: string;
  };

  evidence: {
    total: number;
    used: number;
    signals: string[];
  };
}

/**
 * Build a read-only review snapshot for a decision.
 * This function performs no mutation and has no side effects.
 */
export function buildDecisionReviewSnapshot(params: {
  decision: Decision;
  previousConfidence?: DecisionConfidence;
}): DecisionReviewSnapshot {
  const { decision, previousConfidence } = params;

  const narrative = generateConfidenceNarrative({
    previous: previousConfidence,
    current: decision.confidence,
    evidence: decision.evidence,
  });

  const usedEvidence = decision.evidence.filter((e) => e.status === "used");

  return {
    decisionId: decision.id,
    evaluatedAt: decision.createdAt,

    state: decision.state,

    confidence: {
      score: decision.confidence.score,
      label: decision.confidence.label,
      trend: narrative.trend,
      narrative: narrative.summary,
    },

    evidence: {
      total: decision.evidence.length,
      used: usedEvidence.length,
      signals: usedEvidence.map((e) => e.signal),
    },
  };
}
