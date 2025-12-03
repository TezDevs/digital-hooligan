// app/ceo/page.tsx
import { Metadata } from "next";
import {
    mockProducts,
    mockDeals,
    mockTasks,
    mockAdminStatus,
    mockDecisions,
    getRevenueLast30Days,
    getActiveProjectsCount,
    getOpenDealsCount,
    getTasksDueToday,
    getTopFocusTasks,
    groupDealsByStage,
    calculatePipelineValue
} from "@/lib/ceoDashboardData";

export const metadata: Metadata = {
    title: "CEO Dashboard | Digital Hooligan",
    description: "Digital Hooligan CEO command center."
};

function formatCurrency(value: number): string {
    return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    });
}

function todayIsoDate(): string {
    const now = new Date();
    return now.toISOString().slice(0, 10);
}

export default function CeoDashboardPage() {
    const revenue30d = getRevenueLast30Days();
    const activeProjects = getActiveProjectsCount(mockProducts);
    const openDealsCount = getOpenDealsCount(mockDeals);
    const tasksTodayCount = getTasksDueToday(mockTasks, todayIsoDate());
    const adminAlertsCount = mockAdminStatus.riskFlags.length;

    const topTasks = getTopFocusTasks(mockTasks);
    const dealsByStage = groupDealsByStage(mockDeals);
    const pipelineExpected = calculatePipelineValue(mockDeals);

    const securityStatus = {
        posture: "Good", // placeholder until we wire real checks
        openItems: 2,
        lastReview: "2025-12-02"
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50">
            {/* Top nav / header */}
            <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-20">
                <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-xs font-semibold text-emerald-300">
                            DH
                        </div>
                        <div>
                            <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                                Digital Hooligan
                            </div>
                            <div className="text-sm font-semibold text-slate-100">
                                CEO Dashboard
                            </div>
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center gap-3 text-xs font-medium text-slate-400">
                        <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-100">
                            Home
                        </span>
                        <a href="/ceo/tasks" className="rounded-full px-3 py-1 hover:bg-slate-800">
                            Tasks
                        </a>
                        <a href="/ceo/finance" className="rounded-full px-3 py-1 hover:bg-slate-800">
                            Finance
                        </a>
                        <a href="/ceo/deals" className="rounded-full px-3 py-1 hover:bg-slate-800">
                            Deals
                        </a>
                        <a href="/labs/hq" className="rounded-full px-3 py-1 hover:bg-slate-800">
                            Labs
                        </a>
                        <a href="/ops" className="rounded-full px-3 py-1 hover:bg-slate-800">
                            Ops HQ
                        </a>
                        <a href="/ceo/settings" className="rounded-full px-3 py-1 hover:bg-slate-800">
                            Settings
                        </a>
                    </nav>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="hidden sm:inline-flex items-center gap-1 rounded-full border border-emerald-400/60 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-100 hover:bg-emerald-500/20"
                        >
                            <span className="text-xs">🤖</span>
                            <span>Ask AI</span>
                        </button>
                        <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-2 py-1">
                            <div className="h-6 w-6 rounded-full bg-slate-700 text-[10px] flex items-center justify-center">
                                T
                            </div>
                            <div className="text-[11px] leading-tight">
                                <div className="font-medium text-slate-100">Tez</div>
                                <div className="text-[10px] text-slate-400">CEO • Owner</div>
                            </div>
                            <span className="text-[10px] text-slate-500">▼</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="mx-auto max-w-6xl px-4 py-6 space-y-6">
                {/* Quick snapshot */}
                <section className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                            Quick Snapshot
                        </h1>
                        <span className="text-[11px] text-slate-500">
                            Today: {todayIsoDate()}
                        </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                        <SnapshotCard label="Revenue (30d)" value={formatCurrency(revenue30d)} />
                        <SnapshotCard label="Active Projects" value={activeProjects.toString()} />
                        <SnapshotCard label="Open Deals" value={openDealsCount.toString()} />
                        <SnapshotCard label="Tasks Today" value={tasksTodayCount.toString()} />
                        <SnapshotCard
                            label="Admin Alerts"
                            value={adminAlertsCount.toString()}
                            highlight={adminAlertsCount > 0}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-3">
                        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3">
                            <div className="flex items-center justify-between mb-2">
                                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                                    Security Status
                                </div>
                                <span
                                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] ${securityStatus.posture === "Good"
                                            ? "bg-emerald-500/10 text-emerald-200 border border-emerald-500/40"
                                            : "bg-amber-500/10 text-amber-200 border border-amber-500/40"
                                        }`}
                                >
                                    <span className="text-[10px]">🔒</span>
                                    {securityStatus.posture}
                                </span>
                            </div>
                            <dl className="space-y-1 text-[11px] text-slate-300">
                                <div className="flex justify-between">
                                    <dt>Open security items</dt>
                                    <dd className="font-medium">{securityStatus.openItems}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt>Last review</dt>
                                    <dd>{securityStatus.lastReview}</dd>
                                </div>
                            </dl>
                            <div className="mt-3">
                                <a
                                    href="/ceo/settings#security"
                                    className="text-[11px] text-emerald-300 hover:text-emerald-200"
                                >
                                    View security & access →
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Middle grid: tasks + deals */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Today's focus / tasks */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                Today&apos;s Focus
                            </h2>
                            <a
                                href="/ceo/tasks"
                                className="text-[11px] text-slate-400 hover:text-slate-200"
                            >
                                Open tasks view →
                            </a>
                        </div>
                        <ol className="space-y-2 text-[13px]">
                            {topTasks.map((task, idx) => (
                                <li
                                    key={task.id}
                                    className="flex items-start gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2"
                                >
                                    <span className="mt-0.5 text-[11px] text-slate-500">
                                        {idx + 1}.
                                    </span>
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-[13px] font-medium text-slate-50">
                                                {task.title}
                                            </span>
                                            <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-300">
                                                {task.type.toLowerCase()}
                                            </span>
                                            {task.dueDate && (
                                                <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
                                                    Due {task.dueDate}
                                                </span>
                                            )}
                                        </div>
                                        {task.notes && (
                                            <p className="mt-1 text-[11px] text-slate-400">
                                                {task.notes}
                                            </p>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ol>

                        <div className="mt-3 border-t border-slate-800 pt-3">
                            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                                <span className="uppercase tracking-[0.2em] text-slate-500">
                                    Status
                                </span>
                                <span>Inbox, This Week, In Progress, Blocked, Done</span>
                            </div>
                        </div>
                    </div>

                    {/* Deals & pipeline */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                Deals & Pipeline
                            </h2>
                            <a
                                href="/ceo/deals"
                                className="text-[11px] text-slate-400 hover:text-slate-200"
                            >
                                Open deals view →
                            </a>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-[11px]">
                            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3 space-y-1">
                                <div className="text-slate-400">Active deals</div>
                                <div className="text-lg font-semibold text-slate-50">
                                    {openDealsCount}
                                </div>
                                <div className="text-slate-500">
                                    {dealsByStage.LEAD.length} lead, {dealsByStage.PROPOSAL.length} proposal,
                                    {` ${dealsByStage.NEGOTIATION.length} negotiation`}
                                </div>
                            </div>
                            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3 space-y-1">
                                <div className="text-slate-400">Expected pipeline</div>
                                <div className="text-lg font-semibold text-slate-50">
                                    {formatCurrency(pipelineExpected)}
                                </div>
                                <div className="text-slate-500">
                                    Weighted by stage probability. Incl. gov & freelance.
                                </div>
                            </div>
                        </div>

                        <div className="mt-2 grid grid-cols-4 gap-2 text-[11px]">
                            <PipelineStagePill label="Lead" count={dealsByStage.LEAD.length} />
                            <PipelineStagePill
                                label="Proposal"
                                count={dealsByStage.PROPOSAL.length}
                            />
                            <PipelineStagePill
                                label="Negotiation"
                                count={dealsByStage.NEGOTIATION.length}
                            />
                            <PipelineStagePill
                                label="Won"
                                count={dealsByStage.WON.length}
                                accent
                            />
                        </div>
                    </div>
                </section>

                {/* Products + Admin */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Products & apps */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                Products & Apps
                            </h2>
                            <span className="text-[11px] text-slate-500">
                                {mockProducts.length} tracked
                            </span>
                        </div>
                        <div className="space-y-2">
                            {mockProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex flex-col gap-1 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2"
                                >
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <span className="rounded-lg bg-slate-800 px-2 py-1 text-[11px] font-semibold text-slate-100">
                                                {product.code}
                                            </span>
                                            <span className="text-[13px] font-medium text-slate-50">
                                                {product.name}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px]">
                                            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-slate-300">
                                                {product.stage.toLowerCase()}
                                            </span>
                                            <HealthDot health={product.health as "GREEN" | "YELLOW" | "RED"} />
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-slate-400">{product.description}</p>
                                    <div className="flex flex-wrap gap-2 text-[11px] text-slate-300">
                                        {product.currentFocus && (
                                            <span className="rounded-full bg-slate-800 px-2 py-0.5">
                                                Focus: {product.currentFocus}
                                            </span>
                                        )}
                                        {product.nextStep && (
                                            <span className="rounded-full bg-slate-800 px-2 py-0.5">
                                                Next: {product.nextStep}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="mt-1 text-[10px] text-slate-500">
                            ● green = healthy · yellow = watch · red = needs attention
                        </p>
                    </div>

                    {/* Admin / Gov / Risk */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                Admin / Gov / Risk
                            </h2>
                            <span className="text-[11px] text-slate-500">
                                Sprint: Admin + Gov foundations
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-[11px]">
                            <div className="space-y-1">
                                <StatusRow label="LLC" ok={mockAdminStatus.llcActive} />
                                <StatusRow label="EIN" ok={mockAdminStatus.einActive} />
                                <StatusRow
                                    label="Navy Federal"
                                    text={
                                        mockAdminStatus.navyFedStatus === "ACTIVE"
                                            ? "Active"
                                            : mockAdminStatus.navyFedStatus === "PENDING"
                                                ? "Pending"
                                                : "Not started"
                                    }
                                />
                            </div>
                            <div className="space-y-1">
                                <StatusRow
                                    label="SAM.gov"
                                    text={
                                        mockAdminStatus.samStatus === "ACTIVE"
                                            ? "Active"
                                            : mockAdminStatus.samStatus === "IN_REVIEW"
                                                ? "In review"
                                                : "Not started"
                                    }
                                />
                                <StatusRow
                                    label="VSOB/SDVOSB"
                                    text={
                                        mockAdminStatus.vsobStatus === "ACTIVE"
                                            ? "Active"
                                            : mockAdminStatus.vsobStatus === "PLANNED"
                                                ? "Planned"
                                                : "Not started"
                                    }
                                />
                            </div>
                        </div>

                        <div className="mt-2">
                            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-1">
                                Upcoming dates
                            </div>
                            <ul className="space-y-1 text-[11px] text-slate-300">
                                {mockAdminStatus.upcomingDates.map((d) => (
                                    <li key={`${d.label}-${d.date}`} className="flex justify-between">
                                        <span>{d.label}</span>
                                        <span className="text-slate-400">{d.date}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {mockAdminStatus.riskFlags.length > 0 && (
                            <div className="mt-3 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3">
                                <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold text-amber-200">
                                    <span>⚠</span>
                                    <span>Risk flags</span>
                                </div>
                                <ul className="list-disc pl-4 text-[11px] text-amber-100">
                                    {mockAdminStatus.riskFlags.map((flag, idx) => (
                                        <li key={idx}>{flag}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </section>

                {/* Decision log + internal dashboards */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-8">
                    {/* Decision log */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                Decision Log
                            </h2>
                            <span className="text-[11px] text-slate-500">
                                {mockDecisions.length} logged
                            </span>
                        </div>
                        <ul className="space-y-2 text-[11px]">
                            {mockDecisions.map((entry) => (
                                <li
                                    key={entry.id}
                                    className="rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2"
                                >
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-[10px] text-slate-500">{entry.date}</span>
                                        <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
                                            Strategic
                                        </span>
                                    </div>
                                    <div className="mt-1 text-[12px] font-medium text-slate-50">
                                        {entry.title}
                                    </div>
                                    {entry.details && (
                                        <p className="mt-1 text-[11px] text-slate-400">{entry.details}</p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Internal dashboards */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                Internal Dashboards
                            </h2>
                            <span className="text-[11px] text-slate-500">Hooligan HQ</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[12px]">
                            <a
                                href="/labs/hq"
                                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3 hover:border-emerald-400/60 hover:bg-slate-900 transition-colors"
                            >
                                <div className="text-[18px]">🧪</div>
                                <div className="mt-1 font-semibold text-slate-50">Labs HQ</div>
                                <p className="mt-1 text-[11px] text-slate-400">
                                    Experiments, ideas, and app/bot prototypes.
                                </p>
                            </a>

                            <a
                                href="/ops"
                                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3 hover:border-emerald-400/60 hover:bg-slate-900 transition-colors"
                            >
                                <div className="text-[18px]">🛠</div>
                                <div className="mt-1 font-semibold text-slate-50">Ops HQ</div>
                                <p className="mt-1 text-[11px] text-slate-400">
                                    Infra, logging, and ops toys overview.
                                </p>
                            </a>

                            <a
                                href="/ai-hub"
                                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3 hover:border-emerald-400/60 hover:bg-slate-900 transition-colors"
                            >
                                <div className="text-[18px]">🤖</div>
                                <div className="mt-1 font-semibold text-slate-50">AI Hub</div>
                                <p className="mt-1 text-[11px] text-slate-400">
                                    Strategy, ops & code assistants (future).
                                </p>
                            </a>
                        </div>

                        <p className="text-[10px] text-slate-500">
                            These routes will be locked down behind Cloudflare Access + app auth in a
                            later security pass.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}

// --- Small presentational components ---

function SnapshotCard({
    label,
    value,
    highlight
}: {
    label: string;
    value: string;
    highlight?: boolean;
}) {
    return (
        <div
            className={`rounded-2xl border bg-slate-900/70 px-3 py-3 text-[11px] ${highlight
                    ? "border-amber-500/60 shadow-[0_0_0_1px_rgba(245,158,11,0.3)]"
                    : "border-slate-800"
                }`}
        >
            <div className="mb-1 text-[10px] uppercase tracking-[0.16em] text-slate-500">
                {label}
            </div>
            <div className="text-base font-semibold text-slate-50">{value}</div>
        </div>
    );
}

function PipelineStagePill({
    label,
    count,
    accent
}: {
    label: string;
    count: number;
    accent?: boolean;
}) {
    return (
        <div
            className={`flex items-center justify-between rounded-full border px-3 py-1 ${accent
                    ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-100"
                    : "border-slate-800 bg-slate-900/80 text-slate-300"
                } text-[11px]`}
        >
            <span>{label}</span>
            <span className="font-semibold">{count}</span>
        </div>
    );
}

function HealthDot({
    health
}: {
    health: "GREEN" | "YELLOW" | "RED";
}) {
    const color =
        health === "GREEN"
            ? "bg-emerald-400"
            : health === "YELLOW"
                ? "bg-amber-400"
                : "bg-rose-400";

    return (
        <span className="flex items-center gap-1 text-[10px] text-slate-400">
            <span className={`h-2 w-2 rounded-full ${color}`} />
            {health.toLowerCase()}
        </span>
    );
}

function StatusRow({ label, ok, text }: { label: string; ok?: boolean; text?: string }) {
    return (
        <div className="flex items-center justify-between gap-2 text-[11px]">
            <span className="text-slate-300">{label}</span>
            {typeof ok === "boolean" ? (
                <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] ${ok
                            ? "bg-emerald-500/10 text-emerald-200 border border-emerald-500/40"
                            : "bg-amber-500/10 text-amber-200 border border-amber-500/40"
                        }`}
                >
                    {ok ? "✅ Active" : "⚠ Check"}
                </span>
            ) : (
                <span className="text-slate-400">{text}</span>
            )}
        </div>
    );
}