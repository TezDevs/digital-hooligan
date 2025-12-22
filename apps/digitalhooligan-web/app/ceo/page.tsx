'use client';

import Link from 'next/link';
import { useMemo } from 'react';

/* ======================
   Types (shared-lite)
====================== */

type IncidentStatus = 'open' | 'investigating' | 'handled';
type Severity = 'low' | 'medium' | 'high' | 'critical';

interface Incident {
    id: string;
    severity: Severity;
    status: IncidentStatus;
    updatedAt?: string;
}

/* ======================
   Temporary Data Hook
   (Later: shared store)
====================== */

const INCIDENTS_STORAGE_KEY = 'ceo.incidents.v1';

const useIncidentsSnapshot = (): Incident[] => {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(INCIDENTS_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

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

        const oldest = active
            .slice()
            .sort(
                (a, b) =>
                    new Date(a.updatedAt ?? 0).getTime() -
                    new Date(b.updatedAt ?? 0).getTime()
            )[0];

        return {
            critical,
            high,
            open,
            handled,
            isNominal,
            topIncident: oldest,
        };
    }, [incidents]);

    return (
        <div className="p-6">
            <h1 className="mb-4 text-xl font-semibold">CEO Overview</h1>

            {/* Nominal Banner */}
            {summary.isNominal ? (
                <div className="mb-6 rounded border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
                    <div className="text-sm font-medium text-emerald-300">
                        🟢 All systems nominal
                    </div>
                    <div className="text-xs text-emerald-400/80">
                        No critical or high-severity incidents detected.
                    </div>
                </div>
            ) : (
                <div className="mb-6 rounded border border-red-500/30 bg-red-500/10 px-4 py-3">
                    <div className="text-sm font-medium text-red-300">
                        🔴 Attention required
                    </div>
                    <div className="text-xs text-red-400/80">
                        Critical or high-severity incidents are active.
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
            {summary.topIncident && (
                <div className="rounded border border-white/10 bg-white/5 px-4 py-4">
                    <div className="mb-1 text-xs text-white/60">
                        Oldest active incident
                    </div>
                    <div className="text-sm font-medium">
                        {summary.topIncident.id}
                    </div>
                    <Link
                        href={`/ceo/incidents`}
                        className="mt-2 inline-block text-xs text-emerald-400 hover:text-emerald-300"
                    >
                        View incidents →
                    </Link>
                </div>
            )}
        </div>
    );
}