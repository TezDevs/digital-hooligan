import {
  ConfidenceSnapshot,
  ConfidenceTimeline,
  calculateConfidenceTimeline,
} from "./decisionConfidence";

export interface DecisionReplayFrame {
  at: string;
  confidence: number;
}

export interface DecisionReplay {
  frames: DecisionReplayFrame[];
  timeline: ConfidenceTimeline;
}

export function replayDecisionConfidence(
  baseline: number,
  snapshots: ConfidenceSnapshot[]
): DecisionReplay {
  const timeline = calculateConfidenceTimeline(baseline, snapshots);

  const frames: DecisionReplayFrame[] = timeline.deltas.map((d) => ({
    at: d.at,
    confidence: d.to,
  }));

  return {
    frames,
    timeline,
  };
}
