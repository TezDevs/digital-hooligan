import { DecisionConfidence, EvidenceItem } from "./decisionTypes";

export type ConfidenceTrend = "up" | "down" | "mixed" | "flat";

export interface ConfidenceNarrative {
  summary: string;
  trend: ConfidenceTrend;
  keyDrivers: string[];
}

/**
 * Generate a human-readable narrative explaining
 * why confidence is at its current level.
 *
 * This function is deterministic and side-effect free.
 */
export function generateConfidenceNarrative(params: {
  previous?: DecisionConfidence;
  current: DecisionConfidence;
  evidence: EvidenceItem[];
}): ConfidenceNarrative {
  const { previous, current, evidence } = params;

  const keyDrivers: string[] = [];

  // Determine trend
  let trend: ConfidenceTrend = "flat";
  if (previous) {
    if (current.score > previous.score) trend = "up";
    else if (current.score < previous.score) trend = "down";
    else trend = "flat";
  }

  // Extract drivers from evidence
  for (const item of evidence) {
    if (item.status === "used") {
      keyDrivers.push(`${item.signal} (${item.source})`);
    }
  }

  if (keyDrivers.length === 0) {
    keyDrivers.push("No strong supporting evidence");
  }

  // Build summary
  const summaryParts: string[] = [];

  if (previous) {
    summaryParts.push(
      `Confidence changed from ${previous.label} to ${current.label}`
    );
  } else {
    summaryParts.push(`Confidence assessed as ${current.label}`);
  }

  if (trend === "up") {
    summaryParts.push("due to strengthening signals");
  } else if (trend === "down") {
    summaryParts.push("due to weakening or stale signals");
  }

  return {
    summary: summaryParts.join(" "),
    trend,
    keyDrivers,
  };
}
