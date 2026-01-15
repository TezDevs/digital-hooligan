// apps/digitalhooligan-web/app/api/health/ai/route.ts

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export type AiEndpointStatus = "ok" | "missing" | "planned";

export type AiEndpointHealth = {
    id: string;
    path: string;
    description: string;
    status: AiEndpointStatus;
};

export type AiHealthResponse = {
    ok: true;
    type: "ai_routes_health";
    endpoints: AiEndpointHealth[];
    timestamp: string;
};

/**
 * Tiny health check for AI-related routes.
 *
 * Right now this is a hand-authored snapshot. Later you can:
 * - Have this route actually probe each endpoint.
 * - Include latency / error counts from logs or monitoring.
 */
export async function GET() {
    const now = new Date().toISOString();

    const endpoints: AiEndpointHealth[] = [
        {
            id: "ai_app_summary",
            path: "/api/ai/app-summary",
            description:
                "Summarises a single app (PennyWize, DropSignal, HypeWatch, Ops Toys) based on registry + wiring.",
            status: "ok",
        },
        {
            id: "ai_weekly_plan",
            path: "/api/ai/weekly-plan",
            description:
                "Returns a structured weekly plan across product, gov, admin, infra, and Labs.",
            status: "ok",
        },
    ];

    const payload: AiHealthResponse = {
        ok: true,
        type: "ai_routes_health",
        endpoints,
        timestamp: now,
    };

    return NextResponse.json(payload);
}