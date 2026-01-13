"use server";

import { revalidatePath } from "next/cache";
import { createInMemoryRadixRepository } from "../../../lib/radix/infrastructure/repositories/inMemoryRadixRepository";
import {
  PulseMetricEntry,
  PulseMetricType,
} from "../../../lib/radix/domain/radixTypes";
import {
  makeAudit,
  makeEntityId,
  nowISO,
  V1_ACTOR,
} from "../../../lib/radix/infrastructure/mock/radixFactory";

function toMetricType(input: string | null): PulseMetricType | null {
  if (!input) return null;
  switch (input) {
    case PulseMetricType.MonthlyRevenue:
    case PulseMetricType.ActiveClients:
    case PulseMetricType.ExecutionLoad:
    case PulseMetricType.HealthScore:
      return input as PulseMetricType;
    default:
      return null;
  }
}

function toNumberOrNull(input: FormDataEntryValue | null): number | null {
  if (input === null) return null;
  const n = Number(String(input));
  return Number.isFinite(n) ? n : null;
}

export async function addPulseMetric(formData: FormData): Promise<void> {
  const metricType = toMetricType(formData.get("metricType")?.toString() ?? null);
  const value = toNumberOrNull(formData.get("value"));

  if (!metricType || value === null) return;

  // v1 guardrails (basic, UI-level)
  if (metricType === PulseMetricType.HealthScore) {
    if (value < 1 || value > 10) return;
  }

  const capturedAt = nowISO();

  const entry: PulseMetricEntry = {
    id: makeEntityId("pulse", capturedAt),
    metricType,
    value,
    capturedAt,
    actor: V1_ACTOR,
    audit: makeAudit(capturedAt, V1_ACTOR),
    meta:
      metricType === PulseMetricType.MonthlyRevenue
        ? { metricType, currency: "USD", source: "manual" }
        : { metricType, source: "manual" },
  };

  const repo = createInMemoryRadixRepository();
  await repo.addPulseEntry(entry);

  revalidatePath("/ceo/radix");
}
