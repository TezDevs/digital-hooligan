// apps/digitalhooligan-web/app/api/ceo/app-portfolio/route.ts

import { NextResponse } from "next/server";
import { APP_REGISTRY, type AppRegistryEntry } from "@/lib/appRegistry";

export const dynamic = "force-dynamic";

type CeoAppPortfolioSnapshot = {
    total: number;
    publicApps: number;
    internalTools: number;
    byKind: Record<string, number>;
    byLifecycle: Record<string, number>;
};

type CeoAppPortfolioResponse = {
    ok: true;
    type: "ceo_app_portfolio_snapshot";
    snapshot: CeoAppPortfolioSnapshot;
    timestamp: string;
};

/**
 * Builds a high-level portfolio snapshot from the APP_REGISTRY.
 * This is deliberately lightweight: just counts and basic groupings.
 * The CEO dashboard, Labs HQ, and AI assistants can all consume this.
 */
function buildSnapshot(apps: AppRegistryEntry[]): CeoAppPortfolioSnapshot {
    const byKind: Record<string, number> = {};
    const byLifecycle: Record<string, number> = {};

    let publicApps = 0;
    let internalTools = 0;

    for (const app of apps) {
        // Kind breakdown
        byKind[app.kind] = (byKind[app.kind] ?? 0) + 1;

        if (app.kind === "public-app") {
            publicApps += 1;
        } else {
            // Treat everything else as internal for now.
            internalTools += 1;
        }

        // Lifecycle breakdown (idea, design, build, beta, live, etc.)
        const lifecycleKey = app.lifecycle || "unknown";
        byLifecycle[lifecycleKey] = (byLifecycle[lifecycleKey] ?? 0) + 1;
    }

    return {
        total: apps.length,
        publicApps,
        internalTools,
        byKind,
        byLifecycle,
    };
}

export async function GET() {
    const apps = APP_REGISTRY;
    const snapshot = buildSnapshot(apps);

    const payload: CeoAppPortfolioResponse = {
        ok: true,
        type: "ceo_app_portfolio_snapshot",
        snapshot,
        timestamp: new Date().toISOString(),
    };

    return NextResponse.json(payload);
}