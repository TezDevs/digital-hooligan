// apps/digitalhooligan-web/lib/radix/assembly/buildOpsSnapshot.ts
import {
  DecisionEntry,
  OpsSnapshot,
  PulseMetricEntry,
  RitualEntry,
  SignalEventStub,
  WorkModeState,
} from "../domain/radixTypes";
import {
  selectCurrentWorkMode,
  selectOpenDecisions,
  selectRecentDecisions,
  selectLatestPulse,
  buildMissingData,
  selectRecentRituals,
  selectRecentSignals,
} from "./selectors";

export function buildOpsSnapshot(input: {
  asOf: string;
  decisions: DecisionEntry[];
  pulseEntries: PulseMetricEntry[];
  rituals: RitualEntry[];
  workModes: WorkModeState[];
  signals: SignalEventStub[];
}): OpsSnapshot {
  const latestPulse = selectLatestPulse(input.pulseEntries);

  return {
    asOf: input.asOf,
    currentWorkMode: selectCurrentWorkMode(input.workModes),
    openDecisions: selectOpenDecisions(input.decisions),
    recentDecisions: selectRecentDecisions(input.decisions),
    latestPulse,
    recentRituals: selectRecentRituals(input.rituals),
    recentSignals: selectRecentSignals(input.signals),
    missingData: buildMissingData(latestPulse),
  };
}
