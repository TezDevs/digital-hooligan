import type { DecisionReviewExportPayload } from "./decisionReviewExports";

export type DecisionReviewWebhookEvent = "decision.review.exported";

export interface DecisionReviewWebhookEnvelope {
  event: DecisionReviewWebhookEvent;
  sentAt: string;
  payload: DecisionReviewExportPayload;
}

export interface DecisionReviewWebhookResult {
  ok: boolean;
  status: number;
}
