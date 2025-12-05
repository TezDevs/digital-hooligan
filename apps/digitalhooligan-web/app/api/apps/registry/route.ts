// apps/digitalhooligan-web/app/api/apps/registry/route.ts

import { NextResponse } from "next/server";
import { APP_REGISTRY, type AppRegistryEntry } from "@/lib/appRegistry";

export const dynamic = "force-dynamic";

type AppsRegistrySummary = {
    total: number;
    byKind: Record<string, number>;
    byLifecycle: Record<string, number>;
};

type AppsRegistryResponse = {
    ok: true;
    type: "apps_registry";
    apps: AppRegistryEntry[];
    summary: AppsRegistrySummary;
    timestamp: string;
};

/**
 * Returns the raw APP_REGISTRY plus a simple summary breakdown.
 *
 * This is the “plain truth” endpoint you can hit from:
 * - CEO views
 * - Labs HQ
 * - Dev Workbench
 * - Insomnia/Kong
 * - Future AI assistants
 */
function buildSummary(apps: AppRegistryEntry[]): AppsRegistrySummary {
    const byKind: Record<string, number> = {};
    const byLifecycle: Record<string, number> = {};

    for (const app of apps) {
        byKind[app.kind] = (byKind[app.kind] ?? 0) + 1;
        byLifecycle[app.lifecycle] = (byLifecycle[app.lifecycle] ?? 0) + 1;
    }

    return {
        total: apps.length,
        byKind,
        byLifecycle,
    };
}

export async function GET() {
    const apps = APP_REGISTRY;
    const summary = buildSummary(apps);

    const payload: AppsRegistryResponse = {
        ok: true,
        type: "apps_registry",
        apps,
        summary,
        timestamp: new Date().toISOString(),
    };

    return NextResponse.json(payload);
}