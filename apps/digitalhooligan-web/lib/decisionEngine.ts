export type DecisionState = 'ACT' | 'MONITOR' | 'NOMINAL';

export type DecisionRuleResult = {
  id: string;
  label: string;
  description: string;
  status: 'passed' | 'failed' | 'unknown';
};

export type DecisionInput = {
  unresolvedIncidents?: number;
  degradedSystems?: number;
  dataFresh?: boolean;
};

export type DecisionResult = {
  state: DecisionState;
  rules: DecisionRuleResult[];
  completeness: number;
};

export function evaluateDecision(input: DecisionInput): DecisionResult {
  const rules: DecisionRuleResult[] = [];

  // Rule: Unresolved incidents
  if (typeof input.unresolvedIncidents === 'number') {
    rules.push({
      id: 'incidents-open',
      label: 'Unresolved Incidents',
      description: 'One or more incidents are currently unresolved',
      status: input.unresolvedIncidents > 0 ? 'passed' : 'failed',
    });
  } else {
    rules.push({
      id: 'incidents-open',
      label: 'Unresolved Incidents',
      description: 'Incident data unavailable',
      status: 'unknown',
    });
  }

  // Rule: Degraded health
  if (typeof input.degradedSystems === 'number') {
    rules.push({
      id: 'health-degraded',
      label: 'Degraded Health Signals',
      description: 'At least one system reports degraded health',
      status: input.degradedSystems > 0 ? 'passed' : 'failed',
    });
  } else {
    rules.push({
      id: 'health-degraded',
      label: 'Degraded Health Signals',
      description: 'Health data unavailable',
      status: 'unknown',
    });
  }

  // Rule: Data freshness
  if (typeof input.dataFresh === 'boolean') {
    rules.push({
      id: 'data-freshness',
      label: 'Data Freshness',
      description: 'All sources reporting within expected interval',
      status: input.dataFresh ? 'failed' : 'passed',
    });
  } else {
    rules.push({
      id: 'data-freshness',
      label: 'Data Freshness',
      description: 'Freshness not evaluated',
      status: 'unknown',
    });
  }

  const knownRules = rules.filter(r => r.status !== 'unknown').length;
  const completeness = Math.round((knownRules / rules.length) * 100);

  const hasCritical =
    rules.some(r => r.id === 'incidents-open' && r.status === 'passed') ||
    rules.some(r => r.id === 'health-degraded' && r.status === 'passed');

  const state: DecisionState =
    hasCritical ? 'ACT' :
    completeness < 100 ? 'MONITOR' :
    'NOMINAL';

  return { state, rules, completeness };
}