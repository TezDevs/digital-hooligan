import { NextRequest, NextResponse } from "next/server";

type AppHealth = {
    appId: string;
    status: "healthy" | "degraded" | "down" | "unknown" | string;
    uptime90d?: number;
    lastChecked?: string;
    notes?: string;
};

type HealthResponse = {
    apps?: AppHealth[];
};

function getBaseUrl() {
    const publicBase = process.env.NEXT_PUBLIC_APP_BASE_URL;
    if (publicBase) return publicBase;

    const vercel = process.env.VERCEL_URL;
    if (vercel) return `https://${vercel}`;

    return "http://localhost:3000";
}

export async function GET(req: NextRequest) {
    try {
        const baseUrl = getBaseUrl();
        const url = new URL(req.url);

        // Extract id from /api/apps/[Id]
        const segments = url.pathname.split("/").filter(Boolean);
        const idSegment = segments[segments.length - 1] ?? "";
        const rawId = idSegment.toLowerCase();

        const includeHealth =
            url.searchParams.get("includeHealth") === "1" ||
            url.searchParams.get("includeHealth") === "true";

        // 1) Load registry (loose typing to avoid cross-file TS issues)
        const registryRes = await fetch(`${baseUrl}/api/registry/apps`, {
            cache: "no-store",
        });

        if (!registryRes.ok) {
            console.error(
                "[App details] Failed to load registry",
                registryRes.status,
                registryRes.statusText
            );
            return NextResponse.json(
                { error: "Failed to load registry" },
                { status: 500 }
            );
        }

        const registryData = (await registryRes.json()) as any;
        const apps: any[] = Array.isArray(registryData?.apps)
            ? registryData.apps
            : [];

        const app =
            apps.find((entry) => {
                const id = String(entry.id ?? "").toLowerCase();
                const slug = String(entry.slug ?? "").toLowerCase();
                return id === rawId || slug === rawId;
            }) ?? null;

        if (!app) {
            return NextResponse.json(
                {
                    error: "App not found",
                    id: rawId,
                    available: apps.map((a) => a.slug || a.id),
                },
                { status: 404 }
            );
        }

        const response: any = {
            app,
            metrics: null, // metrics stubbed for now
            health: null,
        };

        // 2) Optional health
        if (includeHealth) {
            try {
                const healthRes = await fetch(`${baseUrl}/api/health/apps`, {
                    cache: "no-store",
                });

                if (healthRes.ok) {
                    const healthData = (await healthRes.json()) as HealthResponse;
                    const healthApps = Array.isArray(healthData.apps)
                        ? healthData.apps
                        : [];

                    response.health =
                        healthApps.find(
                            (h) => h.appId === app.id || h.appId === app.slug
                        ) ?? null;
                }
            } catch (err) {
                console.error("[App details] Health fetch error", err);
            }
        }

        return NextResponse.json(response, { status: 200 });
    } catch (err) {
        console.error("[App details] Unexpected error", err);
        return NextResponse.json(
            { error: "Unexpected server error" },
            { status: 500 }
        );
    }
}