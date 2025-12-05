// apps/digitalhooligan-web/app/ceo/ai-hub/page.tsx

"use client";

import React from "react";
import Link from "next/link";
import { APP_REGISTRY, type AppRegistryEntry } from "@/lib/appRegistry";
import { getMockMetricValue } from "@/lib/mockMetrics";

type AiHubMetrics = {
    users: number | null;
    mrr: number | null;
    uptime: number | null;
    errorsPerMin: number | null;
};

function buildMetrics(entry: AppRegistryEntry): AiHubMetrics {
    const keys = entry.metricsKeys ?? {};

    return {
        users:
            keys.users != null ? getMockMetricValue(keys.users) : null,
        mrr: keys.mrr != null ? getMockMetricValue(keys.mrr) : null,
        uptime:
            keys.uptime != null ? getMockMetricValue(keys.uptime) : null,
        errorsPerMin:
            keys.errorsPerMin != null
                ? getMockMetricValue(keys.errorsPerMin)
                : null,
    };
}

function buildSummary(entry: AppRegistryEntry, metrics: AiHubMetrics): string {
    const lifecycle = entry.lifecycle;
    const lifecycleLabel =
        lifecycle === "live"
            ? "live"
            : lifecycle === "beta"
                ? "in beta"
                : lifecycle === "alpha"
                    ? "in alpha"
                    : lifecycle === "building"
                        ? "in active build"
                        : lifecycle === "design"
                            ? "in design"
                            : lifecycle === "idea"
                                ? "at the idea stage"
                                : lifecycle === "paused"
                                    ? "paused"
                                    : lifecycle;

    const kindLabel =
        entry.kind === "public-app"
            ? "public app"
            : entry.kind === "internal-tool"
                ? "internal tool"
                : entry.kind === "bot"
                    ? "automation bot"
                    : "infra component";

    const audience = entry.internalOnly ? "internal use only" : "user-facing";

    const parts: string[] = [];

    parts.push(
        `${entry.name} is a ${audience} ${kindLabel} that is currently ${lifecycleLabel}.`,
    );
    parts.push(entry.description);

    const blurbs: string[] = [];

    if (metrics.users != null) {
        blurbs.push(`${Math.round(metrics.users)} mock users`);
    }
    if (metrics.mrr != null) {
        blurbs.push(`$${metrics.mrr.toFixed(0)}/mo mock MRR`);
    }
    if (metrics.uptime != null) {
        blurbs.push(`${metrics.uptime.toFixed(1)}% mock uptime`);
    }
    if (metrics.errorsPerMin != null) {
        blurbs.push(
            `${metrics.errorsPerMin.toFixed(2)} mock errors per minute`,
        );
    }

    if (blurbs.length > 0) {
        parts.push(
            `Current mock metrics: ${blurbs.join(
                ", ",
            )}. These are placeholders for future real data.`,
        );
    }

    return parts.join(" ");
}

const ASSISTANT_BASE_PROMPT = `You are the AI assistant for Digital Hooligan's internal tools.

Use these HTTP endpoints to understand apps and tools:
- GET /api/health -> basic system health and registry count.
- GET /api/apps/[id]?includeMetrics=true -> structured app data + mock metrics.
- GET /api/ai/app-summary/[id] -> natural-language summary + structured app + metrics.
- GET /api/ai/suggestions -> portfolio-level next-step suggestions.

When asked about a specific app, first fetch /api/ai/app-summary/[id],
then optionally drill into /api/apps/[id]?includeMetrics=true for details.
When asked what to work on next, call /api/ai/suggestions and explain the top 3 items.`;

const PLAYBOOKS: { id: string; title: string; body: string }[] = [
    {
        id: "app-deep-dive",
        title: "Deep dive on a single app",
        body: `When I ask you about a specific app (for example "PennyWize" or "DropSignal"):

1. Resolve the app id and call:
   - GET /api/ai/app-summary/[id]
   - GET /api/apps/[id]?includeMetrics=true

2. Combine the results into a short, opinionated explanation:
   - What is this app for?
   - What stage is it in (idea/design/building/beta/live)?
   - What do the mock metrics suggest?

3. Suggest 1–2 concrete next steps for that app only, referencing
   what you see in its lifecycle + metrics.`,
    },
    {
        id: "portfolio-review",
        title: "Portfolio review & priorities",
        body: `When I ask "what should I work on next?" or "how does the portfolio look?":

1. Call:
   - GET /api/health
   - GET /api/ai/suggestions

2. Use /api/ai/suggestions to pick 3–5 high-priority items across all apps.

3. Present a short ranked list. For each item, include:
   - App name (or "Global" if appId is null)
   - Suggestion title
   - Why this matters now
   - The smallest next action I can take in under 60 minutes.

4. If several suggestions cluster around the same app, call
   /api/ai/app-summary/[id] so your explanation is grounded.`,
    },
    {
        id: "internal-tools-focus",
        title: "Internal tools & automation focus",
        body: `When I ask about internal tools, automations, or "Ops Toys":

1. Filter to apps where internalOnly = true.

2. For each internal app I mention:
   - Call GET /api/ai/app-summary/[id]
   - Highlight how it is supposed to make my life easier (based on description + metrics).

3. Suggest 1–2 improvements that would maximize founder time saved:
   - clearer workflow automation
   - better logging/observability
   - faster shortcuts for common tasks (like CEO dashboard navigation, registry edits, etc.).`,
    },
];

