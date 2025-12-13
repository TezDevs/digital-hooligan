// apps/digitalhooligan-web/app/api/apps/registry/route.ts

import { NextResponse } from "next/server";
import {
    APP_REGISTRY,
    type AppRegistryEntry,
    type AppKind,
    type AppLifecycleStage,
} from "@/lib/appRegistry";

export const dynamic = "force-dynamic";

// GET /api/apps/registry
// Optional query params:
//   includeInternal=true
//   id=<appId>
//   kind=<AppKind> | "all"
//   lifecycle=<AppLifecycleStage> | "all"
//   owner=<string> | "all"
//   tag=<string>
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const includeInternal = searchParams.get("includeInternal") === "true";
    const id = searchParams.get("id");
    const kind = searchParams.get("kind");
    const lifecycle = searchParams.get("lifecycle");
    const owner = searchParams.get("owner");
    const tag = searchParams.get("tag");

    let apps: AppRegistryEntry[] = [...APP_REGISTRY];

    // Hide internal-only apps unless explicitly requested
    if (!includeInternal) {
        apps = apps.filter((app) => !app.internalOnly);
    }

    // If an id is provided, return a single app (or 404)
    if (id) {
        const app = apps.find((entry) => entry.id === id);
        if (!app) {
            return NextResponse.json(
                {
                    ok: false,
                    error: "not_found",
                    message: `No app found in registry for id "${id}".`,
                    id,
                },
                { status: 404 },
            );
        }

        return NextResponse.json({
            ok: true,
            app,
        });
    }

    // Otherwise, apply filters and return a list
    if (kind && kind !== "all") {
        apps = apps.filter((app) => app.kind === (kind as AppKind));
    }

    if (lifecycle && lifecycle !== "all") {
        apps = apps.filter(
            (app) => app.lifecycle === (lifecycle as AppLifecycleStage),
        );
    }

    if (owner && owner !== "all") {
        apps = apps.filter((app) => app.owner === owner);
    }

    if (tag) {
        apps = apps.filter((app) => app.tags?.includes(tag) ?? false);
    }

    return NextResponse.json({
        ok: true,
        total: apps.length,
        apps,
    });
}