import { NextResponse } from "next/server";
import { RitualEntry, RitualTemplateKey, RitualType } from "../../../../lib/radix/domain/radixTypes";
import { getStore } from "../../../../lib/radix/infrastructure/adapters/memory/memoryStore";
import { fail, ok } from "../../../../lib/radix/infrastructure/http/responseEnvelope";

type CreateRitualInput = {
  ritualType: RitualType;
  templateKey: RitualTemplateKey;
  forDate: string; // ISODate
  completedAt?: string;
  note?: string;
  responses?: Record<string, string>;
  referencedDecisionIds?: string[];
};

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as CreateRitualInput | null;

  if (!body?.ritualType || !Object.values(RitualType).includes(body.ritualType)) {
    return NextResponse.json(fail("valid ritualType is required", "BAD_REQUEST"), { status: 400 });
  }
  if (!body?.templateKey || (body.templateKey !== "daily-reset-v1" && body.templateKey !== "weekly-review-v1")) {
    return NextResponse.json(fail("valid templateKey is required", "BAD_REQUEST"), { status: 400 });
  }
  if (!body?.forDate || typeof body.forDate !== "string") {
    return NextResponse.json(fail("forDate is required", "BAD_REQUEST"), { status: 400 });
  }

  const actor = { actorId: "ceo", actorLabel: "CEO" };
  const now = new Date().toISOString();
  const completedAt = body.completedAt ?? now;

  const entry: RitualEntry = {
    id: crypto.randomUUID(),
    ritualType: body.ritualType,
    templateKey: body.templateKey,
    forDate: body.forDate,
    completedAt,
    note: body.note,
    responses: body.responses,
    referencedDecisionIds: body.referencedDecisionIds,
    actor,
    audit: { createdAt: now, createdBy: actor },
  };

  const s = getStore();
  s.ritualEntries.push(entry);

  return NextResponse.json(ok(entry), { status: 201 });
}

export async function GET() {
  const s = getStore();
  return NextResponse.json(ok(s.ritualEntries));
}
