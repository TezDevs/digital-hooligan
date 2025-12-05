// apps/digitalhooligan-web/app/ceo/page.tsx

"use client";

import React from "react";
import Link from "next/link";

type AppsHealthStatus = "nominal" | "internal-only" | "missing-paths";

type AppsHealthEntry = {
    id: string;
    name: string;
    status: AppsHealthStatus;
    internalOnly: boolean;
    missingPaths: string[];
};

type AppsHealthResponse = {
    ok: true;
    type: "apps_health_snapshot";
    total: number;
    internalOnly: number;
    publicFacing: number;
    timestamp: string;
    entries: AppsHealthEntry[];
};

type AppsHealthState =
    | { status: "loading" }
    | {
        status: "ready";
        total: number;
        internalOnly: number;
        publicFacing: number;
        missingCount: number;
        timestamp: string;
        sampleMissing?: AppsHealthEntry[];
    }
    | { status: "error"; message: string };

type DailyBriefingResponse = {
    ok: true;
    type: "ceo_daily_briefing";
    headline: string;
    summary: string;
    focusItems: string[];
    recommendedAppId: string;
    recommendedAppName: string;
    tags: string[];
    timestamp: string;
};

type DailyBriefingState =
    | { status: "loading" }
    | { status: "ready"; data: DailyBriefingResponse }
    | { status: "error"; message: string };

type NoteArea = "product" | "gov" | "admin" | "infra";
type NoteKind = "decision" | "note";

type CeoNote = {
    id: string;
    kind: NoteKind;
    title: string;
    body: string;
    area: NoteArea;
    createdAt: string;
    tags: string[];
};

type NotesResponse = {
    ok: true;
    type: "ceo_notes";
    notes: CeoNote[];
    timestamp: string;
};

type NotesState =
    | { status: "loading" }
    | { status: "ready"; notes: CeoNote[]; timestamp: string }
    | { status: "error"; message: string };

