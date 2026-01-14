// apps/digitalhooligan-web/middleware.ts

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  CEO_GATE_API_ALLOWLIST,
  CEO_GATE_ENTRY_PATH,
} from "./lib/ceo-gate/constants";
import { hasValidCeoGateCookie } from "./lib/ceo-gate/cookies";
import { getCeoGatePassword, isProduction } from "./lib/ceo-gate/env";

function isNextAsset(pathname: string): boolean {
  return (
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  );
}

function isPublicAllowlisted(pathname: string): boolean {
  if (isNextAsset(pathname)) return true;

  // Allow the login UI itself (so the gate doesn't deadlock)
  if (pathname === CEO_GATE_ENTRY_PATH) return true;

  // Allow API login/logout
  if (CEO_GATE_API_ALLOWLIST.has(pathname)) return true;

  return false;
}

function isProtectedPath(pathname: string): boolean {
  return (
    pathname === "/ceo" ||
    pathname.startsWith("/ceo/") ||
    pathname === "/radix" ||
    pathname.startsWith("/radix/") ||
    pathname === "/api/ceo" ||
    pathname.startsWith("/api/ceo/")
  );
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Only apply to protected areas matched by config, but keep logic safe.
  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  if (isPublicAllowlisted(pathname)) {
    return NextResponse.next();
  }

  // Fail-closed in production if env is missing
  const gatePassword = getCeoGatePassword();
  const misconfigured = isProduction() && !gatePassword;

  const authed = !misconfigured && hasValidCeoGateCookie(req);

  if (authed) {
    return NextResponse.next();
  }

  // For API calls (except allowlisted), return 401 JSON instead of redirect
  if (pathname.startsWith("/api/")) {
    return NextResponse.json(
      { ok: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  // Redirect UI to login with ?next=<original>
  const url = req.nextUrl.clone();
  url.pathname = CEO_GATE_ENTRY_PATH;

  const next = `${pathname}${search || ""}`;
  url.searchParams.set("next", next);

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/ceo/:path*", "/radix/:path*", "/api/ceo/:path*"],
};
