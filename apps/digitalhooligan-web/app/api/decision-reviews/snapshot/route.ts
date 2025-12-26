import { NextResponse } from "next/server";
import { requireDecisionReviewAuth } from "@/lib/requireDecisionReviewAuth";
import { buildDecisionReviewSnapshot } from "@/lib/buildDecisionReviewSnapshot";

export async function GET(request: Request) {
  // DEV-ONLY bypass for local inspection
  if (process.env.NODE_ENV === "development") {
    const snapshot = buildDecisionReviewSnapshot();
    return NextResponse.json(snapshot);
  }

  const authResult = requireDecisionReviewAuth(request);
  if (authResult) return authResult;

  const snapshot = buildDecisionReviewSnapshot();
  return NextResponse.json(snapshot);
}
