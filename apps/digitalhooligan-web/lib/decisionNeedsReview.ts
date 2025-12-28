// apps/digitalhooligan-web/lib/decisionNeedsReview.ts

import { decisionAgeInDays } from "@/lib/decisionStale";

export interface NeedsReviewDecisionInput {
  date: string | Date;
  area: "PRODUCT" | "OPS" | string;
  impact: "HIGH" | "MEDIUM" | "LOW" | string;
}

export const NEEDS_REVIEW_MIN_DAYS = 30;

/**
 * A decision "Needs Review" if it is:
 * - Old enough
 * - High impact
 * - In a critical area (PRODUCT or OPS)
 */
export function needsDecisionReview(
  decision: NeedsReviewDecisionInput
): boolean {
  const ageDays = decisionAgeInDays({ updatedAt: decision.date });

  if (ageDays < NEEDS_REVIEW_MIN_DAYS) return false;
  if (decision.impact !== "HIGH") return false;
  if (decision.area !== "PRODUCT" && decision.area !== "OPS") return false;

  return true;
}
