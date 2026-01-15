import type { TimelineEvent } from "../domain/timeline";

/**
 * Utility functions are deterministic and dependency-free.
 */

export function toIsoNow(): string {
  return new Date().toISOString();
}

export function parseIsoToEpochMs(iso: string): number {
  const ms = Date.parse(iso);
  if (Number.isNaN(ms)) return 0;
  return ms;
}

export function sortByOccurredAtDesc<
  T extends Pick<TimelineEvent, "occurredAt">
>(events: T[]): T[] {
  return [...events].sort(
    (a, b) => parseIsoToEpochMs(b.occurredAt) - parseIsoToEpochMs(a.occurredAt)
  );
}
