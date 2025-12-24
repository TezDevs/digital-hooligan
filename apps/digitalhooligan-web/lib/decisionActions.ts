import { DecisionState, DecisionConfidence } from "./decisionTypes";
import { GuardrailResult } from "./decisionGuardrails";

export type DecisionAction = {
  id: string;
  label: string;
  enabled: boolean;
  reason?: string;
};

export function evaluateDecisionActions(
  state: DecisionState,
  confidence: DecisionConfidence,
  guardrails: GuardrailResult
): DecisionAction[] {
  const actions: DecisionAction[] = [];

  // Action: Escalate
  if (state === "ACT") {
    actions.push({
      id: "escalate",
      label: "Escalate Incident",
      enabled: !guardrails.blocked,
      reason: guardrails.blocked ? guardrails.reasons.join("; ") : undefined,
    });
  }

  // Action: Notify on-call
  actions.push({
    id: "notify",
    label: "Notify On-Call",
    enabled: confidence.label !== "LOW",
    reason:
      confidence.label === "LOW"
        ? "Notification suppressed due to low confidence"
        : undefined,
  });

  // Action: Create ticket
  actions.push({
    id: "ticket",
    label: "Create Tracking Ticket",
    enabled: true,
  });

  return actions;
}
