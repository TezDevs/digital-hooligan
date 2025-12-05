// apps/digitalhooligan-web/app/ceo/page.tsx

"use client";

import React from "react";
import Link from "next/link";
import { APP_REGISTRY, type AppRegistryEntry } from "@/lib/appRegistry";

type HealthResponse = {
    ok: boolean;
    status: string;
    service: string;
    timestamp: string;
    checks: {
        appRegistry: {
            ok: boolean;
            totalEntries: number;
        };
        apiVersions: {
            apps: string;
            ai: string;
        };
    };
};

type SuggestionPriority = "high" | "medium" | "low";
type SuggestionCategory =
    | "go-to-market"
    | "product-shaping"
    | "stability"
    | "internal-tools"
    | "experiments"
    | "discovery";

type Suggestion = {
    id: string;
    appId: string | null;
    title: string;
    description: string;
    priority: SuggestionPriority;
    category: SuggestionCategory;
};

type SuggestionsResponse = {
    ok: true;
    generatedAt: string;
    totalSuggestions: number;
    suggestions: Suggestion[];
};

type AiStripState = {
    status: "idle" | "loading" | "ready" | "error";
    health: HealthResponse | null;
    suggestions: SuggestionsResponse | null;
};

type FocusItem = {
    id: string;
    title: string;
    timeframe: string;
    tag: "Product" | "Gov" | "Admin";
    description: string;
};

const TODAY_FOCUS: FocusItem[] = [
    {
        id: "finish-ceo-shell",
        title: "Finish CEO dashboard shell + navigation",
        timeframe: "Today",
        tag: "Product",
        description: "Lock in the overview layout so future metrics can drop in cleanly.",
    },
    {
        id: "check-sam-navy",
        title: "Check SAM.gov + Navy Federal status",
        timeframe: "This week",
        tag: "Gov",
        description: "Confirm entity review + business account so future deals can flow.",
    },
    {
        id: "outline-mvps",
        title: "Outline PennyWize + DropSignal MVPs",
        timeframe: "This week",
        tag: "Product",
        description: "Turn the app registry entries into concrete v0 checklists.",
    },
    {
        id: "dev-workbench-next",
        title: "Capture Dev Workbench + AI Hub next steps",
        timeframe: "This week",
        tag: "Admin",
        description: "List 3–5 workflow annoyances the internal tools should remove.",
    },
];

