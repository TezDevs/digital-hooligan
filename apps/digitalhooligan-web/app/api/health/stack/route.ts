import { NextResponse } from "next/server";

type AppHealthStatus = "ok" | "degraded" | "down" | "unknown" | string;

type StackAppHealth = {
    appId: string;
    status: AppHealthStatus;
    lastChecked: string;
    notes?: string;
    source: "registry-mock";
};

type RegistryEntry = {
    id: string;
    slug?: string;
    name?: string;
    // Optional fields we want to support in this route
    defaultHealthStatus?: AppHealthStatus;
    defaultHealthNote?: string;
    tagline?: string;
    // allow extra properties from the real registry without strict typing
    [key: string]: unknown;
};

type RegistryResponse = {
    apps?: RegistryEntry[];
};

type HealthStackResponse = {
    apps: StackAppHealth[];
};

function getBaseUrl() {
    const publicBase = process.env.NEXT_PUBLIC_APP_BASE_URL;
    if (publicBase) return publicBase;

    const vercel = process.env.VERCEL_URL;
    if (vercel) return `https://${vercel}`;

    return "http://localhost:3000";
}

export async function GET() {
    try {
        const baseUrl = getBaseUrl();

        // Pull from the registry API
        const registryRes = await fetch(`${baseUrl}/api/registry/apps`, {
            cache: "no-store",
        });

        if (!registryRes.ok) {
            console.error(
                "[Health stack] Failed to load registry",
                registryRes.status,
                registryRes.statusText
            );
            const empty: HealthStackResponse = { apps: [] };
            return NextResponse.json(empty, { status: 200 });
        }

        const registryData = (await registryRes.json()) as RegistryResponse;
        const appRegistry: RegistryEntry[] = Array.isArray(registryData.apps)
            ? registryData.apps
            : [];

        const now = new Date().toISOString();

        const apps: StackAppHealth[] = appRegistry.map((entry) => {
            const status: AppHealthStatus =
                entry.defaultHealthStatus ?? ("ok" as AppHealthStatus);

            const note =
                entry.defaultHealthNote ??
                `Mocked from registry: ${(entry.tagline as string | undefined) ||
                (entry.name as string | undefined) ||
                "Digital Hooligan app"
                }`;

            return {
                appId: entry.id,
                status,
                lastChecked: now,
                notes: note,
                source: "registry-mock",
            };
        });

        const payload: HealthStackResponse = { apps };

        return NextResponse.json(payload, { status: 200 });
    } catch (err) {
        console.error("[Health stack] Unexpected error", err);
        const empty: HealthStackResponse = { apps: [] };
        return NextResponse.json(empty, { status: 200 });
    }
}