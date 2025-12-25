// apps/digitalhooligan-web/lib/decision/getDecisions.ts

import { DecisionState } from "./decisionState";
import { mockDecisions } from "./mockDecisions";
import { getDecisionInputs } from "./getDecisionInputs";
import { deriveDecisionBlockers } from "./deriveDecisionBlockers";
import { aggregateDecisionConfidence } from "./aggregateDecisionConfidence";

export function getDecisions(): DecisionState[] {
  return mockDecisions.map((decision) => {
    const inputs = getDecisionInputs(decision.id);

    const derivedBlockers = deriveDecisionBlockers(inputs);
    const confidence = aggregateDecisionConfidence(inputs);

    return {
      ...decision,
      blockers:
        derivedBlockers.length > 0 ? derivedBlockers : decision.blockers,
      confidence,
    };
  });
}
