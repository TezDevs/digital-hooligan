// apps/digitalhooligan-web/app/ceo/dev-workbench/page.tsx

"use client";

import React from "react";
import Link from "next/link";
import { APP_REGISTRY, type AppRegistryEntry } from "@/lib/appRegistry";

type ApiLinks = {
    app: string;
    appWithMetrics: string;
    aiSummary: string;
};

function buildApiLinks(id: string): ApiLinks {
    return {
        app: `/api/apps/${id}`,
        appWithMetrics: `/api/apps/${id}?includeMetrics=true`,
        aiSummary: `/api/ai/app-summary/${id}`,
    };
}

export default function DevWorkbenchPage() {
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
                                CEO · Dev Workbench
                            </span>
                        </div>

                        <h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
                            Dev Workbench
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm text-slate-300/85 md:text-base">
                            Internal control center for Digital Hooligan apps, bots, and tools. Powered by{" "}
                            <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[0.7rem] text-emerald-300">
                                APP_REGISTRY
                            </code>{" "}
                            plus registry-backed API endpoints.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href="/labs/app-registry"
                            className="inline-flex items-center rounded-full border border-slate-800 bg-slate-950/70 px-3 py-1.5 text-[0.7rem] font-medium text-slate-300 transition hover:border-emerald-500/60 hover:text-emerald-200"
                        >
                            <span className="mr-1.5 text-xs">🧪</span>
                            Open registry in Labs
                        </Link>
                    </div>
                </div>

                {/* Info strip */}
                <section className="mb-6 grid gap-4 md:grid-cols-3">
                    <InfoCard
                        label="Apps & tools"
                        value={entries.length.toString()}
                        hint="Backed by APP_REGISTRY"
                    />
                    <InfoCard
                        label="Per-app detail API"
                        value="/api/apps/[id]"
                        hint="Single app payload + optional metrics"
                    />
                    <InfoCard
                        label="AI summary API"
                        value="/api/ai/app-summary/[id]"
                        hint="AI-friendly summary + structured data"
                    />
                </section>

                {/* App grid */}
                <section className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                            Registry-backed app list
                        </h2>
                        <p className="text-xs text-slate-400">
                            Click or copy URLs to use in Insomnia/Kong or future AI assistants.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {entries.map((app) => (
                            <AppCard key={app.id} app={app} />
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}

function InfoCard(props: { label: string; value: string; hint?: string }) {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 px-4 py-3 shadow-sm shadow-black/40">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                {props.label}
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-50">{props.value}</p>
            {props.hint && (
                <p className="mt-1 text-xs text-slate-400/90">{props.hint}</p>
            )}
        </div>
    );
}

function AppCard({ app }: { app: AppRegistryEntry }) {
    const api = buildApiLinks(app.id);

    const lifecycleLabel = app.lifecycle;
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
                                {lifecycleLabel}
                            </span>
                        </div>
                        <p className="mt-1 text-[0.75rem] text-slate-400 line-clamp-2">
                            {app.description}
                        </p>
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

            {/* API links */}
            <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-950/90 p-3">
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                    API routes
                </p>

                <ApiRow label="App details" url={api.app} />
                <ApiRow label="App details + metrics" url={api.appWithMetrics} />
                <ApiRow label="AI app summary" url={api.aiSummary} />
            </div>
        </div>
    );
}

function ApiRow({ label, url }: { label: string; url: string }) {
    return (
        <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
                <p className="text-[0.7rem] font-medium text-slate-300">{label}</p>
                <code className="mt-0.5 block max-w-full truncate text-[0.7rem] text-slate-400">
                    {url}
                </code>
            </div>
            <CopyButton text={url} />
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