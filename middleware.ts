import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { hasValidCeoGateCookie } from "./lib/ceo-gate/cookies";

/**
 * CEO gating enforcement:
 * - Gate all /ceo/* routes
 * - EXEMPT /ceo/login and /ceo/logout to prevent redirect loops
 * - EXEMPT /api/ceo/* routes (auth handlers)
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isCeoRoute = pathname === "/ceo" || pathname.startsWith("/ceo/");
  const isCeoApi = pathname.startsWith("/api/ceo/");

  if (!isCeoRoute && !isCeoApi) {
    return NextResponse.next();
  }

  // Exempt CEO auth surfaces
  const isExempt =
    pathname === "/ceo/login" ||
    pathname.startsWith("/ceo/login/") ||
    pathname === "/ceo/logout" ||
    pathname.startsWith("/ceo/logout/") ||
    isCeoApi;

  if (isExempt) {
    return NextResponse.next();
  }

  const ok = hasValidCeoGateCookie(req);
  if (ok) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/ceo/login";
  url.searchParams.set("next", pathname);

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/ceo/:path*", "/api/ceo/:path*"],
};
