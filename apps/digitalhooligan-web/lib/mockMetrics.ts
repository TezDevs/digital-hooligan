// apps/digitalhooligan-web/lib/mockMetrics.ts

import { getRealMetric } from "./realMetrics";

/**
 * Deterministic pseudo-random helper so mock values feel stable
 * between reloads for a given key.
 */
function seededNumber(key: string, min: number, max: number): number {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash = (hash * 31 + key.charCodeAt(i)) | 0;
    }
    const normalized = (Math.abs(hash) % 1000) / 1000; // 0–0.999
    return min + (max - min) * normalized;
}

/**
 * Get a numeric metric value for a given key.
 *
 * Order of precedence:
 * 1) If key exists in REAL_METRICS, return that value (treated as "live").
 * 2) Otherwise, generate a deterministic mock value based on the key.
 */
export function getMockMetricValue(key: string): number {
    const real = getRealMetric(key);
    if (real) {
        return real.value;
    }

    // Fallback mock ranges per key "type"
    if (key.toLowerCase().includes("users")) {
        return Math.round(seededNumber(key, 5, 2500));
    }

    if (key.toLowerCase().includes("mrr")) {
        return Math.round(seededNumber(key, 20, 7500));
    }

    if (key.toLowerCase().includes("uptime")) {
        return Number(seededNumber(key, 97.2, 99.99).toFixed(2));
    }

    if (key.toLowerCase().includes("errors")) {
        return Number(seededNumber(key, 0.01, 2.75).toFixed(2));
    }

    // Generic fallback
    return Number(seededNumber(key, 0, 100).toFixed(2));
}