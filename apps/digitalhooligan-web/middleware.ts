import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Phase 0 hotfix: legacy cockpit surface removed.
 * Keep middleware minimal to avoid accidental reintroduction of cockpit gating logic.
 */
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}
