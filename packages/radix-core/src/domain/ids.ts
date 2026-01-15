/**
 * Identity rules (v1):
 * - IDs are opaque, stable, and do not encode meaning.
 * - Use a short prefix for debugging only (still opaque), followed by a stable token.
 * - No PII, no timestamps embedded in IDs.
 */

export type OpaqueId = string;

export type MetricId = OpaqueId;
export type DecisionId = OpaqueId;
export type ModuleId = OpaqueId;
export type HealthCheckId = OpaqueId;
export type TimelineEventId = OpaqueId;

export type AtlasOperatorId = OpaqueId;
export type WorkflowId = OpaqueId;
export type WorkflowStepId = OpaqueId;
export type AiActivityEntryId = OpaqueId;

export type IsoDateTimeString = string;

/**
 * Loose guardrail: <prefix>_<token>
 * Example: "dec_9f3k2m"
 */
export function isOpaqueId(value: string): boolean {
  return /^[a-z]{2,12}_[a-z0-9]{4,32}$/i.test(value);
}

export function assertOpaqueId(value: string, label: string): void {
  if (!isOpaqueId(value)) {
    throw new Error(
      `Invalid id for ${label}: "${value}". Expected pattern "<prefix>_<token>".`
    );
  }
}
