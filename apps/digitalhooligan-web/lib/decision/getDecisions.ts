import { DecisionState } from "./decisionState";
import { mockDecisions } from "./mockDecisions";
import { getDecisionInputs } from "./getDecisionInputs";
import { deriveDecisionBlockers } from "./deriveDecisionBlockers";
import { aggregateDecisionConfidence } from "./aggregateDecisionConfidence";

export function getDecisions(): DecisionState[] {
  return mockDecisions.map((decision) => {
    const inputs = getDecisionInputs(decision.id);

    const blockers = deriveDecisionBlockers(inputs);
    const confidence = aggregateDecisionConfidence(inputs);

    return {
      ...decision,
      blockers: blockers.length > 0 ? blockers : decision.blockers,
      confidence,
    };
  });
}
