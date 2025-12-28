// apps/digitalhooligan-web/lib/decisionStale.ts

export const DEFAULT_STALE_DAYS = 14;

export interface StaleDecisionInput {
  updatedAt: string | Date;
}

/**
 * A decision is considered "stale" if its last update
 * exceeds the provided threshold (in days).
 */
export function isDecisionStale(
  decision: StaleDecisionInput,
  staleAfterDays: number = DEFAULT_STALE_DAYS
): boolean {
  const updated =
    typeof decision.updatedAt === "string"
      ? new Date(decision.updatedAt)
      : decision.updatedAt;

  if (isNaN(updated.getTime())) {
    return false;
  }

  const now = Date.now();
  const ageMs = now - updated.getTime();
  const staleMs = staleAfterDays * 24 * 60 * 60 * 1000;

  return ageMs > staleMs;
}

/**
 * Returns the age of a decision in whole days.
 * Useful for UI labels and tooltips.
 */
export function decisionAgeInDays(decision: StaleDecisionInput): number {
  const updated =
    typeof decision.updatedAt === "string"
      ? new Date(decision.updatedAt)
      : decision.updatedAt;

  if (isNaN(updated.getTime())) {
    return 0;
  }

  const now = Date.now();
  const ageMs = now - updated.getTime();
  return Math.floor(ageMs / (24 * 60 * 60 * 1000));
}
