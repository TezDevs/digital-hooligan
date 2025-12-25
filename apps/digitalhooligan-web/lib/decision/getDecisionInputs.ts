// apps/digitalhooligan-web/lib/decision/getDecisionInputs.ts

import { DecisionInput } from "./decisionInput";
import { mockDecisionInputs } from "./mockDecisionInputs";

export function getDecisionInputs(decisionId: string): DecisionInput[] {
  return mockDecisionInputs.filter((input) => input.decisionId === decisionId);
}
