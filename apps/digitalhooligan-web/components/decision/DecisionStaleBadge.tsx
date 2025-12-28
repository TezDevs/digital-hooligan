// apps/digitalhooligan-web/components/decision/DecisionStaleBadge.tsx

import { isDecisionStale, decisionAgeInDays } from "@/lib/decisionStale";

interface DecisionStaleBadgeProps {
  updatedAt: string | Date;
}

export function DecisionStaleBadge({ updatedAt }: DecisionStaleBadgeProps) {
  const isStale = isDecisionStale({ updatedAt });

  if (!isStale) return null;

  const ageDays = decisionAgeInDays({ updatedAt });

  return (
    <span
      className="inline-flex items-center rounded-md bg-yellow-500/10 px-2 py-0.5 text-xs font-medium text-yellow-400 border border-yellow-500/30"
      title={`Last updated ${ageDays} days ago`}
    >
      Stale
    </span>
  );
}
