import { DecisionInput } from "./decisionInput";

export function aggregateDecisionConfidence(
  inputs: DecisionInput[]
): number | null {
  const validInputs = inputs.filter((input) => input.status !== "missing");

  if (validInputs.length === 0) return null;

  let weightedSum = 0;
  let weightTotal = 0;

  for (const input of validInputs) {
    const weight = Math.max(0, Math.min(1, input.sourceReliability ?? 1));

    weightedSum += input.confidence * weight;
    weightTotal += weight;
  }

  if (weightTotal === 0) return null;

  return Math.round(weightedSum / weightTotal);
}
