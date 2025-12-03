// app/ceo/page.tsx

import type { Metadata } from "next";
import { CeoHeader } from "@/components/ceo/CeoHeader";
import { CeoDecisionLog } from "@/components/ceo/CeoDecisionLog";
import {
    mockProducts,
    mockTasks,
    mockDeals,
    mockAdminStatus,
    mockDecisions,
    mockCashOnHand,
    getActiveProjectsCount,
    getOpenDealsCount,
    getRevenueLast30Days,
    getExpensesLast30Days,
    getCashRunwayMonths,
    getTasksDueToday,
    groupTasksByStatus,
    calculatePipelineValue
} from "@/lib/ceoDashboardData";

export const metadata: Metadata = {
    title: "CEO Overview | Digital Hooligan",
    description:
        "High-level snapshot of products, pipeline, money, and risk for the Digital Hooligan CEO dashboard."
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
    const pipelineWeighted = calculatePipelineValue(mockDeals);

    const revenue30 = getRevenueLast30Days();
    const expenses30 = getExpensesLast30Days();
    const net30 = revenue30 - expenses30;
    const runwayMonths = getCashRunwayMonths(mockCashOnHand);

    const todayIso = new Date().toISOString().slice(0, 10);
    const tasksDueToday = getTasksDueToday(mockTasks, todayIso);
    const groupedTasks = groupTasksByStatus(mockTasks);

    const totalTasks = mockTasks.length;
    const inProgressCount = groupedTasks.IN_PROGRESS.length;
    const blockedCount = groupedTasks.BLOCKED.length;

    // Product health counts
    const healthCounts = { GREEN: 0, YELLOW: 0, RED: 0 } as {
        GREEN: number;
        YELLOW: number;
        RED: number;
    };
    for (const p of mockProducts) {
        healthCounts[p.health]++;
    }
    const totalProducts = mockProducts.length || 1; // avoid divide by 0

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50">
            <CeoHeader />

            <main className="mx-auto max-w-6xl px-4 py-6 space-y-5">
                {/* Page header */}
                <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h1 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                            CEO Overview
                        </h1>
                        <p className="mt-1 text-[12px] text-slate-400">
                            One-page read on how Digital Hooligan is doing across{" "}
                            <span className="font-medium text-slate-200">
                                products, pipeline, money, and admin / risk
                            </span>{" "}
                            — with links to dive deeper via the tabs.
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
                            Tasks today: {tasksDueToday}
                        </span>
                    </div>
                </header>

                {/* Top snapshot row: three high-level cards */}
                <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <MoneySnapshotCard
                        revenue30={revenue30}
                        expenses30={expenses30}
                        net30={net30}
                        runwayMonths={runwayMonths}
                        cashOnHand={mockCashOnHand}
                    />
                    <ProductsSnapshotCard
                        activeProjects={activeProjects}
                        healthCounts={healthCounts}
                        totalProducts={totalProducts}
                    />
                    <PipelineSnapshotCard
                        openDeals={openDeals}
                        pipelineWeighted={pipelineWeighted}
                        totalTasks={totalTasks}
                        inProgressCount={inProgressCount}
                        blockedCount={blockedCount}
                    />
                </section>

                {/* Second row: admin + workload strip */}
                <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <AdminGovSnapshotCard />
                    <TodayWorkloadCard
                        todayIso={todayIso}
                        tasksDueToday={tasksDueToday}
                        totalTasks={totalTasks}
                        inProgressCount={inProgressCount}
                        blockedCount={blockedCount}
                    />
                </section>

                {/* Decision log at the bottom */}
                <CeoDecisionLog decisions={mockDecisions} />

                <p className="pb-4 text-[10px] text-slate-500">
                    Idea: as Strategy AI matures, this overview becomes the place where it
                    surfaces “you should worry about X today” using these same signals.
                </p>
            </main>
        </div>
    );
}

/* ------------------------- Card components ------------------------- */

