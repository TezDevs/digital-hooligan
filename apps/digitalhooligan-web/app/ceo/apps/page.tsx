import { CeoAppsView } from "./CeoAppsView";

type AppPaths = {
    marketing?: string;
    ceo?: string;
    labs?: string;
};

type AppRegistryItem = {
    id: string;
    slug: string;
    name: string;
    tagline?: string;
    kind: string;
    lifecycle: string;
    owner?: string;
    tags?: string[];
    description?: string;
    stage?: string;
    paths?: AppPaths;
    [key: string]: unknown;
};

type RegistryResponse = {
    apps: AppRegistryItem[];
};

type AppHealthStatus =
    | "healthy"
    | "degraded"
    | "down"
    | "unknown"
    | string;

type HealthApp = {
    appId: string;
    status: AppHealthStatus;
    uptime90d?: number;
    lastChecked?: string;
    note?: string;
};

type HealthResponse = {
    apps: HealthApp[];
};

type PageProps = {
    searchParams?: {
        appId?: string;
    };
};

function getBaseUrl() {
    if (process.env.NEXT_PUBLIC_APP_BASE_URL) {
        return process.env.NEXT_PUBLIC_APP_BASE_URL;
    }
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }
    return "http://localhost:3000";
}

async function getRegistry(): Promise<AppRegistryItem[]> {
    const baseUrl = getBaseUrl();

    try {
        const res = await fetch(`${baseUrl}/api/registry/apps`, {
            cache: "no-store",
        });

        if (!res.ok) {
            console.error(
                "[CEO Apps] Failed to load registry",
                res.status,
                res.statusText
            );
            return [];
        }

        const data = (await res.json()) as RegistryResponse;
        return Array.isArray(data.apps) ? data.apps : [];
    } catch (err) {
        console.error("[CEO Apps] Error fetching registry", err);
        return [];
    }
}

async function getHealthApps(): Promise<HealthApp[] | null> {
    const baseUrl = getBaseUrl();

    try {
        const res = await fetch(`${baseUrl}/api/health/apps`, {
            cache: "no-store",
        });

        if (!res.ok) {
            console.warn(
                "[CEO Apps] Health API not ready yet",
                res.status,
                res.statusText
            );
            return null;
        }

        const data = (await res.json()) as HealthResponse;
        return Array.isArray(data.apps) ? data.apps : [];
    } catch (err) {
        console.warn("[CEO Apps] Error fetching health apps", err);
        return null;
    }
}

export default async function CeoAppsPage({ searchParams }: PageProps) {
    const requestedAppId = searchParams?.appId;

    const [apps, healthApps] = await Promise.all([
        getRegistry(),
        getHealthApps(),
    ]);

    if (!apps.length) {
        return (
            <main className="min-h-screen bg-slate-950 text-slate-50">
                <div className="mx-auto max-w-6xl px-4 py-10">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        CEO / App Registry
                    </h1>
                    <p className="mt-2 text-sm text-slate-400">
                        No apps are registered yet. Once{" "}
                        <span className="font-mono text-emerald-300">
                            /api/registry/apps
                        </span>{" "}
                        is populated, they&apos;ll appear here automatically.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <CeoAppsView
            apps={apps}
            healthApps={healthApps}
            initialAppId={requestedAppId}
        />
    );
}