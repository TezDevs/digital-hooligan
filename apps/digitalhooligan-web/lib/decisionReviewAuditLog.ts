export type DecisionReviewAuditEventType =
  | "decision.review.export.requested"
  | "decision.review.webhook.triggered";

export interface DecisionReviewAuditEvent {
  event: DecisionReviewAuditEventType;
  route: string;
  success: boolean;
  timestamp: string;
}
