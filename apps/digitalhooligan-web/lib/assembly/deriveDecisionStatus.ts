import { DecisionStatus } from "@/lib/domain/decisionStatus";

type DecisionSnapshot = {
  lockedAt?: string | null;
};

type DecisionRecord = {
  archivedAt?: string | null;
  snapshots?: DecisionSnapshot[];
};

/**
 * Deterministically derive DecisionStatus from persisted fields.
 * Order matters. No inference. No UI meaning.
 */
export function deriveDecisionStatus(decision: DecisionRecord): DecisionStatus {
  // 1) Archived
  if (decision.archivedAt) {
    return DecisionStatus.Archived;
  }

  const snapshots = decision.snapshots ?? [];
  const latestSnapshot = snapshots[snapshots.length - 1];

  // 2) Locked
  if (latestSnapshot?.lockedAt) {
    return DecisionStatus.Locked;
  }

  // 3) Snapshotted
  if (snapshots.length > 0) {
    return DecisionStatus.Snapshotted;
  }

  // 4) Recorded
  if (decision) {
    return DecisionStatus.Recorded;
  }

  // 5) Draft (fallback, structurally present but empty)
  return DecisionStatus.Draft;
}
