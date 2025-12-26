import { NextResponse } from "next/server";
import {
  DecisionReviewExportPayload,
  DecisionReviewExportRecord,
} from "@/lib/decisionReviewExports";
import { DecisionReviewWebhookEnvelope } from "@/lib/decisionReviewWebhooks";
import { sendDecisionReviewWebhook } from "@/lib/sendDecisionReviewWebhook";
import { requireDecisionReviewAuth } from "@/lib/requireDecisionReviewAuth";
import { writeDecisionReviewAuditLog } from "@/lib/writeDecisionReviewAuditLog";

function getDecisionReviewRecords(): DecisionReviewExportRecord[] {
  return [
    {
      id: "rev_001",
      decisionId: "dec_001",
      title: "Adopt new incident severity rubric",
      status: "closed",
      confidence: 0.82,
      createdAt: new Date("2025-01-12T14:21:00Z").toISOString(),
      reviewedAt: new Date("2025-01-14T09:03:00Z").toISOString(),
    },
    {
      id: "rev_002",
      decisionId: "dec_002",
      title: "Defer on-call rotation change",
      status: "review",
      confidence: null,
      createdAt: new Date("2025-01-18T18:40:00Z").toISOString(),
      reviewedAt: null,
    },
  ];
}

export async function POST(request: Request) {
  const authResult = requireDecisionReviewAuth(request);
  if (authResult) {
    writeDecisionReviewAuditLog({
      event: "decision.review.webhook.triggered",
      route: "/api/decision-reviews/webhooks/trigger",
      success: false,
      timestamp: new Date().toISOString(),
    });
    return authResult;
  }

  const webhookUrl = process.env.DECISION_REVIEW_WEBHOOK_URL;

  if (!webhookUrl) {
    writeDecisionReviewAuditLog({
      event: "decision.review.webhook.triggered",
      route: "/api/decision-reviews/webhooks/trigger",
      success: false,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { error: "Webhook URL not configured" },
      { status: 500 }
    );
  }

  const payload: DecisionReviewExportPayload = {
    exportedAt: new Date().toISOString(),
    total: 2,
    records: getDecisionReviewRecords(),
  };

  const envelope: DecisionReviewWebhookEnvelope = {
    event: "decision.review.exported",
    sentAt: new Date().toISOString(),
    payload,
  };

  const result = await sendDecisionReviewWebhook(webhookUrl, envelope);

  writeDecisionReviewAuditLog({
    event: "decision.review.webhook.triggered",
    route: "/api/decision-reviews/webhooks/trigger",
    success: result.ok,
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json({
    delivered: result.ok,
    status: result.status,
  });
}
