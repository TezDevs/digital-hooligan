// apps/digitalhooligan-web/app/labs/hq/page.tsx

"use client";

import React from "react";
import Link from "next/link";
import { APP_REGISTRY } from "@/lib/appRegistry";

type HealthState =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "ok"; message: string; timestamp?: string }
    | { status: "error"; message: string };

type AppRouteHealth =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "ok"; appId: string; ok: boolean }
    | { status: "error"; appId: string; message: string };

type AssistantState =
    | { status: "idle" }
    | { status: "loading"; appId: string }
    | {
        status: "ready";
        appId: string;
        headline: string;
        summary: string;
        tags: string[];
    }
    | { status: "error"; appId: string; message: string };

export default function LabsHqPage() {
    const totalApps = APP_REGISTRY.length;
    const internalOnly = APP_REGISTRY.filter((e) => e.internalOnly).length;
    const publicFacing = APP_REGISTRY.filter((e) => !e.internalOnly).length;

    const sampleAppId = APP_REGISTRY[0]?.id ?? "pennywize";

    const [healthState, setHealthState] = React.useState<HealthState>({
        status: "idle",
    });
    const [appHealthState, setAppHealthState] =
        React.useState<AppRouteHealth>({ status: "idle" });

    const [assistantAppId, setAssistantAppId] = React.useState<string>(
        APP_REGISTRY[0]?.id ?? "",
    );
    const [assistantState, setAssistantState] = React.useState<AssistantState>({
        status: "idle",
    });

    React.useEffect(() => {
        runHealthChecks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function runHealthChecks() {
        if (!sampleAppId) return;

        setHealthState({ status: "loading" });
        setAppHealthState({ status: "loading" });

        try {
            const [healthRes, appRes] = await Promise.all([
                fetch("/api/health"),
                fetch(`/api/apps/${sampleAppId}`),
            ]);

            if (healthRes.ok) {
                const data = await healthRes.json();
                setHealthState({
                    status: "ok",
                    message:
                        typeof data.message === "string"
                            ? data.message
                            : "API responded successfully.",
                    timestamp:
                        typeof data.timestamp === "string" ? data.timestamp : undefined,
                });
            } else {
                setHealthState({
                    status: "error",
                    message: `Status ${healthRes.status} calling /api/health`,
                });
            }

            if (appRes.ok) {
                const data = await appRes.json();
                const ok = data?.ok !== false;
                setAppHealthState({
                    status: "ok",
                    appId: sampleAppId,
                    ok,
                });
            } else {
                setAppHealthState({
                    status: "error",
                    appId: sampleAppId,
                    message: `Status ${appRes.status} calling /api/apps/${sampleAppId}`,
                });
            }
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Unexpected error running health checks.";

            setHealthState({ status: "error", message });
            setAppHealthState({
                status: "error",
                appId: sampleAppId,
                message,
            });
        }
    }

    async function handleAssistantAsk() {
        if (!assistantAppId) return;

        setAssistantState({ status: "loading", appId: assistantAppId });

        try {
            const res = await fetch(`/api/ai/app-summary/${assistantAppId}`);
            if (!res.ok) {
                throw new Error(`API returned ${res.status}`);
            }
            const data = await res.json();
            setAssistantState({
                status: "ready",
                appId: assistantAppId,
                headline: data.headline ?? "Builder briefing",
                summary:
                    data.summary ??
                    "No summary text returned. Check /api/ai/app-summary for this app.",
                tags: Array.isArray(data.tags) ? data.tags : [],
            });
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Something went wrong calling /api/ai/app-summary from Labs.";

            setAssistantState({
                status: "error",
                appId: assistantAppId,
                message,
            });
        }
    }

    const healthChip = getOverallHealthChip(healthState);
    const appHealthChip = getAppHealthChip(appHealthState, sampleAppId);

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
            <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:pt-10">
                {/* Header / breadcrumb */}
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                            <Link
                                href="/ceo"
                                className="inline-flex items-center rounded-full bg-slate-900/70 px-2.5 py-1 font-medium text-[0.7rem] text-slate-300 ring-1 ring-slate-700/80 hover:text-emerald-300 hover:ring-emerald-500/70"
                            >
                                <span className="mr-1 text-[0.7rem]">←</span>
                                CEO dashboard
                            </Link>
                            <span className="inline-flex items-center rounded-full bg-slate-900/50 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-400 ring-1 ring-slate-800/80">
                                Hooligan Labs · HQ
                            </span>
                        </div>

                        <h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
                            Hooligan Labs HQ
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm text-slate-300/85 md:text-base">
                            Internal control room for experiments, bots, and “ops toys.” The
                            registry, experiment log, health checks, and AI surfaces all hang
                            off this hub so future assistants can see the full picture.
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-2 text-right text-[0.75rem] text-slate-400">
                        <p className="max-w-xs text-xs text-slate-400">
                            Future: Labs HQ becomes the home for build pipeline, experiment
                            outcomes, and internal-only dashboards.
                        </p>
                        <Link
                            href="/ceo/dev-workbench"
                            className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1.5 text-[0.7rem] font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                        >
                            Open Dev Workbench →
                        </Link>
                    </div>
                </div>

                {/* Top row: registry + quick links */}
                <section className="mb-6 grid gap-4 md:grid-cols-[minmax(0,2fr),minmax(0,1.7fr)]">
                    {/* Registry snapshot */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-sm shadow-black/40">
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                            <div>
                                <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                                    App registry snapshot
                                </p>
                                <p className="mt-1 text-sm text-slate-200">
                                    {totalApps} total entries · {internalOnly} internal-only ·{" "}
                                    {publicFacing} public-facing
                                </p>
                            </div>
                            <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2.5 py-1 text-[0.7rem] text-slate-300 ring-1 ring-slate-700/70">
                                Source of truth:{" "}
                                <code className="ml-1 rounded bg-slate-950 px-1.5 py-0.5 text-[0.65rem] text-emerald-300">
                                    APP_REGISTRY
                                </code>
                            </span>
                        </div>

                        <div className="grid gap-3 md:grid-cols-3">
                            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-3">
                                <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                                    Portfolio
                                </p>
                                <p className="mt-1 text-xl font-semibold text-slate-50">
                                    {totalApps}
                                </p>
                                <p className="mt-1 text-xs text-slate-400">
                                    Mix of public apps (PennyWize, DropSignal, HypeWatch) and
                                    internal tools (Ops Toys, dashboards).
                                </p>
                            </div>
                            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-3">
                                <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                                    Internal stack
                                </p>
                                <p className="mt-1 text-xl font-semibold text-slate-50">
                                    {internalOnly}
                                </p>
                                <p className="mt-1 text-xs text-slate-400">
                                    CEO views, Labs-only tools, and ops dashboards that never hit
                                    marketing pages.
                                </p>
                            </div>
                            <div className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950/90 p-3">
                                <div>
                                    <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                                        Navigation
                                    </p>
                                    <p className="mt-1 text-xs text-slate-400">
                                        Jump into registry details or the experiment log from here.
                                    </p>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-2 text-[0.7rem]">
                                    <Link
                                        href="/labs/app-registry"
                                        className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 px-2.5 py-1 font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                                    >
                                        App registry →
                                    </Link>
                                    <Link
                                        href="/labs/experiments"
                                        className="inline-flex items-center rounded-full border border-emerald-500/60 bg-emerald-500/10 px-2.5 py-1 font-medium text-emerald-200 hover:bg-emerald-500/20"
                                    >
                                        Experiment log →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI / experiments overview */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs text-slate-300 shadow-sm shadow-black/40">
                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                            AI & experiments
                        </p>
                        <p className="mt-2 text-sm text-slate-200">
                            Labs is where you try weird stuff: AI briefings, alert tuning,
                            Ops Toys workflows, and more.
                        </p>
                        <ul className="mt-3 space-y-1.5 list-disc pl-4">
                            <li>
                                <span className="font-medium">AI experiment log</span> at{" "}
                                <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[0.65rem] text-emerald-300">
                                    /labs/experiments
                                </code>{" "}
                                tracks ideas like PennyWize summaries, DropSignal alert tuning,
                                Ops Toys automations, and global AI suggestion tweaks.
                            </li>
                            <li>
                                <span className="font-medium">AI Hub</span> at{" "}
                                <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[0.65rem] text-emerald-300">
                                    /ceo/ai-hub
                                </code>{" "}
                                controls app summaries and suggestion behavior.
                            </li>
                            <li>
                                Assistants and internal tools can read both the{" "}
                                <span className="font-medium">registry</span> and the{" "}
                                <span className="font-medium">experiment log</span> so they
                                don&apos;t suggest repeat failures.
                            </li>
                        </ul>
                        <div className="mt-3 flex flex-wrap gap-2 text-[0.7rem]">
                            <Link
                                href="/ceo/ai-hub"
                                className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 px-2.5 py-1 font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                            >
                                Open AI Hub →
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Middle row: Pipelines & internal tools */}
                <section className="mb-6 grid gap-4 md:grid-cols-2">
                    {/* Build pipeline hint */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-sm shadow-black/40">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                            Build pipeline (future shell)
                        </h2>
                        <p className="mt-1 text-xs text-slate-400">
                            Rough sketch of how ideas move through Labs:
                        </p>
                        <ol className="mt-2 space-y-1.5 list-decimal pl-4 text-[0.75rem] text-slate-300">
                            <li>Idea lands in the experiment log with basic tags.</li>
                            <li>
                                When you decide to build, you add/update an entry in{" "}
                                <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.65rem] text-emerald-300">
                                    APP_REGISTRY
                                </code>
                                .
                            </li>
                            <li>
                                Dev Workbench and CEO views pick it up automatically via the
                                registry.
                            </li>
                            <li>
                                Later, performance metrics + AI behavior wire into the same
                                entries.
                            </li>
                        </ol>
                    </div>

                    {/* Internal tools / Ops Toys teaser */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-sm shadow-black/40">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                            Internal tools & Ops Toys
                        </h2>
                        <p className="mt-1 text-xs text-slate-400">
                            Hooligan-only tools that keep infra and workflow less painful:
                        </p>
                        <ul className="mt-2 space-y-1.5 list-disc pl-4 text-[0.75rem] text-slate-300">
                            <li>
                                <span className="font-medium">Dev Workbench</span> – code,
                                routes, and API entrypoints for all apps.
                            </li>
                            <li>
                                <span className="font-medium">Ops Toys</span> – future drawer
                                of automation toys (CI notifications, log snapshots, etc.).
                            </li>
                            <li>
                                <span className="font-medium">Labs registry views</span> – app
                                registry inspector + experiment log are the first pieces.
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Bottom row: Notes + assistants meta */}
                <section className="mb-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-[0.75rem] text-slate-200 shadow-sm shadow-black/40">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                            Notes to future Tez
                        </h2>
                        <p className="mt-2 text-[0.75rem] text-slate-300">
                            Labs is where you can be reckless on paper and disciplined in
                            code. Capture experiments here first, then promote what works into
                            the CEO world.
                        </p>
                        <ul className="mt-2 space-y-1.5 list-disc pl-4 text-[0.75rem]">
                            <li>Don&apos;t overbuild experiments – keep them small.</li>
                            <li>One experiment per hypothesis; track the outcome later.</li>
                            <li>
                                If something hits, give it a real registry entry and let the
                                dashboards/assistants see it.
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-[0.75rem] text-slate-200 shadow-sm shadow-black/40">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                            Where assistants plug in
                        </h2>
                        <p className="mt-2 text-[0.75rem] text-slate-300">
                            Future AI assistants for Digital Hooligan will treat Labs HQ as
                            the playground and CEO as the polished readout.
                        </p>
                        <ul className="mt-2 space-y-1.5 list-disc pl-4 text-[0.75rem]">
                            <li>
                                Read <span className="font-medium">APP_REGISTRY</span> for
                                inventory.
                            </li>
                            <li>
                                Read <span className="font-medium">/labs/experiments</span>{" "}
                                (backed by a store later) for what&apos;s been tried.
                            </li>
                            <li>
                                Read <span className="font-medium">/ceo/ai-hub</span> + AI
                                endpoints for current behavior.
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Live wiring row: health + Labs mini assistant */}
                <section className="grid gap-4 md:grid-cols-2">
                    {/* Health card */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs text-slate-200 shadow-sm shadow-black/40">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                            Live wiring · health check
                        </h2>
                        <p className="mt-2 text-[0.75rem] text-slate-300">
                            Quick sanity check from the builder POV. This card hits{" "}
                            <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[0.65rem] text-emerald-300">
                                /api/health
                            </code>{" "}
                            and a sample{" "}
                            <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[0.65rem] text-emerald-300">
                                /api/apps/{sampleAppId}
                            </code>{" "}
                            so you know your core routes are alive.
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                            <span
                                className={`inline-flex items-center rounded-full px-2.5 py-1 text-[0.7rem] ring-1 ${healthChip.className}`}
                            >
                                <span className="mr-1 text-[0.65rem] uppercase tracking-[0.16em]">
                                    /api/health
                                </span>
                                {healthChip.label}
                            </span>

                            <span
                                className={`inline-flex items-center rounded-full px-2.5 py-1 text-[0.7rem] ring-1 ${appHealthChip.className}`}
                            >
                                <span className="mr-1 text-[0.65rem] uppercase tracking-[0.16em]">
                                    /api/apps/{sampleAppId}
                                </span>
                                {appHealthChip.label}
                            </span>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[0.7rem] text-slate-300">
                            <button
                                type="button"
                                onClick={runHealthChecks}
                                className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 px-2.5 py-1 font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                            >
                                Re-run checks
                            </button>
                            <p className="text-[0.65rem] text-slate-500">
                                You can mirror these in Insomnia: GET{" "}
                                <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.65rem]">
                                    http://localhost:3000/api/health
                                </code>{" "}
                                and{" "}
                                <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.65rem]">
                                    /api/apps/{sampleAppId}
                                </code>
                                .
                            </p>
                        </div>
                    </div>

                    {/* Labs mini AI assistant */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs text-slate-200 shadow-sm shadow-black/40">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                            Labs mini assistant
                        </h2>
                        <p className="mt-2 text-[0.75rem] text-slate-300">
                            Quick builder-facing summary for any app or bot. Uses the same
                            endpoint as CEO AI Hub:
                            <br />
                            <code className="mt-1 inline-block rounded bg-slate-900 px-1.5 py-0.5 text-[0.65rem] text-emerald-300">
                                /api/ai/app-summary/{`{id}`}
                            </code>
                            .
                        </p>

                        <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end">
                            <div className="flex-1">
                                <label className="mb-1 block text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                                    App / bot
                                </label>
                                <select
                                    value={assistantAppId}
                                    onChange={(e) => setAssistantAppId(e.target.value)}
                                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-emerald-500/70 focus:outline-none focus:ring-1 focus:ring-emerald-500/60"
                                >
                                    {APP_REGISTRY.map((app) => (
                                        <option key={app.id} value={app.id}>
                                            {app.name} ({app.id})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                type="button"
                                onClick={handleAssistantAsk}
                                disabled={
                                    !assistantAppId || assistantState.status === "loading"
                                }
                                className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-950 shadow-sm shadow-emerald-500/40 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-emerald-900/40 disabled:text-emerald-300/60"
                            >
                                {assistantState.status === "loading"
                                    ? "Thinking…"
                                    : "Ask for builder briefing"}
                            </button>
                        </div>

                        <div className="mt-3">
                            <LabsAssistantPanel state={assistantState} />
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

function getOverallHealthChip(state: HealthState): {
    label: string;
    className: string;
} {
    switch (state.status) {
        case "loading":
            return {
                label: "Checking…",
                className: "bg-slate-900/80 text-slate-300 ring-slate-700/80",
            };
        case "ok":
            return {
                label: "Healthy",
                className: "bg-emerald-500/10 text-emerald-200 ring-emerald-500/70",
            };
        case "error":
            return {
                label: "Issue detected",
                className: "bg-rose-500/10 text-rose-200 ring-rose-500/70",
            };
        case "idle":
        default:
            return {
                label: "Not checked yet",
                className: "bg-slate-900/80 text-slate-400 ring-slate-700/80",
            };
    }
}

function getAppHealthChip(
    state: AppRouteHealth,
    appId: string,
): { label: string; className: string } {
    switch (state.status) {
        case "loading":
            return {
                label: "Checking…",
                className: "bg-slate-900/80 text-slate-300 ring-slate-700/80",
            };
        case "ok":
            return {
                label: state.ok ? "OK" : "Responded (ok:false)",
                className: "bg-emerald-500/10 text-emerald-200 ring-emerald-500/70",
            };
        case "error":
            return {
                label: `Error for ${appId}`,
                className: "bg-rose-500/10 text-rose-200 ring-rose-500/70",
            };
        case "idle":
        default:
            return {
                label: "Not checked yet",
                className: "bg-slate-900/80 text-slate-400 ring-slate-700/80",
            };
    }
}

function LabsAssistantPanel({ state }: { state: AssistantState }) {
    if (state.status === "idle") {
        return (
            <div className="rounded-xl border border-dashed border-slate-800 bg-slate-950/70 px-4 py-4 text-[0.75rem] text-slate-400">
                Pick an app and hit{" "}
                <span className="font-semibold text-slate-200">
                    Ask for builder briefing
                </span>{" "}
                to see what <code>/api/ai/app-summary/[id]</code> returns from the Labs
                point of view.
            </div>
        );
    }

    if (state.status === "loading") {
        return (
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-4 text-[0.8rem] text-slate-300">
                Thinking about{" "}
                <span className="font-semibold text-slate-100">
                    {state.appId}
                </span>{" "}
                …
            </div>
        );
    }

    if (state.status === "error") {
        return (
            <div className="rounded-xl border border-rose-500/60 bg-rose-950/40 px-4 py-4 text-[0.8rem] text-rose-100">
                <p className="font-semibold">Something went wrong.</p>
                <p className="mt-1 text-[0.75rem] text-rose-100/90">
                    Couldn&apos;t load{" "}
                    <code className="rounded bg-rose-900/40 px-1 py-0.5 text-[0.7rem]">
                        /api/ai/app-summary/{state.appId}
                    </code>
                    .
                </p>
                <p className="mt-1 text-[0.75rem] text-rose-100/80">
                    {state.message}
                </p>
            </div>
        );
    }

    // ready
    return (
        <div className="rounded-xl border border-slate-800 bg-slate-950/90 px-4 py-4 text-[0.8rem] text-slate-200">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <div>
                    <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                        Builder briefing
                    </p>
                    <h3 className="mt-1 text-sm font-semibold text-slate-50">
                        {state.headline}
                    </h3>
                </div>
                <code className="rounded-full bg-slate-900 px-2.5 py-1 text-[0.65rem] text-slate-300">
                    appId: {state.appId}
                </code>
            </div>
            <p className="text-[0.8rem] leading-relaxed text-slate-200">
                {state.summary}
            </p>

            {state.tags && state.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1 text-[0.65rem] text-slate-300">
                    {state.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[0.65rem]"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}