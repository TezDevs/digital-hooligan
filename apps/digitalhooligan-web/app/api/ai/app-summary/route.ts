import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const appId = searchParams.get("appid");

    if (!appId) {
        return Response.json(
            { error: "Missing appid query parameter" },
            { status: 400 }
        );
    }

    // Temporary stub: this is just plumbing so the CEO detail view works.
    // Later we can wire this to your real AI backend.
    const summary = `AI summary placeholder for app "${appId}". Once the AI backend is wired, this route will return a richer CEO-level summary for Digital Hooligan.`;

    return Response.json({ summary });
}