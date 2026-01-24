import { NextResponse, type NextRequest } from "next/server";

/**
 * Hypervisor MVP middleware: intentionally no-op.
 * Purpose: prevent accidental middleware crashes in monorepo deploy context.
 * No imports from packages/*, no env dependencies, no Node APIs.
 */
export function middleware(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
