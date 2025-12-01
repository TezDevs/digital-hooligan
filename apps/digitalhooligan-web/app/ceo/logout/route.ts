import { NextResponse } from "next/server";

/**
 * GET /ceo/logout
 *
 * - Clears the ceo_auth cookie.
 * - Redirects back to the login page with a loggedOut flag.
 */
export async function GET(request: Request) {
    const url = new URL(request.url);
    const loginUrl = new URL("/ceo/login", url.origin);
    loginUrl.searchParams.set("loggedOut", "1");

    const response = NextResponse.redirect(loginUrl);

    // Clear the cookie by expiring it
    response.cookies.set("ceo_auth", "", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/ceo",
        maxAge: 0,
    });

    return response;
}
