// app/api/ceo/logout/route.ts
import { NextRequest, NextResponse } from "next/server";

function buildLogoutResponse(request: NextRequest) {
    const url = new URL("/ceo/login", request.url);
    const response = NextResponse.redirect(url);

    // Clear the auth cookie
    response.cookies.set("dh_ceo_auth", "", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 0
    });

    return response;
}

export async function GET(request: NextRequest) {
    return buildLogoutResponse(request);
}

export async function POST(request: NextRequest) {
    return buildLogoutResponse(request);
}