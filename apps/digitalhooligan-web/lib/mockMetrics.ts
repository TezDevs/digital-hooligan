// apps/digitalhooligan-web/lib/mockMetrics.ts

/**
 * Tiny in-memory mock metrics adapter.
 *
 * Keys should match the string IDs defined in APP_REGISTRY.metricsKeys
 * (e.g. "pennywize_users", "pennywize_mrr", "site_uptime").
 *
 * Values are just numbers; the CEO Performance page decides how to format them
 * (users, dollars, percentages, etc.).
 */

const MOCK_METRICS: Record<string, number> = {
    // Main site
    site_unique_visitors: 128,
    site_uptime: 99.7,

    // CEO dashboard
    ceo_active_sessions: 1,

    // Labs HQ
    labs_hq_active_sessions: 1,

    // Dev Workbench
    dev_workbench_users: 1,

    // PennyWize
    pennywize_users: 0,
    pennywize_mrr: 0,
    pennywize_uptime: 0,

    // DropSignal
    dropsignal_users: 0,
    dropsignal_uptime: 0,

    // HypeWatch
    hypewatch_users: 0,
    hypewatch_uptime: 0,

    // Ops Toys
    ops_toys_usage: 0,
    ops_toys_errors_per_min: 0,
};

/**
 * Get a mock metric value by key.
 *
 * Returns null if there is no value for that key.
 */
export function getMockMetricValue(metricKey?: string | null): number | null {
    if (!metricKey) return null;
    if (!(metricKey in MOCK_METRICS)) return null;
    return MOCK_METRICS[metricKey];
}