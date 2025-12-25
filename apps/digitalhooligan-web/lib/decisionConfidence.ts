import { DecisionConfidence, DecisionState } from "./decisionTypes";

export function deriveDecisionConfidence(
  state: DecisionState,
  completeness: number
): DecisionConfidence {
  if (completeness >= 90 && state === "NOMINAL") {
    return { score: completeness, label: "HIGH" };
  }

  if (completeness >= 60) {
    return { score: completeness, label: "MEDIUM" };
  }

  return { score: completeness, label: "LOW" };
}
