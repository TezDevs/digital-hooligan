// app/ceo/tasks/page.tsx
import type { Metadata } from "next";
import { CeoHeader } from "@/components/ceo/CeoHeader";
import { mockTasks } from "@/lib/ceoDashboardData";
import { CeoTasksBoard } from "@/components/ceo/CeoTasksBoard";

export const metadata: Metadata = {
    title: "CEO Tasks | Digital Hooligan",
    description: "Task board for the Digital Hooligan CEO dashboard."
};

export default function CeoTasksPage() {
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
                            One board to see everything competing for your attention across products,
                            admin, ops, and revenue — with quick filters so you can focus.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
                        <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1">
                            Total tasks: {mockTasks.length}
                        </span>
                    </div>
                </header>

                <CeoTasksBoard tasks={mockTasks} />

                <p className="text-[10px] text-slate-500 pb-4">
                    Future: this board syncs to a real data store and supports drag-and-drop, due
                    date ranges, and AI-powered suggestions for what to do today.
                </p>
            </main>
        </div>
    );
}