import { DecisionReviewSnapshot } from "./decisionReviewSnapshot";

export type DecisionReviewActivityType =
  | "snapshot_generated"
  | "review_status_updated";

export interface DecisionReviewActivityItem {
  id: string;
  decisionId: string;
  type: DecisionReviewActivityType;
  summary: string;
  timestamp: string;
}

export function buildDecisionReviewTimeline(
  snapshot: DecisionReviewSnapshot
): DecisionReviewActivityItem[] {
  const items: DecisionReviewActivityItem[] = [];

  items.push({
    id: `snapshot-${snapshot.generatedAt}`,
    decisionId: "unknown",
    type: "snapshot_generated",
    summary: "Decision review snapshot generated",
    timestamp: snapshot.generatedAt,
  });

  for (const review of snapshot.recent) {
    items.push({
      id: review.id,
      decisionId: review.decisionId,
      type: "review_status_updated",
      summary: `Review "${review.title}" marked ${review.status}`,
      timestamp: review.updatedAt,
    });
  }

  return items.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
}
