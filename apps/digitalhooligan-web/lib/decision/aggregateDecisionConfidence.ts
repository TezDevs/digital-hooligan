// apps/digitalhooligan-web/lib/decision/aggregateDecisionConfidence.ts

import { DecisionInput } from "./decisionInput";

/**
 * Aggregates confidence across decision inputs.
 * Missing inputs are excluded from the calculation.
 */
export function aggregateDecisionConfidence(
  inputs: DecisionInput[]
): number | null {
  const validInputs = inputs.filter((input) => input.status !== "missing");

  if (validInputs.length === 0) {
    return null;
  }

  const total = validInputs.reduce((sum, input) => sum + input.confidence, 0);

  return Math.round(total / validInputs.length);
}
