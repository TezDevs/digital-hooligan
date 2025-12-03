// app/ceo/page.tsx
import type { Metadata } from "next";
import { CeoHeader } from "@/components/ceo/CeoHeader";
import {
    mockProducts,
    mockTasks,
    mockDeals,
    mockAdminStatus,
    mockDecisions,
    getActiveProjectsCount,
    getOpenDealsCount,
    getRevenueLast30Days,
    getExpensesLast30Days,
    getCashRunwayMonths,
    mockCashOnHand,
    getTopFocusTasks
} from "@/lib/ceoDashboardData";
import { CeoDecisionLog } from "@/components/ceo/CeoDecisionLog";

export const metadata: Metadata = {
    title: "CEO Overview | Digital Hooligan",
    description:
        "Snapshot of key metrics, focus tasks, and recent decisions for the Digital Hooligan CEO dashboard."
};

function formatCurrency(value: number): string {
    return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    });
}

export default function CeoOverviewPage() {
    const activeProjects = getActiveProjectsCount(mockProducts);
    const openDeals = getOpenDealsCount(mockDeals);

    const revenue30 = getRevenueLast30Days();
    const expenses30 = getExpensesLast30Days();
    const net30 = revenue30 - expenses30;
    const runwayMonths = getCashRunwayMonths(mockCashOnHand);

    const focusTasks = getTopFocusTasks(mockTasks);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50">
            <CeoHeader />

            <main className="mx-auto max-w-6xl px-4 py-6 space-y-4">
                {/* Top row: headline + snapshot chips */}
                <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h1 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                            Overview
                        </h1>
                        <p className="mt-1 text-[12px] text-slate-400">
                            Quick read on how Digital Hooligan is doing across products, money,
                            admin, and decisions — without needing five dashboards open.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-[11px] text-slate-300">
                        <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1">
                            Active projects: {activeProjects}
                        </span>
                        <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1">
                            Open deals: {openDeals}
                        </span>
                        <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1">
                            Runway: {runwayMonths.toFixed(1)} months
                        </span>
                    </div>
                </header>

                {/* Snapshot row */}
                <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    {/* Focus tasks */}
                    <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-2 text-[11px]">
                        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                            Focus this week
                        </h2>
                        <p className="text-[11px] text-slate-400">
                            3–4 things that matter most right now, pulled from the tasks board.
                        </p>
                        <ul className="mt-2 space-y-2">
                            {focusTasks.map((task) => (
                                <li
                                    key={task.id}
                                    className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2"
                                >
                                    <div className="text-[12px] font-medium text-slate-50">
                                        {task.title}
                                    </div>
                                    <div className="mt-1 flex flex-wrap gap-2 text-[10px]">
                                        <span className="rounded-full bg-slate-800 px-2 py-0.5 text-slate-300">
                                            {task.type.toLowerCase()}
                                        </span>
                                        {task.dueDate && (
                                            <span className="rounded-full bg-slate-900 px-2 py-0.5 text-slate-300">
                                                Due {task.dueDate}
                                            </span>
                                        )}
                                        {task.priority && (
                                            <span className="rounded-full bg-slate-900 px-2 py-0.5 text-slate-300">
                                                {task.priority.toLowerCase()} priority
                                            </span>
                                        )}
                                    </div>
                                    {task.notes && (
                                        <p className="mt-1 text-[11px] text-slate-400">
                                            {task.notes}
                                        </p>
                                    )}
                                </li>
                            ))}
                        </ul>
                        <p className="text-[10px] text-slate-500">
                            Full board lives in <span className="font-semibold">Tasks</span>.
                        </p>
                    </article>

                    {/* Money snapshot */}
                    <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-2 text-[11px]">
                        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                            Money snapshot
                        </h2>
                        <p className="text-[11px] text-slate-400">
                            Last 30 days and rough runway so you know how aggressive you can be.
                        </p>
                        <ul className="mt-2 space-y-1 text-[11px] text-slate-300">
                            <li className="flex justify-between">
                                <span>Revenue (30d)</span>
                                <span>{formatCurrency(revenue30)}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Expenses (30d)</span>
                                <span>{formatCurrency(expenses30)}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Net (30d)</span>
                                <span>{formatCurrency(net30)}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Cash on hand</span>
                                <span>{formatCurrency(mockCashOnHand)}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Runway</span>
                                <span>{runwayMonths.toFixed(1)} months</span>
                            </li>
                        </ul>
                        <p className="text-[10px] text-slate-500">
                            Deep dive lives in <span className="font-semibold">Finance</span>.
                        </p>
                    </article>

                    {/* Admin snapshot */}
                    <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-2 text-[11px]">
                        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                            Admin / Gov snapshot
                        </h2>
                        <p className="text-[11px] text-slate-400">
                            Quick view of where your LLC, banking, and gov registrations stand.
                        </p>
                        <ul className="mt-2 space-y-1 text-[11px] text-slate-300">
                            <li className="flex justify-between">
                                <span>LLC</span>
                                <span>{mockAdminStatus.llcActive ? "Active" : "Check status"}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>EIN</span>
                                <span>{mockAdminStatus.einActive ? "Active" : "Check status"}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Navy Federal</span>
                                <span>{mockAdminStatus.navyFedStatus}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>SAM.gov</span>
                                <span>{mockAdminStatus.samStatus}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>VSOB / SDVOSB</span>
                                <span>{mockAdminStatus.vsobStatus}</span>
                            </li>
                        </ul>
                        <div className="mt-2 space-y-1 text-[10px] text-slate-500">
                            <div className="font-semibold text-slate-400">Risks</div>
                            {mockAdminStatus.riskFlags.map((flag) => (
                                <div key={flag}>• {flag}</div>
                            ))}
                        </div>
                    </article>
                </section>

                {/* Decision log */}
                <CeoDecisionLog decisions={mockDecisions} />

                <p className="pb-4 text-[10px] text-slate-500">
                    As the stack grows, the Overview stays your single “how are we doing?” page,
                    while the other tabs go deeper on tasks, deals, finance, AI, and settings.
                </p>
            </main>
        </div>
    );
}