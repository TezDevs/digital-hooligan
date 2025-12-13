// app/api/incidents/route.ts
import { NextResponse } from "next/server";
import { getStubIncidentsApiResponse } from "@/lib/incidents";

export const dynamic = "force-dynamic";

export async function GET() {
    const data = getStubIncidentsApiResponse();

    return NextResponse.json(data, {
        status: 200,
        headers: {
            "Cache-Control": "no-store",
        },
    });
}