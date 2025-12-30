// apps/digitalhooligan-web/lib/snapshotStatus.ts

/**
 * Snapshot / Decision Review Status Taxonomy
 *
 * This file intentionally contains:
 * - Canonical status keys (machine-safe)
 * - Human-readable labels
 * - Read-only helpers
 *
 * No UI logic.
 * No side effects.
 * No assumptions about storage.
 */

export const SNAPSHOT_STATUS = {
  DRAFT: "draft",
  READY: "ready",
  IN_REVIEW: "in_review",
  APPROVED: "approved",
  REJECTED: "rejected",
  ARCHIVED: "archived",
} as const;

export type SnapshotStatus =
  (typeof SNAPSHOT_STATUS)[keyof typeof SNAPSHOT_STATUS];

export const SNAPSHOT_STATUS_LABEL: Record<SnapshotStatus, string> = {
  draft: "Draft",
  ready: "Ready",
  in_review: "In Review",
  approved: "Approved",
  rejected: "Rejected",
  archived: "Archived",
};

/**
 * Defensive helper — ensures unknown values never crash UI.
 * Falls back to raw value for visibility.
 */
export function getSnapshotStatusLabel(
  status: SnapshotStatus | string | undefined
): string {
  if (!status) return "Unknown";

  return SNAPSHOT_STATUS_LABEL[status as SnapshotStatus] ?? String(status);
}

/**
 * Read-only grouping helpers
 * (Not yet used — future-safe only)
 */

export const ACTIVE_SNAPSHOT_STATUSES: readonly SnapshotStatus[] = [
  SNAPSHOT_STATUS.DRAFT,
  SNAPSHOT_STATUS.READY,
  SNAPSHOT_STATUS.IN_REVIEW,
];

export const TERMINAL_SNAPSHOT_STATUSES: readonly SnapshotStatus[] = [
  SNAPSHOT_STATUS.APPROVED,
  SNAPSHOT_STATUS.REJECTED,
  SNAPSHOT_STATUS.ARCHIVED,
];
