import { NextRequest, NextResponse } from "next/server";
import { buildDecisionReviewSnapshot } from "@/lib/decisionReviewSnapshot";
import { Decision } from "@/lib/decisionTypes";

// TODO: replace with real data access layer
function getDecisionById(_id: string): Decision | null {
  return null;
}

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  void id; // intentional until data layer is wired

  const decision = getDecisionById(id);

  if (!decision) {
    return NextResponse.json({ error: "Decision not found" }, { status: 404 });
  }

  const snapshot = buildDecisionReviewSnapshot({
    decision,
  });

  return NextResponse.json(snapshot, { status: 200 });
}
