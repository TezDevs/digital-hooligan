import { getDecisionInputs } from "./decisionSources";
import { DecisionStatus } from "./domain/decisionStatus";
/**
 * ===== Core Decision Types (RESTORED) =====
 */

export type DecisionInput = Awaited<ReturnType<typeof getDecisionInputs>>;

export type DecisionState = "ACT" | "MONITOR" | "NOMINAL";

export type DecisionConfidence = {
  score: number; // 0–100
  label: "LOW" | "MEDIUM" | "HIGH";
};

export type DecisionAction = {
  id: string;
  enabled: boolean;
};

export type DecisionResult = {
  state: DecisionState;
  confidence: DecisionConfidence;
  actions: DecisionAction[];
};

export type DecisionSnapshot = {
  id: string;
  evaluatedAt: string;
  inputs: DecisionInput;
  result: DecisionResult;
};

export type DecisionEvent = {
  id: string;
  state: DecisionState;
  summary: string;
  evaluatedAt: string;
};

export type EvidenceItem = {
  id: string;
  source: string;
  signal: string;
  status: "used" | "missing" | "stale";
  timestamp: string;
};

/**
 * ===== Confidence Delta Extension (ADDITIVE) =====
 */

export type ConfidenceSnapshot = {
  id: string;
  inputId: string;
  weight: number; // 0–1 importance
  value: number; // 0–1 signal strength
  observedAt: string; // ISO timestamp
};

/**
 * ===== Decision Convenience Shape (ADDITIVE) =====
 * Used by CEO UI and inspectors.
 * Does NOT replace snapshots or results.
 */

export interface Decision {
  id: string;
  title: string;
  createdAt: string;

  // Current evaluated result
  state: DecisionState;
  confidence: DecisionConfidence;

  // Supporting data
  evidence: EvidenceItem[];

  // Confidence evolution inputs
  confidenceBaseline: number;
  confidenceSnapshots: ConfidenceSnapshot[];
}
/** decision list */
export type DecisionListItem = {
  id: string;
  title: string;
  status: DecisionStatus;
  createdAt: string;
  updatedAt: string;
};
