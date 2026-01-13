"use server";

import { revalidatePath } from "next/cache";
import { createInMemoryRadixRepository } from "../../../lib/radix/infrastructure/repositories/inMemoryRadixRepository";
import type { DecisionCategory, DecisionEntry } from "../../../lib/radix/domain/radixTypes";
import { makeAudit, makeEntityId, nowISO, V1_ACTOR } from "../../../lib/radix/infrastructure/mock/radixFactory";

function toDecisionCategory(input: string | null): DecisionCategory | undefined {
  if (!input) return undefined;
  switch (input) {
    case "strategy":
    case "client":
    case "system":
    case "finance":
    case "other":
      return input as unknown as DecisionCategory;
    default:
      return undefined;
  }
}

export async function addDecision(formData: FormData): Promise<void> {
  const title = String(formData.get("title") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();
  const categoryRaw = formData.get("category") ? String(formData.get("category")) : null;

  if (!title) return;

  const proposedAt = nowISO();

  const entry: DecisionEntry = {
    id: makeEntityId("dec", proposedAt),
    title,
    summary: summary ? summary : undefined,
    category: toDecisionCategory(categoryRaw),
    proposedAt,
    actor: V1_ACTOR,
    audit: makeAudit(proposedAt, V1_ACTOR),
  };

  const repo = createInMemoryRadixRepository();
  await repo.addDecision(entry);

  // Ensure the /ceo/radix page refreshes its server-rendered snapshot.
  revalidatePath("/ceo/radix");
}
