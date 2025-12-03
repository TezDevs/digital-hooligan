// app/api/ceo/login/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const username = String(formData.get("username") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const from = String(formData.get("from") ?? "/ceo");

    const configuredUsername = (process.env.CEO_DASH_USERNAME || "tez").toLowerCase();
    const configuredPassword = process.env.CEO_DASH_PASSWORD || "change-me";

    const isValidUser = username.toLowerCase() === configuredUsername;
    const isValidPassword = password === configuredPassword;

    if (isValidUser && isValidPassword) {
        const redirectPath = from || "/ceo";
        const response = NextResponse.redirect(new URL(redirectPath, request.url));

        response.cookies.set("dh_ceo_auth", "1", {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 8 // 8 hours
        });

        return response;
    }

    // Login failed – bounce back to /ceo/login with error flag
    const loginUrl = new URL("/ceo/login", request.url);
    loginUrl.searchParams.set("error", "1");
    if (from && from !== "/ceo") {
        loginUrl.searchParams.set("from", from);
    }

    return NextResponse.redirect(loginUrl);
}