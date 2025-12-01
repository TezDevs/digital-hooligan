import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware to protect internal dashboards.
 *
 * - Any path under /ceo/* requires a valid "ceo_auth" cookie.
 * - /labs/hq is also treated as an internal dashboard and uses the same cookie.
 * - /ceo/login and /ceo/logout are always allowed.
 */
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Allow login & logout pages without auth
    if (
        pathname.startsWith("/ceo/login") ||
        pathname.startsWith("/ceo/logout")
    ) {
        return NextResponse.next();
    }

    // Internal dashboards that require the ceo_auth cookie
    const needsAuth =
        pathname.startsWith("/ceo") || pathname.startsWith("/labs/hq");

    if (needsAuth) {
        const authCookie = request.cookies.get("ceo_auth")?.value;

        if (authCookie !== "1") {
            const loginUrl = new URL("/ceo/login", request.url);
            // Remember where you were going (CEO or Labs HQ)
            loginUrl.searchParams.set("from", pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    // Run this middleware on CEO routes and Labs HQ only
    matcher: ["/ceo/:path*", "/labs/hq"],
};