// apps/digitalhooligan-web/lib/ceo-gate/cookies.ts

import type { NextRequest, NextResponse } from "next/server";
import {
  CEO_GATE_COOKIE_MAX_AGE_SECONDS,
  CEO_GATE_COOKIE_NAME,
} from "./constants";
import { isProduction } from "./env";

export function hasValidCeoGateCookie(req: NextRequest): boolean {
  const v = req.cookies.get(CEO_GATE_COOKIE_NAME)?.value;
  return v === "1";
}

export function setCeoGateCookie(res: NextResponse): void {
  res.cookies.set(CEO_GATE_COOKIE_NAME, "1", {
    httpOnly: true,
    secure: isProduction(),
    sameSite: "lax",
    maxAge: CEO_GATE_COOKIE_MAX_AGE_SECONDS,
    path: "/",
  });
}

export function clearCeoGateCookie(res: NextResponse): void {
  res.cookies.set(CEO_GATE_COOKIE_NAME, "", {
    httpOnly: true,
    secure: isProduction(),
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
