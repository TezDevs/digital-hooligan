import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware to protect the CEO dashboard.
 *
 * - Any path under /ceo/* requires a valid "ceo_auth" cookie.
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

    // For all other /ceo paths, require the ceo_auth cookie
    if (pathname.startsWith("/ceo")) {
        const authCookie = request.cookies.get("ceo_auth")?.value;

        if (authCookie !== "1") {
            const loginUrl = new URL("/ceo/login", request.url);
            // Remember where you were going
            loginUrl.searchParams.set("from", pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/ceo/:path*"],
};
