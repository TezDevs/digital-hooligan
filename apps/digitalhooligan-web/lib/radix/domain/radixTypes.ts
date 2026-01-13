export type EntityId = string; // opaque, stable
export type ISODateTime = string; // UTC ISO-8601 timestamp
export type ISODate = string; // YYYY-MM-DD

export interface ActorRef {
  actorId: string; // v1 can be a stable literal like "ceo"
  actorLabel?: string;
}

export interface AuditFields {
  createdAt: ISODateTime;
  createdBy: ActorRef;
  updatedAt?: ISODateTime;
  updatedBy?: ActorRef;
}

export enum DecisionStatus {
  Proposed = "Proposed",
  Active = "Active",
  Closed = "Closed",
}

export enum DecisionCategory {
  Strategy = "Strategy",
  Client = "Client",
  System = "System",
  Finance = "Finance",
  Other = "Other",
}

export enum RitualType {
  Daily = "Daily",
  Weekly = "Weekly",
}

export enum WorkModeType {
  Founder = "Founder",
  Owner = "Owner",
  Operator = "Operator",
}

export enum SignalCategory {
  Market = "Market",
  Client = "Client",
  System = "System",
  Other = "Other",
}

export enum PulseMetricType {
  MonthlyRevenue = "MonthlyRevenue",
  ActiveClients = "ActiveClients",
  ExecutionLoad = "ExecutionLoad",
  HealthScore = "HealthScore",
}

export interface DecisionEntry {
  id: EntityId;
  title: string;
  summary?: string;
  category?: DecisionCategory;

  // derived informational property (not persisted as truth)
  status: DecisionStatus;

  proposedAt: ISODateTime;
  activatedAt?: ISODateTime;
  closedAt?: ISODateTime;

  actor: ActorRef;
  audit: AuditFields;

  relatedSignalIds?: EntityId[];
  tags?: string[];
}

export interface WorkModeState {
  id: EntityId;
  mode: WorkModeType;
  effectiveFrom: ISODateTime;
  effectiveTo?: ISODateTime | null; // null => current
  actor: ActorRef;
  audit: AuditFields;
  note?: string;
}

export type PulseMetricMeta =
  | {
      currency: "USD";
      source: "manual" | "stripe_stub";
    }
  | {
      source: "manual";
    }
  | Record<string, never>;

export interface PulseMetricEntry {
  id: EntityId;
  metricType: PulseMetricType;
  value: number;
  capturedAt: ISODateTime;
  actor: ActorRef;
  audit: AuditFields;
  meta?: PulseMetricMeta;
}

export type RitualTemplateKey = "daily-reset-v1" | "weekly-review-v1";

export interface RitualEntry {
  id: EntityId;
  ritualType: RitualType;
  completedAt: ISODateTime;
  forDate: ISODate;

  actor: ActorRef;
  audit: AuditFields;

  templateKey: RitualTemplateKey;
  responses?: Record<string, string>;
  note?: string;

  referencedDecisionIds?: EntityId[];
}

export interface SignalEventStub {
  id: EntityId;
  category: SignalCategory;
  title: string;
  detail?: string;

  occurredAt?: ISODateTime; // optional if known
  capturedAt: ISODateTime;

  actor: ActorRef;
  audit: AuditFields;

  relatedDecisionId?: EntityId;
}

export type LatestPulseByType = Record<
  PulseMetricType,
  PulseMetricEntry | null
>;

export interface OpsSnapshot {
  asOf: ISODateTime;
  currentWorkMode: WorkModeState | null;
  openDecisions: DecisionEntry[];
  recentDecisions: DecisionEntry[];
  latestPulse: LatestPulseByType;
  recentRituals: RitualEntry[];
  recentSignals: SignalEventStub[];
  missingData: string[];
}

export interface IdentityMeta {
  appId: string;
  environment: "dev" | "staging" | "prod" | string;
  version: string;
  buildTimestamp: ISODateTime;
}

export type ApiError = {
  message: string;
  code?: string;
  details?: unknown;
};

export type ApiEnvelope<T> = {
  data: T | null;
  error: ApiError | null;
  meta: IdentityMeta;
};
