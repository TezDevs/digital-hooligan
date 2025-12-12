// apps/digitalhooligan-web/middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Temporary middleware: do nothing except let requests pass through.
// This disables any previous CEO auth redirects that were causing loops.
export function middleware(_req: NextRequest) {
    return NextResponse.next();
}

// Match everything (or you can delete this file entirely once you're happy).
export const config = {
    matcher: ["/:path*"],
};