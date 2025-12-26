export type DecisionReviewExportFormat = "json" | "csv";

export interface DecisionReviewExportRecord {
  id: string;
  decisionId: string;
  title: string;
  status: "open" | "closed" | "review";
  confidence: number | null;
  createdAt: string;
  reviewedAt: string | null;
}

export interface DecisionReviewExportPayload {
  exportedAt: string;
  total: number;
  records: DecisionReviewExportRecord[];
}
