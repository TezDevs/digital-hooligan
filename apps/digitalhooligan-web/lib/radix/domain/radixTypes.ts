// apps/digitalhooligan-web/lib/radix/domain/radixTypes.ts
/**
 * RadixOS v1 — Domain Types (FROZEN semantics)
 * - Single-user, single-tenant
 * - All entities serializable
 * - Append-only truth; derived fields are computed in Assembly
 * - No realtime; no complex persistence
 */

export type EntityId = string; // opaque, stable, no embedded meaning
export type ISODateTime = string; // UTC ISO-8601 timestamp
export type ISODate = string; // YYYY-MM-DD (day-scope key)

export interface ActorRef {
  actorId: string; // v1 can be a stable literal like "ceo"
  actorLabel?: string;
}

export interface AuditFields {
  createdAt: ISODateTime;
  createdBy: ActorRef;
  /**
   * Append-only preference: avoid updates where possible.
   * If used, it must be truthful and auditable.
   */
  updatedAt?: ISODateTime;
  updatedBy?: ActorRef;
}

/**
 * Status values should be stable, fixed vocabulary.
 * status is DERIVED from timestamps in Assembly.
 */
export enum DecisionStatus {
  Proposed = "proposed",
  Active = "active",
  Closed = "closed",
}

export enum DecisionCategory {
  Strategy = "strategy",
  Client = "client",
  System = "system",
  Finance = "finance",
  Other = "other",
}

export enum RitualType {
  Daily = "daily",
  Weekly = "weekly",
}

export enum WorkModeType {
  Founder = "founder",
  Owner = "owner",
  Operator = "operator",
}

export enum SignalCategory {
  Market = "market",
  Client = "client",
  System = "system",
  Other = "other",
}

export enum PulseMetricType {
  MonthlyRevenue = "monthlyRevenue",
  ActiveClients = "activeClients",
  ExecutionLoad = "executionLoad",
  HealthScore = "healthScore",
}

/**
 * Template keying is intentionally narrow in v1.
 * Template versions live in Presentation; the domain captures completion + minimal responses.
 */
export type RitualTemplateKey = "daily-reset-v1" | "weekly-review-v1";

/**
 * Pulse meta is strictly limited in v1.
 * Keep serializable; no Date objects.
 */
export type PulseMetricMeta =
  | {
      metricType: PulseMetricType.MonthlyRevenue;
      currency: "USD";
      source: "manual" | "stripe_stub";
    }
  | {
      metricType:
        | PulseMetricType.ActiveClients
        | PulseMetricType.ExecutionLoad
        | PulseMetricType.HealthScore;
      source: "manual";
    };

export interface DecisionEntry {
  id: EntityId;

  title: string;
  summary?: string;

  category?: DecisionCategory;

  proposedAt: ISODateTime;
  activatedAt?: ISODateTime;
  closedAt?: ISODateTime;

  actor: ActorRef;
  audit: AuditFields;

  relatedSignalIds?: EntityId[];
  tags?: string[];

  /**
   * Derived (not authoritative): compute in Assembly and pass to UI.
   */
  status?: DecisionStatus;
}

export interface WorkModeState {
  id: EntityId;

  mode: WorkModeType;

  effectiveFrom: ISODateTime;
  effectiveTo?: ISODateTime | null;

  actor: ActorRef;
  audit: AuditFields;

  note?: string;
}

export interface PulseMetricEntry {
  id: EntityId;

  metricType: PulseMetricType;
  value: number;

  capturedAt: ISODateTime;

  actor: ActorRef;
  audit: AuditFields;

  meta?: PulseMetricMeta;
}

export interface RitualEntry {
  id: EntityId;

  ritualType: RitualType;
  templateKey: RitualTemplateKey;

  completedAt: ISODateTime;
  forDate: ISODate;

  actor: ActorRef;
  audit: AuditFields;

  responses?: Record<string, string>;
  note?: string;

  referencedDecisionIds?: EntityId[];
}

export interface SignalEventStub {
  id: EntityId;

  category: SignalCategory;

  title: string;
  detail?: string;

  /**
   * Optional: omit if unknown. Do not infer.
   */
  occurredAt?: ISODateTime;

  /**
   * When the signal was logged into RadixOS.
   */
  capturedAt: ISODateTime;

  actor: ActorRef;
  audit: AuditFields;

  relatedDecisionId?: EntityId;
}

/**
 * OpsSnapshot (Derived Read Model — NOT persisted)
 */
export interface OpsSnapshot {
  asOf: ISODateTime;

  currentWorkMode: WorkModeState | null;

  openDecisions: DecisionEntry[];
  recentDecisions: DecisionEntry[];

  latestPulse: Record<PulseMetricType, PulseMetricEntry | null>;

  recentRituals: RitualEntry[];
  recentSignals: SignalEventStub[];

  missingData: string[];
}
