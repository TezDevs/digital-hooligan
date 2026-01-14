// apps/digitalhooligan-web/app/api/ceo/logout/route.ts

import { NextRequest, NextResponse } from "next/server";
import { clearCeoGateCookie } from "../../../../lib/ceo-gate/cookies";

function jsonLogout(): NextResponse {
  const res = NextResponse.json({ ok: true });
  clearCeoGateCookie(res);
  return res;
}

export async function POST() {
  // No request context needed for JSON logout
  return jsonLogout();
}

// Keep GET for convenience / existing flows; redirect to /ceo/login
export async function GET(request: NextRequest) {
  const url = new URL("/ceo/login", request.url);
  const res = NextResponse.redirect(url);
  clearCeoGateCookie(res);
  return res;
}
