import {
  DecisionEntry,
  PulseMetricEntry,
  RitualEntry,
  SignalEventStub,
  WorkModeState,
} from "../../../domain/radixTypes";
import { deriveDecisionStatus } from "../../../domain/derive";

/**
 * v1 memory store:
 * - NOT durable (serverless restarts will reset).
 * - Still respects append-only semantics in-process.
 */
type Store = {
  decisionEntries: DecisionEntry[];
  pulseMetricEntries: PulseMetricEntry[];
  ritualEntries: RitualEntry[];
  signalEventStubs: SignalEventStub[];
  workModeStates: WorkModeState[];
};

let store: Store | null = null;

function seed(): Store {
  const actor = { actorId: "ceo", actorLabel: "CEO" };
  const now = new Date().toISOString();

  const decisions: DecisionEntry[] = [
    {
      id: crypto.randomUUID(),
      title: "RadixOS v1 baseline approved",
      summary: "Initial RadixOS v1 scaffolding authorized.",
      status: deriveDecisionStatus({ activatedAt: now, closedAt: undefined }),
      proposedAt: now,
      activatedAt: now,
      actor,
      audit: { createdAt: now, createdBy: actor },
      category: undefined,
      tags: ["radixos", "v1"],
    },
  ];

  return {
    decisionEntries: decisions,
    pulseMetricEntries: [],
    ritualEntries: [],
    signalEventStubs: [],
    workModeStates: [],
  };
}

export function getStore(): Store {
  if (!store) store = seed();
  return store;
}
