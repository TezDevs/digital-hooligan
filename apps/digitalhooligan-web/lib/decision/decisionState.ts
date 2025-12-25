// apps/digitalhooligan-web/lib/decision/decisionState.ts

/**
 * DecisionState represents the current status of an executive or system decision.
 * This is intentionally simple and explicit.
 */

export type DecisionStatus =
  | "draft" // idea exists but not actionable
  | "needs-input" // blocked on missing info
  | "in-review" // being evaluated
  | "approved" // cleared to act
  | "deferred" // intentionally postponed
  | "rejected"; // decided against

export interface DecisionState {
  id: string;
  title: string;
  status: DecisionStatus;

  /**
   * Plain-English explanation of why the decision
   * is in its current state.
   */
  rationale: string;

  /**
   * Optional list of missing inputs or blockers.
   * Empty or undefined means "nothing blocking".
   */
  blockers?: string[];

  /**
   * ISO timestamp of last state change.
   */
  lastUpdated: string;
}

export interface DecisionState {
  id: string;
  title: string;
  status: DecisionStatus;
  rationale: string;
  blockers?: string[];

  /**
   * Aggregated confidence derived from supporting inputs.
   * Null means insufficient data.
   */
  confidence?: number | null;

  lastUpdated: string;
}
