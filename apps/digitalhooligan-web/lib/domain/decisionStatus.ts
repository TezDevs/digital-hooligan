// Domain Layer — Canonical Decision Status
// Bucket 2: Contract Expansion
// NOTE: Informational only. No behavior, no UI assumptions.

export enum DecisionStatus {
  Draft = "draft",
  Recorded = "recorded",
  Snapshotted = "snapshotted",
  Locked = "locked",
  Archived = "archived",
}
