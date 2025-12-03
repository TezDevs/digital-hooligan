// components/ceo/CeoDecisionLog.tsx
"use client";

import React from "react";
import { DecisionEntry, DecisionArea } from "@/lib/ceoDashboardData";

type FilterArea = "ALL" | DecisionArea;

const AREA_FILTERS: { key: FilterArea; label: string }[] = [
    { key: "ALL", label: "All areas" },
    { key: "PRODUCT", label: "Product" },
    { key: "GOV", label: "Gov / Admin" },
    { key: "FINANCE", label: "Finance" },
    { key: "OPS", label: "Ops / Infra" },
    { key: "BRAND", label: "Brand" },
    { key: "OTHER", label: "Other" }
];

export function CeoDecisionLog({ decisions }: { decisions: DecisionEntry[] }) {
    const [areaFilter, setAreaFilter] = React.useState<FilterArea>("ALL");

    const filtered = React.useMemo(
        () =>
            decisions.filter((d) =>
                areaFilter === "ALL" ? true : d.area === areaFilter
            ),
        [decisions, areaFilter]
    );

    return (
        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-3">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Decision log
                    </h2>
                    <p className="mt-1 text-[11px] text-slate-400">
                        Running list of big calls you&apos;ve made so future-you can remember
                        what you decided and why.
                    </p>
                </div>
                <div className="flex flex-wrap gap-1 text-[11px]">
                    {AREA_FILTERS.map((f) => {
                        const active = areaFilter === f.key;
                        return (
                            <button
                                key={f.key}
                                type="button"
                                onClick={() => setAreaFilter(f.key)}
                                className={[
                                    "rounded-full border px-3 py-1 text-[11px] transition-colors",
                                    active
                                        ? "border-emerald-500/70 bg-emerald-500/10 text-emerald-100"
                                        : "border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-600"
                                ].join(" ")}
                            >
                                {f.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="space-y-2 text-[11px]">
                {filtered.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-700 bg-slate-950/60 px-3 py-4 text-center text-slate-500">
                        No decisions logged for this filter yet.
                    </div>
                ) : (
                    filtered.map((d) => <DecisionRow key={d.id} decision={d} />)
                )}
            </div>

            <p className="text-[10px] text-slate-500">
                Future: let Strategy AI read this log, suggest follow-ups, and flag when a
                previous decision might need to be revisited.
            </p>
        </section>
    );
}

function DecisionRow({ decision }: { decision: DecisionEntry }) {
    const areaLabel =
        decision.area === "PRODUCT"
            ? "Product"
            : decision.area === "GOV"
                ? "Gov / Admin"
                : decision.area === "FINANCE"
                    ? "Finance"
                    : decision.area === "OPS"
                        ? "Ops / Infra"
                        : decision.area === "BRAND"
                            ? "Brand"
                            : "Other";

    const impactBadge =
        decision.impact === "HIGH"
            ? "border-rose-500/60 bg-rose-500/10 text-rose-100"
            : decision.impact === "MEDIUM"
                ? "border-amber-500/60 bg-amber-500/10 text-amber-100"
                : "border-slate-700 bg-slate-900 text-slate-300";

    return (
        <article className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2">
            <div className="flex items-start justify-between gap-2">
                <div>
                    <div className="text-[10px] text-slate-500">{decision.date}</div>
                    <h3 className="text-[12px] font-medium text-slate-50">
                        {decision.title}
                    </h3>
                    {decision.details && (
                        <p className="mt-1 text-[11px] text-slate-400">{decision.details}</p>
                    )}
                </div>
                <div className="flex flex-col items-end gap-1 text-[10px]">
                    <span className="rounded-full bg-slate-800 px-2 py-0.5 text-slate-200">
                        {areaLabel}
                    </span>
                    <span className={`rounded-full border px-2 py-0.5 ${impactBadge}`}>
                        {decision.impact.toLowerCase()} impact
                    </span>
                </div>
            </div>
        </article>
    );
}