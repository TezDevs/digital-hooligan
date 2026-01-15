import type { IsoDateTimeString, TimelineEventId } from "./ids";
import type { DataSource } from "./metrics";

export type TimelineEventType =
  | "decision"
  | "milestone"
  | "lesson"
  | "health_check"
  | "note";

export interface TimelineEvent {
  id: TimelineEventId;
  type: TimelineEventType;
  title: string;
  occurredAt: IsoDateTimeString;

  summary?: string;

  source: DataSource;
}
