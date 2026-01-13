import { NextResponse } from "next/server";
import { PulseMetricEntry, PulseMetricType } from "../../../../lib/radix/domain/radixTypes";
import { getStore } from "../../../../lib/radix/infrastructure/adapters/memory/memoryStore";
import { fail, ok } from "../../../../lib/radix/infrastructure/http/responseEnvelope";

type CreatePulseMetricInput = {
  metricType: PulseMetricType;
  value: number;
  capturedAt?: string;
};

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as CreatePulseMetricInput | null;

  if (!body?.metricType || !Object.values(PulseMetricType).includes(body.metricType)) {
    return NextResponse.json(fail("valid metricType is required", "BAD_REQUEST"), { status: 400 });
  }
  if (typeof body.value !== "number" || Number.isNaN(body.value)) {
    return NextResponse.json(fail("value must be a number", "BAD_REQUEST"), { status: 400 });
  }

  const actor = { actorId: "ceo", actorLabel: "CEO" };
  const now = new Date().toISOString();
  const capturedAt = body.capturedAt ?? now;

  const entry: PulseMetricEntry = {
    id: crypto.randomUUID(),
    metricType: body.metricType,
    value: body.value,
    capturedAt,
    actor,
    audit: { createdAt: now, createdBy: actor },
    meta:
      body.metricType === PulseMetricType.MonthlyRevenue
        ? { currency: "USD", source: "manual" }
        : { source: "manual" },
  };

  const s = getStore();
  s.pulseMetricEntries.push(entry);

  return NextResponse.json(ok(entry), { status: 201 });
}

export async function GET() {
  const s = getStore();
  return NextResponse.json(ok(s.pulseMetricEntries));
}