function MoneySnapshotCard(props: {
    revenue30: number;
    expenses30: number;
    net30: number;
    runwayMonths: number;
    cashOnHand: number;
}) {
    const { revenue30, expenses30, net30, runwayMonths, cashOnHand } = props;

    // For the ring: cap runway at 12 months for visualization
    const runwayPercent = Math.max(
        0,
        Math.min((runwayMonths / 12) * 100, 100)
    );

    const totalVolume = revenue30 + Math.abs(expenses30);
    const revenuePct = totalVolume > 0 ? (revenue30 / totalVolume) * 100 : 50;
    const expensePct = totalVolume > 0 ? (Math.abs(expenses30) / totalVolume) * 100 : 50;

    return (
        <article className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Money &amp; runway
                    </h2>
                    <p className="mt-1 text-[11px] text-slate-400">
                        Are we burning too fast, or is there room to be aggressive?
                    </p>
                </div>
                {/* Runway ring */}
                <div className="relative h-16 w-16">
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            backgroundImage: `conic-gradient(#22c55e ${runwayPercent}%, rgba(15,23,42,1) ${runwayPercent}%)`
                        }}
                    />
                    <div className="absolute inset-[6px] flex items-center justify-center rounded-full bg-slate-950 text-center">
                        <span className="text-[10px] leading-tight text-slate-100">
                            {runwayMonths.toFixed(1)}m
                            <br />
                            <span className="text-[9px] text-slate-500">runway</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Revenue vs expenses bar */}
            <div className="space-y-1 text-[11px]">
                <div className="flex items-center justify-between text-slate-300">
                    <span>Last 30d</span>
                    <span className="text-slate-400">
                        {formatCurrency(revenue30)} rev · {formatCurrency(expenses30)} exp
                    </span>
                </div>
                <div className="h-2 rounded-full bg-slate-900">
                    <div
                        className="h-2 rounded-l-full bg-emerald-500/80"
                        style={{ width: `${revenuePct}%` }}
                    />
                    <div
                        className="h-2 -mt-2 rounded-r-full bg-rose-500/70"
                        style={{ width: `${expensePct}%` }}
                    />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>Net 30d:</span>
                    <span className={net30 >= 0 ? "text-emerald-300" : "text-rose-300"}>
                        {formatCurrency(net30)}
                    </span>
                </div>
            </div>

            {/* Cash & runway quick row */}
            <div className="mt-2 grid grid-cols-2 gap-2 text-[10px] text-slate-300">
                <div className="rounded-xl bg-slate-950/80 p-2">
                    <div className="text-slate-500">Cash on hand</div>
                    <div className="text-[11px] font-semibold text-slate-100">
                        {formatCurrency(cashOnHand)}
                    </div>
                </div>
                <div className="rounded-xl bg-slate-950/80 p-2">
                    <div className="text-slate-500">Runway (est.)</div>
                    <div className="text-[11px] font-semibold text-slate-100">
                        {runwayMonths.toFixed(1)} months
                    </div>
                </div>
            </div>

            <p className="mt-1 text-[10px] text-slate-500">
                Deep dive lives in{" "}
                <span className="font-semibold text-slate-300">Finance</span>.
            </p>
        </article>
    );
}

