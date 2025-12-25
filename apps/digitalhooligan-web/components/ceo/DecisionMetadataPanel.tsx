"use client";

import { calculateConfidenceTimeline } from "@/lib/decisionConfidence";
import { Decision } from "@/lib/decisionTypes";

type DecisionMetadataPanelProps = {
  decision: Decision;
};

export default function DecisionMetadataPanel({
  decision,
}: DecisionMetadataPanelProps) {
  const timeline = calculateConfidenceTimeline(
    decision.confidenceBaseline,
    decision.confidenceSnapshots
  );

  return (
    <div className="rounded-lg border border-neutral-800 p-4 space-y-2">
      <div className="text-sm font-semibold text-neutral-200">
        Decision Confidence
      </div>

      <div className="text-xs text-neutral-400">
        Baseline: {(decision.confidenceBaseline * 100).toFixed(0)}%
      </div>

      <div className="text-xs text-neutral-300">
        Current: {(timeline.current * 100).toFixed(0)}%
      </div>

      <div className="text-xs text-neutral-500">
        Based on {timeline.snapshots.length} inputs
      </div>
    </div>
  );
}
