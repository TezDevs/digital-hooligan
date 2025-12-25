import { DecisionSnapshot } from "./decisionTypes";

export type DecisionDiff = {
  stateChanged: boolean;
  fromState: string;
  toState: string;
  confidenceDelta: number;
  actionsChanged: {
    actionId: string;
    fromEnabled: boolean;
    toEnabled: boolean;
  }[];
};

export function diffDecisions(
  original: DecisionSnapshot,
  replayed: DecisionSnapshot
): DecisionDiff {
  const originalActions = original.result.actions ?? [];
  const replayedActions = replayed.result.actions ?? [];

  const actionsChanged = replayedActions
    .map((action) => {
      const before = originalActions.find((a) => a.id === action.id);
      if (!before) return null;

      if (before.enabled !== action.enabled) {
        return {
          actionId: action.id,
          fromEnabled: before.enabled,
          toEnabled: action.enabled,
        };
      }

      return null;
    })
    .filter(Boolean) as DecisionDiff["actionsChanged"];

  return {
    stateChanged: original.result.state !== replayed.result.state,
    fromState: original.result.state,
    toState: replayed.result.state,
    confidenceDelta:
      replayed.result.confidence.score - original.result.confidence.score,
    actionsChanged,
  };
}
