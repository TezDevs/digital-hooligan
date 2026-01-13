// apps/digitalhooligan-web/lib/radix/infrastructure/repositories/radixRepository.ts
import {
  DecisionEntry,
  PulseMetricEntry,
  RitualEntry,
  SignalEventStub,
  WorkModeState,
} from "../../domain/radixTypes";

export interface RadixRepository {
  listDecisions(): Promise<DecisionEntry[]>;
  addDecision(entry: DecisionEntry): Promise<void>;

  listPulseEntries(): Promise<PulseMetricEntry[]>;
  addPulseEntry(entry: PulseMetricEntry): Promise<void>;

  listRituals(): Promise<RitualEntry[]>;
  addRitual(entry: RitualEntry): Promise<void>;

  listWorkModes(): Promise<WorkModeState[]>;
  setCurrentWorkMode(newInterval: WorkModeState): Promise<void>;

  listSignals(): Promise<SignalEventStub[]>;
  addSignal(entry: SignalEventStub): Promise<void>;
}
