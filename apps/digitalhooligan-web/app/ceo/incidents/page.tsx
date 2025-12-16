'use client';

import * as React from 'react';
import Link from 'next/link';
import {
    readIncidentActions,
    setIncidentAction,
    clearIncidentAction,
    subscribeIncidentActions,
    type IncidentActionState,
} from '@/lib/incidentActions';

type Incident = {
    id: string;
    appId?: string;
    appName?: string;
    title: string;
    description?: string;
    severity?: string;
    status?: string;
    startedAt?: string;
    updatedAt?: string;
    detectedBy?: string;
    impactSummary?: string;
};

type IncidentsApi = { incidents: Incident[] };

function norm(v: unknown) {
    return String(v ?? '').trim().toLowerCase();
}

function statusIsOpen(status?: string) {
    const s = norm(status);
    return !['closed', 'resolved', 'done'].includes(s);
}

function sevTone(sev?: string) {
    const s = norm(sev);
    if (['critical', 'sev1', 'sev-1', 'p0', 'p1'].includes(s)) return 'border-rose-500/30 bg-rose-500/10 text-rose-100';
    if (['high', 'sev2', 'p2'].includes(s)) return 'border-amber-500/30 bg-amber-500/10 text-amber-100';
    if (['medium', 'sev3', 'p3'].includes(s)) return 'border-sky-500/30 bg-sky-500/10 text-sky-100';
    return 'border-white/10 bg-white/5 text-white/70';
}

function fmtTime(iso?: string) {
    if (!iso) return '—';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '—';
    return d.toLocaleString();
}

