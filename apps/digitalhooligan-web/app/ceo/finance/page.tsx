// app/ceo/finance/page.tsx
import type { Metadata } from "next";
import {
    mockRevenueStreams,
    mockExpenseCategories,
    mockDeals,
    mockCashOnHand,
    getRevenueLast30Days,
    getExpensesLast30Days,
    getMonthlyBurnRate,
    getCashRunwayMonths,
    calculatePipelineValue
} from "@/lib/ceoDashboardData";
import { CeoHeader } from "@/components/ceo/CeoHeader";

export const metadata: Metadata = {
    title: "CEO Finance | Digital Hooligan",
    description: "High-level finance view for the Digital Hooligan CEO dashboard."
};

function formatCurrency(value: number): string {
    return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    });
}

export default function CeoFinancePage() {
    const revenue30d = getRevenueLast30Days();
    const expenses30d = getExpensesLast30Days();
    const netCashFlow30d = revenue30d - expenses30d;

    const monthlyBurn = getMonthlyBurnRate();
    const runwayMonths = getCashRunwayMonths(mockCashOnHand);

    const expectedPipeline = calculatePipelineValue(mockDeals);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50">
            <CeoHeader />

            <main className="mx-auto max-w-6xl px-4 py-6 space-y-4">
                {/* Header + key numbers */}
                <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h1 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                            Finance
                        </h1>
                        <p className="mt-1 text-[12px] text-slate-400">
                            Quick view of revenue, burn, and runway so you always know how much
                            breathing room you have while you build.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 text-[11px]">
                        <SummaryChip label="Revenue (last 30d)" value={formatCurrency(revenue30d)} />
                        <SummaryChip label="Expenses (last 30d)" value={formatCurrency(expenses30d)} />
                        <SummaryChip
                            label="Net cashflow (30d)"
                            value={formatCurrency(netCashFlow30d)}
                            accent={netCashFlow30d >= 0 ? "positive" : "negative"}
                        />
                        <SummaryChip
                            label="Runway"
                            value={`${runwayMonths.toFixed(1)} months`}
                            accent={runwayMonths >= 6 ? "positive" : runwayMonths >= 3 ? "neutral" : "negative"}
                        />
                    </div>
                </header>

                {/* Streams vs expenses */}
                <section className="grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_1fr]">
                    {/* Revenue streams */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                Revenue streams
                            </h2>
                            <span className="text-[11px] text-slate-500">
                                Apps, freelance, gov, and other
                            </span>
                        </div>
                        <div className="space-y-2 text-[11px]">
                            {mockRevenueStreams.map((stream) => (
                                <RevenueRow key={stream.id} stream={stream} />
                            ))}
                        </div>
                        <p className="text-[10px] text-slate-500">
                            Future: wired to Stripe, bank feeds, and contract payouts; AI can highlight
                            which streams to lean on next.
                        </p>
                    </div>

                    {/* Expenses + burn */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                Burn & expenses
                            </h2>
                            <span className="text-[11px] text-slate-500">
                                Monthly burn: {formatCurrency(monthlyBurn)}
                            </span>
                        </div>
                        <div className="space-y-2 text-[11px]">
                            {mockExpenseCategories.map((cat) => (
                                <ExpenseRow key={cat.id} category={cat} />
                            ))}
                        </div>
                        <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-[11px]">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-300">Cash on hand</span>
                                <span className="font-semibold text-slate-50">
                                    {formatCurrency(mockCashOnHand)}
                                </span>
                            </div>
                            <p className="mt-1 text-[10px] text-slate-500">
                                This is a simple mock number for now. Later, we can sync to your business
                                account and auto-calc runway daily.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Pipeline vs current finance */}
                <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 pb-6">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-2 text-[11px]">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                Pipeline vs current
                            </h2>
                            <span className="text-[11px] text-slate-500">
                                Expected pipeline: {formatCurrency(expectedPipeline)}
                            </span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                            Expected pipeline is weighted by win chance across gov, freelance, and
                            direct deals. Use this to see how aggressive you can be with spend while
                            you build out apps.
                        </p>
                        <ul className="mt-2 space-y-1 text-[11px] text-slate-300">
                            <li className="flex justify-between">
                                <span>Net 30d vs burn</span>
                                <span>
                                    {formatCurrency(netCashFlow30d)} vs {formatCurrency(monthlyBurn)}
                                </span>
                            </li>
                            <li className="flex justify-between">
                                <span>Runway guardrail</span>
                                <span>
                                    Aim to keep &gt;= 6 months ({runwayMonths.toFixed(1)} now)
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-[11px] space-y-2">
                        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">
                            Notes for Strategy AI
                        </h2>
                        <p className="text-[11px] text-slate-400">
                            When we wire up Strategy AI, this panel becomes the context it sees: last
                            30 days, burn, runway, and pipeline. That lets it answer questions like
                            &ldquo;Can I afford to take a smaller gov contract while I build PennyWize?&rdquo;
                        </p>
                        <p className="text-[10px] text-slate-500">
                            For now this is just a static info block so you remember what the AI will
                            have access to later.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}

// --- Presentational components ---

function SummaryChip({
    label,
    value,
    accent
}: {
    label: string;
    value: string;
    accent?: "positive" | "negative" | "neutral";
}) {
    let classes =
        "rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-[11px] text-slate-200";

    if (accent === "positive") {
        classes =
            "rounded-full border border-emerald-500/60 bg-emerald-500/10 px-3 py-1 text-[11px] text-emerald-100";
    } else if (accent === "negative") {
        classes =
            "rounded-full border border-rose-500/60 bg-rose-500/10 px-3 py-1 text-[11px] text-rose-100";
    } else if (accent === "neutral") {
        classes =
            "rounded-full border border-amber-500/60 bg-amber-500/10 px-3 py-1 text-[11px] text-amber-100";
    }

    return (
        <span className={classes}>
            <span className="font-medium">{value}</span>
            <span className="ml-1 text-[10px] text-slate-400">· {label}</span>
        </span>
    );
}

function RevenueRow({ stream }: { stream: (typeof mockRevenueStreams)[number] }) {
    const label =
        stream.type === "APPS"
            ? "Apps & bots"
            : stream.type === "FREELANCE"
                ? "Freelance"
                : stream.type === "GOV"
                    ? "Gov"
                    : "Other";

    return (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2">
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-[11px] font-semibold text-slate-100">
                        {stream.label}
                    </div>
                    <div className="mt-1 text-[10px] text-slate-500">
                        Type: {label.toLowerCase()}
                    </div>
                </div>
                <div className="text-right text-[11px]">
                    <div className="font-semibold text-slate-50">
                        {formatCurrency(stream.last30d)}
                    </div>
                    {stream.mrr !== undefined && (
                        <div className="text-[10px] text-slate-500">
                            MRR: {formatCurrency(stream.mrr)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function ExpenseRow({
    category
}: {
    category: (typeof mockExpenseCategories)[number];
}) {
    return (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2">
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-[11px] font-semibold text-slate-100">
                        {category.label}
                    </div>
                    <div className="mt-1 text-[10px] text-slate-500">
                        Monthly burn: {formatCurrency(category.recurringMonthly)}
                    </div>
                </div>
                <div className="text-right text-[11px]">
                    <div className="font-semibold text-slate-50">
                        {formatCurrency(category.last30d)}
                    </div>
                    <div className="text-[10px] text-slate-500">Last 30d</div>
                </div>
            </div>
        </div>
    );
}