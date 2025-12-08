import Link from "next/link";

type AppPaths = {
    marketing?: string;
    ceo?: string;
    labs?: string;
};

type AppRegistryItem = {
    id: string;
    slug?: string;
    name: string;
    codeName?: string;
    kind: string;
    lifecycle: string;
    owner?: string;
    tags?: string[];
    description?: string;
    paths?: AppPaths;
};

type RegistryResponse = {
    apps: AppRegistryItem[];
};

type AppHealth = {
    appId: string;
    status: "healthy" | "degraded" | "down" | "unknown" | string;
    uptime90d?: number;
    lastChecked?: string;
    notes?: string;
};

type HealthResponse = {
    apps: AppHealth[];
};

type AiSummaryResponse = {
    summary?: string;
};

function getBaseUrl() {
    const publicBase = process.env.NEXT_PUBLIC_APP_BASE_URL;
    if (publicBase) return publicBase;

    const vercel = process.env.VERCEL_URL;
    if (vercel) return `https://${vercel}`;

    return "http://localhost:3000";
}

async function getRegistry(): Promise<RegistryResponse> {
    const baseUrl = getBaseUrl();

    const res = await fetch(`${baseUrl}/api/registry/apps`, {
        cache: "no-store",
    });

    if (!res.ok) {
        console.error("[CEO] Failed to load app registry", res.status, res.statusText);
        return { apps: [] };
    }

    return res.json();
}

async function getHealth(): Promise<HealthResponse | null> {
    try {
        const baseUrl = getBaseUrl();

        const res = await fetch(`${baseUrl}/api/health/apps`, {
            cache: "no-store",
        });

        if (!res.ok) return null;
        return res.json();
    } catch (err) {
        console.error("[CEO] Health API error", err);
        return null;
    }
}

async function getAiSummary(appId: string): Promise<string | null> {
    try {
        const baseUrl = getBaseUrl();

        const res = await fetch(
            `${baseUrl}/api/ai/app-summary?appid=${encodeURIComponent(appId)}`,
            {
                cache: "no-store",
            }
        );

        if (!res.ok) return null;

        const data: AiSummaryResponse = await res.json();
        return data.summary ?? null;
    } catch (err) {
        console.error("[CEO] AI summary API error", err);
        return null;
    }
}

function formatStatusLabel(status: AppHealth["status"]) {
    switch (status) {
        case "healthy":
            return "Healthy";
        case "degraded":
            return "Degraded";
        case "down":
            return "Down";
        case "unknown":
            return "Unknown";
        default:
            return String(status || "Unknown");
    }
}

function statusColorClasses(status: AppHealth["status"]) {
    switch (status) {
        case "healthy":
            return "bg-emerald-400 text-emerald-950";
        case "degraded":
            return "bg-amber-400 text-amber-950";
        case "down":
            return "bg-red-500 text-red-50";
        default:
            return "bg-slate-500 text-slate-50";
    }
}

function statusDotClasses(status: AppHealth["status"]) {
    switch (status) {
        case "healthy":
            return "bg-emerald-300";
        case "degraded":
            return "bg-amber-300";
        case "down":
            return "bg-red-400";
        default:
            return "bg-slate-400";
    }
}

// NOTE: searchParams is a Promise in this Next.js version.
type PageProps = {
    searchParams?: Promise<{ appId?: string }>;
};

