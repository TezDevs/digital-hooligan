import { NextResponse } from "next/server";
import { buildHealthPayload } from "@/lib/health";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
    return NextResponse.json(buildHealthPayload(), {
        status: 200,
        headers: { "Cache-Control": "no-store" },
    });
}