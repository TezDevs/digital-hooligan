// apps/digitalhooligan-web/app/api/health/route.ts

import { NextResponse } from "next/server";
import { APP_REGISTRY } from "@/lib/appRegistry";

/**
 * GET /api/health
 *
 * Tiny JSON healthcheck for Digital Hooligan web.
 * Safe to call from uptime monitors, AI assistants, or CLI tools.
 */
export async function GET() {
    const now = new Date();

    // How many apps/bots/tools are known to the system
    const appCount = APP_REGISTRY.length;

    const payload = {
        ok: true as const,
        status: "healthy" as const,
        service: "digitalhooligan-web",
        // ISO string so it's easy for anything (AI, scripts, UIs) to parse
        timestamp: now.toISOString(),
        // A couple of useful numbers for dashboards / AI summaries
        checks: {
            appRegistry: {
                ok: appCount > 0,
                totalEntries: appCount,
            },
            // Version "v1" is just a label for the current API surface
            apiVersions: {
                apps: "v1",
                ai: "v1",
            },
        },
    };

    return NextResponse.json(payload);
}