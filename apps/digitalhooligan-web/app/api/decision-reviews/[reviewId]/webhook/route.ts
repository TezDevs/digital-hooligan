import { NextResponse } from "next/server";
import { requireDecisionReviewAuth } from "@/lib/requireDecisionReviewAuth";
import { buildDecisionReviewSnapshot } from "@/lib/buildDecisionReviewSnapshot";

export async function POST(
  request: Request,
  context: { params: Promise<{ reviewId: string }> }
) {
  // Auth guard
  const authResult = requireDecisionReviewAuth(request);
  if (authResult) return authResult;

  // IMPORTANT: params are async in Next 16
  const { reviewId } = await context.params;

  // Canonical source of truth
  const snapshot = buildDecisionReviewSnapshot();
  const review = snapshot.recent.find((r) => r.id === reviewId);

  if (!review) {
    return NextResponse.json(
      { error: "Decision review not found" },
      { status: 404 }
    );
  }

  // Phase 1: read-only delivery stub
  const payload = {
    deliveredAt: new Date().toISOString(),
    review,
  };

  // Intentional side-effect only
  console.log("[decision-review webhook]", payload);

  return NextResponse.json({
    delivered: true,
    reviewId,
    deliveredAt: payload.deliveredAt,
  });
}
