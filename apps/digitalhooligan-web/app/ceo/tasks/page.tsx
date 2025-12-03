// app/ceo/tasks/page.tsx
import type { Metadata } from "next";
import { CeoHeader } from "@/components/ceo/CeoHeader";
import { mockTasks, mockMeetings } from "@/lib/ceoDashboardData";
import { CeoTasksBoard } from "@/components/ceo/CeoTasksBoard";
import { CeoMeetingsCalendar } from "@/components/ceo/CeoMeetingsCalendar";

export const metadata: Metadata = {
    title: "CEO Tasks | Digital Hooligan",
    description:
        "Task board and lightweight calendar for the Digital Hooligan CEO dashboard."
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
                            One board to see everything competing for your attention plus a light
                            calendar for customer calls and internal sessions.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
                        <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1">
                            Total tasks: {mockTasks.length}
                        </span>
                    </div>
                </header>

                {/* Board with filters */}
                <CeoTasksBoard tasks={mockTasks} />

                {/* Meetings calendar under tasks */}
                <CeoMeetingsCalendar meetings={mockMeetings} />

                <p className="text-[10px] text-slate-500 pb-4">
                    In the future, a Scheduling AI can sit on top of this calendar and your
                    workload to suggest when to book calls — and when to protect deep work.
                </p>
            </main>
        </div>
    );
}