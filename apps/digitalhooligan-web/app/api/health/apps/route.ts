// app/api/health/apps/route.ts
import { NextResponse } from "next/server";
import { getStubAppHealth } from "@/lib/health";

export const dynamic = "force-dynamic"; // Make sure this is never statically cached

export async function GET() {
    // In the future, this is where you'd:
    // - Query a database / cache
    // - Fan out to external health checks
    // - Aggregate metrics from monitoring tools
    // For now, we just return a typed stub.
    const data = getStubAppHealth();

    return NextResponse.json(data, {
        status: 200,
        headers: {
            "Cache-Control": "no-store",
        },
    });
}