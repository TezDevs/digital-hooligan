// apps/digitalhooligan-web/app/api/ceo/performance/route.ts

import { NextResponse } from "next/server";
import { APP_REGISTRY, type AppRegistryEntry } from "@/lib/appRegistry";

export const dynamic = "force-dynamic";

type AppPerformanceStatus = "healthy" | "watch" | "unknown";

type AppPerformanceEntry = {
    id: string;
    name: string;
    uptimePercent: number | null;
    latencyP50Ms: number | null;
    latencyP95Ms: number | null;
    status: AppPerformanceStatus;
};

type PerformanceResponse = {
    ok: true;
    type: "ceo_performance_summary";
    overallUptimePercent: number | null;
    appsReporting: number;
    appsHealthy: number;
    entries: AppPerformanceEntry[];
    timestamp: string;
};

/**
 * Simple deterministic mock metrics per app.
 * Later this can be wired to a real metrics backend
 * or reuse the same adapters used by /api/apps/[id].
 */
const MOCK_APP_METRICS: Record<
    string,
    { uptimePercent: number; latencyP50Ms: number; latencyP95Ms: number }
> = {
    pennywize: {
        uptimePercent: 99.93,
        latencyP50Ms: 180,
        latencyP95Ms: 420,
    },
    dropsignal: {
        uptimePercent: 99.88,
        latencyP50Ms: 210,
        latencyP95Ms: 480,
    },
    hypewatch: {
        uptimePercent: 99.96,
        latencyP50Ms: 160,
        latencyP95Ms: 390,
    },
    "ops-toys": {
        uptimePercent: 99.9,
        latencyP50Ms: 140,
        latencyP95Ms: 320,
    },
};

function getMetricsForApp(app: AppRegistryEntry) {
    const metrics = MOCK_APP_METRICS[app.id];
    if (!metrics) {
        return {
            uptimePercent: null,
            latencyP50Ms: null,
            latencyP95Ms: null,
            status: "unknown" as AppPerformanceStatus,
        };
    }

    const { uptimePercent, latencyP50Ms, latencyP95Ms } = metrics;

    let status: AppPerformanceStatus = "healthy";
    if (uptimePercent < 99.5) {
        status = "watch";
    }

    return {
        uptimePercent,
        latencyP50Ms,
        latencyP95Ms,
        status,
    };
}

export async function GET() {
    const now = new Date().toISOString();

    const entries: AppPerformanceEntry[] = APP_REGISTRY.map((app) => {
        const metrics = getMetricsForApp(app);

        return {
            id: app.id,
            name: app.name,
            uptimePercent: metrics.uptimePercent,
            latencyP50Ms: metrics.latencyP50Ms,
            latencyP95Ms: metrics.latencyP95Ms,
            status: metrics.status,
        };
    });

    const appsWithUptime = entries.filter(
        (entry) => entry.uptimePercent != null,
    );

    const overallUptimePercent =
        appsWithUptime.length > 0
            ? appsWithUptime.reduce(
                (sum, entry) => sum + (entry.uptimePercent ?? 0),
                0,
            ) / appsWithUptime.length
            : null;

    const appsHealthy = entries.filter(
        (entry) => entry.status === "healthy",
    ).length;

    const payload: PerformanceResponse = {
        ok: true,
        type: "ceo_performance_summary",
        overallUptimePercent,
        appsReporting: appsWithUptime.length,
        appsHealthy,
        entries,
        timestamp: now,
    };

    return NextResponse.json(payload);
}