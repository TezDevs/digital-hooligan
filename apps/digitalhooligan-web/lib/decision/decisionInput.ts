export type InputStatus = "fresh" | "degraded" | "missing";

export interface DecisionInput {
  id: string;
  decisionId: string;
  name: string;
  source: string;
  status: InputStatus;
  confidence: number; // 0–100

  /**
   * Reliability of the source (0.0–1.0).
   * Defaults to 1.0 if omitted.
   */
  sourceReliability?: number;

  usedBy?: string[];
}
