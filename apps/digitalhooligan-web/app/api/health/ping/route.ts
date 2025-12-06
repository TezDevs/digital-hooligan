// apps/digitalhooligan-web/app/api/health/ping/route.ts

import { NextResponse } from "next/server";

/**
 * Tiny health check endpoint.
 *
 * Usage:
 *  - Browser: GET /api/health/ping
 *  - Insomnia/Kong: GET http://localhost:3000/api/health/ping
 *
 * Later this can be hooked into uptime monitors, load balancers,
 * or used as a "can we reach the app at all?" check from other services.
 */
export async function GET() {
    const now = new Date();

    return NextResponse.json({
        ok: true as const,
        service: "digital-hooligan-web",
        environment: process.env.NODE_ENV ?? "development",
        timestamp: now.toISOString(),
    });
}