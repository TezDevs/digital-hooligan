export type Decision = {
  id: string;
  title: string;
  state: "draft" | "review" | "approved" | "rejected";
  confidence: number;
  updatedAt: string;
};

export const DECISIONS: Decision[] = [
  {
    id: "decision-local-001",
    title: "Vendor Selection",
    state: "draft",
    confidence: 0.42,
    updatedAt: "2025-01-01T12:00:00Z",
  },
  {
    id: "decision-local-002",
    title: "Infra Migration",
    state: "review",
    confidence: 0.68,
    updatedAt: "2025-01-02T09:30:00Z",
  },
];
