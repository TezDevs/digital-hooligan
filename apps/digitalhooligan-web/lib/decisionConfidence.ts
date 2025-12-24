import { EvidenceItem, DecisionConfidence } from './decisionTypes';

const STATUS_WEIGHTS: Record<EvidenceItem['status'], number> = {
  used: 1,
  stale: 0.5,
  missing: 0,
};

export function computeDecisionConfidence(
  evidence: EvidenceItem[]
): DecisionConfidence {
  if (evidence.length === 0) {
    return { score: 0, label: 'LOW' };
  }

  const total = evidence.reduce(
    (sum, item) => sum + STATUS_WEIGHTS[item.status],
    0
  );

  const score = Math.round((total / evidence.length) * 100);

  let label: DecisionConfidence['label'] = 'LOW';
  if (score >= 80) label = 'HIGH';
  else if (score >= 50) label = 'MEDIUM';

  return { score, label };
}