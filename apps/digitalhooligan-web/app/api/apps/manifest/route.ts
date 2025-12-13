// apps/digitalhooligan-web/app/api/apps/manifest/route.ts

import { NextResponse } from "next/server";
import {
    APP_REGISTRY,
    type AppRegistryEntry,
} from "@/lib/appRegistry";

type VisibilityFilter = "all" | "public" | "internal";

interface AppsManifestResponse {
    generatedAt: string;
    visibility: VisibilityFilter;
    total: number;
    apps: AppRegistryEntry[];
}

/**
 * GET /api/apps/manifest
 *
 * Machine-readable manifest of all apps, bots, and internal tools
 * known to Digital Hooligan, powered by the typed APP_REGISTRY config.
 *
 * Optional query param:
 *   - visibility=all      (default)
 *   - visibility=public   (only non-internal entries)
 *   - visibility=internal (only internalOnly entries)
 */
export function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const visibilityParam = (searchParams.get("visibility") ?? "all") as VisibilityFilter;

    const visibility: VisibilityFilter =
        visibilityParam === "public" || visibilityParam === "internal"
            ? visibilityParam
            : "all";

    let filteredApps: AppRegistryEntry[];

    if (visibility === "public") {
        filteredApps = APP_REGISTRY.filter((app) => !app.internalOnly);
    } else if (visibility === "internal") {
        filteredApps = APP_REGISTRY.filter((app) => app.internalOnly);
    } else {
        filteredApps = APP_REGISTRY;
    }

    const body: AppsManifestResponse = {
        generatedAt: new Date().toISOString(),
        visibility,
        total: filteredApps.length,
        apps: filteredApps,
    };

    return NextResponse.json(body);
}