// apps/digitalhooligan-web/lib/radix/assembly/selectors.ts
import {
  DecisionEntry,
  PulseMetricEntry,
  PulseMetricType,
  WorkModeState,
  DecisionStatus,
  RitualEntry,
  SignalEventStub,
} from "../domain/radixTypes";
import { deriveDecisionStatus } from "./deriveDecisionStatus";

export function selectCurrentWorkMode(states: WorkModeState[]): WorkModeState | null {
  return (
    states.find((s) => s.effectiveTo === null || s.effectiveTo === undefined) ?? null
  );
}

export function selectOpenDecisions(decisions: DecisionEntry[]): DecisionEntry[] {
  return decisions
    .map((d) => ({ ...d, status: deriveDecisionStatus(d) }))
    .filter((d) => d.status !== DecisionStatus.Closed);
}

export function selectRecentDecisions(decisions: DecisionEntry[], limit = 5): DecisionEntry[] {
  return decisions
    .slice()
    .sort((a, b) => (a.proposedAt < b.proposedAt ? 1 : -1))
    .slice(0, limit)
    .map((d) => ({ ...d, status: deriveDecisionStatus(d) }));
}

export function selectLatestPulse(entries: PulseMetricEntry[]): Record<PulseMetricType, PulseMetricEntry | null> {
  const latest: Record<PulseMetricType, PulseMetricEntry | null> = {
    [PulseMetricType.MonthlyRevenue]: null,
    [PulseMetricType.ActiveClients]: null,
    [PulseMetricType.ExecutionLoad]: null,
    [PulseMetricType.HealthScore]: null,
  };

  for (const e of entries) {
    const current = latest[e.metricType];
    if (!current || current.capturedAt < e.capturedAt) {
      latest[e.metricType] = e;
    }
  }

  return latest;
}

export function buildMissingData(latestPulse: Record<PulseMetricType, PulseMetricEntry | null>): string[] {
  const missing: string[] = [];
  for (const [k, v] of Object.entries(latestPulse) as Array<[PulseMetricType, PulseMetricEntry | null]>) {
    if (!v) missing.push(`no ${k} captured`);
  }
  return missing;
}

export function selectRecentRituals(rituals: RitualEntry[], limit = 5): RitualEntry[] {
  return rituals
    .slice()
    .sort((a, b) => (a.completedAt < b.completedAt ? 1 : -1))
    .slice(0, limit);
}

export function selectRecentSignals(signals: SignalEventStub[], limit = 10): SignalEventStub[] {
  return signals
    .slice()
    .sort((a, b) => (a.capturedAt < b.capturedAt ? 1 : -1))
    .slice(0, limit);
}
