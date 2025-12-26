import { NextResponse } from "next/server";
import { requireDecisionReviewAuth } from "@/lib/requireDecisionReviewAuth";
import { buildDecisionReviewSnapshot } from "@/lib/buildDecisionReviewSnapshot";

export async function GET(
  request: Request,
  context: { params: Promise<{ reviewId: string }> }
) {
  const authResult = requireDecisionReviewAuth(request);
  if (authResult) return authResult;

  // Next.js 16: params are async
  const { reviewId } = await context.params;

  const snapshot = buildDecisionReviewSnapshot();
  const review = snapshot.recent.find((r) => r.id === reviewId);

  if (!review) {
    return NextResponse.json(
      { error: "Decision review not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    exportedAt: new Date().toISOString(),
    review,
  });
}
