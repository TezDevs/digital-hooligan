import type { IsoDateTimeString, MetricId } from "./ids";

export type DataSource = "manual" | "mock" | "integration";

export type MetricValue = number | string;

export interface Metric {
  id: MetricId;
  key:
    | "runway_months"
    | "revenue_mtd_usd"
    | "active_client_slots"
    | "wip_items"
    | "ops_health_score"
    | "capacity_pct";
  label: string;
  value: MetricValue;
  unit?: string;
  source: DataSource;
  lastUpdatedAt: IsoDateTimeString;
  notes?: string;
}

export interface MetricStalenessPolicy {
  /** If lastUpdatedAt older than this many hours, consider stale. */
  staleAfterHours: number;
}
