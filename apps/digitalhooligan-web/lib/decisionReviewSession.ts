// apps/digitalhooligan-web/lib/decisionReviewSession.ts

import { isDecisionStale } from "@/lib/decisionStale";
import { needsDecisionReview } from "@/lib/decisionNeedsReview";

export interface ReviewSessionDecisionInput {
  date: string | Date;
  area: string;
  impact: string;
}

/**
 * Determines whether a decision should appear
 * in a review session snapshot.
 */
export function isReviewSessionCandidate(
  decision: ReviewSessionDecisionInput
): boolean {
  const stale = isDecisionStale({
    updatedAt: decision.date,
  });

  const needsReview = needsDecisionReview({
    date: decision.date,
    area: decision.area,
    impact: decision.impact,
  });

  const highImpact = decision.impact === "HIGH";

  return stale || needsReview || highImpact;
}
