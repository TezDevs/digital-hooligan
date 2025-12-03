// app/ceo/deals/page.tsx
import type { Metadata } from "next";
import {
    mockDeals,
    groupDealsByStage,
    calculatePipelineValue,
    Deal,
    DealStage
} from "@/lib/ceoDashboardData";
import { CeoHeader } from "@/components/ceo/CeoHeader";

export const metadata: Metadata = {
    title: "CEO Deals | Digital Hooligan",
    description: "Pipeline view for deals and revenue opportunities."
};

const STAGE_COLUMNS: { key: DealStage; label: string; hint: string }[] = [
    { key: "LEAD", label: "Leads", hint: "Early conversations & ideas" },
    { key: "PROPOSAL", label: "Proposals", hint: "Sent proposal, waiting reply" },
    { key: "NEGOTIATION", label: "Negotiation", hint: "Actively shaping terms" },
    { key: "WON", label: "Won", hint: "Closed deals (cash incoming)" }
];

function formatCurrency(value: number): string {
    return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    });
}

export default function CeoDealsPage() {
    const grouped = groupDealsByStage(mockDeals);
    const expectedPipeline = calculatePipelineValue(mockDeals);

    const totalValue = mockDeals.reduce((sum, d) => sum + d.value, 0);
    const govDeals = mockDeals.filter((d) => d.source === "GOV");
    const freelanceDeals = mockDeals.filter((d) => d.source === "FREELANCE");
    const directDeals = mockDeals.filter((d) => d.source === "DIRECT");

    const govValue = govDeals.reduce((sum, d) => sum + d.value, 0);
    const freelanceValue = freelanceDeals.reduce((sum, d) => sum + d.value, 0);
    const directValue = directDeals.reduce((sum, d) => sum + d.value, 0);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50">
            <CeoHeader />

            <main className="mx-auto max-w-6xl px-4 py-6 space-y-4">
                {/* Header summary */}
                <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h1 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                            Deals & Pipeline
                        </h1>
                        <p className="mt-1 text-[12px] text-slate-400">
                            One place to track gov contracts, freelance gigs, and direct clients so
                            you always know where the money could come from next.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 text-[11px] text-slate-300">
                        <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1">
                            Total deals: {mockDeals.length}
                        </span>
                        <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1">
                            Total value: {formatCurrency(totalValue)}
                        </span>
                        <span className="rounded-full border border-emerald-500/60 bg-emerald-500/10 px-3 py-1 text-emerald-100">
                            Expected pipeline: {formatCurrency(expectedPipeline)}
                        </span>
                    </div>
                </header>

                {/* Source breakdown */}
                <section className="grid grid-cols-1 gap-3 md:grid-cols-3 text-[11px]">
                    <SourceCard
                        label="Gov contracts"
                        hint="SAM.gov, small federal work, NAICS 541511 track."
                        count={govDeals.length}
                        value={govValue}
                        badge="GOV"
                    />
                    <SourceCard
                        label="Freelance"
                        hint="Gun.io, Upwork, and similar marketplaces."
                        count={freelanceDeals.length}
                        value={freelanceValue}
                        badge="FREELANCE"
                    />
                    <SourceCard
                        label="Direct clients"
                        hint="Direct DH clients outside of marketplaces."
                        count={directDeals.length}
                        value={directValue}
                        badge="DIRECT"
                    />
                </section>

                {/* Pipeline board */}
                <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4 overflow-x-auto">
                        {STAGE_COLUMNS.map((col) => (
                            <DealsColumn
                                key={col.key}
                                title={col.label}
                                hint={col.hint}
                                stage={col.key}
                                deals={grouped[col.key]}
                            />
                        ))}
                    </div>
                </section>

                <p className="pb-4 text-[10px] text-slate-500">
                    Future: sync this to a real CRM-ish backend, tag deals by app (PennyWize,
                    DropSignal, HypeWatch, Ops Toys), and let Strategy AI suggest what to push
                    this week to move the needle.
                </p>
            </main>
        </div>
    );
}

function SourceCard({
    label,
    hint,
    count,
    value,
    badge
}: {
    label: string;
    hint: string;
    count: number;
    value: number;
    badge: "GOV" | "FREELANCE" | "DIRECT";
}) {
    const accent =
        badge === "GOV"
            ? "border-sky-500/60 bg-sky-500/10 text-sky-100"
            : badge === "FREELANCE"
                ? "border-purple-500/60 bg-purple-500/10 text-purple-100"
                : "border-emerald-500/60 bg-emerald-500/10 text-emerald-100";

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3 space-y-2">
            <div className="flex items-center justify-between gap-2">
                <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                        {label}
                    </div>
                    <p className="mt-1 text-[10px] text-slate-500">{hint}</p>
                </div>
                <span className={`rounded-full border px-2 py-0.5 text-[10px] ${accent}`}>
                    {badge.toLowerCase()}
                </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-300">
                <span>{count} deal{count === 1 ? "" : "s"}</span>
                <span className="font-semibold">{formatCurrency(value)}</span>
            </div>
        </div>
    );
}

function DealsColumn({
    title,
    hint,
    stage,
    deals
}: {
    title: string;
    hint: string;
    stage: DealStage;
    deals: Deal[];
}) {
    const badgeColor =
        stage === "NEGOTIATION"
            ? "border-amber-500/60 bg-amber-500/10 text-amber-100"
            : stage === "WON"
                ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-100"
                : "border-slate-700 bg-slate-900 text-slate-300";

    return (
        <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-950/40 p-3 min-w-[220px]">
            <div className="mb-2 flex items-center justify-between gap-2">
                <div>
                    <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                        {title}
                    </h2>
                    <p className="mt-1 text-[10px] text-slate-500">{hint}</p>
                </div>
                <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] ${badgeColor}`}
                >
                    {deals.length}
                </span>
            </div>

            <div className="mt-1 space-y-2 text-[11px]">
                {deals.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/50 px-3 py-4 text-center text-[11px] text-slate-500">
                        No deals in this stage yet.
                    </div>
                ) : (
                    deals.map((deal) => <DealCard key={deal.id} deal={deal} />)
                )}
            </div>
        </div>
    );
}

function DealCard({ deal }: { deal: Deal }) {
    const sourceLabel =
        deal.source === "GOV"
            ? "Gov contract"
            : deal.source === "FREELANCE"
                ? "Freelance"
                : "Direct client";

    const sourceBadge =
        deal.source === "GOV"
            ? "bg-sky-500/10 text-sky-100 border-sky-500/40"
            : deal.source === "FREELANCE"
                ? "bg-purple-500/10 text-purple-100 border-purple-500/40"
                : "bg-emerald-500/10 text-emerald-100 border-emerald-500/40";

    return (
        <article className="rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2">
            <div className="flex items-start justify-between gap-2">
                <div>
                    <h3 className="text-[12px] font-medium text-slate-50">{deal.name}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px]">
                        <span className={`rounded-full border px-2 py-0.5 ${sourceBadge}`}>
                            {sourceLabel}
                        </span>
                        <span className="rounded-full bg-slate-900 px-2 py-0.5 text-slate-300">
                            {formatCurrency(deal.value)}
                        </span>
                        <span className="rounded-full bg-slate-900 px-2 py-0.5 text-slate-400">
                            {(deal.probability * 100).toFixed(0)}% win chance
                        </span>
                    </div>
                </div>
            </div>
        </article>
    );
}