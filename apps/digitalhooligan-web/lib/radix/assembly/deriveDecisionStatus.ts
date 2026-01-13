// apps/digitalhooligan-web/lib/radix/assembly/deriveDecisionStatus.ts
import { DecisionEntry, DecisionStatus } from "../domain/radixTypes";

/**
 * Deterministic derivation rule:
 * - If closedAt exists => Closed
 * - Else if activatedAt exists => Active
 * - Else => Proposed
 */
export function deriveDecisionStatus(decision: DecisionEntry): DecisionStatus {
  if (decision.closedAt) return DecisionStatus.Closed;
  if (decision.activatedAt) return DecisionStatus.Active;
  return DecisionStatus.Proposed;
}
