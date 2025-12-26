import {
  DecisionReviewWebhookEnvelope,
  DecisionReviewWebhookResult,
} from "./decisionReviewWebhooks";

export async function sendDecisionReviewWebhook(
  url: string,
  envelope: DecisionReviewWebhookEnvelope
): Promise<DecisionReviewWebhookResult> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(envelope),
  });

  return {
    ok: response.ok,
    status: response.status,
  };
}
