'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

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
    appId?: string;
    detectedBy?: string;
    updatedAt?: string;
}

interface IncidentAction {
    acked?: boolean;
    resolved?: boolean;
    updatedAt?: string;
}

/* ======================
   Constants / Storage
====================== */

const INCIDENTS_STORAGE_KEY = 'ceo.incidents.v1';

/* ======================
   Mock Data
====================== */

const initialIncidents: Incident[] = [
    {
        id: 'INC-DROP-001',
        title: 'DropSignal checkout latency',
        severity: 'high',
        status: 'open',
        appId: 'dropsignal',
        detectedBy: 'synthetics',
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'INC-PENNY-002',
        title: 'PennyWize webhook delays',
        severity: 'medium',
        status: 'investigating',
        appId: 'pennywize',
        detectedBy: 'alerts',
        updatedAt: new Date().toISOString(),
    },
];

const initialActions: Record<string, IncidentAction> = {};

/* ======================
   Helpers
====================== */

const fmtTime = (iso?: string) =>
    iso ? new Date(iso).toLocaleString() : '—';

const fmtAge = (iso?: string) => {
    if (!iso) return '—';
    const deltaMs = Date.now() - new Date(iso).getTime();
    const minutes = Math.floor(deltaMs / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
};

const slaColor = (iso?: string) => {
    if (!iso) return 'text-white/45';
    const minutes = (Date.now() - new Date(iso).getTime()) / 60000;
    if (minutes >= 60) return 'text-red-400';
    if (minutes >= 15) return 'text-yellow-400';
    return 'text-white/45';
};

const priorityScore = (incident: Incident) => {
    let score = 0;

    switch (incident.severity) {
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

    if (incident.updatedAt) {
        const minutes =
            (Date.now() - new Date(incident.updatedAt).getTime()) / 60000;
        score += Math.min(Math.floor(minutes), 120);
    }

    if (incident.status === 'handled') score = 0;
    return score;
};

const severityChip = (sev: Severity) => {
    switch (sev) {
        case 'critical':
            return 'bg-red-500/20 text-red-300';
        case 'high':
            return 'bg-orange-500/20 text-orange-300';
        case 'medium':
            return 'bg-yellow-500/20 text-yellow-300';
        case 'low':
            return 'bg-emerald-500/20 text-emerald-300';
    }
};

const statusChip = (st: IncidentStatus) => {
    switch (st) {
        case 'open':
            return 'bg-red-500/15 text-red-300';
        case 'investigating':
            return 'bg-yellow-500/15 text-yellow-300';
        case 'handled':
            return 'bg-emerald-500/15 text-emerald-300';
    }
};

const actionChip = () =>
    'rounded px-2 py-0.5 text-xs bg-white/10 text-white/70';

/* ======================
   Page
====================== */

export default function IncidentsPage() {
    const [incidents, setIncidents] = useState<Incident[]>(() => {
        if (typeof window === 'undefined') return initialIncidents;
        try {
            const stored = localStorage.getItem(INCIDENTS_STORAGE_KEY);
            return stored ? JSON.parse(stored) : initialIncidents;
        } catch {
            return initialIncidents;
        }
    });

    const [actions, setActions] =
        useState<Record<string, IncidentAction>>(initialActions);

    const [hideHandled, setHideHandled] = useState(false);

    /* ===== Persistence ===== */

    useEffect(() => {
        try {
            localStorage.setItem(
                INCIDENTS_STORAGE_KEY,
                JSON.stringify(incidents)
            );
        } catch {
            // best-effort persistence
        }
    }, [incidents]);

    /* ===== Derived State ===== */

    const activeIncidents = useMemo(
        () => incidents.filter((i) => i.status !== 'handled'),
        [incidents]
    );

    const baseVisibleIncidents = useMemo(
        () => (hideHandled ? activeIncidents : incidents),
        [hideHandled, activeIncidents, incidents]
    );

    // SSR-safe priority sort
    const visibleIncidents = useMemo(() => {
        return [...baseVisibleIncidents].sort((a, b) => {
            const pa = priorityScore(a);
            const pb = priorityScore(b);
            return pb - pa;
        });
    }, [baseVisibleIncidents]);

    const severitySummary = useMemo(
        () => ({
            critical: incidents.filter(
                (i) => i.severity === 'critical' && i.status !== 'handled'
            ).length,
            high: incidents.filter(
                (i) => i.severity === 'high' && i.status !== 'handled'
            ).length,
            open: incidents.filter((i) => i.status === 'open').length,
            handled: incidents.filter((i) => i.status === 'handled').length,
        }),
        [incidents]
    );

    const isNominal =
        severitySummary.critical === 0 &&
        severitySummary.high === 0;

    /* ===== Actions ===== */

    const markHandled = (id: string) => {
        setIncidents((prev) =>
            prev.map((i) =>
                i.id === id
                    ? { ...i, status: 'handled', updatedAt: new Date().toISOString() }
                    : i
            )
        );

        setActions((prev) => ({
            ...prev,
            [id]: { resolved: true, updatedAt: new Date().toISOString() },
        }));
    };

    /* ======================
       Render
    ====================== */

    return (
        <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-lg font-semibold">Incidents</h1>

                <label className="flex items-center gap-2 text-sm text-white/70">
                    <input
                        type="checkbox"
                        checked={hideHandled}
                        onChange={(e) => setHideHandled(e.target.checked)}
                    />
                    Hide handled
                </label>
            </div>

            {isNominal && (
                <div className="mb-4 rounded border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-emerald-300">
                        <span>🟢</span>
                        <span>All systems nominal</span>
                    </div>
                    <div className="mt-1 text-xs text-emerald-400/80">
                        No critical or high-severity incidents detected.
                    </div>
                </div>
            )}

            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {(['critical', 'high', 'open', 'handled'] as const).map((k) => (
                    <div
                        key={k}
                        className="rounded border border-white/10 bg-white/5 px-3 py-2"
                    >
                        <div className="text-xs capitalize text-white/60">{k}</div>
                        <div className="text-lg font-semibold">
                            {severitySummary[k]}
                        </div>
                    </div>
                ))}
            </div>

            <table className="w-full text-sm">
                <tbody>
                    {visibleIncidents.map((incident) => {
                        const action = actions[incident.id];
                        return (
                            <tr key={incident.id} className="border-t border-white/10">
                                <td className="px-4 py-3 align-top">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-mono text-[11px] text-white/50">
                                            {incident.id}
                                        </span>

                                        <Link
                                            href={`/ceo/incidents/${incident.id}`}
                                            className="hover:underline"
                                        >
                                            {incident.title ?? '(untitled)'}
                                        </Link>

                                        <div
                                            className={`text-[11px] ${slaColor(
                                                incident.updatedAt
                                            )}`}
                                        >
                                            {incident.status} · {fmtAge(incident.updatedAt)}
                                        </div>

                                        <div className="text-[11px] text-white/40">
                                            {incident.appId} · detected by{' '}
                                            {incident.detectedBy ?? 'unknown'}
                                        </div>
                                    </div>
                                </td>

                                <td className="px-4 py-3 align-top">
                                    <span
                                        className={`rounded px-2 py-0.5 ${severityChip(
                                            incident.severity
                                        )}`}
                                    >
                                        {incident.severity.toUpperCase()}
                                    </span>
                                </td>

                                <td className="px-4 py-3 align-top">
                                    <span
                                        className={`rounded px-2 py-0.5 ${statusChip(
                                            incident.status
                                        )}`}
                                    >
                                        {incident.status}
                                    </span>
                                </td>

                                <td className="px-4 py-3 align-top">
                                    {!action?.resolved &&
                                        incident.status !== 'handled' && (
                                            <button
                                                onClick={() => markHandled(incident.id)}
                                                className="text-xs text-emerald-400 hover:text-emerald-300"
                                            >
                                                Mark handled
                                            </button>
                                        )}
                                    {action?.resolved && (
                                        <span className={actionChip()}>Resolved</span>
                                    )}
                                </td>

                                <td className="px-4 py-3 align-top text-xs text-white/55">
                                    {fmtTime(incident.updatedAt)}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}