export default function AiHubPage() {
    const entries = APP_REGISTRY;

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
            <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:pt-10">
                {/* Header / breadcrumbs */}
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                            <Link
                                href="/ceo"
                                className="inline-flex items-center rounded-full bg-slate-900/70 px-2.5 py-1 font-medium text-[0.7rem] text-slate-300 ring-1 ring-slate-700/80 hover:text-emerald-300 hover:ring-emerald-500/70"
                            >
                                <span className="mr-1 text-[0.7rem]">←</span>
                                CEO overview
                            </Link>
                            <span className="inline-flex items-center rounded-full bg-slate-900/50 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-400 ring-1 ring-slate-800/80">
                                CEO · AI Hub
                            </span>
                        </div>

                        <h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
                            AI Hub assistant
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm text-slate-300/85 md:text-base">
                            Early wiring for your internal AI copilots. Each app pulls a
                            registry-backed AI summary and exposes the{" "}
                            <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[0.7rem] text-emerald-300">
                                /api/ai/app-summary/[id]
                            </code>{" "}
                            endpoint your assistants can call, plus a portfolio-level
                            suggestions API.
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-2 text-right text-[0.75rem] text-slate-400">
                        <p className="max-w-xs text-xs text-slate-400">
                            Future: wire this view into a real AI backend and let the
                            assistant reason across health, metrics, and suggestions.
                        </p>
                        <div className="flex flex-wrap items-center justify-end gap-2">
                            <Link
                                href="/api/ai/app-summary/pennywize"
                                className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1.5 text-[0.7rem] font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                            >
                                Example app summary →
                            </Link>
                            <Link
                                href="/api/ai/suggestions"
                                className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1.5 text-[0.7rem] font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                            >
                                Example suggestions payload →
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Prompt helper */}
                <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-sm shadow-black/40">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                        Assistant base prompt
                    </h2>
                    <p className="mt-2 text-xs text-slate-400">
                        Use this as the core system prompt when configuring an AI
                        assistant (ChatGPT, custom agent, etc.) so it knows how to use
                        your registry and AI endpoints.
                    </p>
                    <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <code className="block max-h-40 flex-1 overflow-auto rounded-xl bg-slate-950 px-3 py-2 text-[0.7rem] leading-relaxed text-slate-200 whitespace-pre-wrap">
                            {ASSISTANT_BASE_PROMPT}
                        </code>
                        <div className="mt-2 flex-shrink-0 md:mt-0 md:ml-4">
                            <CopyButton text={ASSISTANT_BASE_PROMPT} />
                        </div>
                    </div>
                </section>

                {/* Assistant playbooks */}
                <section className="mb-6 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                            Assistant playbooks
                        </h2>
                        <p className="text-xs text-slate-400">
                            Ready-made instructions you can paste into an assistant as
                            additional behavior.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        {PLAYBOOKS.map((playbook) => (
                            <div
                                key={playbook.id}
                                className="flex flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-950/90 p-3 shadow-sm shadow-black/40"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="text-xs font-semibold text-slate-100">
                                        {playbook.title}
                                    </h3>
                                    <CopyButton text={playbook.body} />
                                </div>
                                <p className="text-[0.7rem] text-slate-300 whitespace-pre-line">
                                    {playbook.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* App summary grid */}
                <section className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                            Registry-backed AI summaries
                        </h2>
                        <p className="text-xs text-slate-400">
                            Each card mirrors what /api/ai/app-summary/[id] returns for that app.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {entries.map((app) => {
                            const metrics = buildMetrics(app);
                            const summary = buildSummary(app, metrics);
                            return (
                                <AppSummaryCard
                                    key={app.id}
                                    app={app}
                                    summary={summary}
                                    metrics={metrics}
                                />
                            );
                        })}
                    </div>
                </section>
            </div>
        </main>
    );
}

function AppSummaryCard({
    app,
    summary,
    metrics,
}: {
    app: AppRegistryEntry;
    summary: string;
    metrics: AiHubMetrics;
}) {
    const apiUrl = `/api/ai/app-summary/${app.id}`;

    const kindLabel =
        app.kind === "public-app"
            ? "Public app"
            : app.kind === "internal-tool"
                ? "Internal tool"
                : app.kind === "bot"
                    ? "Automation bot"
                    : "Infra";

    const audienceLabel = app.internalOnly ? "Internal-only" : "User-facing";

    return (
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-sm shadow-black/40">
            {/* Header row */}
            <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900/90 text-xl">
                        {app.icon?.type === "emoji" ? app.icon.value : "⛓"}
                    </div>
                    <div>
                        <div className="flex flex-wrap items-center gap-1.5">
                            <h3 className="text-sm font-semibold text-slate-50">
                                {app.name}
                            </h3>
                            <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-slate-400">
                                {app.lifecycle}
                            </span>
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[0.65rem] text-slate-400">
                            <span className="rounded-full bg-slate-900/80 px-2 py-0.5">
                                {kindLabel}
                            </span>
                            <span className="rounded-full bg-slate-900/80 px-2 py-0.5">
                                {audienceLabel}
                            </span>
                            <code className="rounded bg-slate-900 px-2 py-0.5 text-[0.65rem] text-slate-300">
                                id: {app.id}
                            </code>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-1 text-[0.65rem] text-slate-400">
                    {app.ceoPath && (
                        <Link
                            href={app.ceoPath}
                            className="rounded-full border border-slate-700/80 bg-slate-900/80 px-2 py-0.5 text-[0.65rem] font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                        >
                            CEO view →
                        </Link>
                    )}
                    {app.labsPath && (
                        <Link
                            href={app.labsPath}
                            className="rounded-full border border-slate-800 bg-slate-950/80 px-2 py-0.5 text-[0.65rem] text-slate-300 hover:border-emerald-500/60 hover:text-emerald-200"
                        >
                            Labs view →
                        </Link>
                    )}
                </div>
            </div>

            {/* Summary body */}
            <div className="rounded-xl bg-slate-950/90 p-3 text-[0.75rem] text-slate-200">
                <p className="whitespace-pre-line">{summary}</p>
            </div>

            {/* Metrics + API URL */}
            <div className="flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-950/90 p-3">
                <div className="flex flex-wrap items-center gap-2 text-[0.7rem] text-slate-300">
                    {metrics.users != null && (
                        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[0.7rem] text-emerald-300 ring-1 ring-emerald-500/40">
                            {Math.round(metrics.users).toLocaleString()} users (mock)
                        </span>
                    )}
                    {metrics.mrr != null && (
                        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[0.7rem] text-emerald-300 ring-1 ring-emerald-500/40">
                            ${metrics.mrr.toFixed(0)}/mo (mock MRR)
                        </span>
                    )}
                    {metrics.uptime != null && (
                        <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-[0.7rem] text-sky-300 ring-1 ring-sky-500/40">
                            {metrics.uptime.toFixed(1)}% uptime (mock)
                        </span>
                    )}
                    {metrics.errorsPerMin != null && (
                        <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[0.7rem] text-amber-300 ring-1 ring-amber-500/40">
                            {metrics.errorsPerMin.toFixed(2)} errors/min (mock)
                        </span>
                    )}
                    {metrics.users == null &&
                        metrics.mrr == null &&
                        metrics.uptime == null &&
                        metrics.errorsPerMin == null && (
                            <span className="text-[0.7rem] text-slate-400">
                                No mock metrics wired yet for this entry.
                            </span>
                        )}
                </div>

                <div className="mt-1 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                        <p className="text-[0.7rem] font-medium text-slate-300">
                            AI summary endpoint
                        </p>
                        <code className="mt-0.5 block max-w-full truncate text-[0.7rem] text-slate-400">
                            {apiUrl}
                        </code>
                    </div>
                    <CopyButton text={apiUrl} />
                </div>
            </div>
        </div>
    );
}

function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = React.useState(false);

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
        } catch (err) {
            console.error("Failed to copy to clipboard:", err);
        }
    }

    return (
        <button
            type="button"
            onClick={handleCopy}
            className="shrink-0 rounded-full border border-slate-700/80 bg-slate-900/80 px-2.5 py-1 text-[0.7rem] font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
        >
            {copied ? "Copied" : "Copy"}
        </button>
    );
}