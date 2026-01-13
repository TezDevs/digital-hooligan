// apps/digitalhooligan-web/lib/radix/infrastructure/repositories/inMemoryRadixRepository.ts
import {
  DecisionEntry,
  PulseMetricEntry,
  RitualEntry,
  SignalEventStub,
  WorkModeState,
} from "../../domain/radixTypes";
import { RadixRepository } from "./radixRepository";
import { seedRadixData } from "../mock/seedRadixData";

/**
 * v1: in-memory, non-durable adapter.
 * - Append-only arrays (except work-mode closure which is a truthful boundary update).
 * - Replace with DB-backed adapter later without changing Domain/Assembly.
 */
const NOW = new Date().toISOString();
const seeded = seedRadixData(NOW);

const store = {
  decisions: [...seeded.decisions],
  pulseEntries: [...seeded.pulseEntries],
  rituals: [...seeded.rituals],
  workModes: [...seeded.workModes],
  signals: [...seeded.signals],
};

export function createInMemoryRadixRepository(): RadixRepository {
  return {
    async listDecisions() {
      return [...store.decisions];
    },
    async addDecision(entry) {
      store.decisions = [...store.decisions, entry];
    },

    async listPulseEntries() {
      return [...store.pulseEntries];
    },
    async addPulseEntry(entry) {
      store.pulseEntries = [...store.pulseEntries, entry];
    },

    async listRituals() {
      return [...store.rituals];
    },
    async addRitual(entry) {
      store.rituals = [...store.rituals, entry];
    },

    async listWorkModes() {
      return [...store.workModes];
    },
    async setCurrentWorkMode(newInterval: WorkModeState) {
      // Enforce invariant: close existing current interval (effectiveTo null) before adding new one.
      const idx = store.workModes.findIndex((w) => w.effectiveTo === null || w.effectiveTo === undefined);
      if (idx >= 0) {
        const current = store.workModes[idx];
        // Truthful closure: set boundary to newInterval.effectiveFrom.
        store.workModes[idx] = { ...current, effectiveTo: newInterval.effectiveFrom };
      }
      store.workModes = [...store.workModes, newInterval];
    },

    async listSignals() {
      return [...store.signals];
    },
    async addSignal(entry) {
      store.signals = [...store.signals, entry];
    },
  };
}
