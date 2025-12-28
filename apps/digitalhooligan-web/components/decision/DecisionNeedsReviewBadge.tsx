// apps/digitalhooligan-web/components/decision/DecisionNeedsReviewBadge.tsx

import { needsDecisionReview } from "@/lib/decisionNeedsReview";

interface DecisionNeedsReviewBadgeProps {
  date: string | Date;
  area: string;
  impact: string;
}

export function DecisionNeedsReviewBadge({
  date,
  area,
  impact,
}: DecisionNeedsReviewBadgeProps) {
  const needsReview = needsDecisionReview({
    date,
    area,
    impact,
  });

  if (!needsReview) return null;

  return (
    <span
      className="inline-flex items-center rounded-md bg-rose-500/10 px-2 py-0.5 text-xs font-medium text-rose-400 border border-rose-500/30"
      title="High-impact decision that may need reassessment"
    >
      Needs review
    </span>
  );
}
