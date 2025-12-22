'use client';

import { useMemo, useState } from 'react';
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
   Mock data (existing pattern)
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
        default:
            return '';
    }

};

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

const statusChip = (st: IncidentStatus) => {
    switch (st) {
        case 'open':
            return 'bg-red-500/15 text-red-300';
        case 'investigating':
            return 'bg-yellow-500/15 text-yellow-300';
        case 'handled':
            return 'bg-emerald-500/15 text-emerald-300';
        default:
            return '';
    }
};

const actionChip = () =>
    'rounded px-2 py-0.5 text-xs bg-white/10 text-white/70';

/* ======================
   Page
====================== */

export default function IncidentsPage() {
    const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
    const [actions, setActions] = useState<Record<string, IncidentAction>>(initialActions);
    const [hideHandled, setHideHandled] = useState(false);

    /* ===== Derived state ===== */

    const activeIncidents = useMemo(
        () => incidents.filter((i) => i.status !== 'handled'),
        [incidents]
    );


    const visibleIncidents = useMemo(
        () => (hideHandled ? activeIncidents : incidents),
        [hideHandled, activeIncidents, incidents]
    );
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
            [id]: { ...prev[id], resolved: true, updatedAt: new Date().toISOString() },
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

            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="border-b border-white/10 text-left text-xs text-white/50">
                        <th className="px-4 py-2">Incident</th>
                        <th className="px-4 py-2">Severity</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Actions</th>
                        <th className="px-4 py-2">Updated</th>
                    </tr>
                </thead>
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
                    <div className="rounded border border-red-500/20 bg-red-500/10 px-3 py-2">
                        <div className="text-xs text-red-300">Critical</div>
                        <div className="text-lg font-semibold text-red-200">
                            {severitySummary.critical}
                        </div>
                    </div>

                    <div className="rounded border border-orange-500/20 bg-orange-500/10 px-3 py-2">
                        <div className="text-xs text-orange-300">High</div>
                        <div className="text-lg font-semibold text-orange-200">
                            {severitySummary.high}
                        </div>
                    </div>

                    <div className="rounded border border-yellow-500/20 bg-yellow-500/10 px-3 py-2">
                        <div className="text-xs text-yellow-300">Open</div>
                        <div className="text-lg font-semibold text-yellow-200">
                            {severitySummary.open}
                        </div>
                    </div>

                    <div className="rounded border border-emerald-500/20 bg-emerald-500/10 px-3 py-2">
                        <div className="text-xs text-emerald-300">Handled</div>
                        <div className="text-lg font-semibold text-emerald-200">
                            {severitySummary.handled}
                        </div>
                    </div>
                </div>
                <tbody>
                    {visibleIncidents.map((incident) => {
                        const action = actions[incident.id];
                        const title = incident.title ?? '(untitled)';
                        const sev = incident.severity;
                        const st = incident.status;
                        const appName = incident.appId ?? '';
                        const handled = incident.status === 'handled';

                        return (
                            <tr
                                key={incident.id}
                                className="border-t border-white/10 hover:bg-white/5"
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
                                            {title}
                                        </Link>

                                        <div className="text-[11px] text-white/45">
                                            {incident.status === 'handled'
                                                ? `handled · ${fmtAge(incident.updatedAt)} ago`
                                                : `${incident.status} · ${fmtAge(incident.updatedAt)}`}
                                        </div>

                                        <div className="text-[11px] text-white/50">
                                            {appName && <span>{appName} · </span>}
                                            Detected by {incident.detectedBy ?? 'unknown'}
                                        </div>

                                        {handled && action?.updatedAt && (
                                            <div className="mt-1 text-[11px] text-white/45">
                                                Handled locally · updated {fmtTime(action.updatedAt)}
                                            </div>
                                        )}
                                    </div>
                                </td>

                                <td className="px-4 py-3 align-top">
                                    <span className={`rounded px-2 py-0.5 ${severityChip(sev)}`}>
                                        {sev.toUpperCase()}
                                    </span>
                                </td>

                                <td className="px-4 py-3 align-top">
                                    <span className={`rounded px-2 py-0.5 ${statusChip(st)}`}>
                                        {st}
                                    </span>
                                </td>

                                <td className="px-4 py-3 align-top">
                                    <div className="flex flex-wrap gap-2">
                                        {action?.acked && (
                                            <span className={actionChip()}>Acked</span>
                                        )}
                                        {action?.resolved && (
                                            <span className={actionChip()}>Resolved</span>
                                        )}
                                        {!handled && (
                                            <button
                                                onClick={() => markHandled(incident.id)}
                                                className="text-xs text-emerald-400 hover:text-emerald-300"
                                            >
                                                Mark handled
                                            </button>
                                        )}
                                    </div>
                                </td>

                                <td className="px-4 py-3 align-top text-xs text-white/55">
                                    {fmtTime(incident.updatedAt)}
                                </td>
                            </tr>
                        );
                    })}

                    {visibleIncidents.length === 0 && (
                        <tr>
                            <td
                                colSpan={5}
                                className="px-4 py-6 text-center text-sm text-white/40"
                            >
                                No incidents to display
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}