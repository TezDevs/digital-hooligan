import { NextResponse } from "next/server";
import { getStubAppHealth } from "@/lib/health";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
    const { apps } = getStubAppHealth();

    return NextResponse.json(apps, {
        status: 200,
        headers: { "Cache-Control": "no-store" },
    });
}