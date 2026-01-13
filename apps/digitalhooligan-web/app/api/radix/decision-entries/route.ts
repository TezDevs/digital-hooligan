import { NextResponse } from "next/server";
import { deriveDecisionStatus } from "../../../../lib/radix/domain/derive";
import { DecisionEntry } from "../../../../lib/radix/domain/radixTypes";
import { getStore } from "../../../../lib/radix/infrastructure/adapters/memory/memoryStore";
import { fail, ok } from "../../../../lib/radix/infrastructure/http/responseEnvelope";

type CreateDecisionInput = {
  title: string;
  summary?: string;
  proposedAt?: string; // if omitted, server uses now
};

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as CreateDecisionInput | null;
  if (!body?.title || typeof body.title !== "string") {
    return NextResponse.json(fail("title is required", "BAD_REQUEST"), { status: 400 });
  }

  const actor = { actorId: "ceo", actorLabel: "CEO" };
  const now = new Date().toISOString();
  const proposedAt = body.proposedAt ?? now;

  const entry: DecisionEntry = {
    id: crypto.randomUUID(),
    title: body.title,
    summary: body.summary,
    proposedAt,
    activatedAt: undefined,
    closedAt: undefined,
    status: deriveDecisionStatus({ activatedAt: undefined, closedAt: undefined }),
    actor,
    audit: { createdAt: now, createdBy: actor },
  };

  const s = getStore();
  s.decisionEntries.push(entry);

  return NextResponse.json(ok(entry), { status: 201 });
}

export async function GET() {
  const s = getStore();
  return NextResponse.json(ok(s.decisionEntries));
}
