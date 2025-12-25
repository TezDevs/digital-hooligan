// apps/digitalhooligan-web/lib/decision/getDecisions.ts

import { DecisionState } from "./decisionState";
import { mockDecisions } from "./mockDecisions";

/**
 * Read-only accessor for decision state.
 * Later this may fetch from an API or database.
 */
export function getDecisions(): DecisionState[] {
  return mockDecisions;
}
