"use server";

import { revalidatePath } from "next/cache";
import { createInMemoryRadixRepository } from "../../../lib/radix/infrastructure/repositories/inMemoryRadixRepository";
import type { RitualEntry } from "../../../lib/radix/domain/radixTypes";
import { RitualType } from "../../../lib/radix/domain/radixTypes";
import { makeAudit, makeEntityId, nowISO, V1_ACTOR } from "../../../lib/radix/infrastructure/mock/radixFactory";

function toRitualType(input: string | null): RitualType | null {
  if (!input) return null;
  switch (input) {
    case RitualType.Daily:
    case RitualType.Weekly:
      return input as RitualType;
    default:
      return null;
  }
}

function toForDate(input: string | null): string | null {
  if (!input) return null;
  // v1: accept YYYY-MM-DD only
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input)) return null;
  return input;
}

/**
 * v1 ritual response keys (keep stable; templates live in UI)
 */
function buildResponses(formData: FormData, ritualType: RitualType): Record<string, string> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();

  if (ritualType === RitualType.Daily) {
    const focus = get("daily_focus");
    const risk = get("daily_risk");
    const win = get("daily_win");
    const out: Record<string, string> = {};
    if (focus) out.focus = focus;
    if (risk) out.risk = risk;
    if (win) out.win = win;
    return out;
  }

  // Weekly
  const weekWins = get("weekly_wins");
  const weekLessons = get("weekly_lessons");
  const nextWeek = get("weekly_next");
  const out: Record<string, string> = {};
  if (weekWins) out.wins = weekWins;
  if (weekLessons) out.lessons = weekLessons;
  if (nextWeek) out.next = nextWeek;
  return out;
}

function parseReferencedDecisionIds(formData: FormData): string[] | undefined {
  const raw = String(formData.get("referencedDecisionIds") ?? "").trim();
  if (!raw) return undefined;
  // CSV ids
  const ids = raw.split(",").map((s) => s.trim()).filter(Boolean);
  return ids.length ? ids : undefined;
}

export async function completeRitual(formData: FormData): Promise<void> {
  const ritualType = toRitualType(formData.get("ritualType")?.toString() ?? null);
  const forDate = toForDate(formData.get("forDate")?.toString() ?? null);
  const note = String(formData.get("note") ?? "").trim();

  if (!ritualType || !forDate) return;

  const completedAt = nowISO();
  const templateKey = ritualType === RitualType.Daily ? "daily-reset-v1" : "weekly-review-v1";
  const responses = buildResponses(formData, ritualType);
  const referencedDecisionIds = parseReferencedDecisionIds(formData);

  const entry: RitualEntry = {
    id: makeEntityId("rit", completedAt),
    ritualType,
    templateKey,
    completedAt,
    forDate,
    actor: V1_ACTOR,
    audit: makeAudit(completedAt, V1_ACTOR),
    responses: Object.keys(responses).length ? responses : undefined,
    note: note ? note : undefined,
    referencedDecisionIds,
  };

  const repo = createInMemoryRadixRepository();
  await repo.addRitual(entry);

  revalidatePath("/ceo/radix");
}
