import { NextResponse } from "next/server";
import { WorkModeState, WorkModeType } from "../../../../lib/radix/domain/radixTypes";
import { getStore } from "../../../../lib/radix/infrastructure/adapters/memory/memoryStore";
import { fail, ok } from "../../../../lib/radix/infrastructure/http/responseEnvelope";

type CreateWorkModeInput = {
  mode: WorkModeType;
  effectiveFrom?: string; // default now
  note?: string;
};

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as CreateWorkModeInput | null;
  if (!body?.mode || !Object.values(WorkModeType).includes(body.mode)) {
    return NextResponse.json(fail("valid mode is required", "BAD_REQUEST"), { status: 400 });
  }

  const actor = { actorId: "ceo", actorLabel: "CEO" };
  const now = new Date().toISOString();
  const effectiveFrom = body.effectiveFrom ?? now;

  const s = getStore();

  // invariant: close previous current interval (effectiveTo=null) before creating new
  const current = s.workModeStates.find((x) => x.effectiveTo === null || typeof x.effectiveTo === "undefined");
  if (current) {
    current.effectiveTo = effectiveFrom;
    current.audit.updatedAt = now;
    current.audit.updatedBy = actor;
  }

  const next: WorkModeState = {
    id: crypto.randomUUID(),
    mode: body.mode,
    effectiveFrom,
    effectiveTo: null,
    note: body.note,
    actor,
    audit: { createdAt: now, createdBy: actor },
  };

  s.workModeStates.push(next);
  return NextResponse.json(ok(next), { status: 201 });
}

export async function GET() {
  const s = getStore();
  return NextResponse.json(ok(s.workModeStates));
}
