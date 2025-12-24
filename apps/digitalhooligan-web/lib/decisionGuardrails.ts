import { DecisionState, DecisionConfidence } from "./decisionTypes";

export type GuardrailResult = {
  allowedState: DecisionState;
  blocked: boolean;
  reasons: string[];
};

export function evaluateGuardrails(
  state: DecisionState,
  confidence: DecisionConfidence
): GuardrailResult {
  const reasons: string[] = [];

  // Guardrail 1: Never escalate with LOW confidence
  if (state === "ACT" && confidence.label === "LOW") {
    reasons.push("Escalation blocked: decision confidence is LOW");
  }

  // Guardrail 2: MONITOR required when confidence < 50%
  if (confidence.score < 50 && state !== "MONITOR") {
    reasons.push("State downgraded to MONITOR due to insufficient confidence");
  }

  if (reasons.length === 0) {
    return {
      allowedState: state,
      blocked: false,
      reasons: [],
    };
  }

  return {
    allowedState: confidence.score < 50 ? "MONITOR" : state,
    blocked: true,
    reasons,
  };
}
