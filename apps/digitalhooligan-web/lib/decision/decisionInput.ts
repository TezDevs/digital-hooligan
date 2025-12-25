// apps/digitalhooligan-web/lib/decision/decisionInput.ts

export type InputStatus = "fresh" | "degraded" | "missing";

export interface DecisionInput {
  id: string;
  decisionId: string; // ← correlation key
  name: string;
  source: string;
  status: InputStatus;
  confidence: number; // 0–100
  usedBy?: string[];
}
