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
    resolved?: boolean;
    updatedAt?: string;
}

/* ======================
   Storage
====================== */

const INCIDENTS_STORAGE_KEY = 'ceo.incidents.v1';

/* ======================
   Seed Data
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
   Helpers (HOISTED)
====================== */

function minutesSince(iso?: string) {
    if (!iso) return 0;
    return Math.floor(
        (Date.now() - new Date(iso).getTime()) / 60000
    );
}

function fmtAge(iso?: string) {
    const m = minutesSince(iso);
    if (m < 60) return `${m}m`;
    if (m < 1440) return `${Math.floor(m / 60)}h`;
    return `${Math.floor(m / 1440)}d`;
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

function slaColor(iso?: string) {
    const m = minutesSince(iso);
    if (m >= 60) return 'text-red-400';
    if (m >= 15) return 'text-yellow-400';
    return 'text-white/45';
}

/* ======================
   Page
====================== */

export default function IncidentsPage() {
    const [incidents, setIncidents] = useState<Incident[]>(() => {
        if (typeof window === 'undefined') return initialIncidents;
        try {
            const raw = localStorage.getItem(INCIDENTS_STORAGE_KEY);
            return raw ? JSON.parse(raw) : initialIncidents;
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
            /* best-effort */
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

    const visibleIncidents = useMemo(() => {
        return [...baseVisibleIncidents].sort(
            (a, b) => priorityScore(b) - priorityScore(a)
        );
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
                    ? {
                        ...i,
                        status: 'handled',
                        updatedAt: new Date().toISOString(),
                    }
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

            {/* Nominal Banner */}
            {isNominal && (
                <div className="mb-4 rounded border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
                    <div className="text-sm font-medium text-emerald-300">
                        🟢 All systems nominal
                    </div>
                    <div className="text-xs text-emerald-400/80">
                        No critical or high-severity incidents detected.
                    </div>
                </div>
            )}

            {/* ✅ Severity Summary — OUTSIDE TABLE */}
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                    ['Critical', severitySummary.critical],
                    ['High', severitySummary.high],
                    ['Open', severitySummary.open],
                    ['Handled', severitySummary.handled],
                ].map(([label, value]) => (
                    <div
                        key={label}
                        className="rounded border border-white/10 bg-white/5 px-3 py-2"
                    >
                        <div className="text-xs text-white/60">{label}</div>
                        <div className="text-lg font-semibold">{value}</div>
                    </div>
                ))}
            </div>

            {/* Table */}
            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="border-b border-white/10 text-left text-xs text-white/60">
                        <th className="px-4 py-2">Incident</th>
                        <th className="px-4 py-2">Severity</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Actions</th>
                        <th className="px-4 py-2">Updated</th>
                    </tr>
                </thead>

                <tbody>
                    {visibleIncidents.map((incident) => {
                        const action = actions[incident.id];
                        return (
                            <tr
                                key={incident.id}
                                className="border-t border-white/10"
                            >
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
                                            {incident.status} ·{' '}
                                            {fmtAge(incident.updatedAt)}
                                        </div>

                                        <div className="text-[11px] text-white/40">
                                            {incident.appId} · detected by{' '}
                                            {incident.detectedBy ?? 'unknown'}
                                        </div>
                                    </div>
                                </td>

                                <td className="px-4 py-3 align-top">
                                    {incident.severity.toUpperCase()}
                                </td>

                                <td className="px-4 py-3 align-top">
                                    {incident.status}
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
                                        <span className="text-xs text-white/60">
                                            Resolved
                                        </span>
                                    )}
                                </td>

                                <td className="px-4 py-3 align-top text-xs text-white/55">
                                    {incident.updatedAt
                                        ? new Date(
                                            incident.updatedAt
                                        ).toLocaleString()
                                        : '—'}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}