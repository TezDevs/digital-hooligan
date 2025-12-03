// app/ceo/tasks/page.tsx
import type { Metadata } from "next";
import {
    mockTasks,
    groupTasksByStatus,
    Task,
    TaskStatus
} from "@/lib/ceoDashboardData";
import { CeoHeader } from "@/components/ceo/CeoHeader";

export const metadata: Metadata = {
    title: "CEO Tasks | Digital Hooligan",
    description: "Task board for the Digital Hooligan CEO dashboard."
};

const STATUS_COLUMNS: { key: TaskStatus; label: string; hint: string }[] = [
    { key: "INBOX", label: "Inbox", hint: "Unsorted ideas & to-dos" },
    { key: "THIS_WEEK", label: "This Week", hint: "Focus items for this week" },
    { key: "IN_PROGRESS", label: "In Progress", hint: "Currently moving" },
    { key: "BLOCKED", label: "Blocked", hint: "Needs something to move" },
    { key: "DONE", label: "Done", hint: "Completed work" }
];

export default function CeoTasksPage() {
    const grouped = groupTasksByStatus(mockTasks);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50">
            <CeoHeader />

            <main className="mx-auto max-w-6xl px-4 py-6 space-y-4">
                <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h1 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                            Tasks
                        </h1>
                        <p className="text-[12px] text-slate-400 mt-1">
                            One board to see everything competing for your attention across
                            products, admin, ops, and revenue.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
                        <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1">
                            Total tasks: {mockTasks.length}
                        </span>
                        <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1">
                            In progress: {grouped.IN_PROGRESS.length}
                        </span>
                        <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1">
                            Blocked: {grouped.BLOCKED.length}
                        </span>
                    </div>
                </header>

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

                <p className="text-[10px] text-slate-500 pb-4">
                    Future: this board syncs to a real data store and supports drag-and-drop,
                    filters by product (PennyWize, DropSignal, HypeWatch, Ops Toys), and links
                    into the AI assistant for priority suggestions.
                </p>
            </main>
        </div>
    );
}

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
                        No tasks in this column yet.
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
                    <h3 className="text-[12px] font-medium text-slate-50">
                        {task.title}
                    </h3>
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