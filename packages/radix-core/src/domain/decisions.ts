import type { DecisionId, IsoDateTimeString } from "./ids";
import type { DataSource } from "./metrics";

export type DecisionStatus = "open" | "resolved" | "deferred";
export type DecisionImpact = "high" | "medium" | "low";

export interface Decision {
  id: DecisionId;
  title: string;
  status: DecisionStatus;
  impact: DecisionImpact;

  /**
   * Short framing/context. v1 is manual-first.
   * Avoid long narrative; link to canonical doc later.
   */
  context?: string;

  createdAt: IsoDateTimeString;
  dueAt?: IsoDateTimeString;
  resolvedAt?: IsoDateTimeString;

  source: DataSource;
  lastUpdatedAt: IsoDateTimeString;

  tags?: string[];
}
