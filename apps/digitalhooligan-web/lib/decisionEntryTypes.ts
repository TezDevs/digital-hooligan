export type DecisionEntry = {
  id: string;
  title: string;
  state: "draft" | "final";
  createdAt: string;
  updatedAt: string;
  confidence: number;
  confidenceBaseline: number;
  evidence: unknown[];
};

export type DecisionEntrySummary = {
  id: string;
  state: "draft" | "review" | "approved" | "rejected";
  updatedAt: string;
};
