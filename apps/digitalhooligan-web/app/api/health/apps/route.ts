// apps/digitalhooligan-web/app/api/health/apps/route.ts

import { NextResponse } from "next/server";
import { APP_REGISTRY, type AppRegistryEntry } from "@/lib/appRegistry";

type AppHealthStatus = "nominal" | "internal-only" | "missing-paths";

type AppHealthEntry = {
    id: string;
    name: string;
    kind: AppRegistryEntry["kind"];
    lifecycle: AppRegistryEntry["lifecycle"];
    internalOnly: boolean;
    marketingPath?: string | null;
    ceoPath?: string | null;
    labsPath?: string | null;
    status: AppHealthStatus;
    missingPaths: string[];
};

type AppsHealthResponse = {
    ok: true;
    type: "apps_health_snapshot";
    total: number;
    internalOnly: number;
    publicFacing: number;
    timestamp: string;
    entries: AppHealthEntry[];
};

export const dynamic = "force-dynamic";

/**
 * Lightweight health snapshot for all apps/bots in the registry.
 *
 * Intended for:
 * - CEO dashboard health cards
 * - Labs HQ / Dev Workbench wiring views
 * - Insomnia / Kong collections when testing routes
 */
export async function GET() {
    const now = new Date().toISOString();

    const entries: AppHealthEntry[] = APP_REGISTRY.map((app) => {
        const missingPaths: string[] = [];

        if (!app.marketingPath) missingPaths.push("marketingPath");
        if (!app.ceoPath) missingPaths.push("ceoPath");
        if (!app.labsPath) missingPaths.push("labsPath");

        let status: AppHealthStatus = "nominal";

        if (app.internalOnly) {
            status = "internal-only";
        }

        if (missingPaths.length > 0) {
            status = "missing-paths";
        }

        return {
            id: app.id,
            name: app.name,
            kind: app.kind,
            lifecycle: app.lifecycle,
            internalOnly: app.internalOnly ?? false,
            marketingPath: app.marketingPath ?? null,
            ceoPath: app.ceoPath ?? null,
            labsPath: app.labsPath ?? null,
            status,
            missingPaths,
        };
    });

    const total = entries.length;
    const internalOnly = entries.filter((e) => e.internalOnly).length;
    const publicFacing = total - internalOnly;

    const payload: AppsHealthResponse = {
        ok: true,
        type: "apps_health_snapshot",
        total,
        internalOnly,
        publicFacing,
        timestamp: now,
        entries,
    };

    return NextResponse.json(payload);
}