export default async function CeoAppsPage({ searchParams }: PageProps) {
    const registry = await getRegistry();

    const resolvedSearchParams = (await searchParams) ?? {};
    const rawSelected = (resolvedSearchParams.appId ?? "").toString();
    const normalizedSelected = rawSelected.toLowerCase();

    const selectedApp =
        registry.apps.find((item) => {
            const id = (item.id ?? "").toLowerCase();
            const slug = (item.slug ?? "").toLowerCase();
            return (
                normalizedSelected.length > 0 &&
                (id === normalizedSelected || slug === normalizedSelected)
            );
        }) ?? null;

    let selectedHealth: AppHealth | null = null;
    let aiSummary: string | null = null;

    if (selectedApp) {
        const [healthData, summary] = await Promise.all([
            getHealth(),
            getAiSummary(selectedApp.id),
        ]);

        // ✅ Guard both healthData and healthData.apps
        selectedHealth =
            healthData?.apps?.find(
                (h) => h.appId === selectedApp.id || h.appId === selectedApp.slug
            ) ??
            ({
                appId: selectedApp.id,
                status: "unknown",
            } as AppHealth);

        aiSummary = summary;
    }

    // DETAIL VIEW: /ceo/apps?appId=...
    if (selectedApp && selectedHealth) {
        const health = selectedHealth;
        const statusLabel = formatStatusLabel(health.status);
        const paths = selectedApp.paths ?? {};

        return (
            <main className="min-h-screen bg-slate-950 text-slate-50">
                <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
                    {/* Breadcrumb / back link */}
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                            <Link
                                href="/ceo/apps"
                                className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900 px-3 py-1 hover:border-emerald-400 hover:text-emerald-200"
                            >
                                <span aria-hidden="true">←</span>
                                <span>Back to App Registry</span>
                            </Link>
                            <span className="hidden md:inline text-slate-500">
                                CEO / App Detail
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span
                                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-medium ${statusColorClasses(
                                    health.status
                                )}`}
                            >
                                <span
                                    className={`h-1.5 w-1.5 rounded-full ${statusDotClasses(
                                        health.status
                                    )}`}
                                />
                                {statusLabel}
                            </span>
                        </div>
                    </div>

                    {/* Header summary */}
                    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 md:p-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                            <div className="space-y-2">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-400">
                                    App Detail
                                </p>
                                <h1 className="text-3xl font-semibold tracking-tight">
                                    {selectedApp.name}
                                </h1>
                                {selectedApp.codeName && (
                                    <p className="font-mono text-xs text-emerald-300">
                                        {selectedApp.codeName}
                                    </p>
                                )}
                                {selectedApp.description && (
                                    <p className="mt-2 max-w-xl text-sm text-slate-300">
                                        {selectedApp.description}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col items-start gap-2 text-xs text-slate-300">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-[11px] uppercase tracking-wide">
                                        Kind:{" "}
                                        <span className="text-emerald-300">
                                            {selectedApp.kind || "Unknown"}
                                        </span>
                                    </span>
                                    <span className="rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-[11px] uppercase tracking-wide">
                                        Lifecycle:{" "}
                                        <span className="text-emerald-300">
                                            {selectedApp.lifecycle || "Unknown"}
                                        </span>
                                    </span>
                                </div>

                                {selectedApp.owner && (
                                    <p className="text-xs text-slate-400">
                                        Owner:{" "}
                                        <span className="font-medium text-slate-100">
                                            {selectedApp.owner}
                                        </span>
                                    </p>
                                )}

                                <p className="text-[11px] text-slate-500">
                                    Registry ID:{" "}
                                    <span className="font-mono text-slate-300">
                                        {selectedApp.id}
                                    </span>
                                    {selectedApp.slug && (
                                        <>
                                            {" "}
                                            · Slug:{" "}
                                            <span className="font-mono text-slate-300">
                                                {selectedApp.slug}
                                            </span>
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>

                        {selectedApp.tags && selectedApp.tags.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-1.5">
                                {selectedApp.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full bg-slate-900 px-2.5 py-0.5 text-[11px] text-slate-200"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Main content grid */}
                    <section className="grid gap-5 md:grid-cols-3">
                        {/* Left column: AI summary + metadata */}
                        <div className="md:col-span-2 flex flex-col gap-5">
                            {/* AI Summary */}
                            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                                <div className="mb-3 flex items-center justify-between gap-2">
                                    <h2 className="text-sm font-semibold text-slate-50">
                                        AI CEO Summary
                                    </h2>
                                    <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                                        Powered by /api/ai/app-summary
                                    </span>
                                </div>

                                {aiSummary ? (
                                    <p className="text-sm leading-relaxed text-slate-200 whitespace-pre-line">
                                        {aiSummary}
                                    </p>
                                ) : (
                                    <p className="text-sm text-slate-400">
                                        No AI summary available yet for this app. Once{" "}
                                        <span className="font-mono text-emerald-300">
                                            /api/ai/app-summary?appid={selectedApp.id}
                                        </span>{" "}
                                        returns content, the CEO-friendly summary will appear here.
                                    </p>
                                )}
                            </div>

                            {/* Extra metadata / notes slot */}
                            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                                <h2 className="mb-2 text-sm font-semibold text-slate-50">
                                    Registry Notes
                                </h2>
                                <p className="text-xs text-slate-400">
                                    Ready for future metrics: users, subscriptions, latency, uptime,
                                    incidents, or anything else we want to expose to the CEO for{" "}
                                    <span className="font-semibold text-slate-100">
                                        {selectedApp.name}
                                    </span>
                                    . For now, it confirms the core plumbing is wired:
                                </p>
                                <ul className="mt-3 space-y-1 text-xs text-slate-300">
                                    <li>• Registry entry loaded from /api/registry/apps</li>
                                    <li>• Health loaded from /api/health/apps</li>
                                    <li>• AI summary loaded from /api/ai/app-summary</li>
                                </ul>
                            </div>
                        </div>

                        {/* Right column: Paths + Health */}
                        <div className="flex flex-col gap-5">
                            {/* Paths */}
                            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                                <div className="mb-3 flex items-center justify-between gap-2">
                                    <h2 className="text-sm font-semibold text-slate-50">
                                        Paths & Views
                                    </h2>
                                    <span className="text-[11px] text-slate-500">
                                        From registry.paths
                                    </span>
                                </div>

                                <div className="flex flex-col gap-2">
                                    {paths.marketing ? (
                                        <Link
                                            href={paths.marketing}
                                            className="inline-flex items-center justify-between rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs hover:border-emerald-400 hover:text-emerald-200"
                                        >
                                            <span className="flex flex-col">
                                                <span className="font-medium">Marketing site</span>
                                                <span className="font-mono text-[10px] text-slate-500">
                                                    {paths.marketing}
                                                </span>
                                            </span>
                                            <span aria-hidden="true" className="text-sm">
                                                ↗
                                            </span>
                                        </Link>
                                    ) : (
                                        <div className="rounded-xl border border-dashed border-slate-700/80 px-3 py-2 text-xs text-slate-500">
                                            No marketing path configured yet.
                                        </div>
                                    )}

                                    {paths.ceo ? (
                                        <Link
                                            href={paths.ceo}
                                            className="inline-flex items-center justify-between rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs hover:border-emerald-400 hover:text-emerald-200"
                                        >
                                            <span className="flex flex-col">
                                                <span className="font-medium">CEO view</span>
                                                <span className="font-mono text-[10px] text-slate-500">
                                                    {paths.ceo}
                                                </span>
                                            </span>
                                            <span aria-hidden="true" className="text-sm">
                                                ↗
                                            </span>
                                        </Link>
                                    ) : (
                                        <div className="rounded-xl border border-dashed border-slate-700/80 px-3 py-2 text-xs text-slate-500">
                                            No dedicated CEO path configured.
                                        </div>
                                    )}

                                    {paths.labs ? (
                                        <Link
                                            href={paths.labs}
                                            className="inline-flex items-center justify-between rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs hover:border-emerald-400 hover:text-emerald-200"
                                        >
                                            <span className="flex flex-col">
                                                <span className="font-medium">Labs view</span>
                                                <span className="font-mono text-[10px] text-slate-500">
                                                    {paths.labs}
                                                </span>
                                            </span>
                                            <span aria-hidden="true" className="text-sm">
                                                ↗
                                            </span>
                                        </Link>
                                    ) : (
                                        <div className="rounded-xl border border-dashed border-slate-700/80 px-3 py-2 text-xs text-slate-500">
                                            No Hooligan Labs path yet.
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Health panel */}
                            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                                <div className="mb-3 flex items-center justify-between gap-2">
                                    <h2 className="text-sm font-semibold text-slate-50">
                                        Health Overview
                                    </h2>
                                    <span className="text-[11px] text-slate-500">
                                        /api/health/apps
                                    </span>
                                </div>

                                <div className="flex flex-col gap-2 text-xs text-slate-300">
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400">Status</span>
                                        <span
                                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] ${statusColorClasses(
                                                health.status
                                            )}`}
                                        >
                                            <span
                                                className={`h-1.5 w-1.5 rounded-full ${statusDotClasses(
                                                    health.status
                                                )}`}
                                            />
                                            {statusLabel}
                                        </span>
                                    </div>

                                    {typeof health.uptime90d === "number" && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-400">90d uptime</span>
                                            <span className="font-mono text-xs text-slate-100">
                                                {health.uptime90d.toFixed(2)}%
                                            </span>
                                        </div>
                                    )}

                                    {health.lastChecked && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-400">Last checked</span>
                                            <span className="font-mono text-[11px] text-slate-200">
                                                {new Date(health.lastChecked).toLocaleString()}
                                            </span>
                                        </div>
                                    )}

                                    {health.notes && (
                                        <p className="mt-2 text-[11px] text-slate-400">
                                            {health.notes}
                                        </p>
                                    )}

                                    {!selectedHealth && (
                                        <p className="mt-2 text-[11px] text-slate-500">
                                            Health API not responding yet. Once{" "}
                                            <span className="font-mono text-emerald-300">
                                                /api/health/apps
                                            </span>{" "}
                                            is fully wired, status and uptime will populate here.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        );
    }

    // LIST VIEW: /ceo/apps (no appId selected)
    return (
        <main className="min-h-screen bg-slate-950 text-slate-50">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-400">
                            CEO / Apps
                        </p>
                        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
                            App Registry
                        </h1>
                        <p className="mt-2 text-sm text-slate-400 max-w-xl">
                            Single source of truth for Digital Hooligan apps, bots, and tools.
                            Click into an app to see its CEO detail view with health and AI
                            summary.
                        </p>
                    </div>
                </div>

                <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {registry.apps.map((app) => (
                        <Link
                            key={app.id}
                            href={`/ceo/apps?appId=${encodeURIComponent(app.slug || app.id)}`}
                            className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-emerald-400/70 hover:bg-slate-900 transition-colors"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <h2 className="text-sm font-semibold text-slate-50">
                                        {app.name}
                                    </h2>
                                    {app.codeName && (
                                        <p className="mt-1 font-mono text-[11px] text-emerald-300">
                                            {app.codeName}
                                        </p>
                                    )}
                                    {app.description && (
                                        <p className="mt-2 line-clamp-3 text-xs text-slate-400">
                                            {app.description}
                                        </p>
                                    )}
                                </div>
                                <span className="text-xs text-slate-500 group-hover:text-emerald-300">
                                    ↗
                                </span>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] text-slate-400">
                                <span className="rounded-full border border-slate-700 bg-slate-950 px-2 py-0.5">
                                    Kind: <span className="text-emerald-300">{app.kind}</span>
                                </span>
                                <span className="rounded-full border border-slate-700 bg-slate-950 px-2 py-0.5">
                                    Lifecycle:{" "}
                                    <span className="text-emerald-300">{app.lifecycle}</span>
                                </span>
                            </div>

                            {app.tags && app.tags.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-1.5 text-[11px] text-slate-400">
                                    {app.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full bg-slate-900 px-2 py-0.5"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </Link>
                    ))}
                </section>
            </div>
        </main>
    );
}