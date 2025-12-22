'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

/* =====================
   Types
===================== */

type IncidentStatus = 'open' | 'investigating' | 'handled';
type Severity = 'low' | 'medium' | 'high' | 'critical';

interface Incident {
    id: string;
    title: string;
    severity: Severity;
    status: IncidentStatus;
    appId?: string;
    detectedBy?: string;
}

/* =====================
   Seed Data
===================== */

const INCIDENTS_STORAGE_KEY = 'dh_ceo_incidents';

const initialIncidents: Incident[] = [
    {
        id: 'INC-DROP-001',
        title: 'DropSignal checkout latency',
        severity: 'high',
        status: 'open',
        appId: 'dropsignal',
        detectedBy: 'synthetics',
    },
    {
        id: 'INC-PENNY-002',
        title: 'PennyWize webhook delays',
        severity: 'medium',
        status: 'investigating',
        appId: 'pennywize',
        detectedBy: 'alerts',
    },
];

/* =====================
   Helpers
===================== */

const severityRank: Record<Severity, number> = {
    critical: 4,
    high: 3,
    medium: 2,
    low: 1,
};

function priorityScore(i: Incident) {
    return severityRank[i.severity] * 10 + (i.status === 'open' ? 5 : 0);
}

/* =====================
   Page
===================== */

export default function IncidentsPage() {
    /* ---------------------
       State (UNCONDITIONAL)
    --------------------- */

    const [incidents, setIncidents] = useState<Incident[]>(() => {
        // SSR-safe initializer
        if (typeof window === 'undefined') return initialIncidents;

        try {
            const stored = localStorage.getItem(INCIDENTS_STORAGE_KEY);
            return stored ? JSON.parse(stored) : initialIncidents;
        } catch {
            return initialIncidents;
        }
    });

    const [hideHandled, setHideHandled] = useState(false);

    /* ---------------------
       Effects (CLIENT ONLY)
    --------------------- */

    useEffect(() => {
        try {
            localStorage.setItem(
                INCIDENTS_STORAGE_KEY,
                JSON.stringify(incidents)
            );
        } catch {
            // best effort
        }
    }, [incidents]);

    /* ---------------------
       Derived State
    --------------------- */

    const visibleIncidents = useMemo(() => {
        const base = hideHandled
            ? incidents.filter((i) => i.status !== 'handled')
            : incidents;

        return [...base].sort(
            (a, b) => priorityScore(b) - priorityScore(a)
        );
    }, [hideHandled, incidents]);

    const severitySummary = useMemo(() => {
        return {
            critical: incidents.filter(
                (i) => i.severity === 'critical' && i.status !== 'handled'
            ).length,
            high: incidents.filter(
                (i) => i.severity === 'high' && i.status !== 'handled'
            ).length,
            open: incidents.filter((i) => i.status === 'open').length,
            handled: incidents.filter((i) => i.status === 'handled').length,
        };
    }, [incidents]);

    const isNominal =
        severitySummary.critical === 0 && severitySummary.high === 0;

    /* ---------------------
       Actions
    --------------------- */

    const markHandled = (id: string) => {
        setIncidents((prev) =>
            prev.map((i) =>
                i.id === id ? { ...i, status: 'handled' } : i
            )
        );
    };

    /* ---------------------
       Render
    --------------------- */

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-xl font-semibold">Incidents</h1>

            {isNominal && (
                <div className="rounded border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
                    <div className="text-sm font-semibold text-emerald-300">
                        All systems nominal
                    </div>
                    <div className="text-xs text-emerald-200/70">
                        No critical or high-severity incidents detected.
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between text-sm">
                <div className="flex gap-4">
                    <span>Critical: {severitySummary.critical}</span>
                    <span>High: {severitySummary.high}</span>
                    <span>Open: {severitySummary.open}</span>
                    <span>Handled: {severitySummary.handled}</span>
                </div>

                <label className="flex items-center gap-2 text-xs">
                    <input
                        type="checkbox"
                        checked={hideHandled}
                        onChange={(e) => setHideHandled(e.target.checked)}
                    />
                    Hide handled
                </label>
            </div>

            <div className="divide-y divide-white/5">
                {visibleIncidents.map((i) => (
                    <div key={i.id} className="py-3 flex justify-between">
                        <div>
                            <div className="text-sm font-semibold">
                                <Link
                                    href={`/ceo/incidents/${i.id}`}
                                    className="hover:underline"
                                >
                                    {i.title}
                                </Link>
                            </div>
                            <div className="text-xs text-white/40">
                                {i.appId} · detected by {i.detectedBy}
                            </div>
                        </div>

                        {i.status !== 'handled' && (
                            <button
                                onClick={() => markHandled(i.id)}
                                className="text-xs text-emerald-300 hover:underline"
                            >
                                Mark handled
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}