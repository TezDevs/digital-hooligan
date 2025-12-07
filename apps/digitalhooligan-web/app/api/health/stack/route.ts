// apps/digitalhooligan-web/app/api/health/stack/route.ts

import { NextResponse } from "next/server";
import {
    appRegistry,
    type AppId,
    type AppRegistryEntry,
} from "@/lib/appRegistry";

type AppHealthStatus = "ok" | "degraded" | "down";

type StackAppHealth = {
    id: AppId;
    name: string;
    status: AppHealthStatus;
    note: string;
};

type StackHealthResponse = {
    ok: boolean;
    timestamp: string;
    apps: StackAppHealth[];
};

/**
 * Aggregated stack health endpoint.
 *
 * For now, this is mocked directly from the App Registry so there is a
 * single source of truth for:
 *  - Which apps exist (id, name, kind, stage)
 *  - Their default health status / note
 *
 * Later, we can override registry defaults with real metrics (uptime,
 * error rates, incidents) while keeping the registry as the "catalog"
 * of apps in the stack.
 */
export async function GET() {
    const timestamp = new Date().toISOString();

    const apps: StackAppHealth[] = appRegistry.map((entry: AppRegistryEntry) => {
        const status: AppHealthStatus = entry.defaultHealthStatus ?? "ok";
        const note =
            entry.defaultHealthNote ??
            `Mocked from registry: ${entry.tagline || "Digital Hooligan app"}.`;

        return {
            id: entry.id,
            name: entry.name,
            status,
            note,
        };
    });

    const ok = apps.every((a) => a.status === "ok");

    const body: StackHealthResponse = {
        ok,
        timestamp,
        apps,
    };

    return NextResponse.json(body, {
        status: 200,
    });
}