function Chip({ children, tone }: { children: React.ReactNode; tone: string }) {
    return (
        <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${tone}`}>
            {children}
        </span>
    );
}

function Toggle({
    checked,
    onChange,
    label,
}: {
    checked: boolean;
    onChange: (v: boolean) => void;
    label: string;
}) {
    return (
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85 hover:bg-white/10"
            aria-pressed={checked}
        >
            <span className={`h-2.5 w-2.5 rounded-full ${checked ? 'bg-emerald-400' : 'bg-white/20'}`} />
            {label}
        </button>
    );
}

export default function CeoIncidentsPage() {
    const [items, setItems] = React.useState<Incident[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [err, setErr] = React.useState<string | null>(null);

    const [actionsById, setActionsById] = React.useState<Record<string, IncidentActionState>>({});
    const [showHandled, setShowHandled] = React.useState(false);

    const refreshActions = React.useCallback(() => {
        setActionsById(readIncidentActions());
    }, []);

    const load = React.useCallback(async () => {
        setLoading(true);
        setErr(null);
        try {
            const res = await fetch('/api/incidents', { cache: 'no-store' });
            if (!res.ok) throw new Error(`Bad response: ${res.status}`);
            const json = (await res.json()) as IncidentsApi;
            setItems(Array.isArray(json.incidents) ? json.incidents : []);
        } catch (e) {
            setErr(e instanceof Error ? e.message : 'Unknown error');
            setItems([]);
        } finally {
            setLoading(false);
        }
    }, []);

    React.useEffect(() => {
        refreshActions();
        const unsub = subscribeIncidentActions(() => refreshActions());
        load();
        return unsub;
    }, [load, refreshActions]);

    const isHandled = React.useCallback(
        (id: string) => {
            const a = actionsById[id];
            return Boolean(a?.acked) || Boolean(a?.resolved);
        },
        [actionsById]
    );

    const derived = React.useMemo(() => {
        const openCount = items.filter((i) => statusIsOpen(i.status)).length;

        const handledCount = items.filter((i) => isHandled(i.id)).length;
        const unhandledCount = items.length - handledCount;

        const visible = showHandled ? items : items.filter((i) => !isHandled(i.id));

        return { openCount, handledCount, unhandledCount, visible };
    }, [items, isHandled, showHandled]);

    function onToggleAck(id: string) {
        const current = actionsById[id];
        const acked = Boolean(current?.acked);
        setIncidentAction(id, { acked: !acked });
        refreshActions(); // <- make the list re-filter immediately
    }

    function onToggleResolve(id: string) {
        const current = actionsById[id];
        const resolved = Boolean(current?.resolved);
        setIncidentAction(id, { resolved: !resolved });
        refreshActions(); // <- make the list re-filter immediately
    }

    function onClear(id: string) {
        clearIncidentAction(id);
        refreshActions(); // <- make the list re-filter immediately
    }

    return (
        <div className="mx-auto max-w-6xl px-4 py-8">
            <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold text-white/90">Incidents</h1>
                    <p className="mt-1 text-sm text-white/60">
                        {loading
                            ? 'Loading…'
                            : `${items.length} total · ${derived.openCount} open · ${derived.unhandledCount} unhandled · ${derived.handledCount} handled`}
                    </p>
                    {err && <p className="mt-2 text-sm text-rose-200/90">{err}</p>}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Toggle
                        checked={showHandled}
                        onChange={setShowHandled}
                        label={showHandled ? 'Showing handled' : 'Hiding handled'}
                    />
                    <button
                        type="button"
                        onClick={load}
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85 hover:bg-white/10"
                    >
                        Refresh
                    </button>
                </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-white/10 bg-white/5">
                        <tr className="text-white/70">
                            <th className="px-4 py-3 font-medium">Incident</th>
                            <th className="px-4 py-3 font-medium">App</th>
                            <th className="px-4 py-3 font-medium">Severity</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                            <th className="px-4 py-3 font-medium">Last update</th>
                            <th className="px-4 py-3 font-medium">Triage</th>
                        </tr>
                    </thead>

                    <tbody>
                        {derived.visible.map((incident) => {
                            const a = actionsById[incident.id] ?? {};
                            const acked = Boolean(a.acked);
                            const resolved = Boolean(a.resolved);

                            return (
                                <tr key={incident.id} className="border-b border-white/10 last:border-b-0 hover:bg-white/[0.04]">
                                    <td className="px-4 py-3 align-top">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-mono text-[11px] text-white/50">{incident.id}</span>
                                            <Link href={`/ceo/incidents/${incident.id}`} className="text-white/85 hover:underline">
                                                {incident.title}
                                            </Link>
                                            {incident.detectedBy && (
                                                <span className="text-[11px] text-white/50">
                                                    Detected by {incident.detectedBy.replace('-', ' ')}
                                                </span>
                                            )}
                                        </div>
                                    </td>

                                    <td className="px-4 py-3 align-top text-white/70">
                                        {incident.appName ?? incident.appId ?? '—'}
                                    </td>

                                    <td className="px-4 py-3 align-top">
                                        <Chip tone={sevTone(incident.severity)}>{(incident.severity ?? 'unknown').toUpperCase()}</Chip>
                                    </td>

                                    <td className="px-4 py-3 align-top text-white/70">
                                        {incident.status ?? '—'}
                                        {statusIsOpen(incident.status) ? (
                                            <span className="ml-2 text-[11px] text-amber-200/80">open</span>
                                        ) : (
                                            <span className="ml-2 text-[11px] text-emerald-200/80">closed</span>
                                        )}
                                    </td>

                                    <td className="px-4 py-3 align-top text-white/60">
                                        {fmtTime(incident.updatedAt ?? incident.startedAt)}
                                    </td>

                                    <td className="px-4 py-3 align-top">
                                        <div className="flex flex-wrap items-center gap-2">
                                            {acked && <Chip tone="border-sky-500/30 bg-sky-500/10 text-sky-100">ACKED</Chip>}
                                            {resolved && <Chip tone="border-emerald-500/30 bg-emerald-500/10 text-emerald-100">RESOLVED</Chip>}

                                            <button
                                                type="button"
                                                onClick={() => onToggleAck(incident.id)}
                                                className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/80 hover:bg-white/10"
                                            >
                                                {acked ? 'Unack' : 'Ack'}
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => onToggleResolve(incident.id)}
                                                className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/80 hover:bg-white/10"
                                            >
                                                {resolved ? 'Unresolve' : 'Resolve'}
                                            </button>

                                            {(acked || resolved) && (
                                                <button
                                                    type="button"
                                                    onClick={() => onClear(incident.id)}
                                                    className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/60 hover:bg-white/10"
                                                >
                                                    Clear
                                                </button>
                                            )}
                                        </div>

                                        {(acked || resolved) && a.updatedAt && (
                                            <div className="mt-2 text-[11px] text-white/45">
                                                Updated: {fmtTime(a.updatedAt)}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}

                        {!loading && derived.visible.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-4 py-10 text-center text-sm text-white/60">
                                    {showHandled ? 'No incidents.' : 'No unhandled incidents.'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}