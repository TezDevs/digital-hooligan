import { DecisionInput } from "./decisionInput";

export const mockDecisionInputs: DecisionInput[] = [
  {
    id: "input-001",
    decisionId: "dec-001",
    name: "System Architecture Review",
    source: "Internal analysis",
    status: "fresh",
    confidence: 90,
    sourceReliability: 0.9,
  },
  {
    id: "input-002",
    decisionId: "dec-001",
    name: "CEO Priority Alignment",
    source: "Owner directive",
    status: "fresh",
    confidence: 85,
    sourceReliability: 1.0,
  },
  {
    id: "input-003",
    decisionId: "dec-002",
    name: "KPI Definition Draft",
    source: "Ops notes",
    status: "missing",
    confidence: 40,
    sourceReliability: 0.6,
  },
];
