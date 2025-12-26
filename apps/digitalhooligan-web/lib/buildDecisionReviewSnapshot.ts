import fs from "fs";
import path from "path";
import {
  DecisionReviewSnapshot,
  DecisionReviewSnapshotItem,
} from "./decisionReviewSnapshot";
import { DecisionReviewExportRecord } from "./decisionReviewExports";

const AUDIT_LOG_PATH = path.join(process.cwd(), ".decision-review-audit.log");

// NOTE:
// The argument is intentionally accepted but unused.
// This preserves compatibility with existing callers.
export function buildDecisionReviewSnapshot(
  _input?: unknown
): DecisionReviewSnapshot {
  const records: DecisionReviewExportRecord[] = [
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

  const counts = {
    open: records.filter((r) => r.status === "open").length,
    review: records.filter((r) => r.status === "review").length,
    closed: records.filter((r) => r.status === "closed").length,
  };

  const recent: DecisionReviewSnapshotItem[] = records
    .map((r) => ({
      id: r.id,
      decisionId: r.decisionId,
      title: r.title,
      status: r.status,
      updatedAt: r.reviewedAt ?? r.createdAt,
    }))
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 5);

  return {
    generatedAt: new Date().toISOString(),
    counts,
    recent,
    lastActivityAt: readLastAuditTimestamp(),
  };
}

function readLastAuditTimestamp(): string | null {
  if (!fs.existsSync(AUDIT_LOG_PATH)) return null;

  const lines = fs.readFileSync(AUDIT_LOG_PATH, "utf8").trim().split("\n");

  if (lines.length === 0) return null;

  try {
    const last = JSON.parse(lines[lines.length - 1]);
    return last.timestamp ?? null;
  } catch {
    return null;
  }
}
