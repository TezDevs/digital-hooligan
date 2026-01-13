"use server";

import { revalidatePath } from "next/cache";
import { createInMemoryRadixRepository } from "../../../lib/radix/infrastructure/repositories/inMemoryRadixRepository";
import type { WorkModeState } from "../../../lib/radix/domain/radixTypes";
import { WorkModeType } from "../../../lib/radix/domain/radixTypes";
import { makeAudit, makeEntityId, nowISO, V1_ACTOR } from "../../../lib/radix/infrastructure/mock/radixFactory";

function toWorkModeType(input: string | null): WorkModeType | null {
  if (!input) return null;
  switch (input) {
    case WorkModeType.Founder:
    case WorkModeType.Owner:
    case WorkModeType.Operator:
      return input as WorkModeType;
    default:
      return null;
  }
}

export async function setWorkMode(formData: FormData): Promise<void> {
  const mode = toWorkModeType(formData.get("mode")?.toString() ?? null);
  const note = String(formData.get("note") ?? "").trim();

  if (!mode) return;

  const effectiveFrom = nowISO();

  const interval: WorkModeState = {
    id: makeEntityId("wm", effectiveFrom),
    mode,
    effectiveFrom,
    effectiveTo: null,
    actor: V1_ACTOR,
    audit: makeAudit(effectiveFrom, V1_ACTOR),
    note: note ? note : undefined,
  };

  const repo = createInMemoryRadixRepository();
  await repo.setCurrentWorkMode(interval);

  revalidatePath("/ceo/radix");
}
