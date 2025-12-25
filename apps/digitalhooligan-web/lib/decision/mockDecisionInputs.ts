// apps/digitalhooligan-web/lib/decision/mockDecisionInputs.ts

import { DecisionInput } from "./decisionInput";

export const mockDecisionInputs: DecisionInput[] = [
  {
    id: "input-001",
    decisionId: "dec-001",
    name: "System Architecture Review",
    source: "Internal analysis",
    status: "fresh",
    confidence: 90,
    usedBy: ["Decision State Layer"],
  },
  {
    id: "input-002",
    decisionId: "dec-001",
    name: "CEO Priority Alignment",
    source: "Owner directive",
    status: "fresh",
    confidence: 85,
  },
  {
    id: "input-003",
    decisionId: "dec-002",
    name: "KPI Definition Draft",
    source: "Ops notes",
    status: "missing",
    confidence: 40,
  },
];
