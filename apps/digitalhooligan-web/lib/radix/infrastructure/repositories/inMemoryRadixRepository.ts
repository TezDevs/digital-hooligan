// apps/digitalhooligan-web/lib/radix/infrastructure/repositories/inMemoryRadixRepository.ts
import {
  DecisionEntry,
  PulseMetricEntry,
  RitualEntry,
  SignalEventStub,
  WorkModeState,
  EntityId,
} from "../../domain/radixTypes";
import { RadixRepository } from "./radixRepository";
import { seedRadixData } from "../mock/seedRadixData";
import { V1_ACTOR } from "../mock/radixFactory";

/**
 * v1: in-memory, non-durable adapter.
 * - Append-only arrays (except truthful lifecycle boundary updates).
 * - Replace with DB-backed adapter later without changing Domain/Assembly.
 */
const NOW = new Date().toISOString();
const seeded = seedRadixData(NOW);

const store = {
  decisions: [...seeded.decisions] as DecisionEntry[],
  pulseEntries: [...seeded.pulseEntries] as PulseMetricEntry[],
  rituals: [...seeded.rituals] as RitualEntry[],
  workModes: [...seeded.workModes] as WorkModeState[],
  signals: [...seeded.signals] as SignalEventStub[],
};

function updateDecision(decisionId: EntityId, patch: Partial<DecisionEntry>) {
  const idx = store.decisions.findIndex((d) => d.id === decisionId);
  if (idx < 0) return;

  const existing = store.decisions[idx];

  store.decisions[idx] = {
    ...existing,
    ...patch,
    audit: {
      ...existing.audit,
      updatedAt: new Date().toISOString(),
      updatedBy: V1_ACTOR,
    },
  };
}

export function createInMemoryRadixRepository(): RadixRepository {
  return {
    async listDecisions() {
      return [...store.decisions];
    },
    async addDecision(entry) {
      store.decisions = [...store.decisions, entry];
    },

    async activateDecision(decisionId: EntityId, activatedAtISO: string) {
      const d = store.decisions.find((x) => x.id === decisionId);
      if (!d) return;
      // v1: truthful update only; do not override if already activated/closed
      if (d.closedAt) return;
      if (d.activatedAt) return;

      updateDecision(decisionId, { activatedAt: activatedAtISO });
    },

    async closeDecision(decisionId: EntityId, closedAtISO: string) {
      const d = store.decisions.find((x) => x.id === decisionId);
      if (!d) return;
      // v1: truthful update only; do not override if already closed
      if (d.closedAt) return;

      updateDecision(decisionId, { closedAt: closedAtISO });
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
      const idx = store.workModes.findIndex(
        (w) => w.effectiveTo === null || w.effectiveTo === undefined
      );
      if (idx >= 0) {
        const current = store.workModes[idx];
        // Truthful closure: set boundary to newInterval.effectiveFrom.
        store.workModes[idx] = {
          ...current,
          effectiveTo: newInterval.effectiveFrom,
          audit: {
            ...current.audit,
            updatedAt: new Date().toISOString(),
            updatedBy: V1_ACTOR,
          },
        };
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
