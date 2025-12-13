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

type PageProps = {
    params: {
        appId: string;
    };
};

export default async function CeoAppDetailPage({ params }: PageProps) {
    // Standard Next.js pattern: params.appId from /ceo/apps/[appId]
    const rawParam = params?.appId ?? "";
    const normalizedParam = rawParam.toLowerCase();

    const [registry, healthData, aiSummary] = await Promise.all([
        getRegistry(),
        getHealth(),
        getAiSummary(normalizedParam || "unknown"),
    ]);

    const app =
        registry.apps.find((item) => {
            const id = (item.id ?? "").toLowerCase();
            const slug = (item.slug ?? "").toLowerCase();
            return id === normalizedParam || slug === normalizedParam;
        }) ?? null;

    if (!app) {
        console.error(
            "[CEO] App not found for param",
            rawParam,
            "params object:",
            params,
            "available ids/slugs:",
            registry.apps.map((a) => a.slug || a.id)
        );

        return (
            <main className="min-h-screen bg-slate-950 text-slate-50">
                <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-16">
                    <div className="text-xs text-emerald-400 font-semibold tracking-[0.25em] uppercase">
                        CEO / App Detail
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
                        <h1 className="text-2xl font-semibold tracking-tight mb-2">
                            App not found in registry
                        </h1>
                        <p className="text-sm text-slate-300 mb-4">
                            The app ID{" "}
                            <span className="font-mono text-emerald-300">
                                {rawParam || "«empty»"}
                            </span>{" "}
                            is not present in the current registry response from{" "}
                            <span className="font-mono text-emerald-300">
                                /api/registry/apps
                            </span>
                            .
                        </p>
                        {registry.apps.length > 0 ? (
                            <>
                                <p className="text-xs text-slate-400 mb-2">
                                    Available entries (id / slug):
                                </p>
                                <ul className="mb-4 list-disc pl-5 text-xs text-slate-300 space-y-1">
                                    {registry.apps.map((a) => (
                                        <li key={a.id}>
                                            <span className="font-mono">
                                                {a.id}
                                                {a.slug && a.slug !== a.id ? ` / ${a.slug}` : ""}
                                            </span>{" "}
                                            — {a.name}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <p className="text-xs text-slate-400 mb-4">
                                Registry is currently empty. Check the{" "}
                                <span className="font-mono text-emerald-300">
                                    app/api/registry/apps/route.ts
                                </span>{" "}
                                stub.
                            </p>
                        )}

                        <div className="flex flex-wrap gap-3 text-xs">
                            <Link
                                href="/ceo/apps"
                                className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-950 px-3 py-1 hover:border-emerald-400 hover:text-emerald-200"
                            >
                                ← Back to App Registry
                            </Link>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900 px-3 py-1 hover:border-emerald-400 hover:text-emerald-200"
                            >
                                Home
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    const health =
        healthData?.apps.find((h) => h.appId === app.id || h.appId === app.slug) ??
        ({
            appId: app.id,
            status: "unknown",
        } as AppHealth);

    const statusLabel = formatStatusLabel(health.status);
    const paths = app.paths ?? {};

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
                            <h1 className="text-3xl font-semibold tracking-tight">{app.name}</h1>
                            {app.codeName && (
                                <p className="font-mono text-xs text-emerald-300">
                                    {app.codeName}
                                </p>
                            )}
                            {app.description && (
                                <p className="mt-2 max-w-xl text-sm text-slate-300">
                                    {app.description}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col items-start gap-2 text-xs text-slate-300">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-[11px] uppercase tracking-wide">
                                    Kind:{" "}
                                    <span className="text-emerald-300">{app.kind || "Unknown"}</span>
                                </span>
                                <span className="rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-[11px] uppercase tracking-wide">
                                    Lifecycle:{" "}
                                    <span className="text-emerald-300">
                                        {app.lifecycle || "Unknown"}
                                    </span>
                                </span>
                            </div>

                            {app.owner && (
                                <p className="text-xs text-slate-400">
                                    Owner:{" "}
                                    <span className="font-medium text-slate-100">{app.owner}</span>
                                </p>
                            )}

                            <p className="text-[11px] text-slate-500">
                                Registry ID:{" "}
                                <span className="font-mono text-slate-300">{app.id}</span>
                                {app.slug && (
                                    <>
                                        {" "}
                                        · Slug:{" "}
                                        <span className="font-mono text-slate-300">{app.slug}</span>
                                    </>
                                )}
                            </p>
                        </div>
                    </div>

                    {app.tags && app.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                            {app.tags.map((tag) => (
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
                                        /api/ai/app-summary?appid={app.id}
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
                                This panel is ready for future metrics: users, subscriptions,
                                latency, uptime, incidents, or anything else we want to expose to
                                the CEO for{" "}
                                <span className="font-semibold text-slate-100">{app.name}</span>. For
                                now, it simply confirms that the core plumbing is wired:
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

                                {!healthData && (
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