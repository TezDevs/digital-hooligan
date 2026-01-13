// apps/digitalhooligan-web/lib/radix/infrastructure/mock/seedRadixData.ts
import {
  ActorRef,
  AuditFields,
  DecisionEntry,
  PulseMetricEntry,
  PulseMetricType,
  RitualEntry,
  RitualType,
  SignalCategory,
  SignalEventStub,
  WorkModeState,
  WorkModeType,
} from "../../domain/radixTypes";

const ACTOR: ActorRef = { actorId: "ceo", actorLabel: "CEO" };

function audit(now: string): AuditFields {
  return { createdAt: now, createdBy: ACTOR };
}

// NOTE: deterministic seeds are fine for v1 mock. Replace with DB adapter in v2.
export function seedRadixData(nowISO: string): {
  decisions: DecisionEntry[];
  pulseEntries: PulseMetricEntry[];
  rituals: RitualEntry[];
  workModes: WorkModeState[];
  signals: SignalEventStub[];
} {
  return {
    decisions: [
      {
        id: "dec_001",
        title: "Adopt RadixOS v1 cockpit",
        summary: "Ship a single CEO control plane with append-only truth logs and derived snapshot.",
        proposedAt: nowISO,
        actor: ACTOR,
        audit: audit(nowISO),
        tags: ["radixos", "opsos"],
      },
    ],
    pulseEntries: [
      {
        id: "pulse_001",
        metricType: PulseMetricType.HealthScore,
        value: 7,
        capturedAt: nowISO,
        actor: ACTOR,
        audit: audit(nowISO),
        meta: { metricType: PulseMetricType.HealthScore, source: "manual" },
      },
    ],
    rituals: [
      {
        id: "rit_001",
        ritualType: RitualType.Daily,
        templateKey: "daily-reset-v1",
        completedAt: nowISO,
        forDate: nowISO.slice(0, 10),
        actor: ACTOR,
        audit: audit(nowISO),
        responses: { focus: "Ship RadixOS v1 skeleton", risk: "Scope creep" },
      },
    ],
    workModes: [
      {
        id: "wm_001",
        mode: WorkModeType.Owner,
        effectiveFrom: nowISO,
        effectiveTo: null,
        actor: ACTOR,
        audit: audit(nowISO),
        note: "Starting in Owner mode for execution planning.",
      },
    ],
    signals: [
      {
        id: "sig_001",
        category: SignalCategory.System,
        title: "RadixOS v1 spec frozen",
        detail: "Implementation authorized; keep v1 single-user and derived snapshot non-persisted.",
        capturedAt: nowISO,
        actor: ACTOR,
        audit: audit(nowISO),
      },
    ],
  };
}
