import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireDecisionReviewAuth } from "@/lib/requireDecisionReviewAuth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ decisionId: string }> }
) {
  const authResult = requireDecisionReviewAuth(request);
  if (authResult) return authResult;

  const { decisionId } = await params;

  // Reuse existing review endpoint
  const url = new URL(`/api/decisions/review/${decisionId}`, request.url);

  const res = await fetch(url.toString(), { cache: "no-store" });

  if (!res.ok) {
    return NextResponse.json({ error: "Decision not found" }, { status: 404 });
  }

  const decision = await res.json();

  return NextResponse.json({
    exportedAt: new Date().toISOString(),
    decision,
  });
}
