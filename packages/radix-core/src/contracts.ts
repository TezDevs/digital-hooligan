/**
 * Radix Core Contracts (Dogfood v1)
 *
 * Purpose:
 * - Provide compile-time "freeze" for the shapes returned by selector builders
 *   that power the cockpit app.
 * - In v1 we intentionally contract to CURRENT domain-return shapes to avoid
 *   introducing a parallel VM schema that diverges from domain types.
 *
 * Notes:
 * - These contracts are *compile-time* only.
 * - Do not introduce TitleCase enums here unless domain also uses them.
 */

import type { Mode } from "./domain/mode";
import type { Metric } from "./domain/metrics";
import type { Decision } from "./domain/decisions";
import type { Module } from "./domain/modules";
import type { HealthCheck } from "./domain/health";
import type { TimelineEvent } from "./domain/timeline";

import type { AtlasOperator } from "./domain/atlas";
import type { Workflow } from "./domain/workflows";

/**
 * Dashboard contracts
 *
 * These match the current return shape from:
 * - selectors/buildCeoDashboardView.ts
 */
export interface MissingDataIssueVM {
  key: string;
  message: string;
}

export interface StaleDataIssueVM {
  key: string;
  lastUpdatedAt: string;
  staleAfterHours: number;
}

export interface PriorityStackVM {
  nowTop3: string[];
  next: string[];
  later: string[];
  lastUpdatedAt: string;
  source: "manual" | "mock" | "integration";
}

export interface CeoDashboardViewVM {
  mode: Mode;
  asOf: string;

  metrics: Metric[];
  openDecisions: Decision[];
  alerts: string[];

  priorityStack: PriorityStackVM;

  health: HealthCheck;
  modules: Module[];

  timeline: TimelineEvent[];

  missingData: MissingDataIssueVM[];
  staleData: StaleDataIssueVM[];
}

/**
 * AI Hub contracts
 *
 * These match the current return shape from:
 * - selectors/buildAiHubView.ts
 *
 * We intentionally use DOMAIN objects (AtlasOperator/Workflow) in v1.
 * If/when we later introduce a pure "VM schema", do it as a separate migration PR.
 */
export interface AiHubReferenceIssueVM {
  type: "missing_operator";
  operatorId: string;
  workflowId: string;
  workflowStepId: string;
  message: string;
}

export interface AiHubViewVM {
  operators: AtlasOperator[];
  workflows: Workflow[];
  issues: AiHubReferenceIssueVM[];
}

/**
 * Optional: Export MasterPromptKind to match current domain values,
 * since this came up in TS errors.
 */
export type MasterPromptKind = "url" | "note" | "repo_path";
