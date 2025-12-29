export interface DecisionEntry {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  state: "draft" | "final";
  confidence: number;
  confidenceBaseline: number;
  evidence: unknown[]; // intentionally loose for now
}
