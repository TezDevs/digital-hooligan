// apps/digitalhooligan-web/lib/decision/mockDecisions.ts

import { DecisionState } from "./decisionState";

export const mockDecisions: DecisionState[] = [
  {
    id: "dec-001",
    title: "Proceed with Decision State Layer",
    status: "approved",
    rationale:
      "Core infrastructure required before higher-level recommendation logic.",
    blockers: [],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "dec-002",
    title: "Expand CEO Dashboard KPIs",
    status: "needs-input",
    rationale: "Awaiting clarity on which metrics matter most short-term.",
    blockers: ["Finalize KPI list", "Confirm data sources"],
    lastUpdated: new Date().toISOString(),
  },
];
