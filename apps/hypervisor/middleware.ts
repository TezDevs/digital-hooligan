import { NextResponse, type NextRequest } from "next/server";

/**
 * Hypervisor middleware (Edge-safe, no-op).
 * Purpose: prevent runtime middleware crashes and provide a stable baseline.
 */
export function middleware(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
