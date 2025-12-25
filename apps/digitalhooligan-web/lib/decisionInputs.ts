import { DecisionInput } from "./decision";

export const decisionInputs: DecisionInput[] = [
  {
    id: "incidents",
    name: "Incident Feed",
    source: "Internal Ops API",
    lastUpdatedAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    status: "fresh",
    confidence: 95,
    usedBy: ["Attention Panel", "CEO Overview"],
  },
  {
    id: "health",
    name: "System Health Checks",
    source: "Health Monitor",
    lastUpdatedAt: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
    status: "degraded",
    confidence: 72,
    usedBy: ["CEO Overview"],
  },
  {
    id: "revenue",
    name: "Revenue Metrics",
    source: "Stripe",
    lastUpdatedAt: null,
    status: "missing",
    confidence: 40,
    usedBy: ["Financial Decisions"],
  },
  {
    id: "notes",
    name: "Manual CEO Notes",
    source: "Human Input",
    lastUpdatedAt: null,
    status: "unknown",
    confidence: 30,
    usedBy: ["Strategic Decisions"],
  },
];
