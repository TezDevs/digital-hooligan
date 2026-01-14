// apps/digitalhooligan-web/app/api/ceo/decisions/[id]/review/route.ts

import { NextRequest, NextResponse } from "next/server";
import { buildDecisionReviewSnapshot } from "@/lib/buildDecisionReviewSnapshot";
import type { Decision } from "@/lib/decisionTypes";

// TODO: replace with real data access layer
function getDecisionById(id: string): Decision | null {
  void id; // intentional until data layer is wired
  return null;
}

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const decision = getDecisionById(id);

  if (!decision) {
    return NextResponse.json({ error: "Decision not found" }, { status: 404 });
  }

  const snapshot = buildDecisionReviewSnapshot({ decision });

  return NextResponse.json(snapshot, { status: 200 });
}
