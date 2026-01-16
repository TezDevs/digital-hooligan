import type { Mode } from "../domain/mode";
import type { Metric } from "../domain/metrics";
import type { Decision } from "../domain/decisions";
import type { Module } from "../domain/modules";
import type { HealthCheck } from "../domain/health";
import type { TimelineEvent } from "../domain/timeline";
import type { CeoDashboardViewVM } from "../contracts";
import { computeCompositeHealthScore } from "../domain/health";
import { CEO_DASHBOARD_MOCK } from "../mocks/ceoDashboard.mock";
import {
  parseIsoToEpochMs,
  sortByOccurredAtDesc,
  toIsoNow,
} from "../util/time";

export interface MissingDataIssue {
  key: string;
  message: string;
}

export interface StaleDataIssue {
  key: string;
  lastUpdatedAt: string;
  staleAfterHours: number;
}

export interface CeoDashboardView {
  mode: Mode;
  asOf: string;

  metrics: Metric[];
  openDecisions: Decision[];
  alerts: string[];

  priorityStack: {
    nowTop3: string[];
    next: string[];
    later: string[];
    lastUpdatedAt: string;
    source: "manual" | "mock" | "integration";
  };

  health: HealthCheck;
  modules: Module[];

  timeline: TimelineEvent[];

  missingData: MissingDataIssue[];
  staleData: StaleDataIssue[];
}

export interface BuildCeoDashboardViewParams {
  mode: Mode;
  now?: string; // ISO override for tests
}

/**
 * Deterministic builder.
 * - No inference.
 * - Mode affects ordering/emphasis only.
 */
export function buildCeoDashboardView(
  params: BuildCeoDashboardViewParams
): CeoDashboardView {
  const asOf = params.now ?? toIsoNow();

  const missingData: MissingDataIssue[] = [];
  const staleData: StaleDataIssue[] = [];

  const mock = CEO_DASHBOARD_MOCK;

  // Compute health composite deterministically (allow mock to keep compositeScore=0).
  const computedHealthScore = computeCompositeHealthScore(
    mock.health.breakdown
  );
  const health: HealthCheck = {
    ...mock.health,
    compositeScore: computedHealthScore,
  };

  // Basic missing data checks
  if (mock.priorityStack.nowTop3.length === 0) {
    missingData.push({
      key: "priority_nowTop3",
      message: "Top 3 priorities (NOW) is empty.",
    });
  }
  if (mock.metrics.length < 4) {
    missingData.push({
      key: "metrics_count",
      message: "Metric strip should have at least 4 metrics.",
    });
  }

  // Staleness policy (v1)
  // - metrics: stale after 7 days
  // - priorities: stale after 7 days
  // - health: stale after 14 days
  // - modules: stale after 7 days
  const METRICS_STALE_HOURS = 24 * 7;
  const PRIORITIES_STALE_HOURS = 24 * 7;
  const HEALTH_STALE_HOURS = 24 * 14;
  const MODULES_STALE_HOURS = 24 * 7;

  const nowMs = parseIsoToEpochMs(asOf);

  for (const m of mock.metrics) {
    if (isStale(m.lastUpdatedAt, nowMs, METRICS_STALE_HOURS)) {
      staleData.push({
        key: `metric:${m.key}`,
        lastUpdatedAt: m.lastUpdatedAt,
        staleAfterHours: METRICS_STALE_HOURS,
      });
    }
  }

  if (
    isStale(mock.priorityStack.lastUpdatedAt, nowMs, PRIORITIES_STALE_HOURS)
  ) {
    staleData.push({
      key: "priorityStack",
      lastUpdatedAt: mock.priorityStack.lastUpdatedAt,
      staleAfterHours: PRIORITIES_STALE_HOURS,
    });
  }

  if (isStale(health.lastUpdatedAt, nowMs, HEALTH_STALE_HOURS)) {
    staleData.push({
      key: "health",
      lastUpdatedAt: health.lastUpdatedAt,
      staleAfterHours: HEALTH_STALE_HOURS,
    });
  }

  for (const mod of mock.modules) {
    if (isStale(mod.lastCheckedAt, nowMs, MODULES_STALE_HOURS)) {
      staleData.push({
        key: `module:${mod.key}`,
        lastUpdatedAt: mod.lastCheckedAt,
        staleAfterHours: MODULES_STALE_HOURS,
      });
    }
  }

  const openDecisions = mock.decisions
    .filter((d) => d.status === "open")
    .sort(
      (a, b) => parseIsoToEpochMs(b.createdAt) - parseIsoToEpochMs(a.createdAt)
    );

  const timeline = buildTimeline({
    decisions: mock.decisions,
    health,
    seeds: mock.timelineSeeds,
  });

  // Mode-based ordering/emphasis (no truth changes)
  const metrics = orderMetricsByMode(mock.metrics, params.mode);

  // Safe injection: enforce VM contract at the returned object shape
  return {
    mode: params.mode,
    asOf,

    metrics,
    openDecisions,
    alerts: mock.alerts,

    priorityStack: mock.priorityStack,

    health,
    modules: mock.modules,

    timeline,

    missingData,
    staleData,
  } satisfies CeoDashboardViewVM;
}

function isStale(
  lastUpdatedAtIso: string,
  nowMs: number,
  staleAfterHours: number
): boolean {
  const lastMs = parseIsoToEpochMs(lastUpdatedAtIso);
  const diffMs = Math.max(0, nowMs - lastMs);
  return diffMs > staleAfterHours * 60 * 60 * 1000;
}

function buildTimeline(input: {
  decisions: Decision[];
  health: HealthCheck;
  seeds: TimelineEvent[];
}): TimelineEvent[] {
  const decisionEvents: TimelineEvent[] = input.decisions.map((d) => ({
    id: `tln_dec_${d.id}` as unknown as string,
    type: "decision",
    title: `Decision: ${d.title}`,
    occurredAt: d.createdAt,
    summary: d.status === "open" ? "Open decision" : `Decision ${d.status}`,
    source: d.source,
  }));

  const healthEvent: TimelineEvent = {
    id: "tln_health_latest",
    type: "health_check",
    title: "Health Check",
    occurredAt: input.health.occurredAt,
    summary: `Composite: ${input.health.compositeScore}`,
    source: input.health.source,
  };

  const all = [...input.seeds, ...decisionEvents, healthEvent];
  return sortByOccurredAtDesc(all);
}

function orderMetricsByMode(metrics: Metric[], mode: Mode): Metric[] {
  const order: Record<Mode, Metric["key"][]> = {
    Founder: [
      "runway_months",
      "revenue_mtd_usd",
      "active_client_slots",
      "ops_health_score",
      "capacity_pct",
      "wip_items",
    ],
    Owner: [
      "runway_months",
      "revenue_mtd_usd",
      "ops_health_score",
      "active_client_slots",
      "capacity_pct",
      "wip_items",
    ],
    Operator: [
      "wip_items",
      "capacity_pct",
      "ops_health_score",
      "revenue_mtd_usd",
      "active_client_slots",
      "runway_months",
    ],
  };

  const desired = order[mode];
  const rank = new Map<Metric["key"], number>();
  desired.forEach((k, i) => rank.set(k, i));

  return [...metrics].sort((a, b) => {
    const ra = rank.get(a.key) ?? 999;
    const rb = rank.get(b.key) ?? 999;
    if (ra !== rb) return ra - rb;
    return a.label.localeCompare(b.label);
  });
}
