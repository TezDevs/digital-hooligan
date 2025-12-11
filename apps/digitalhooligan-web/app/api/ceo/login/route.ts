import { NextRequest, NextResponse } from "next/server";

const PASSCODE = process.env.CEO_PORTAL_PASSCODE || "hooligan";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json().catch(() => ({}));
        const passcode = body?.passcode as string | undefined;

        if (!passcode || passcode !== PASSCODE) {
            return NextResponse.json(
                { ok: false, message: "Invalid passcode." },
                { status: 401 }
            );
        }

        const response = NextResponse.json({ ok: true });

        response.cookies.set("dh_ceo_access", "granted", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24, // 24 hours
            path: "/",
        });

        return response;
    } catch (error) {
        // Log for debugging so the variable is actually used
        console.error("[CEO LOGIN] Unexpected error:", error);

        return NextResponse.json(
            { ok: false, message: "Unexpected error." },
            { status: 500 }
        );
    }
}