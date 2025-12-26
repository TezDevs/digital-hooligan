import { NextResponse } from "next/server";

export function requireDecisionReviewAuth(request: Request) {
  const expectedToken = process.env.DECISION_REVIEW_API_TOKEN;

  if (!expectedToken) {
    return NextResponse.json(
      { error: "Decision Review API token not configured" },
      { status: 500 }
    );
  }

  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.replace("Bearer ", "");

  if (token !== expectedToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