export default function CeoOverviewPage() {
    const [aiState, setAiState] = React.useState<AiStripState>({
        status: "idle",
        health: null,
        suggestions: null,
    });

    React.useEffect(() => {
        let isCancelled = false;

        async function load() {
            setAiState({
                status: "loading",
                health: null,
                suggestions: null,
            });

            try {
                const [healthRes, suggestionsRes] = await Promise.all([
                    fetch("/api/health"),
                    fetch("/api/ai/suggestions"),
                ]);

                if (!healthRes.ok || !suggestionsRes.ok) {
                    throw new Error("One or more AI endpoints returned a non-200 status");
                }

                const healthJson = (await healthRes.json()) as HealthResponse;
                const suggestionsJson =
                    (await suggestionsRes.json()) as SuggestionsResponse;

                if (isCancelled) return;

                setAiState({
                    status: "ready",
                    health: healthJson,
                    suggestions: suggestionsJson,
                });
            } catch (err) {
                console.error("Failed to load AI strip data:", err);
                if (isCancelled) return;
                setAiState({
                    status: "error",
                    health: null,
                    suggestions: null,
                });
            }
        }

        load();

        return () => {
            isCancelled = true;
        };
    }, []);

    // Registry stats for the portfolio snapshot
    const totalRegistry = APP_REGISTRY.length;
    const liveOrBeta = APP_REGISTRY.filter((e) =>
        e.lifecycle === "live" || e.lifecycle === "beta"
    ).length;
    const internalOnlyCount = APP_REGISTRY.filter((e) => e.internalOnly).length;
    const publicReadyCount = APP_REGISTRY.filter((e) => !e.internalOnly).length;

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
            <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:pt-10">
                {/* Top header */}
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
                            CEO dashboard
                        </h1>
                        <p className="mt-1 max-w-2xl text-sm text-slate-300/85 md:text-base">
                            One place to see money, products, deals, and app health across
                            Digital Hooligan. The registry + AI layer make sure every view
                            stays in sync.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-[0.75rem] text-slate-300">
                        <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-1 text-emerald-300 ring-1 ring-emerald-500/60">
                            <span className="mr-1.5 h-2 w-2 rounded-full bg-emerald-400" />
                            Today: systems nominal
                        </span>
                    </div>
                </div>

                {/* Tabs row (restored) */}
                <nav className="mb-6 overflow-x-auto">
                    <div className="flex gap-2 text-sm">
                        <CeoTab href="/ceo" label="Overview" active />
                        <CeoTab href="/ceo/tasks" label="Tasks" />
                        <CeoTab href="/ceo/deals" label="Deals" />
                        <CeoTab href="/ceo/finance" label="Finance" />
                        <CeoTab href="/ceo/performance" label="Performance" />
                        <CeoTab href="/ceo/ai-hub" label="AI Hub" />
                        <CeoTab href="/ceo/dev-workbench" label="Dev WB" />
                        <CeoTab href="/ceo/settings" label="Settings" />
                        <CeoTab href="/ceo/logout" label="Logout" />
                    </div>
                </nav>

                {/* Snapshot row */}
                <section className="mb-6 grid gap-4 md:grid-cols-4">
                    <SnapshotCard
                        label="Money"
                        value="$0"
                        icon="💸"
                        hint="Revenue wiring comes later."
                    />
                    <SnapshotCard
                        label="Products"
                        value={`${totalRegistry} live in registry`}
                        icon="📦"
                        hint="PennyWize, DropSignal, HypeWatch, Ops Toys, more."
                    />
                    <SnapshotCard
                        label="Deals"
                        value="0 open"
                        icon="🤝"
                        hint="Future gov + freelance pipeline."
                    />
                    <SnapshotCard
                        label="App performance"
                        value="Mock"
                        icon="📈"
                        hint="Real metrics plug into this shell later."
                    />
                </section>

                {/* AI summary strip – lives high in the overview */}
                <AiSummaryStrip aiState={aiState} />

                {/* App portfolio snapshot */}
                <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-sm shadow-black/40">
                    <div className="mb-3 flex items-center justify-between gap-2">
                        <div>
                            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                                App portfolio snapshot
                            </h2>
                            <p className="mt-1 text-xs text-slate-400">
                                Quick readout of how many apps, bots, and internal tools exist
                                in the registry. Backed by{" "}
                                <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[0.7rem] text-emerald-300">
                                    APP_REGISTRY
                                </code>{" "}
                                so it stays in sync with Labs.
                            </p>
                        </div>
                        <span className="text-xs text-slate-400">
                            {totalRegistry} total entries
                        </span>
                    </div>

                    <div className="grid gap-3 md:grid-cols-4">
                        <PortfolioTile
                            label="Live / beta"
                            value={liveOrBeta}
                            hint="Anything currently live or being dogfooded."
                        />
                        <PortfolioTile
                            label="Internal-only"
                            value={internalOnlyCount}
                            hint="CEO, Labs HQ, and ops toys that stay behind the curtain."
                        />
                        <PortfolioTile
                            label="Public-ready"
                            value={publicReadyCount}
                            hint="User-facing apps and products in the registry."
                        />
                        <div className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950/90 p-3 text-xs text-slate-300">
                            <div>
                                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                    Registry detail
                                </p>
                                <p className="mt-1">
                                    For lifecycle breakdowns and per-app routes, use the CEO apps
                                    view or Labs inspector.
                                </p>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2 text-[0.7rem]">
                                <Link
                                    href="/ceo/dev-workbench"
                                    className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 px-2.5 py-1 font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                                >
                                    CEO apps & APIs →
                                </Link>
                                <Link
                                    href="/labs/app-registry"
                                    className="inline-flex items-center rounded-full border border-slate-800 bg-slate-950/80 px-2.5 py-1 text-slate-300 hover:border-emerald-500/60 hover:text-emerald-200"
                                >
                                    Labs app registry →
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Middle row – Today's focus + CEO copilot preview */}
                <section className="mb-6 grid gap-4 md:grid-cols-[minmax(0,2fr),minmax(0,2fr)]">
                    {/* Today's focus */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-sm shadow-black/40">
                        <div className="mb-3 flex items-center justify-between gap-2">
                            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                                Today&apos;s focus
                            </h2>
                            <span className="text-xs text-slate-400">
                                High-impact moves for future Tez across product, gov, and
                                admin.
                            </span>
                        </div>

                        <div className="space-y-2">
                            {TODAY_FOCUS.map((item) => (
                                <FocusCard key={item.id} item={item} />
                            ))}
                        </div>
                    </div>

                    {/* CEO Copilot preview */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-sm shadow-black/40">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                            CEO Copilot (preview)
                        </h2>
                        <p className="mt-1 text-xs text-slate-400">
                            Tiny readout that stitches Tasks, Deals, Performance, and Dev
                            Workbench into one suggestion. Backed by the same AI endpoints
                            powering the AI Hub.
                        </p>

                        <div className="mt-3 space-y-2 text-[0.75rem] text-slate-200">
                            <div className="rounded-xl bg-slate-950/90 px-3 py-2">
                                <p className="text-[0.7rem] font-semibold text-slate-200">
                                    Today&apos;s headline
                                </p>
                                <p className="mt-0.5 text-[0.7rem] text-slate-300">
                                    Finish the CEO shell, then make one concrete move on revenue:
                                    either a gov SAM/Gov / Gun.io push or locking a product MVP
                                    milestone.
                                </p>
                            </div>
                            <div className="grid gap-2 md:grid-cols-2">
                                <div className="rounded-xl bg-slate-950/90 px-3 py-2">
                                    <p className="text-[0.7rem] font-semibold text-slate-200">
                                        Deals snapshot
                                    </p>
                                    <p className="mt-0.5 text-[0.7rem] text-slate-300">
                                        You have active ideas across gov, freelance, and product.
                                        Keep 1–3 truly hot and park the rest.
                                    </p>
                                </div>
                                <div className="rounded-xl bg-slate-950/90 px-3 py-2">
                                    <p className="text-[0.7rem] font-semibold text-slate-200">
                                        Dev / refactor nudge
                                    </p>
                                    <p className="mt-0.5 text-[0.7rem] text-slate-300">
                                        Pick one small refactor or UI polish task on the current
                                        feature branch, ship it, and let Dev Workbench + your AI pair
                                        programmer handle the details.
                                    </p>
                                </div>
                            </div>
                            <div className="rounded-xl bg-slate-950/90 px-3 py-2">
                                <p className="text-[0.7rem] font-semibold text-slate-200">
                                    Future wiring
                                </p>
                                <p className="mt-0.5 text-[0.7rem] text-slate-300">
                                    This panel will later read live data from Tasks, Deals,
                                    App performance, and GitHub (Dev Workbench) to generate a
                                    fresh briefing every morning.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Bottom row – Admin / risk + Products & apps stub */}
                <section className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-[0.75rem] text-slate-200 shadow-sm shadow-black/40">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                            Admin / Gov / Risk
                        </h2>
                        <p className="mt-1 text-xs text-slate-400">
                            Quick admin checklist for Digital Hooligan LLC.
                        </p>
                        <ul className="mt-2 space-y-1.5 list-disc pl-4 text-[0.75rem]">
                            <li>LLC formed and EIN confirmed.</li>
                            <li>SAM.gov entity under review → track status weekly.</li>
                            <li>Navy Federal business account in progress.</li>
                            <li>
                                Plan VSOB / SDVOSB certification path and note key deadlines.
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-[0.75rem] text-slate-200 shadow-sm shadow-black/40">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                            Products & apps
                        </h2>
                        <p className="mt-1 text-xs text-slate-400">
                            High-level readout of the main Digital Hooligan properties. This
                            will later pull from a more detailed apps/deals model.
                        </p>
                        <ul className="mt-2 space-y-1.5 list-disc pl-4 text-[0.75rem]">
                            <li>PennyWize – penny-stock intel + feeds.</li>
                            <li>DropSignal – sneaker/streetwear price-drop bot.</li>
                            <li>HypeWatch – collectibles watchlist + alerts.</li>
                            <li>Ops Toys – internal infra + workflow automations.</li>
                        </ul>
                    </div>
                </section>
            </div>
        </main>
    );
}

