// apps/digitalhooligan-web/app/ceo/deals/page.tsx

"use client";

import React from "react";
import Link from "next/link";

type DealKind = "gov" | "freelance" | "product";
type DealStage = "idea" | "prospect" | "proposal" | "negotiation" | "won" | "parked";

type CeoDeal = {
    id: string;
    title: string;
    description: string;
    kind: DealKind;
    stage: DealStage;
    estValueUsd: number | null;
    targetDate: string | null;
    tags: string[];
};

type DealsResponse = {
    ok: true;
    type: "ceo_deals";
    deals: CeoDeal[];
    timestamp: string;
};

type DealsState =
    | { status: "loading" }
    | { status: "ready"; deals: CeoDeal[]; timestamp: string }
    | { status: "error"; message: string };

export default function CeoDealsPage() {
    const [state, setState] = React.useState<DealsState>({ status: "loading" });

    async function loadDeals() {
        setState({ status: "loading" });

        try {
            const res = await fetch("/api/ceo/deals");
            if (!res.ok) {
                throw new Error(`API returned ${res.status}`);
            }

            const data = (await res.json()) as DealsResponse;
            setState({
                status: "ready",
                deals: data.deals,
                timestamp: data.timestamp,
            });
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Unexpected error loading /api/ceo/deals.";

            setState({ status: "error", message });
        }
    }

    React.useEffect(() => {
        void loadDeals();
    }, []);

    const dealsGov =
        state.status === "ready"
            ? state.deals.filter((d) => d.kind === "gov")
            : [];
    const dealsFreelance =
        state.status === "ready"
            ? state.deals.filter((d) => d.kind === "freelance")
            : [];
    const dealsProduct =
        state.status === "ready"
            ? state.deals.filter((d) => d.kind === "product")
            : [];

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
            <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:pt-10">
                {/* Header */}
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
                            CEO deals
                        </h1>
                        <p className="mt-1 max-w-2xl text-sm text-slate-300/85 md:text-base">
                            High-level pipeline across gov, freelance, and product deals.
                            Backed by <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[0.7rem] text-emerald-300">/api/ceo/deals</code> so dashboards and AI
                            assistants share the same picture.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={loadDeals}
                        className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                    >
                        Refresh
                    </button>
                </div>

                {/* Tabs row (CEO nav) */}
                <nav className="mb-6 overflow-x-auto">
                    <div className="flex gap-2 text-sm">
                        <CeoTab href="/ceo" label="Overview" />
                        <CeoTab href="/ceo/tasks" label="Tasks" />
                        <CeoTab href="/ceo/deals" label="Deals" active />
                        <CeoTab href="/ceo/finance" label="Finance" />
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
                        Loading deals pipeline…
                    </div>
                )}

                {state.status === "error" && (
                    <div className="rounded-2xl border border-rose-500/60 bg-rose-950/40 p-4 text-sm text-rose-100 shadow-sm shadow-black/40">
                        <p className="font-semibold">Couldn&apos;t load deals.</p>
                        <p className="mt-1 text-[0.85rem]">{state.message}</p>
                        <p className="mt-2 text-[0.75rem] text-rose-100/90">
                            Hit{" "}
                            <code className="rounded bg-rose-900/50 px-1 py-0.5 text-[0.7rem]">
                                /api/ceo/deals
                            </code>{" "}
                            directly in browser or Insomnia to debug the payload.
                        </p>
                    </div>
                )}

                {state.status === "ready" && (
                    <>
                        <section className="mb-6 grid gap-4 md:grid-cols-3">
                            <DealsColumn
                                title="Gov pipeline"
                                subtitle="Contracts and opportunities under NAICS / gov work."
                                deals={dealsGov}
                            />
                            <DealsColumn
                                title="Freelance & platforms"
                                subtitle="Remote dev / PM work that feeds the engine."
                                deals={dealsFreelance}
                            />
                            <DealsColumn
                                title="Product & apps"
                                subtitle="Digital Hooligan-owned products and subscriptions."
                                deals={dealsProduct}
                            />
                        </section>

                        <p className="text-[0.7rem] text-slate-400">
                            Source of truth:{" "}
                            <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[0.65rem] text-emerald-300">
                                /api/ceo/deals
                            </code>
                            . Later, the CEO Copilot and AI Hub can summarize this alongside
                            tasks and app health.
                        </p>
                        <p className="mt-1 text-[0.7rem] text-slate-400">
                            Last updated:{" "}
                            <span className="text-slate-300">
                                {new Date(state.timestamp).toLocaleString()}
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

function DealsColumn(props: {
    title: string;
    subtitle: string;
    deals: CeoDeal[];
}) {
    const { title, subtitle, deals } = props;

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <div className="mb-2">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {title}
                </p>
                <p className="mt-1 text-[0.75rem] text-slate-300">{subtitle}</p>
            </div>

            {deals.length === 0 && (
                <p className="mt-2 text-[0.75rem] text-slate-500">
                    No deals in this lane yet. That&apos;s either focus or opportunity.
                </p>
            )}

            <ul className="mt-2 space-y-2">
                {deals.map((deal) => (
                    <li
                        key={deal.id}
                        className="rounded-xl border border-slate-800 bg-slate-950/90 px-3 py-2"
                    >
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <p className="text-[0.8rem] font-medium text-slate-100">
                                    {deal.title}
                                </p>
                                <p className="mt-1 text-[0.75rem] text-slate-300">
                                    {deal.description}
                                </p>
                                <p className="mt-1 text-[0.7rem] text-slate-400">
                                    Stage:{" "}
                                    <span className="text-slate-200">
                                        {stageLabel(deal.stage)}
                                    </span>
                                    {deal.estValueUsd != null && (
                                        <>
                                            {" "}
                                            · Est:{" "}
                                            <span className="text-slate-200">
                                                ${deal.estValueUsd.toLocaleString()}
                                            </span>
                                        </>
                                    )}
                                </p>
                            </div>
                            <StageBadge stage={deal.stage} />
                        </div>

                        <div className="mt-2 flex flex-wrap gap-1 text-[0.65rem] text-slate-400">
                            {deal.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full bg-slate-900/80 px-2 py-0.5"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function StageBadge({ stage }: { stage: DealStage }) {
    const base =
        "inline-flex items-center rounded-full px-2 py-0.5 text-[0.65rem] font-medium ring-1";

    let tone = "bg-slate-900/80 text-slate-300 ring-slate-700/80";

    if (stage === "idea") {
        tone = "bg-slate-900/80 text-slate-200 ring-slate-700/80";
    } else if (stage === "prospect") {
        tone = "bg-sky-500/10 text-sky-200 ring-sky-500/60";
    } else if (stage === "proposal") {
        tone = "bg-amber-500/10 text-amber-200 ring-amber-500/60";
    } else if (stage === "negotiation") {
        tone = "bg-fuchsia-500/10 text-fuchsia-200 ring-fuchsia-500/60";
    } else if (stage === "won") {
        tone = "bg-emerald-500/10 text-emerald-200 ring-emerald-500/60";
    } else if (stage === "parked") {
        tone = "bg-slate-800/90 text-slate-400 ring-slate-700/80";
    }

    return <span className={base + " " + tone}>{stageLabel(stage)}</span>;
}

function stageLabel(stage: DealStage): string {
    switch (stage) {
        case "idea":
            return "Idea";
        case "prospect":
            return "Prospect";
        case "proposal":
            return "Proposal";
        case "negotiation":
            return "Negotiation";
        case "won":
            return "Won";
        case "parked":
            return "Parked";
        default:
            return stage;
    }
}