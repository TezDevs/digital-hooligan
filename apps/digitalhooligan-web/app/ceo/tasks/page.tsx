// apps/digitalhooligan-web/app/ceo/tasks/page.tsx

"use client";

import React from "react";
import Link from "next/link";

type TaskArea = "product" | "gov" | "admin" | "infra";
type TaskWhen = "today" | "this_week" | "later";
type TaskStatus = "todo" | "in_progress" | "done";

type CeoTask = {
    id: string;
    title: string;
    description: string;
    area: TaskArea;
    when: TaskWhen;
    status: TaskStatus;
    tags: string[];
};

type TasksResponse = {
    ok: true;
    type: "ceo_tasks";
    tasks: CeoTask[];
    timestamp: string;
};

type TasksState =
    | { status: "loading" }
    | { status: "ready"; tasks: CeoTask[]; timestamp: string }
    | { status: "error"; message: string };

export default function CeoTasksPage() {
    const [state, setState] = React.useState<TasksState>({ status: "loading" });

    async function loadTasks() {
        setState({ status: "loading" });

        try {
            const res = await fetch("/api/ceo/tasks");
            if (!res.ok) {
                throw new Error(`API returned ${res.status}`);
            }

            const data = (await res.json()) as TasksResponse;
            setState({
                status: "ready",
                tasks: data.tasks,
                timestamp: data.timestamp,
            });
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Unexpected error loading /api/ceo/tasks.";

            setState({ status: "error", message });
        }
    }

    React.useEffect(() => {
        void loadTasks();
    }, []);

    const tasksToday =
        state.status === "ready"
            ? state.tasks.filter((t) => t.when === "today")
            : [];
    const tasksThisWeek =
        state.status === "ready"
            ? state.tasks.filter((t) => t.when === "this_week")
            : [];
    const tasksLater =
        state.status === "ready"
            ? state.tasks.filter((t) => t.when === "later")
            : [];

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
            <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:pt-10">
                {/* Header */}
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
                            CEO tasks
                        </h1>
                        <p className="mt-1 max-w-2xl text-sm text-slate-300/85 md:text-base">
                            High-impact to-dos across product, gov, admin, and infra. Backed
                            by a typed /api/ceo/tasks endpoint so future AI assistants and
                            dashboards can pull from the same list.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={loadTasks}
                        className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                    >
                        Refresh
                    </button>
                </div>

                {/* Tabs row (same as other CEO pages) */}
                <nav className="mb-6 overflow-x-auto">
                    <div className="flex gap-2 text-sm">
                        <CeoTab href="/ceo" label="Overview" />
                        <CeoTab href="/ceo/tasks" label="Tasks" active />
                        <CeoTab href="/ceo/deals" label="Deals" />
                        <CeoTab href="/ceo/finance" label="Finance" />
                        <CeoTab href="/ceo/performance" label="Performance" />
                        <CeoTab href="/ceo/ai-hub" label="AI Hub" />
                        <CeoTab href="/ceo/dev-workbench" label="Dev WB" />
                        <CeoTab href="/ceo/settings" label="Settings" />
                        <CeoTab href="/ceo/logout" label="Logout" />
                    </div>
                </nav>

                {/* Status states */}
                {state.status === "loading" && (
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-300 shadow-sm shadow-black/40">
                        Loading CEO tasks…
                    </div>
                )}

                {state.status === "error" && (
                    <div className="rounded-2xl border border-rose-500/60 bg-rose-950/40 p-4 text-sm text-rose-100 shadow-sm shadow-black/40">
                        <p className="font-semibold">Couldn&apos;t load tasks.</p>
                        <p className="mt-1 text-[0.85rem]">{state.message}</p>
                        <p className="mt-2 text-[0.75rem] text-rose-100/90">
                            Hit{" "}
                            <code className="rounded bg-rose-900/50 px-1 py-0.5 text-[0.7rem]">
                                /api/ceo/tasks
                            </code>{" "}
                            directly in browser or Insomnia to debug the payload.
                        </p>
                    </div>
                )}

                {state.status === "ready" && (
                    <>
                        <section className="mb-6 grid gap-4 md:grid-cols-3">
                            <TasksColumn
                                title="Today"
                                subtitle="What moves the needle today."
                                tasks={tasksToday}
                            />
                            <TasksColumn
                                title="This week"
                                subtitle="Keep the flywheel turning."
                                tasks={tasksThisWeek}
                            />
                            <TasksColumn
                                title="Later"
                                subtitle="Good ideas parked, not lost."
                                tasks={tasksLater}
                            />
                        </section>

                        <p className="text-[0.7rem] text-slate-400">
                            Backed by{" "}
                            <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[0.65rem] text-emerald-300">
                                /api/ceo/tasks
                            </code>{" "}
                            as the source of truth. Later, the CEO Copilot, AI Hub, and Labs
                            can pull from the same endpoint.
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

function TasksColumn(props: {
    title: string;
    subtitle: string;
    tasks: CeoTask[];
}) {
    const { title, subtitle, tasks } = props;

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <div className="mb-2">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {title}
                </p>
                <p className="mt-1 text-[0.75rem] text-slate-300">{subtitle}</p>
            </div>

            {tasks.length === 0 && (
                <p className="mt-2 text-[0.75rem] text-slate-500">
                    Nothing here yet. That&apos;s either focus or a gap—your call.
                </p>
            )}

            <ul className="mt-2 space-y-2">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className="rounded-xl border border-slate-800 bg-slate-950/90 px-3 py-2"
                    >
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <p className="text-[0.8rem] font-medium text-slate-100">
                                    {task.title}
                                </p>
                                <p className="mt-1 text-[0.75rem] text-slate-300">
                                    {task.description}
                                </p>
                            </div>
                            <StatusBadge status={task.status} />
                        </div>

                        <div className="mt-2 flex flex-wrap gap-1 text-[0.65rem] text-slate-400">
                            <span className="rounded-full bg-slate-900/80 px-2 py-0.5">
                                {areaLabel(task.area)}
                            </span>
                            {task.tags.map((tag) => (
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

function StatusBadge({ status }: { status: TaskStatus }) {
    const base =
        "rounded-full px-2 py-0.5 text-[0.65rem] font-medium ring-1 inline-flex items-center";
    let tone = "bg-slate-900/80 text-slate-300 ring-slate-700/80";

    if (status === "todo") {
        tone = "bg-slate-900/80 text-slate-200 ring-slate-700/80";
    } else if (status === "in_progress") {
        tone = "bg-amber-500/10 text-amber-200 ring-amber-500/60";
    } else if (status === "done") {
        tone = "bg-emerald-500/10 text-emerald-200 ring-emerald-500/60";
    }

    const label =
        status === "todo"
            ? "To do"
            : status === "in_progress"
                ? "In progress"
                : "Done";

    return <span className={base + " " + tone}>{label}</span>;
}

function areaLabel(area: TaskArea): string {
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