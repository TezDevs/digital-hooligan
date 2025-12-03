// middleware.ts
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_PREFIXES = ["/ceo", "/ops", "/labs", "/ai-hub"];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only care about our protected prefixes
    const isProtected = PROTECTED_PREFIXES.some((prefix) =>
        pathname.startsWith(prefix)
    );

    if (!isProtected) {
        return NextResponse.next();
    }

    // Allow hitting the login page without a cookie
    if (pathname === "/ceo/login" || pathname.startsWith("/ceo/login/")) {
        return NextResponse.next();
    }

    const cookie = request.cookies.get("dh_ceo_auth");
    const isAuthed = cookie?.value === "1";

    if (isAuthed) {
        return NextResponse.next();
    }

    const loginUrl = new URL("/ceo/login", request.url);
    loginUrl.searchParams.set("from", pathname);

    return NextResponse.redirect(loginUrl);
}

// Limit middleware to the internal app areas
export const config = {
    matcher: ["/ceo/:path*", "/ops/:path*", "/labs/:path*", "/ai-hub/:path*"]
};