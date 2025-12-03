// components/ceo/CeoTasksBoard.tsx
"use client";

import {
    Task,
    TaskStatus,
    TaskType,
    groupTasksByStatus
} from "@/lib/ceoDashboardData";

type BoardFilterType = "ALL" | TaskType;
type BoardFilterStatus = "ALL" | TaskStatus;

const TYPE_FILTERS: { key: BoardFilterType; label: string }[] = [
    { key: "ALL", label: "All types" },
    { key: "ADMIN", label: "Admin / Gov" },
    { key: "PRODUCT", label: "Product" },
    { key: "OPS", label: "Ops / Infra" },
    { key: "SALES", label: "Sales / Deals" },
    { key: "FINANCE", label: "Finance" }
];

const STATUS_FILTERS: { key: BoardFilterStatus; label: string }[] = [
    { key: "ALL", label: "All statuses" },
    { key: "THIS_WEEK", label: "This week" },
    { key: "IN_PROGRESS", label: "In progress" },
    { key: "BLOCKED", label: "Blocked" },
    { key: "INBOX", label: "Inbox" },
    { key: "DONE", label: "Done" }
];

const STATUS_COLUMNS: { key: TaskStatus; label: string; hint: string }[] = [
    { key: "INBOX", label: "Inbox", hint: "Unsorted ideas & to-dos" },
    { key: "THIS_WEEK", label: "This Week", hint: "Focus items for this week" },
    { key: "IN_PROGRESS", label: "In Progress", hint: "Currently moving" },
    { key: "BLOCKED", label: "Blocked", hint: "Needs something to move" },
    { key: "DONE", label: "Done", hint: "Completed work" }
];

export function CeoTasksBoard({ tasks }: { tasks: Task[] }) {
    const [typeFilter, setTypeFilter] = React.useState<BoardFilterType>("ALL");
    const [statusFilter, setStatusFilter] = React.useState<BoardFilterStatus>("ALL");

    const filteredTasks = React.useMemo(() => {
        return tasks.filter((task) => {
            if (typeFilter !== "ALL" && task.type !== typeFilter) return false;
            if (statusFilter !== "ALL" && task.status !== statusFilter) return false;
            return true;
        });
    }, [tasks, typeFilter, statusFilter]);

    const grouped = groupTasksByStatus(filteredTasks);

    return (
        <div className="space-y-3">
            {/* Filters */}
            <div className="flex flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-3 text-[11px]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Filters
                    </div>
                    <div className="text-[10px] text-slate-500">
                        Showing {filteredTasks.length} of {tasks.length} tasks
                    </div>
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    {/* Type filter */}
                    <div className="flex flex-wrap gap-1">
                        {TYPE_FILTERS.map((f) => {
                            const active = typeFilter === f.key;
                            return (
                                <button
                                    key={f.key}
                                    type="button"
                                    onClick={() => setTypeFilter(f.key)}
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

                    {/* Status filter */}
                    <div className="flex flex-wrap gap-1">
                        {STATUS_FILTERS.map((f) => {
                            const active = statusFilter === f.key;
                            return (
                                <button
                                    key={f.key}
                                    type="button"
                                    onClick={() => setStatusFilter(f.key)}
                                    className={[
                                        "rounded-full border px-3 py-1 text-[11px] transition-colors",
                                        active
                                            ? "border-sky-500/70 bg-sky-500/10 text-sky-100"
                                            : "border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-600"
                                    ].join(" ")}
                                >
                                    {f.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Board */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5 overflow-x-auto">
                    {STATUS_COLUMNS.map((col) => (
                        <TaskColumn
                            key={col.key}
                            title={col.label}
                            hint={col.hint}
                            status={col.key}
                            tasks={grouped[col.key]}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}

// --- Internal components ---

import React from "react";

function TaskColumn({
    title,
    hint,
    status,
    tasks
}: {
    title: string;
    hint: string;
    status: TaskStatus;
    tasks: Task[];
}) {
    const badgeColor =
        status === "BLOCKED"
            ? "text-amber-200 bg-amber-500/10 border-amber-500/40"
            : status === "DONE"
                ? "text-emerald-200 bg-emerald-500/10 border-emerald-500/40"
                : "text-slate-200 bg-slate-800/80 border-slate-700";

    return (
        <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-950/40 p-3 min-w-[220px]">
            <div className="flex items-center justify-between gap-2 mb-2">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                            {title}
                        </h2>
                        <span
                            className={`rounded-full border px-2 py-0.5 text-[10px] ${badgeColor}`}
                        >
                            {tasks.length}
                        </span>
                    </div>
                    <p className="mt-1 text-[10px] text-slate-500">{hint}</p>
                </div>
            </div>

            <div className="mt-1 space-y-2 text-[11px]">
                {tasks.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/50 px-3 py-4 text-center text-[11px] text-slate-500">
                        No tasks in this column with current filters.
                    </div>
                ) : (
                    tasks.map((task) => <TaskCard key={task.id} task={task} />)
                )}
            </div>
        </div>
    );
}

function TaskCard({ task }: { task: Task }) {
    const typeLabel =
        task.type === "ADMIN"
            ? "Admin / Gov"
            : task.type === "PRODUCT"
                ? "Product"
                : task.type === "SALES"
                    ? "Sales / Deals"
                    : task.type === "OPS"
                        ? "Ops / Infra"
                        : "Finance";

    const priorityBadge =
        task.priority === "HIGH"
            ? "border-rose-500/60 bg-rose-500/10 text-rose-100"
            : task.priority === "MEDIUM"
                ? "border-amber-500/60 bg-amber-500/10 text-amber-100"
                : "border-slate-700 bg-slate-900 text-slate-300";

    return (
        <article className="rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2">
            <div className="flex items-start justify-between gap-2">
                <div>
                    <h3 className="text-[12px] font-medium text-slate-50">{task.title}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px]">
                        <span className="rounded-full bg-slate-800 px-2 py-0.5 text-slate-300">
                            {typeLabel}
                        </span>
                        {task.priority && (
                            <span
                                className={`rounded-full border px-2 py-0.5 ${priorityBadge}`}
                            >
                                {task.priority.toLowerCase()} priority
                            </span>
                        )}
                        {task.dueDate && (
                            <span className="rounded-full bg-slate-900 px-2 py-0.5 text-slate-300">
                                Due {task.dueDate}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            {task.notes && (
                <p className="mt-1 text-[11px] text-slate-400">{task.notes}</p>
            )}
        </article>
    );
}