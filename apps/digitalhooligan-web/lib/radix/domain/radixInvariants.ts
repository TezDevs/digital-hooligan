// apps/digitalhooligan-web/lib/radix/domain/radixInvariants.ts
import { WorkModeState } from "./radixTypes";

/**
 * v1 invariant: at most one WorkModeState has effectiveTo === null.
 * Keep these helpers pure (no IO).
 */
export function hasSingleCurrentWorkMode(states: WorkModeState[]): boolean {
  const currentCount = states.filter((s) => s.effectiveTo === null || s.effectiveTo === undefined).length;
  return currentCount <= 1;
}
