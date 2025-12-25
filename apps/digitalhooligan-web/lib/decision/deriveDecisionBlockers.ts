// apps/digitalhooligan-web/lib/decision/deriveDecisionBlockers.ts

import { DecisionInput } from "./decisionInput";

/**
 * Derives human-readable blockers from missing decision inputs.
 * This is deterministic, read-only logic.
 */
export function deriveDecisionBlockers(inputs: DecisionInput[]): string[] {
  return inputs
    .filter((input) => input.status === "missing")
    .map((input) => `Missing input: ${input.name} (${input.source})`);
}
