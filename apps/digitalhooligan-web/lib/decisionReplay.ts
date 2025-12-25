import { evaluateDecision } from "./decisionEngine";
import { deriveDecisionConfidence } from "./decisionConfidence";
import { evaluateDecisionActions } from "./decisionActions";
import { DecisionSnapshot } from "./decisionTypes";

export function replayDecision(snapshot: DecisionSnapshot): DecisionSnapshot {
  const evaluated = evaluateDecision(snapshot.inputs);

  const confidence = deriveDecisionConfidence(
    evaluated.state,
    evaluated.completeness
  );

  const guardrails = {
    blocked: false,
    reasons: [],
    allowedState: evaluated.state,
  };

  const actions = evaluateDecisionActions(
    evaluated.state,
    confidence,
    guardrails,
    snapshot.id
  );

  return {
    id: `replay-${snapshot.id}`,
    evaluatedAt: new Date().toISOString(),
    inputs: snapshot.inputs,
    result: {
      state: evaluated.state,
      confidence,
      actions,
    },
  };
}
