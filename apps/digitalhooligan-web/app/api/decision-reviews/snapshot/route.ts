import { NextResponse } from "next/server";
import { requireDecisionReviewAuth } from "@/lib/requireDecisionReviewAuth";
import { buildDecisionReviewSnapshot } from "@/lib/buildDecisionReviewSnapshot";

export async function GET(request: Request) {
  const authResult = requireDecisionReviewAuth(request);
  if (authResult) return authResult;

  const snapshot = buildDecisionReviewSnapshot();
  return NextResponse.json(snapshot);
}
