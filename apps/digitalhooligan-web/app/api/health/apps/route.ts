// apps/digitalhooligan-web/app/api/health/apps/route.ts

import { NextResponse } from "next/server";
import { APP_REGISTRY, type AppRegistryEntry } from "@/lib/appRegistry";

export const dynamic = "force-dynamic";

export type AppHealthStatus = "good" | "needs_wiring" | "idea_only";

export type AppHealth = {
    id: string;
    name: string;
    kind: AppRegistryEntry["kind"];
    lifecycle: AppRegistryEntry["lifecycle"];
    status: AppHealthStatus;
    missing: string[];
};

export type AppsHealthResponse = {
    ok: true;
    type: "apps_health";
    apps: AppHealth[];
    timestamp: string;
};

/**
 * Quick health snapshot for each app/bot in the registry.
 *
 * Heuristic rules:
 * - If lifecycle is "idea" or "design" → status "idea_only".
 * - Else if important wiring is missing (paths / metrics) → "needs_wiring".
 * - Else → "good".
 *
 * This is intentionally simple for now and just inspects APP_REGISTRY.
 * Later you can:
 * - Check real metrics / incidents.
 * - Join with Dev Workbench or logging data.
 */
function evaluateAppHealth(app: AppRegistryEntry): AppHealth {
    const missing: string[] = [];

    // Marketing path only matters for public-facing apps.
    if (!app.marketingPath && app.kind === "public-app") {
        missing.push("marketingPath");
    }

    if (!app.ceoPath) {
        missing.push("ceoPath");
    }

    if (!app.labsPath) {
        missing.push("labsPath");
    }

    const hasMetrics = Boolean(app.metricsKeys);
    if (!hasMetrics) {
        missing.push("metricsKeys");
    }

    let status: AppHealthStatus = "good";

    if (app.lifecycle === "idea" || app.lifecycle === "design") {
        status = "idea_only";
    } else if (missing.length > 0) {
        status = "needs_wiring";
    }

    return {
        id: app.id,
        name: app.name,
        kind: app.kind,
        lifecycle: app.lifecycle,
        status,
        missing,
    };
}

export async function GET() {
    const apps: AppHealth[] = APP_REGISTRY.map(evaluateAppHealth);

    const payload: AppsHealthResponse = {
        ok: true,
        type: "apps_health",
        apps,
        timestamp: new Date().toISOString(),
    };

    return NextResponse.json(payload);
}