"use server";

import { revalidatePath } from "next/cache";
import { createInMemoryRadixRepository } from "../../../lib/radix/infrastructure/repositories/inMemoryRadixRepository";
import type { SignalEventStub } from "../../../lib/radix/domain/radixTypes";
import { SignalCategory } from "../../../lib/radix/domain/radixTypes";
import { makeAudit, makeEntityId, nowISO, V1_ACTOR } from "../../../lib/radix/infrastructure/mock/radixFactory";

function toSignalCategory(input: string | null): SignalCategory | null {
  if (!input) return null;
  switch (input) {
    case SignalCategory.Market:
    case SignalCategory.Client:
    case SignalCategory.System:
    case SignalCategory.Other:
      return input as SignalCategory;
    default:
      return null;
  }
}

function toOptionalISODateTime(input: string | null): string | undefined {
  if (!input) return undefined;
  const trimmed = input.trim();
  if (!trimmed) return undefined;

  // v1: accept ISO-ish input; do not infer if malformed
  const asDate = new Date(trimmed);
  if (Number.isNaN(asDate.getTime())) return undefined;
  return asDate.toISOString();
}

export async function addSignal(formData: FormData): Promise<void> {
  const category = toSignalCategory(formData.get("category")?.toString() ?? null);
  const title = String(formData.get("title") ?? "").trim();
  const detail = String(formData.get("detail") ?? "").trim();
  const occurredAtRaw = formData.get("occurredAt")?.toString() ?? null;
  const relatedDecisionId = String(formData.get("relatedDecisionId") ?? "").trim();

  if (!category || !title) return;

  const capturedAt = nowISO();
  const occurredAt = toOptionalISODateTime(occurredAtRaw);

  const entry: SignalEventStub = {
    id: makeEntityId("sig", capturedAt),
    category,
    title,
    detail: detail ? detail : undefined,
    occurredAt, // IMPORTANT: optional, do not infer
    capturedAt,
    actor: V1_ACTOR,
    audit: makeAudit(capturedAt, V1_ACTOR),
    relatedDecisionId: relatedDecisionId ? relatedDecisionId : undefined,
  };

  const repo = createInMemoryRadixRepository();
  await repo.addSignal(entry);

  revalidatePath("/ceo/radix");
}
