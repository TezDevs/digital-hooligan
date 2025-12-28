// apps/digitalhooligan-web/lib/decisionReviewPriority.ts

import { isDecisionStale } from "@/lib/decisionStale";
import { needsDecisionReview } from "@/lib/decisionNeedsReview";

export interface ReviewPriorityDecisionInput {
  date: string | Date;
  area: string;
  impact: string;
}

/**
 * Compute a derived review priority score.
 * Higher score = should be reviewed sooner.
 */
export function decisionReviewPriority(
  decision: ReviewPriorityDecisionInput
): number {
  let score = 0;

  if (
    needsDecisionReview({
      date: decision.date,
      area: decision.area,
      impact: decision.impact,
    })
  ) {
    score += 100;
  }

  if (isDecisionStale({ updatedAt: decision.date })) {
    score += 50;
  }

  if (decision.impact === "HIGH") {
    score += 30;
  }

  if (decision.area === "PRODUCT" || decision.area === "OPS") {
    score += 10;
  }

  return score;
}