function ProductsSnapshotCard(props: {
    activeProjects: number;
    healthCounts: { GREEN: number; YELLOW: number; RED: number };
    totalProducts: number;
}) {
    const { activeProjects, healthCounts, totalProducts } = props;

    const greenPct = (healthCounts.GREEN / totalProducts) * 100;
    const yellowPct = (healthCounts.YELLOW / totalProducts) * 100;
    const redPct = (healthCounts.RED / totalProducts) * 100;

    return (
        <article className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Products &amp; health
                </h2>
                <p className="mt-1 text-[11px] text-slate-400">
                    Snapshot of PennyWize, DropSignal, HypeWatch, Ops Toys, etc.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300">
                <div className="rounded-xl bg-slate-950/80 p-2">
                    <div className="text-slate-500">Active projects</div>
                    <div className="text-[11px] font-semibold text-slate-100">
                        {activeProjects}
                    </div>
                </div>
                <div className="rounded-xl bg-slate-950/80 p-2">
                    <div className="text-slate-500">Total apps / tools</div>
                    <div className="text-[11px] font-semibold text-slate-100">
                        {totalProducts}
                    </div>
                </div>
            </div>

            {/* Health bar */}
            <div className="space-y-1 text-[11px]">
                <div className="flex items-center justify-between text-slate-300">
                    <span>Product health mix</span>
                    <span className="text-[10px] text-slate-400">
                        G:{healthCounts.GREEN} · Y:{healthCounts.YELLOW} · R:
                        {healthCounts.RED}
                    </span>
                </div>
                <div className="flex h-2 overflow-hidden rounded-full bg-slate-900">
                    <div
                        className="h-2 bg-emerald-500/80"
                        style={{ width: `${greenPct}%` }}
                    />
                    <div
                        className="h-2 bg-amber-400/80"
                        style={{ width: `${yellowPct}%` }}
                    />
                    <div
                        className="h-2 bg-rose-500/80"
                        style={{ width: `${redPct}%` }}
                    />
                </div>
            </div>

            <p className="mt-1 text-[10px] text-slate-500">
                Details live in{" "}
                <span className="font-semibold text-slate-300">Apps / Labs</span> and
                your product docs.
            </p>
        </article>
    );
}

function PipelineSnapshotCard(props: {
    openDeals: number;
    pipelineWeighted: number;
    totalTasks: number;
    inProgressCount: number;
    blockedCount: number;
}) {
    const {
        openDeals,
        pipelineWeighted,
        totalTasks,
        inProgressCount,
        blockedCount
    } = props;

    const inProgressPct = totalTasks > 0 ? (inProgressCount / totalTasks) * 100 : 0;
    const blockedPct = totalTasks > 0 ? (blockedCount / totalTasks) * 100 : 0;

    return (
        <article className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Deals &amp; workload
                </h2>
                <p className="mt-1 text-[11px] text-slate-400">
                    Where the next money is likely to come from, and how busy you are.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300">
                <div className="rounded-xl bg-slate-950/80 p-2">
                    <div className="text-slate-500">Open deals</div>
                    <div className="text-[11px] font-semibold text-slate-100">
                        {openDeals}
                    </div>
                    <div className="text-[10px] text-slate-500">Gov, freelance, direct</div>
                </div>
                <div className="rounded-xl bg-slate-950/80 p-2">
                    <div className="text-slate-500">Weighted pipeline</div>
                    <div className="text-[11px] font-semibold text-slate-100">
                        {formatCurrency(pipelineWeighted)}
                    </div>
                    <div className="text-[10px] text-slate-500">probability-adjusted</div>
                </div>
            </div>

            {/* Workload bar */}
            <div className="space-y-1 text-[11px]">
                <div className="flex items-center justify-between text-slate-300">
                    <span>Workload mix</span>
                    <span className="text-[10px] text-slate-400">
                        Total tasks: {totalTasks}
                    </span>
                </div>
                <div className="grid grid-cols-3 gap-1 text-[10px] text-slate-300">
                    <div className="rounded-md bg-slate-950/80 p-1">
                        <div className="text-slate-500">In progress</div>
                        <div className="font-semibold text-slate-100">{inProgressCount}</div>
                    </div>
                    <div className="rounded-md bg-slate-950/80 p-1">
                        <div className="text-slate-500">Blocked</div>
                        <div className="font-semibold text-slate-100">{blockedCount}</div>
                    </div>
                    <div className="rounded-md bg-slate-950/80 p-1">
                        <div className="text-slate-500">Focus load</div>
                        <div className="font-semibold text-slate-100">
                            {Math.round(inProgressPct + blockedPct)}%
                        </div>
                    </div>
                </div>
            </div>

            <p className="mt-1 text-[10px] text-slate-500">
                Full details live in{" "}
                <span className="font-semibold text-slate-300">Tasks</span> and{" "}
                <span className="font-semibold text-slate-300">Deals</span>.
            </p>
        </article>
    );
}

