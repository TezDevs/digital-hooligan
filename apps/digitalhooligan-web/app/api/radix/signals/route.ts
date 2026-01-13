import { NextResponse } from "next/server";
import { SignalCategory, SignalEventStub } from "../../../../lib/radix/domain/radixTypes";
import { getStore } from "../../../../lib/radix/infrastructure/adapters/memory/memoryStore";
import { fail, ok } from "../../../../lib/radix/infrastructure/http/responseEnvelope";

type CreateSignalInput = {
  category: SignalCategory;
  title: string;
  detail?: string;
  occurredAt?: string; // optional, do not infer
  capturedAt?: string; // default now
  relatedDecisionId?: string;
};

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as CreateSignalInput | null;

  if (!body?.category || !Object.values(SignalCategory).includes(body.category)) {
    return NextResponse.json(fail("valid category is required", "BAD_REQUEST"), { status: 400 });
  }
  if (!body?.title || typeof body.title !== "string") {
    return NextResponse.json(fail("title is required", "BAD_REQUEST"), { status: 400 });
  }

  const actor = { actorId: "ceo", actorLabel: "CEO" };
  const now = new Date().toISOString();
  const capturedAt = body.capturedAt ?? now;

  const entry: SignalEventStub = {
    id: crypto.randomUUID(),
    category: body.category,
    title: body.title,
    detail: body.detail,
    occurredAt: body.occurredAt, // may be undefined (explicit)
    capturedAt,
    relatedDecisionId: body.relatedDecisionId,
    actor,
    audit: { createdAt: now, createdBy: actor },
  };

  const s = getStore();
  s.signalEventStubs.push(entry);

  return NextResponse.json(ok(entry), { status: 201 });
}

export async function GET() {
  const s = getStore();
  return NextResponse.json(ok(s.signalEventStubs));
}
