import { NextResponse } from "next/server";

/**
 * Handles POST from the CEO login form.
 *
 * - Checks username/password against env vars.
 * - On success: sets an httpOnly cookie and redirects to /ceo (or ?from=).
 * - On failure: redirects back to /ceo/login?error=1.
 */
export async function POST(request: Request) {
    const formData = await request.formData();

    const username = String(formData.get("username") ?? "");
    const password = String(formData.get("password") ?? "");
    const from = String(formData.get("from") ?? "/ceo");

    const envUser = (process.env.CEO_DASH_USERNAME ?? "").trim();
    const envPass = process.env.CEO_DASH_PASSWORD ?? "";

    const isValid = username.trim() === envUser && password === envPass;

    if (!isValid) {
        const url = new URL(request.url);
        const loginUrl = new URL("/ceo/login", url.origin);
        loginUrl.searchParams.set("error", "1");
        return NextResponse.redirect(loginUrl);
    }

    // Successful login: set auth cookie and redirect
    const url = new URL(request.url);
    const redirectUrl = new URL(from || "/ceo", url.origin);
    const response = NextResponse.redirect(redirectUrl);

    response.cookies.set("ceo_auth", "1", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/ceo",
        maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
}