export default function CeoDashboardPage() {
    const [appsHealth, setAppsHealth] = React.useState<AppsHealthState>({
        status: "loading",
    });

    const [dailyBriefing, setDailyBriefing] =
        React.useState<DailyBriefingState>({
            status: "loading",
        });

    const [notesState, setNotesState] = React.useState<NotesState>({
        status: "loading",
    });

    async function loadAppsHealth() {
        setAppsHealth({ status: "loading" });

        try {
            const res = await fetch("/api/health/apps");
            if (!res.ok) {
                throw new Error(`API returned ${res.status}`);
            }

            const data = (await res.json()) as AppsHealthResponse;

            const missingEntries =
                data.entries?.filter((e) => e.missingPaths.length > 0) ?? [];

            setAppsHealth({
                status: "ready",
                total: data.total,
                internalOnly: data.internalOnly,
                publicFacing: data.publicFacing,
                missingCount: missingEntries.length,
                timestamp: data.timestamp,
                sampleMissing: missingEntries.slice(0, 3),
            });
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Unexpected error loading /api/health/apps.";

            setAppsHealth({ status: "error", message });
        }
    }

    async function loadDailyBriefing() {
        setDailyBriefing({ status: "loading" });

        try {
            const res = await fetch("/api/ceo/daily-briefing");
            if (!res.ok) {
                throw new Error(`API returned ${res.status}`);
            }

            const data = (await res.json()) as DailyBriefingResponse;
            setDailyBriefing({ status: "ready", data });
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Unexpected error loading /api/ceo/daily-briefing.";

            setDailyBriefing({ status: "error", message });
        }
    }

    async function loadNotes() {
        setNotesState({ status: "loading" });

        try {
            const res = await fetch("/api/ceo/notes");
            if (!res.ok) {
                throw new Error(`API returned ${res.status}`);
            }

            const data = (await res.json()) as NotesResponse;
            setNotesState({
                status: "ready",
                notes: data.notes,
                timestamp: data.timestamp,
            });
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Unexpected error loading /api/ceo/notes.";

            setNotesState({ status: "error", message });
        }
    }

    React.useEffect(() => {
        void loadAppsHealth();
        void loadDailyBriefing();
        void loadNotes();
    }, []);

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
            <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:pt-10">
                {/* Header */}
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
                            CEO dashboard
                        </h1>
                        <p className="mt-1 max-w-2xl text-sm text-slate-300/85 md:text-base">
                            One place to see money, products, deals, app health, and a small
                            log of what you decided. All of this leans on internal endpoints
                            so you&apos;re always looking at real wiring, not static slides.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[0.75rem] text-slate-300">
                        <span className="inline-flex items-center rounded-full bg-slate-900/70 px-2.5 py-1 text-[0.7rem] font-medium text-emerald-300 ring-1 ring-emerald-500/70">
                            Today: systems nominal
                        </span>
                    </div>
                </div>

                {/* Tabs row */}
                <nav className="mb-6 overflow-x-auto">
                    <div className="flex gap-2 text-sm">
                        <CeoTab href="/ceo" label="Overview" active />
                        <CeoTab href="/ceo/tasks" label="Tasks" />
                        <CeoTab href="/ceo/deals" label="Deals" />
                        <CeoTab href="/ceo/finance" label="Finance" />
                        <CeoTab href="/ceo/performance" label="Performance" />
                        <CeoTab href="/ceo/ai-hub" label="AI Hub" />
                        <CeoTab href="/ceo/dev-workbench" label="Dev WB" />
                        <CeoTab href="/ceo/settings" label="Settings" />
                        <CeoTab href="/ceo/logout" label="Logout" />
                    </div>
                </nav>

                {/* Top snapshot grid */}
                <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <SnapshotCard
                        label="Money"
                        primary="$4,250"
                        badge="est. MRR"
                        description="Rough MRR estimate once initial apps ship. Blend of gov + SaaS assumptions."
                    />
                    <SnapshotCard
                        label="Products"
                        primary="3 live"
                        badge="PennyWize · DropSignal · HypeWatch"
                        description="Ops Toys + internal dashboards tracking under Labs."
                    />
                    <SnapshotCard
                        label="Deals"
                        primary="2 open"
                        badge="freelance + gov"
                        description="Active opportunities + proposals across gov, freelance, and apps."
                    />
                    <SnapshotCard
                        label="App performance"
                        primary="99.92%"
                        badge="mock uptime"
                        description="All apps healthy + 0 open incidents (for now). Future: wire into real metrics."
                    />
                </section>

                {/* Middle row: App health snapshot + focus */}
                <section className="mb-6 grid gap-4 md:grid-cols-[minmax(0,2fr),minmax(0,1.5fr)]">
                    <AppHealthCard state={appsHealth} onRefresh={loadAppsHealth} />

                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-sm shadow-black/40">
                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Today&apos;s focus
                        </p>
                        <p className="mt-1 text-sm text-slate-200">
                            High-impact moves for future Tez across product, gov, and admin.
                        </p>

                        <div className="mt-3 space-y-2 text-[0.75rem]">
                            <FocusRow
                                title="Finish CEO dashboard shell + navigation"
                                tag="Product"
                                when="Today"
                            />
                            <FocusRow
                                title="Check SAM.gov + Navy Federal status"
                                tag="Gov"
                                when="This week"
                            />
                            <FocusRow
                                title="Outline PennyWize + DropSignal MVPs"
                                tag="Product"
                                when="This week"
                            />
                            <FocusRow
                                title="Capture Dev Workbench + AI Hub next steps"
                                tag="Admin"
                                when="This week"
                            />
                        </div>

                        <p className="mt-3 text-[0.7rem] text-slate-400">
                            Later, this panel can sync directly with the Tasks view and AI Hub
                            assistants instead of staying static.
                        </p>
                    </div>
                </section>

                {/* Bottom row: CEO Copilot + Notes & decisions */}
                <section className="grid gap-4 md:grid-cols-2">
                    <CeoCopilotCard
                        state={dailyBriefing}
                        onRefresh={loadDailyBriefing}
                    />
                    <CeoNotesCard state={notesState} onRefresh={loadNotes} />
                </section>
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

function SnapshotCard(props: {
    label: string;
    primary: string;
    badge: string;
    description: string;
}) {
    const { label, primary, badge, description } = props;
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-sm shadow-black/40">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                {label}
            </p>
            <div className="mt-2 flex items-baseline justify-between gap-2">
                <p className="text-xl font-semibold text-slate-50 md:text-2xl">
                    {primary}
                </p>
                <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2.5 py-1 text-[0.7rem] text-slate-300 ring-1 ring-slate-700/80">
                    {badge}
                </span>
            </div>
            <p className="mt-2 text-xs text-slate-400">{description}</p>
        </div>
    );
}

