import { NextResponse } from "next/server";
import { buildOpsSnapshot } from "../../../../lib/radix/assembly/buildOpsSnapshot";
import { ok } from "../../../../lib/radix/infrastructure/http/responseEnvelope";

export async function GET() {
  const snapshot = buildOpsSnapshot();
  return NextResponse.json(ok(snapshot));
}
