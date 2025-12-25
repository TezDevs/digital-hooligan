import { getDecisionInputs } from "./decisionSources";

export type DecisionInput = Awaited<ReturnType<typeof getDecisionInputs>>;

export type DecisionSnapshot = {
  id: string;
  evaluatedAt: string;
  inputs: DecisionInput;
  result: {
    state: DecisionState;
    confidence: DecisionConfidence;
    actions: DecisionAction[];
  };
};
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