function FocusRow(props: { title: string; tag: string; when: string }) {
    const { title, tag, when } = props;
    return (
        <div className="flex items-center justify-between gap-2 rounded-xl border border-slate-800 bg-slate-950/90 px-3 py-2">
            <div className="flex-1">
                <p className="text-[0.75rem] text-slate-100">{title}</p>
                <p className="mt-0.5 text-[0.65rem] text-slate-400">{when}</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2 py-0.5 text-[0.65rem] text-slate-300">
                {tag}
            </span>
        </div>
    );
}

function AppHealthCard({
    state,
    onRefresh,
}: {
    state: AppsHealthState;
    onRefresh: () => void;
}) {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-sm shadow-black/40">
            <div className="mb-2 flex items-center justify-between gap-2">
                <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        App health snapshot
                    </p>
                    <p className="mt-1 text-sm text-slate-200">
                        Registry-backed view of how many apps/bots are wired up, and which
                        ones still need paths.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={onRefresh}
                    className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 px-2.5 py-1 text-[0.7rem] font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                >
                    Refresh
                </button>
            </div>

            {state.status === "loading" && (
                <div className="mt-2 rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-3 text-[0.8rem] text-slate-300">
                    Checking registry health…
                </div>
            )}

            {state.status === "error" && (
                <div className="mt-2 rounded-xl border border-rose-500/60 bg-rose-950/40 px-3 py-3 text-[0.8rem] text-rose-100">
                    <p className="font-semibold">Couldn&apos;t load app health.</p>
                    <p className="mt-1 text-[0.75rem] text-rose-100/90">
                        {state.message}
                    </p>
                    <p className="mt-1 text-[0.7rem] text-rose-100/80">
                        Try again, or hit{" "}
                        <code className="rounded bg-rose-900/40 px-1 py-0.5 text-[0.7rem]">
                            /api/health/apps
                        </code>{" "}
                        directly in browser or Insomnia.
                    </p>
                </div>
            )}

            {state.status === "ready" && (
                <>
                    <div className="mt-3 grid gap-3 md:grid-cols-3">
                        <StatPill
                            label="Total apps & bots"
                            value={state.total}
                            tone="neutral"
                        />
                        <StatPill
                            label="Internal-only"
                            value={state.internalOnly}
                            tone="subtle"
                        />
                        <StatPill
                            label="Missing wiring"
                            value={state.missingCount}
                            tone={state.missingCount > 0 ? "alert" : "ok"}
                        />
                    </div>

                    <div className="mt-3 text-[0.7rem] text-slate-400">
                        <p>
                            Snapshot powered by{" "}
                            <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[0.65rem] text-emerald-300">
                                /api/health/apps
                            </code>
                            . The same data can drive Labs HQ and Dev Workbench views.
                        </p>
                        <p className="mt-1">
                            Updated at{" "}
                            <span className="text-slate-300">
                                {new Date(state.timestamp).toLocaleString()}
                            </span>
                            .
                        </p>
                    </div>

                    {state.sampleMissing && state.sampleMissing.length > 0 && (
                        <div className="mt-3 rounded-xl border border-amber-500/60 bg-amber-950/30 px-3 py-3 text-[0.75rem] text-amber-100">
                            <p className="mb-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em]">
                                Apps needing attention
                            </p>
                            <ul className="space-y-1.5">
                                {state.sampleMissing.map((entry) => (
                                    <li key={entry.id}>
                                        <span className="font-semibold">{entry.name}</span>{" "}
                                        <span className="text-[0.7rem] text-amber-100/90">
                                            (id: {entry.id}) — missing{" "}
                                            {entry.missingPaths.join(", ") || "paths"}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            {state.missingCount > state.sampleMissing.length && (
                                <p className="mt-1 text-[0.7rem] text-amber-100/80">
                                    + {state.missingCount - state.sampleMissing.length} more with
                                    missing wiring.
                                </p>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

function StatPill({
    label,
    value,
    tone,
}: {
    label: string;
    value: number;
    tone: "neutral" | "ok" | "alert" | "subtle";
}) {
    const base =
        "inline-flex items-center rounded-full px-2.5 py-1 text-[0.7rem] ring-1";
    const toneClass =
        tone === "ok"
            ? "bg-emerald-500/10 text-emerald-200 ring-emerald-500/60"
            : tone === "alert"
                ? "bg-amber-500/10 text-amber-200 ring-amber-500/60"
                : tone === "subtle"
                    ? "bg-slate-900/80 text-slate-300 ring-slate-700/80"
                    : "bg-slate-900/80 text-slate-200 ring-slate-700/80";

    return (
        <div className="flex flex-col gap-1 rounded-xl border border-slate-800 bg-slate-950/90 px-3 py-3">
            <span className={base + " " + toneClass}>
                <span className="mr-1 text-[0.65rem] uppercase tracking-[0.16em]">
                    {label}
                </span>
                {value}
            </span>
        </div>
    );
}

function CeoCopilotCard({
    state,
    onRefresh,
}: {
    state: DailyBriefingState;
    onRefresh: () => void;
}) {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-[0.8rem] text-slate-200 shadow-sm shadow-black/40">
            <div className="mb-2 flex items-center justify-between gap-2">
                <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        CEO Copilot (preview)
                    </p>
                    <p className="mt-1 text-sm text-slate-200">
                        Tiny readout that stitches registry health into one suggestion for
                        what to move today.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={onRefresh}
                    className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 px-2.5 py-1 text-[0.7rem] font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                >
                    Refresh
                </button>
            </div>

            {state.status === "loading" && (
                <div className="mt-2 rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-3 text-[0.8rem] text-slate-300">
                    Generating today&apos;s briefing…
                </div>
            )}

            {state.status === "error" && (
                <div className="mt-2 rounded-xl border border-rose-500/60 bg-rose-950/40 px-3 py-3 text-[0.8rem] text-rose-100">
                    <p className="font-semibold">Copilot couldn&apos;t load.</p>
                    <p className="mt-1 text-[0.75rem] text-rose-100/90">
                        {state.message}
                    </p>
                    <p className="mt-1 text-[0.7rem] text-rose-100/80">
                        Hit{" "}
                        <code className="rounded bg-rose-900/40 px-1 py-0.5 text-[0.7rem]">
                            /api/ceo/daily-briefing
                        </code>{" "}
                        directly in browser or Insomnia to debug the payload.
                    </p>
                </div>
            )}

            {state.status === "ready" && (
                <>
                    <div className="mt-2">
                        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Today&apos;s headline
                        </p>
                        <p className="mt-1 text-sm text-slate-50">
                            {state.data.headline}
                        </p>
                    </div>

                    <p className="mt-2 text-[0.8rem] leading-relaxed text-slate-200">
                        {state.data.summary}
                    </p>

                    {state.data.focusItems.length > 0 && (
                        <div className="mt-3">
                            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Focus checklist
                            </p>
                            <ul className="mt-1 space-y-1.5 list-disc pl-4 text-[0.75rem]">
                                {state.data.focusItems.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[0.7rem] text-slate-400">
                        <div className="flex flex-wrap gap-1">
                            {state.data.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[0.65rem] text-slate-300"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                        {state.data.recommendedAppId && (
                            <span className="text-[0.7rem] text-slate-400">
                                Focus app:{" "}
                                <span className="font-medium text-slate-200">
                                    {state.data.recommendedAppName}
                                </span>{" "}
                                ({state.data.recommendedAppId})
                            </span>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

function CeoNotesCard({
    state,
    onRefresh,
}: {
    state: NotesState;
    onRefresh: () => void;
}) {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-[0.8rem] text-slate-200 shadow-sm shadow-black/40">
            <div className="mb-2 flex items-center justify-between gap-2">
                <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Notes & decisions
                    </p>
                    <p className="mt-1 text-sm text-slate-200">
                        Tiny log of what you&apos;ve locked in so far. Treat this as the
                        seed of a future decision log.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={onRefresh}
                    className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 px-2.5 py-1 text-[0.7rem] font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                >
                    Refresh
                </button>
            </div>

            {state.status === "loading" && (
                <div className="mt-2 rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-3 text-[0.8rem] text-slate-300">
                    Loading notes…
                </div>
            )}

            {state.status === "error" && (
                <div className="mt-2 rounded-xl border border-rose-500/60 bg-rose-950/40 px-3 py-3 text-[0.8rem] text-rose-100">
                    <p className="font-semibold">Couldn&apos;t load notes.</p>
                    <p className="mt-1 text-[0.75rem] text-rose-100/90">
                        {state.message}
                    </p>
                    <p className="mt-1 text-[0.7rem] text-rose-100/80">
                        Hit{" "}
                        <code className="rounded bg-rose-900/40 px-1 py-0.5 text-[0.7rem]">
                            /api/ceo/notes
                        </code>{" "}
                        directly in browser or Insomnia to debug the payload.
                    </p>
                </div>
            )}

            {state.status === "ready" && (
                <>
                    <div className="mt-2 space-y-2">
                        {state.notes
                            .slice()
                            .sort(
                                (a, b) =>
                                    new Date(b.createdAt).getTime() -
                                    new Date(a.createdAt).getTime(),
                            )
                            .slice(0, 3)
                            .map((note) => (
                                <div
                                    key={note.id}
                                    className="rounded-xl border border-slate-800 bg-slate-950/90 px-3 py-2 text-[0.8rem]"
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <p className="text-[0.8rem] font-medium text-slate-100">
                                                {note.title}
                                            </p>
                                            <p className="mt-0.5 text-[0.7rem] text-slate-400">
                                                {noteAreaLabel(note.area)} ·{" "}
                                                {new Date(note.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2 py-0.5 text-[0.65rem] text-slate-300">
                                            {note.kind === "decision" ? "Decision" : "Note"}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-[0.75rem] text-slate-300">
                                        {note.body}
                                    </p>
                                    {note.tags.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-1 text-[0.65rem] text-slate-400">
                                            {note.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="rounded-full bg-slate-900/80 px-2 py-0.5"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>

                    <p className="mt-3 text-[0.7rem] text-slate-400">
                        Backed by{" "}
                        <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[0.65rem] text-emerald-300">
                            /api/ceo/notes
                        </code>{" "}
                        so CEO, Labs, Dev Workbench, and future AI assistants can all pull
                        from the same story of what you&apos;ve decided so far.
                    </p>
                </>
            )}
        </div>
    );
}

function noteAreaLabel(area: NoteArea): string {
    switch (area) {
        case "product":
            return "Product";
        case "gov":
            return "Gov / contracts";
        case "admin":
            return "Admin";
        case "infra":
            return "Infra";
        default:
            return area;
    }
}