function AdminGovSnapshotCard() {
    return (
        <article className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Admin / Gov / Risk
                </h2>
                <p className="mt-1 text-[11px] text-slate-400">
                    Quick health check on Digital Hooligan as an actual company.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300">
                <div className="rounded-xl bg-slate-950/80 p-2">
                    <div className="text-slate-500">LLC</div>
                    <div className="text-[11px] font-semibold text-slate-100">
                        {mockAdminStatus.llcActive ? "Active" : "Check status"}
                    </div>
                </div>
                <div className="rounded-xl bg-slate-950/80 p-2">
                    <div className="text-slate-500">EIN</div>
                    <div className="text-[11px] font-semibold text-slate-100">
                        {mockAdminStatus.einActive ? "Active" : "Check status"}
                    </div>
                </div>
                <div className="rounded-xl bg-slate-950/80 p-2">
                    <div className="text-slate-500">Navy Federal</div>
                    <div className="text-[11px] font-semibold text-slate-100">
                        {mockAdminStatus.navyFedStatus}
                    </div>
                </div>
                <div className="rounded-xl bg-slate-950/80 p-2">
                    <div className="text-slate-500">SAM.gov</div>
                    <div className="text-[11px] font-semibold text-slate-100">
                        {mockAdminStatus.samStatus}
                    </div>
                </div>
                <div className="rounded-xl bg-slate-950/80 p-2">
                    <div className="text-slate-500">VSOB / SDVOSB</div>
                    <div className="text-[11px] font-semibold text-slate-100">
                        {mockAdminStatus.vsobStatus}
                    </div>
                </div>
            </div>

            <div className="mt-2 space-y-1 text-[10px] text-slate-500">
                <div className="font-semibold text-slate-400">Risks</div>
                {mockAdminStatus.riskFlags.map((flag) => (
                    <div key={flag}>• {flag}</div>
                ))}
            </div>

            <p className="mt-1 text-[10px] text-slate-500">
                Deeper handling lives in future{" "}
                <span className="font-semibold text-slate-300">Admin / Gov</span>{" "}
                views and automations.
            </p>
        </article>
    );
}

function TodayWorkloadCard(props: {
    todayIso: string;
    tasksDueToday: number;
    totalTasks: number;
    inProgressCount: number;
    blockedCount: number;
}) {
    const { todayIso, tasksDueToday, totalTasks, inProgressCount, blockedCount } =
        props;

    return (
        <article className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Today &amp; this week
                </h2>
                <p className="mt-1 text-[11px] text-slate-400">
                    Quick glance at how overloaded you are right now.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300">
                <div className="rounded-xl bg-slate-950/80 p-2">
                    <div className="text-slate-500">Today</div>
                    <div className="text-[11px] font-semibold text-slate-100">
                        {todayIso}
                    </div>
                    <div className="text-[10px] text-slate-500">
                        Tasks due today: {tasksDueToday}
                    </div>
                </div>
                <div className="rounded-xl bg-slate-950/80 p-2">
                    <div className="text-slate-500">Current load</div>
                    <div className="text-[11px] font-semibold text-slate-100">
                        {totalTasks} tasks
                    </div>
                    <div className="text-[10px] text-slate-500">
                        {inProgressCount} in progress · {blockedCount} blocked
                    </div>
                </div>
            </div>

            <p className="mt-1 text-[10px] text-slate-500">
                Full kanban and calendar live in{" "}
                <span className="font-semibold text-slate-300">Tasks</span>.
            </p>
        </article>
    );
}