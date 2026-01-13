import {
  DecisionEntry,
  DecisionStatus,
  LatestPulseByType,
  PulseMetricEntry,
  PulseMetricType,
  WorkModeState,
} from "./radixTypes";

export function deriveDecisionStatus(entry: Pick<DecisionEntry, "activatedAt" | "closedAt">): DecisionStatus {
  if (entry.closedAt) return DecisionStatus.Closed;
  if (entry.activatedAt) return DecisionStatus.Active;
  return DecisionStatus.Proposed;
}

export function isOpenDecision(entry: Pick<DecisionEntry, "activatedAt" | "closedAt">): boolean {
  return deriveDecisionStatus(entry) !== DecisionStatus.Closed;
}

export function getCurrentWorkMode(states: WorkModeState[]): WorkModeState | null {
  const current = states.find((s) => s.effectiveTo === null || typeof s.effectiveTo === "undefined");
  return current ?? null;
}

export function getLatestPulseByType(entries: PulseMetricEntry[]): LatestPulseByType {
  const latest: LatestPulseByType = {
    [PulseMetricType.MonthlyRevenue]: null,
    [PulseMetricType.ActiveClients]: null,
    [PulseMetricType.ExecutionLoad]: null,
    [PulseMetricType.HealthScore]: null,
  };

  for (const e of entries) {
    const current = latest[e.metricType];
    if (!current) {
      latest[e.metricType] = e;
      continue;
    }
    if (e.capturedAt > current.capturedAt) latest[e.metricType] = e;
  }

  return latest;
}
