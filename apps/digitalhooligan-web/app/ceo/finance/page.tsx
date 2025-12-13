// apps/digitalhooligan-web/app/ceo/finance/page.tsx

"use client";

import React from "react";
import Link from "next/link";

type RevenueStream = "gov" | "freelance" | "product";

type FinanceStream = {
    stream: RevenueStream;
    label: string;
    mrrUsd: number;
    notes: string;
};

type FinanceResponse = {
    ok: true;
    type: "ceo_finance_summary";
    mrrEstimateUsd: number;
    arrEstimateUsd: number;
    cashOnHandUsd: number | null;
    runwayMonthsEstimate: number | null;
    streams: FinanceStream[];
    timestamp: string;
};

type FinanceState =
    | { status: "loading" }
    | { status: "ready"; data: FinanceResponse }
    | { status: "error"; message: string };

export default function CeoFinancePage() {
    const [state, setState] = React.useState<FinanceState>({ status: "loading" });

    async function loadFinance() {
        setState({ status: "loading" });

        try {
            const res = await fetch("/api/ceo/finance");
            if (!res.ok) {
                throw new Error(`API returned ${res.status}`);
            }

            const data = (await res.json()) as FinanceResponse;
            setState({ status: "ready", data });
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Unexpected error loading /api/ceo/finance.";

            setState({ status: "error", message });
        }
    }

    React.useEffect(() => {
        void loadFinance();
    }, []);

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
            <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:pt-10">
                {/* Header */}
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
                            CEO finance
                        </h1>
                        <p className="mt-1 max-w-2xl text-sm text-slate-300/85 md:text-base">
                            Rough-but-useful view of MRR, ARR, and where money could come
                            from across gov, freelance, and products. Backed by a typed{" "}
                            <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[0.7rem] text-emerald-300">
                                /api/ceo/finance
                            </code>{" "}
                            endpoint so dashboards and AI assistants stay in sync.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={loadFinance}
                        className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                    >
                        Refresh
                    </button>
                </div>

                {/* Tabs row */}
                <nav className="mb-6 overflow-x-auto">
                    <div className="flex gap-2 text-sm">
                        <CeoTab href="/ceo" label="Overview" />
                        <CeoTab href="/ceo/tasks" label="Tasks" />
                        <CeoTab href="/ceo/deals" label="Deals" />
                        <CeoTab href="/ceo/finance" label="Finance" active />
                        <CeoTab href="/ceo/performance" label="Performance" />
                        <CeoTab href="/ceo/ai-hub" label="AI Hub" />
                        <CeoTab href="/ceo/dev-workbench" label="Dev WB" />
                        <CeoTab href="/ceo/settings" label="Settings" />
                        <CeoTab href="/ceo/logout" label="Logout" />
                    </div>
                </nav>

                {/* States */}
                {state.status === "loading" && (
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-300 shadow-sm shadow-black/40">
                        Loading finance snapshot…
                    </div>
                )}

                {state.status === "error" && (
                    <div className="rounded-2xl border border-rose-500/60 bg-rose-950/40 p-4 text-sm text-rose-100 shadow-sm shadow-black/40">
                        <p className="font-semibold">Couldn&apos;t load finance data.</p>
                        <p className="mt-1 text-[0.85rem]">{state.message}</p>
                        <p className="mt-2 text-[0.75rem] text-rose-100/90">
                            Hit{" "}
                            <code className="rounded bg-rose-900/50 px-1 py-0.5 text-[0.7rem]">
                                /api/ceo/finance
                            </code>{" "}
                            directly in browser or Insomnia to debug the payload.
                        </p>
                    </div>
                )}

                {state.status === "ready" && (
                    <>
                        {/* Top summary grid */}
                        <section className="mb-6 grid gap-4 md:grid-cols-3">
                            <SummaryCard
                                label="Est. MRR"
                                value={`$${state.data.mrrEstimateUsd.toLocaleString()}`}
                                note="Once gov + freelance + products are all humming."
                            />
                            <SummaryCard
                                label="Est. ARR"
                                value={`$${state.data.arrEstimateUsd.toLocaleString()}`}
                                note="Purely a projection. Useful for direction, not taxes."
                            />
                            <SummaryCard
                                label="Runway"
                                value={
                                    state.data.runwayMonthsEstimate != null
                                        ? `${state.data.runwayMonthsEstimate} months`
                                        : "Not wired yet"
                                }
                                note={
                                    state.data.runwayMonthsEstimate != null
                                        ? "Based on cash-on-hand and estimated monthly burn."
                                        : "Later, wire this to real cash + burn numbers."
                                }
                            />
                        </section>

                        {/* Streams breakdown */}
                        <section className="mb-6 grid gap-4 md:grid-cols-3">
                            {state.data.streams.map((stream) => (
                                <StreamCard key={stream.stream} stream={stream} />
                            ))}
                        </section>

                        {/* Footer notes */}
                        <p className="text-[0.7rem] text-slate-400">
                            All of this is intentionally rough. The point is to keep a simple
                            picture of where money could come from, not to replace a real
                            accountant.
                        </p>
                        <p className="mt-1 text-[0.7rem] text-slate-400">
                            Source of truth:{" "}
                            <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[0.65rem] text-emerald-300">
                                /api/ceo/finance
                            </code>
                            . Last updated:{" "}
                            <span className="text-slate-300">
                                {new Date(state.data.timestamp).toLocaleString()}
                            </span>
                            .
                        </p>
                    </>
                )}
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

function SummaryCard(props: { label: string; value: string; note: string }) {
    const { label, value, note } = props;
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {label}
            </p>
            <p className="mt-2 text-xl font-semibold text-slate-50 md:text-2xl">
                {value}
            </p>
            <p className="mt-2 text-[0.75rem] text-slate-400">{note}</p>
        </div>
    );
}

function StreamCard({ stream }: { stream: FinanceStream }) {
    const labelColor =
        stream.stream === "gov"
            ? "text-sky-200"
            : stream.stream === "freelance"
                ? "text-amber-200"
                : "text-emerald-200";

    const pillLabel =
        stream.stream === "gov"
            ? "Gov / contracts"
            : stream.stream === "freelance"
                ? "Freelance"
                : "Products & apps";

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <div className="flex items-center justify-between gap-2">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Revenue stream
                </p>
                <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2.5 py-0.5 text-[0.65rem] text-slate-300">
                    <span className={labelColor}>{pillLabel}</span>
                </span>
            </div>

            <p className="mt-2 text-xl font-semibold text-slate-50">
                ${stream.mrrUsd.toLocaleString()}{" "}
                <span className="text-sm font-normal text-slate-400">/ month</span>
            </p>
            <p className="mt-2 text-[0.75rem] text-slate-400">{stream.notes}</p>
        </div>
    );
}