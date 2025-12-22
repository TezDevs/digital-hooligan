'use client';

import Link from 'next/link';
import { useMemo } from 'react';

/* ======================
   Types
====================== */

type IncidentStatus = 'open' | 'investigating' | 'handled';
type Severity = 'low' | 'medium' | 'high' | 'critical';

interface Incident {
    id: string;
    title?: string;
    severity: Severity;
    status: IncidentStatus;
    updatedAt?: string;
}

/* ======================
   Storage
====================== */

const INCIDENTS_STORAGE_KEY = 'ceo.incidents.v1';

/* ======================
   Helpers (hoisted)
====================== */

function minutesSince(iso?: string) {
    if (!iso) return 0;
    return Math.floor(
        (Date.now() - new Date(iso).getTime()) / 60000
    );
}

function priorityScore(i: Incident) {
    let score = 0;

    switch (i.severity) {
        case 'critical':
            score += 100;
            break;
        case 'high':
            score += 60;
            break;
        case 'medium':
            score += 30;
            break;
        case 'low':
            score += 10;
            break;
    }

    score += Math.min(minutesSince(i.updatedAt), 120);

    if (i.status === 'handled') score = 0;
    return score;
}

function fmtAge(iso?: string) {
    const m = minutesSince(iso);
    if (m < 60) return `${m}m`;
    if (m < 1440) return `${Math.floor(m / 60)}h`;
    return `${Math.floor(m / 1440)}d`;
}

/* ======================
   Data hook (snapshot)
====================== */

function useIncidentsSnapshot(): Incident[] {
    if (typeof window === 'undefined') return [];
    try {
        const raw = localStorage.getItem(INCIDENTS_STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

/* ======================
   Page
====================== */

export default function CEOOverviewPage() {
    const incidents = useIncidentsSnapshot();

    const summary = useMemo(() => {
        const active = incidents.filter((i) => i.status !== 'handled');

        const critical = active.filter(
            (i) => i.severity === 'critical'
        ).length;

        const high = active.filter(
            (i) => i.severity === 'high'
        ).length;

        const open = incidents.filter((i) => i.status === 'open').length;
        const handled = incidents.filter(
            (i) => i.status === 'handled'
        ).length;

        const isNominal = critical === 0 && high === 0;

        const slaBreaches = active.filter(
            (i) => minutesSince(i.updatedAt) >= 60
        );

        const topPriority = active
            .slice()
            .sort((a, b) => priorityScore(b) - priorityScore(a))[0];

        return {
            critical,
            high,
            open,
            handled,
            isNominal,
            slaBreaches,
            topPriority,
        };
    }, [incidents]);

    return (
        <div className="p-6">
            <h1 className="mb-4 text-xl font-semibold">CEO Overview</h1>

            {/* Nominal / Attention Banner */}
            {summary.isNominal ? (
                <div className="mb-4 rounded border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
                    <div className="text-sm font-medium text-emerald-300">
                        🟢 All systems nominal
                    </div>
                    <div className="text-xs text-emerald-400/80">
                        No critical or high-severity incidents detected.
                    </div>
                </div>
            ) : (
                <div className="mb-4 rounded border border-red-500/30 bg-red-500/10 px-4 py-3">
                    <div className="text-sm font-medium text-red-300">
                        🔴 Attention required
                    </div>
                    <div className="text-xs text-red-400/80">
                        Critical or high-severity incidents are active.
                    </div>
                </div>
            )}

            {/* SLA Breach Banner */}
            {summary.slaBreaches.length > 0 && (
                <div className="mb-6 rounded border border-yellow-500/30 bg-yellow-500/10 px-4 py-3">
                    <div className="text-sm font-medium text-yellow-300">
                        ⏱ SLA breach risk
                    </div>
                    <div className="text-xs text-yellow-400/80">
                        {summary.slaBreaches.length} incident(s) exceed SLA threshold.
                    </div>
                </div>
            )}

            {/* Counts */}
            <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                    ['Critical', summary.critical],
                    ['High', summary.high],
                    ['Open', summary.open],
                    ['Handled', summary.handled],
                ].map(([label, value]) => (
                    <div
                        key={label}
                        className="rounded border border-white/10 bg-white/5 px-4 py-3"
                    >
                        <div className="text-xs text-white/60">{label}</div>
                        <div className="text-2xl font-semibold">{value}</div>
                    </div>
                ))}
            </div>

            {/* Top Priority */}
            {summary.topPriority && (
                <div className="mb-6 rounded border border-white/10 bg-white/5 px-4 py-4">
                    <div className="mb-1 text-xs text-white/60">
                        Top priority incident
                    </div>
                    <div className="text-sm font-medium">
                        {summary.topPriority.title ?? summary.topPriority.id}
                    </div>
                    <div className="mt-1 text-xs text-white/50">
                        {summary.topPriority.severity} ·{' '}
                        {summary.topPriority.status} ·{' '}
                        {fmtAge(summary.topPriority.updatedAt)}
                    </div>
                </div>
            )}

            {/* Drill-downs */}
            <div className="flex gap-4 text-sm">
                <Link
                    href="/ceo/incidents"
                    className="text-emerald-400 hover:text-emerald-300"
                >
                    View all incidents →
                </Link>

                {(summary.critical > 0 || summary.high > 0) && (
                    <Link
                        href="/ceo/incidents"
                        className="text-red-400 hover:text-red-300"
                    >
                        View critical / high →
                    </Link>
                )}
            </div>
        </div>
    );
}