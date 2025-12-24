import { DecisionState, DecisionConfidence } from "./decisionTypes";
import { GuardrailResult } from "./decisionGuardrails";
import { appendAuditEntry } from "./actionAuditLog";

export type DecisionAction = {
  id: string;
  label: string;
  enabled: boolean;
  reason?: string;
};

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

export function evaluateDecisionActions(
  state: DecisionState,
  confidence: DecisionConfidence,
  guardrails: GuardrailResult,
  snapshotId: string
): DecisionAction[] {
  const actions: DecisionAction[] = [];

  const evaluatedAt = new Date().toISOString();

  const escalateEnabled = state === "ACT" && !guardrails.blocked;

  actions.push({
    id: "escalate",
    label: "Escalate Incident",
    enabled: escalateEnabled,
    reason: escalateEnabled ? undefined : guardrails.reasons.join("; "),
  });

  const notifyEnabled = confidence.label !== "LOW";

  actions.push({
    id: "notify",
    label: "Notify On-Call",
    enabled: notifyEnabled,
    reason: notifyEnabled
      ? undefined
      : "Notification suppressed due to low confidence",
  });

  actions.push({
    id: "ticket",
    label: "Create Tracking Ticket",
    enabled: true,
  });

  // 🔒 Audit logging (append-only)
  actions.forEach((action) => {
    appendAuditEntry({
      id: generateId(),
      snapshotId,
      actionId: action.id,
      actionLabel: action.label,
      enabled: action.enabled,
      reason: action.reason,
      decisionState: state,
      confidence,
      evaluatedAt,
    });
  });

  return actions;
}
