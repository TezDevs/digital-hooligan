import {
  DecisionEntry,
  OpsSnapshot,
  PulseMetricType,
  WorkModeState,
} from "../domain/radixTypes";
import { deriveDecisionStatus, getCurrentWorkMode, getLatestPulseByType, isOpenDecision } from "../domain/derive";
import { getStore } from "../infrastructure/adapters/memory/memoryStore";

const RECENT_N = 10;

function sortDesc<T>(arr: T[], getKey: (t: T) => string): T[] {
  return [...arr].sort((a, b) => (getKey(b) > getKey(a) ? 1 : getKey(b) < getKey(a) ? -1 : 0));
}

function withDerivedDecisionStatus(entries: Omit<DecisionEntry, "status">[] | DecisionEntry[]): DecisionEntry[] {
  return entries.map((d) => ({
    ...d,
    status: deriveDecisionStatus(d),
  }));
}

export function buildOpsSnapshot(asOf: string = new Date().toISOString()): OpsSnapshot {
  const s = getStore();

  const decisions = withDerivedDecisionStatus(s.decisionEntries);
  const openDecisions = decisions.filter(isOpenDecision);
  const recentDecisions = sortDesc(decisions, (d) => d.proposedAt).slice(0, RECENT_N);

  const latestPulse = getLatestPulseByType(s.pulseMetricEntries);

  const missingData: string[] = [];
  for (const mt of Object.values(PulseMetricType)) {
    if (!latestPulse[mt]) missingData.push(`no ${mt} captured`);
  }

  const recentRituals = sortDesc(s.ritualEntries, (r) => r.completedAt).slice(0, RECENT_N);
  const recentSignals = sortDesc(s.signalEventStubs, (x) => x.capturedAt).slice(0, RECENT_N);

  const currentWorkMode: WorkModeState | null = getCurrentWorkMode(s.workModeStates);

  return {
    asOf,
    currentWorkMode,
    openDecisions,
    recentDecisions,
    latestPulse,
    recentRituals,
    recentSignals,
    missingData,
  };
}