function CeoTab({
    href,
    label,
    active,
}: {
    href: string;
    label: string;
    active?: boolean;
}) {
    if (active) {
        return (
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-900">
                {label}
            </span>
        );
    }

    return (
        <Link
            href={href}
            className="inline-flex items-center rounded-full bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-200 ring-1 ring-slate-700/80 hover:bg-slate-800 hover:text-emerald-200 hover:ring-emerald-500/70"
        >
            {label}
        </Link>
    );
}

function SnapshotCard(props: {
    label: string;
    value: string;
    icon?: string;
    hint?: string;
}) {
    return (
        <div className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950/90 px-4 py-3 shadow-sm shadow-black/40">
            <div className="flex items-center justify-between gap-2">
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                    {props.label}
                </p>
                {props.icon && <span className="text-lg">{props.icon}</span>}
            </div>
            <p className="mt-1 text-xl font-semibold text-slate-50">
                {props.value}
            </p>
            {props.hint && (
                <p className="mt-1 text-xs text-slate-400/90">{props.hint}</p>
            )}
        </div>
    );
}

function PortfolioTile(props: {
    label: string;
    value: number;
    hint: string;
}) {
    return (
        <div className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950/90 p-3">
            <div>
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                    {props.label}
                </p>
                <p className="mt-1 text-xl font-semibold text-slate-50">
                    {props.value}
                </p>
            </div>
            <p className="mt-1 text-xs text-slate-400">{props.hint}</p>
        </div>
    );
}

