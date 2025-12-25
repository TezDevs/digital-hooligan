export type InputStatus = "fresh" | "degraded" | "missing" | "unknown";

export interface DecisionInput {
  id: string;
  name: string;
  source: string;
  lastUpdatedAt: string | null; // ISO timestamp or null if unknown
  status: InputStatus;
  confidence: number; // 0–100
  usedBy: string[];
}
