import { NextRequest, NextResponse } from "next/server";

const PASSCODE = process.env.CEO_PORTAL_PASSCODE ?? "hooligan";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json().catch(() => ({} as any));

        const username =
            (body?.username as string | undefined) ??
            (body?.email as string | undefined) ??
            (body?.user as string | undefined);

        const password =
            (body?.password as string | undefined) ??
            (body?.pass as string | undefined);

        // Optional passcode support (only enforce if provided)
        const passcode = body?.passcode as string | undefined;
        if (passcode && passcode !== PASSCODE) {
            return NextResponse.json(
                { ok: false, message: "Invalid passcode." },
                { status: 401 }
            );
        }

        const configuredUsername =
            process.env.CEO_DASH_USERNAME ??
            (process.env.NODE_ENV === "development" ? "tez" : "");

        const configuredPassword =
            process.env.CEO_DASH_PASSWORD ??
            (process.env.NODE_ENV === "development" ? "change-me" : "");

        if (!username || !password) {
            return NextResponse.json(
                { ok: false, message: "Missing credentials." },
                { status: 400 }
            );
        }

        const ok =
            username.toLowerCase() === configuredUsername.toLowerCase() &&
            password === configuredPassword;

        if (!ok) {
            return NextResponse.json(
                { ok: false, message: "Incorrect credentials. Please try again." },
                { status: 401 }
            );
        }

        const response = NextResponse.json({ ok: true });

        response.cookies.set("dh_ceo_access", "granted", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24,
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("[CEO LOGIN] Unexpected error:", error);
        return NextResponse.json(
            { ok: false, message: "Unexpected error." },
            { status: 500 }
        );
    }
}