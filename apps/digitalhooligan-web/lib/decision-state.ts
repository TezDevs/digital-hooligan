import {
  calculateConfidenceTimeline,
  ConfidenceTimeline,
  ConfidenceInputSnapshot,
} from "./decision-confidence";

export interface DecisionState {
  id: string;
  title: string;
  status: "open" | "closed";
  createdAt: string;
  confidenceBaseline: number;
  confidenceInputs: ConfidenceInputSnapshot[];
}

export function getDecisionConfidence(
  decision: DecisionState
): ConfidenceTimeline {
  return calculateConfidenceTimeline(
    decision.id,
    decision.confidenceBaseline,
    decision.confidenceInputs
  );
}
