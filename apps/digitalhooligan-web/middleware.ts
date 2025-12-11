import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only care about CEO routes
    if (!pathname.startsWith("/ceo")) {
        return NextResponse.next();
    }

    // Allow the login page itself
    if (pathname === "/ceo/login") {
        return NextResponse.next();
    }

    const accessCookie = request.cookies.get("dh_ceo_access");

    if (accessCookie?.value === "granted") {
        return NextResponse.next();
    }

    // Not authorized → redirect to /ceo/login
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/ceo/login";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: ["/ceo/:path*"],
};