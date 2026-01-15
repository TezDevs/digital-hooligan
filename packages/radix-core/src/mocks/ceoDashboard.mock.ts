import type { Decision } from "../domain/decisions";
import type { HealthCheck } from "../domain/health";
import type { Metric } from "../domain/metrics";
import type { Module } from "../domain/modules";
import type { TimelineEvent } from "../domain/timeline";

/**
 * Dogfood surface (v1):
 * Edit this file to update your cockpit daily/weekly.
 * Keep updates small and explicit.
 */

export interface PriorityStackMock {
  nowTop3: string[];
  next: string[];
  later: string[];
  lastUpdatedAt: string; // ISO
  source: "manual" | "mock" | "integration";
}

export interface CeoDashboardMockData {
  metrics: Metric[];
  decisions: Decision[];
  alerts: string[];

  priorityStack: PriorityStackMock;

  health: HealthCheck;
  modules: Module[];

  /**
   * Optional manual timeline seeds. The selector will also derive events from decisions/health.
   */
  timelineSeeds: TimelineEvent[];
}

export const CEO_DASHBOARD_MOCK: CeoDashboardMockData = {
  metrics: [
    {
      id: "met_runway01",
      key: "runway_months",
      label: "Runway",
      value: 7.2,
      unit: "months",
      source: "manual",
      lastUpdatedAt: "2026-01-14T18:00:00.000Z",
    },
    {
      id: "met_rev01",
      key: "revenue_mtd_usd",
      label: "Revenue (MTD)",
      value: 12500,
      unit: "USD",
      source: "manual",
      lastUpdatedAt: "2026-01-14T18:00:00.000Z",
    },
    {
      id: "met_clients01",
      key: "active_client_slots",
      label: "Active Clients",
      value: 3,
      unit: "slots",
      source: "manual",
      lastUpdatedAt: "2026-01-14T18:00:00.000Z",
    },
    {
      id: "met_wip01",
      key: "wip_items",
      label: "WIP",
      value: 2,
      unit: "items",
      source: "manual",
      lastUpdatedAt: "2026-01-14T18:00:00.000Z",
      notes: "WIP limit target ≤ 2",
    },
    {
      id: "met_opshealth01",
      key: "ops_health_score",
      label: "Ops Health",
      value: 78,
      unit: "score",
      source: "manual",
      lastUpdatedAt: "2026-01-14T18:00:00.000Z",
    },
  ],

  decisions: [
    {
      id: "dec_9f3k2m",
      title: "Finalize RadixOS v1 dogfood scope and PR cadence",
      status: "open",
      impact: "high",
      context: "Lock v1: mock-first, deterministic. Decide PR sizes + rituals.",
      createdAt: "2026-01-14T19:30:00.000Z",
      dueAt: "2026-01-16T17:00:00.000Z",
      source: "manual",
      lastUpdatedAt: "2026-01-14T19:30:00.000Z",
      tags: ["radixos", "governance"],
    },
    {
      id: "dec_k1a8t2",
      title: "Choose canonical KPI set for v1 (strip)",
      status: "open",
      impact: "medium",
      context: "Runway, revenue MTD, client slots, WIP, ops health (confirm).",
      createdAt: "2026-01-14T20:10:00.000Z",
      source: "manual",
      lastUpdatedAt: "2026-01-14T20:10:00.000Z",
      tags: ["metrics"],
    },
  ],

  alerts: [
    "Dropsignal build is failing (repo debt) — do not block RadixOS PRs; fix separately.",
    "Update metrics weekly; stale badges should surface if > 7 days.",
  ],

  priorityStack: {
    nowTop3: [
      "Ship radix-core v1 (domain+mocks+selectors)",
      "Scaffold radix-cockpit app",
      "Wire / and /ai pages",
    ],
    next: [
      "Add stale/missing data badges in cockpit UI",
      "Add manual update guide panel",
    ],
    later: [
      "Integration adapters (Launch HQ, finance signals)",
      "Persistence layer (DB)",
    ],
    lastUpdatedAt: "2026-01-14T18:00:00.000Z",
    source: "manual",
  },

  health: {
    id: "hlc_7p2d9c",
    occurredAt: "2026-01-14T18:00:00.000Z",
    breakdown: {
      hours: 75,
      cognitive: 70,
      bus: 60,
      stress: 65,
      leverage: 55,
    },
    compositeScore: 0, // computed by selector; leave 0 here to keep manual entry simple
    source: "manual",
    lastUpdatedAt: "2026-01-14T18:00:00.000Z",
  },

  modules: [
    {
      id: "mod_opsos01",
      key: "opsos_platform",
      label: "OpsOS Platform",
      status: "mock",
      summary: "RadixOS v1 mock-first build in progress",
      source: "mock",
      lastCheckedAt: "2026-01-14T18:00:00.000Z",
    },
    {
      id: "mod_gravity01",
      key: "gravity",
      label: "Gravity",
      status: "not_connected",
      summary: "Public revenue engine (not wired in v1)",
      source: "mock",
      lastCheckedAt: "2026-01-14T18:00:00.000Z",
    },
    {
      id: "mod_penny01",
      key: "pennywize",
      label: "PennyWize",
      status: "not_connected",
      summary: "Finance signals (manual metrics in v1)",
      source: "mock",
      lastCheckedAt: "2026-01-14T18:00:00.000Z",
    },
    {
      id: "mod_drop01",
      key: "dropsignal",
      label: "DropSignal",
      status: "degraded",
      summary: "Build failing (middleware import missing) — repo debt",
      source: "manual",
      lastCheckedAt: "2026-01-15T00:10:00.000Z",
    },
    {
      id: "mod_hype01",
      key: "hypewatch",
      label: "HypeWatch",
      status: "not_connected",
      summary: "Not wired in v1",
      source: "mock",
      lastCheckedAt: "2026-01-14T18:00:00.000Z",
    },
    {
      id: "mod_ops01",
      key: "ops_toys",
      label: "OpsToys",
      status: "not_connected",
      summary: "Not wired in v1",
      source: "mock",
      lastCheckedAt: "2026-01-14T18:00:00.000Z",
    },
  ],

  timelineSeeds: [
    {
      id: "tln_seed01",
      type: "milestone",
      title: "RadixOS v1 spec locked (dogfood edition)",
      occurredAt: "2026-01-14T22:00:00.000Z",
      summary: "Internal cockpit defined; mock-first implementation plan.",
      source: "manual",
    },
  ],
};
