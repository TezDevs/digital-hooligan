"use client";

import React from "react";
import {
    Meeting,
    MeetingType,
    groupMeetingsByDate
} from "@/lib/ceoDashboardData";

type FilterType = "ALL" | MeetingType;

const TYPE_FILTERS: { key: FilterType; label: string }[] = [
    { key: "ALL", label: "All meetings" },
    { key: "CLIENT", label: "Client" },
    { key: "GOV", label: "Gov" },
    { key: "INTERNAL", label: "Internal" },
    { key: "OTHER", label: "Other" }
];

export function CeoMeetingsCalendar({ meetings }: { meetings: Meeting[] }) {
    const [typeFilter, setTypeFilter] = React.useState<FilterType>("ALL");

    const filtered = React.useMemo(
        () =>
            meetings.filter((m) =>
                typeFilter === "ALL" ? true : m.type === typeFilter
            ),
        [meetings, typeFilter]
    );

    const grouped = groupMeetingsByDate(filtered);
    const sortedDates = Object.keys(grouped).sort();

    return (
        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-3">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Upcoming meetings &amp; calls
                    </h2>
                    <p className="mt-1 text-[11px] text-slate-400">
                        Light-weight calendar for client calls, gov check-ins, and internal
                        sessions.
                    </p>
                </div>
                <div className="flex flex-wrap gap-1 text-[11px]">
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

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 text-[11px]">
                <div className="space-y-2">
                    {sortedDates.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-950/60 px-3 py-4 text-center text-slate-500">
                            No meetings scheduled with this filter.
                        </div>
                    ) : (
                        sortedDates.map((date) => (
                            <DayBlock key={date} date={date} meetings={grouped[date]} />
                        ))
                    )}
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 space-y-2">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Scheduling AI (future)
                    </div>
                    <p className="text-[11px] text-slate-400">
                        Later, this will be the spot where an assistant:
                    </p>
                    <ul className="mt-1 space-y-1 text-[11px] text-slate-300">
                        <li>• Proposes times for client calls around deep work.</li>
                        <li>• Keeps gov meetings away from crunch windows.</li>
                        <li>• Nudges you to schedule follow-ups for key deals.</li>
                    </ul>
                    <p className="text-[10px] text-slate-500">
                        For now, it&apos;s just a design placeholder while we wire in the data and
                        guardrails.
                    </p>
                </div>
            </div>
        </section>
    );
}

function DayBlock({ date, meetings }: { date: string; meetings: Meeting[] }) {
    return (
        <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2">
            <div className="flex items-center justify-between">
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                    {date}
                </div>
                <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] text-slate-300">
                    {meetings.length} meeting{meetings.length === 1 ? "" : "s"}
                </span>
            </div>
            <div className="mt-2 space-y-1">
                {meetings.map((m) => (
                    <MeetingRow key={m.id} meeting={m} />
                ))}
            </div>
        </div>
    );
}

function MeetingRow({ meeting }: { meeting: Meeting }) {
    const typeLabel =
        meeting.type === "CLIENT"
            ? "Client"
            : meeting.type === "GOV"
                ? "Gov"
                : meeting.type === "INTERNAL"
                    ? "Internal"
                    : "Other";

    const channelLabel =
        meeting.channel === "CALL"
            ? "Call"
            : meeting.channel === "VIDEO"
                ? "Video"
                : "In-person";

    return (
        <div className="rounded-lg border border-slate-800 bg-slate-900/90 px-3 py-2">
            <div className="text-[11px] font-medium text-slate-50">
                {meeting.time} · {meeting.title}
            </div>
            <div className="mt-1 flex flex-wrap gap-2 text-[10px] text-slate-300">
                <span className="rounded-full bg-slate-800 px-2 py-0.5">
                    {typeLabel}
                </span>
                <span className="rounded-full bg-slate-900 px-2 py-0.5">
                    {channelLabel}
                </span>
                {meeting.relatedTo && (
                    <span className="rounded-full bg-slate-900 px-2 py-0.5">
                        {meeting.relatedTo.toLowerCase()}
                    </span>
                )}
            </div>
            {meeting.notes && (
                <p className="mt-1 text-[10px] text-slate-400">{meeting.notes}</p>
            )}
        </div>
    );
}