export type DecisionState = 'ACT' | 'MONITOR' | 'NOMINAL';

export type DecisionRuleResult = {
  id: string;
  label: string;
  description: string;
  status: 'passed' | 'failed' | 'unknown';
};

export type EvidenceItem = {
  id: string;
  source: string;
  signal: string;
  status: 'used' | 'missing' | 'stale';
  timestamp?: string;
};

export type DecisionEvent = {
  id: string;
  state: DecisionState;
  summary: string;
  evaluatedAt: string;
};

export type DecisionConfidence = {
  score: number; // 0–100
  label: 'HIGH' | 'MEDIUM' | 'LOW';
};