// apps/digitalhooligan-web/lib/realMetrics.ts

export type RealMetricSource = "manual-seed" | "local-json" | "external";

export type RealMetricRecord = {
    key: string;
    value: number;
    unit?: string;
    label: string;
    updatedAt: string; // ISO timestamp
    source: RealMetricSource;
};

/**
 * Tiny seed map for metrics we want to treat as "live".
 * Later this can come from a DB, analytics, billing, or infra.
 *
 * Keys should match entries in APP_REGISTRY.metricsKeys.
 */
export const REAL_METRICS: Record<string, RealMetricRecord> = {
    // Example: PennyWize active users
    pennywize_users: {
        key: "pennywize_users",
        value: 128,
        unit: "users",
        label: "PennyWize active users (seed)",
        updatedAt: new Date("2025-12-04T12:00:00.000Z").toISOString(),
        source: "manual-seed",
    },
    // Add future entries here as you like, e.g.:
    // "dropsignal_users": { ... },
    // "ops_toys_runs": { ... },
};

/**
 * Look up a record by metric key.
 */
export function getRealMetric(
    key: string,
): RealMetricRecord | null {
    return REAL_METRICS[key] ?? null;
}

/**
 * Convenience helper to check if a key is backed by REAL_METRICS.
 */
export function isRealMetricKey(key: string | null | undefined): boolean {
    if (!key) return false;
    return Boolean(REAL_METRICS[key]);
}