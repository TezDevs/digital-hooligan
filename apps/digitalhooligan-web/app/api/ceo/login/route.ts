// apps/digitalhooligan-web/app/api/ceo/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getCeoGatePassword } from "../../../../lib/ceo-gate/env";
import { setCeoGateCookie } from "../../../../lib/ceo-gate/cookies";

type LoginBody = {
  password?: string;
};

export async function POST(request: NextRequest) {
  try {
    const configured = getCeoGatePassword();
    if (!configured) {
      return NextResponse.json(
        { ok: false, message: "Authentication unavailable." },
        { status: 500 }
      );
    }

    const body = (await request.json().catch(() => ({}))) as LoginBody;
    const raw = typeof body.password === "string" ? body.password : "";
    const password = raw.trim();

    if (!password) {
      return NextResponse.json(
        { ok: false, message: "Missing password." },
        { status: 400 }
      );
    }

    if (password !== configured) {
      return NextResponse.json(
        { ok: false, message: "Incorrect password." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ ok: true });
    setCeoGateCookie(response);
    return response;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Unexpected error." },
      { status: 500 }
    );
  }
}
