export interface DecisionReviewSnapshotCounts {
  open: number;
  review: number;
  closed: number;
}

export interface DecisionReviewSnapshotItem {
  id: string;
  decisionId: string;
  title: string;
  status: "open" | "review" | "closed";
  updatedAt: string;
}

export interface DecisionReviewSnapshot {
  generatedAt: string;
  counts: DecisionReviewSnapshotCounts;
  recent: DecisionReviewSnapshotItem[];
  lastActivityAt: string | null;
}

// Re-export builder to preserve existing import contracts
export { buildDecisionReviewSnapshot } from "./buildDecisionReviewSnapshot";
