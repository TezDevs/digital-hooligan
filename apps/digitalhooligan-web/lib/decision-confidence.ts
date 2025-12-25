export type ConfidenceSource =
  | "signal"
  | "metric"
  | "assumption"
  | "human"
  | "external";

export interface ConfidenceInputSnapshot {
  id: string;
  source: ConfidenceSource;
  weight: number; // 0–1 importance
  value: number; // 0–1 confidence contribution
  observedAt: string; // ISO timestamp
}

export interface ConfidenceDelta {
  from: number;
  to: number;
  delta: number;
  at: string; // ISO timestamp
  reason: string;
}

export interface ConfidenceTimeline {
  decisionId: string;
  baseline: number;
  snapshots: ConfidenceInputSnapshot[];
  deltas: ConfidenceDelta[];
  current: number;
}

export function calculateConfidenceTimeline(
  decisionId: string,
  baseline: number,
  snapshots: ConfidenceInputSnapshot[]
): ConfidenceTimeline {
  let current = baseline;
  const deltas: ConfidenceDelta[] = [];

  const ordered = [...snapshots].sort(
    (a, b) =>
      new Date(a.observedAt).getTime() - new Date(b.observedAt).getTime()
  );

  for (const snap of ordered) {
    const contribution = snap.value * snap.weight;
    const next = Math.max(
      0,
      Math.min(1, current + contribution - 0.5 * snap.weight)
    );

    deltas.push({
      from: current,
      to: next,
      delta: next - current,
      at: snap.observedAt,
      reason: `${snap.source} input updated`,
    });

    current = next;
  }

  return {
    decisionId,
    baseline,
    snapshots: ordered,
    deltas,
    current,
  };
}
