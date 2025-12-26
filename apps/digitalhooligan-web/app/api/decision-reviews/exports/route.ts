import { NextResponse } from "next/server";
import {
  DecisionReviewExportFormat,
  DecisionReviewExportPayload,
  DecisionReviewExportRecord,
} from "@/lib/decisionReviewExports";
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

function toCSV(records: DecisionReviewExportRecord[]): string {
  const header = [
    "id",
    "decisionId",
    "title",
    "status",
    "confidence",
    "createdAt",
    "reviewedAt",
  ];

  const rows = records.map((r) =>
    [
      r.id,
      r.decisionId,
      `"${r.title.replace(/"/g, '""')}"`,
      r.status,
      r.confidence ?? "",
      r.createdAt,
      r.reviewedAt ?? "",
    ].join(",")
  );

  return [header.join(","), ...rows].join("\n");
}

export async function GET(request: Request) {
  const authResult = requireDecisionReviewAuth(request);
  if (authResult) {
    writeDecisionReviewAuditLog({
      event: "decision.review.export.requested",
      route: "/api/decision-reviews/exports",
      success: false,
      timestamp: new Date().toISOString(),
    });
    return authResult;
  }

  const { searchParams } = new URL(request.url);
  const format =
    (searchParams.get("format") as DecisionReviewExportFormat) ?? "json";

  const records = getDecisionReviewRecords();

  const payload: DecisionReviewExportPayload = {
    exportedAt: new Date().toISOString(),
    total: records.length,
    records,
  };

  writeDecisionReviewAuditLog({
    event: "decision.review.export.requested",
    route: "/api/decision-reviews/exports",
    success: true,
    timestamp: new Date().toISOString(),
  });

  if (format === "csv") {
    const csv = toCSV(records);
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition":
          'attachment; filename="decision-reviews-export.csv"',
      },
    });
  }

  return NextResponse.json(payload);
}
