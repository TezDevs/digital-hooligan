// apps/digitalhooligan-web/middleware.ts

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// DEV MODE: no auth, no redirects.
// This lets you hit /ceo, /ceo/login, /ceo/performance, etc. freely.
export function middleware(_request: NextRequest) {
    return NextResponse.next();
}

// Keep a broad matcher if you had one before, or remove config entirely.
// If you want to be safe, you can leave this:
export const config = {
    matcher: ["/:path*"],
};