function FocusCard({ item }: { item: FocusItem }) {
    const tagColor =
        item.tag === "Product"
            ? "bg-sky-500/10 text-sky-200 ring-sky-500/60"
            : item.tag === "Gov"
                ? "bg-amber-500/10 text-amber-200 ring-amber-500/60"
                : "bg-emerald-500/10 text-emerald-200 ring-emerald-500/60";

    return (
        <div className="rounded-xl bg-slate-950/90 px-3 py-2 text-[0.75rem] text-slate-200">
            <div className="flex items-start justify-between gap-2">
                <div>
                    <p className="font-medium text-slate-100">{item.title}</p>
                    <p className="mt-0.5 text-[0.7rem] text-slate-300">
                        {item.description}
                    </p>
                </div>
                <div className="flex flex-col items-end gap-1 text-right">
                    <span className="text-[0.65rem] text-slate-400">
                        {item.timeframe}
                    </span>
                    <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[0.65rem] ring-1 ${tagColor}`}
                    >
                        {item.tag}
                    </span>
                </div>
            </div>
        </div>
    );
}

function AiSummaryStrip({ aiState }: { aiState: AiStripState }) {
    if (aiState.status === "loading" || aiState.status === "idle") {
        return (
            <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-sm shadow-black/40">
                <div className="flex items-center justify-between gap-2">
                    <div>
                        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                            AI quick brain
                        </h2>
                        <p className="mt-1 text-xs text-slate-400">
                            Warming up… fetching health and suggestion signals.
                        </p>
                    </div>
                    <div className="h-2 w-24 animate-pulse rounded-full bg-slate-700/60" />
                </div>
            </section>
        );
    }

    if (aiState.status === "error" || !aiState.health || !aiState.suggestions) {
        return (
            <section className="mb-6 rounded-2xl border border-rose-700/60 bg-rose-950/40 p-4 shadow-sm shadow-black/40">
                <div className="flex items-center justify-between gap-2">
                    <div>
                        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-100">
                            AI quick brain
                        </h2>
                        <p className="mt-1 text-xs text-rose-100/80">
                            Couldn&apos;t reach AI endpoints right now. The dashboard is fine,
                            but the assistant won&apos;t have fresh signals until this is
                            resolved.
                        </p>
                    </div>
                    <Link
                        href="/ceo/ai-hub"
                        className="rounded-full border border-rose-500/70 bg-rose-500/10 px-3 py-1.5 text-[0.7rem] font-medium text-rose-100 hover:bg-rose-500/20"
                    >
                        Debug in AI Hub →
                    </Link>
                </div>
            </section>
        );
    }

    const { health, suggestions } = aiState;

    const totalApps = health.checks.appRegistry.totalEntries;
    const totalSuggestions = suggestions.totalSuggestions;

    const highPriority = suggestions.suggestions.filter(
        (s) => s.priority === "high",
    );
    const topThree = highPriority.slice(0, 3);

    return (
        <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-sm shadow-black/40">
            <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                        AI quick brain
                    </h2>
                    <p className="mt-1 text-xs text-slate-400">
                        Tiny assistant layer on top of your app registry and mock metrics.
                        Full control lives in the AI Hub; this is just the snapshot.
                    </p>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-2 text-[0.7rem]">
                    <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2.5 py-1 text-slate-200 ring-1 ring-slate-700/70">
                        <span className="mr-1.5 h-2 w-2 rounded-full bg-emerald-400" />
                        {health.status === "healthy"
                            ? "AI surface online"
                            : "AI surface degraded"}
                    </span>
                    <Link
                        href="/ceo/ai-hub"
                        className="inline-flex items-center rounded-full border border-emerald-500/60 bg-emerald-500/10 px-3 py-1.5 font-medium text-emerald-200 hover:bg-emerald-500/20"
                    >
                        Open AI Hub →
                    </Link>
                </div>
            </div>

            {/* Chips row */}
            <div className="mb-3 flex flex-wrap items-center gap-2 text-[0.7rem] text-slate-200">
                <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2.5 py-1 ring-1 ring-slate-700/70">
                    <span className="mr-1.5 text-xs">📦</span>
                    {totalApps} app{totalApps === 1 ? "" : "s"} in registry
                </span>
                <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2.5 py-1 ring-1 ring-slate-700/70">
                    <span className="mr-1.5 text-xs">💡</span>
                    {totalSuggestions} suggestion
                    {totalSuggestions === 1 ? "" : "s"} in AI queue
                </span>
                <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2.5 py-1 ring-1 ring-emerald-500/60">
                    <span className="mr-1.5 text-xs">🔥</span>
                    {highPriority.length} high-priority item
                    {highPriority.length === 1 ? "" : "s"}
                </span>
                <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2.5 py-1 ring-1 ring-slate-700/70">
                    <span className="mr-1.5 text-xs">⏱</span>
                    Snapshot as of{" "}
                    {new Date(health.timestamp).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </span>
            </div>

            {/* Top suggestions list */}
            <div className="mt-2 space-y-1.5 text-[0.75rem] text-slate-200">
                {topThree.length === 0 ? (
                    <p className="text-[0.75rem] text-slate-400">
                        No high-priority items detected yet. Once your registry and metrics
                        evolve, this strip will highlight the sharpest next moves.
                    </p>
                ) : (
                    topThree.map((s) => (
                        <div
                            key={s.id}
                            className="flex items-start gap-2 rounded-xl bg-slate-950/90 px-3 py-2"
                        >
                            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[0.7rem] text-emerald-300 ring-1 ring-emerald-500/60">
                                {s.appId ? "App" : "Global"}
                            </span>
                            <div>
                                <p className="text-[0.75rem] font-medium text-slate-100">
                                    {s.title}
                                    {s.appId && (
                                        <span className="ml-1.5 rounded-full bg-slate-900/90 px-1.5 py-0.5 text-[0.65rem] text-slate-300">
                                            app: {s.appId}
                                        </span>
                                    )}
                                </p>
                                <p className="mt-0.5 text-[0.7rem] text-slate-300">
                                    {s.description}
                                </p>
                                <p className="mt-0.5 text-[0.65rem] text-slate-500">
                                    Priority: {s.priority} · Category: {s.category}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}