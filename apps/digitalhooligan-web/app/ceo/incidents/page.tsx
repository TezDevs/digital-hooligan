'use client';

import * as React from 'react';
import Link from 'next/link';
import {
    readIncidentActions,
    subscribeIncidentActions,
    type IncidentActionState,
} from '@/lib/ceo/incidentActions';

type Incident = {
    id: string;
    appId?: string;
    appName?: string;
    title?: string;
    description?: string;
    severity?: string;
    status?: string;
    startedAt?: string;
    updatedAt?: string;
    detectedBy?: string;
    impactSummary?: string;
    customerImpact?: string;
};

type IncidentsApi = {
    incidents?: unknown;
    items?: unknown;
    data?: unknown;
};

function isObj(v: unknown): v is Record<string, unknown> {
    return typeof v === 'object' && v !== null;
}

function asArray(payload: unknown): Incident[] {
    if (Array.isArray(payload)) return payload as Incident[];
    if (!isObj(payload)) return [];
    const maybe = (payload as IncidentsApi).incidents ?? (payload as IncidentsApi).items ?? (payload as IncidentsApi).data;
    if (Array.isArray(maybe)) return maybe as Incident[];
    return [];
}

function norm(v: unknown): string {
    return String(v ?? '').trim().toLowerCase();
}

function isOpenStatus(s: string): boolean {
    // treat anything not explicitly closed/resolved/done as open-ish
    return !['closed', 'resolved', 'done'].includes(norm(s));
}

function severityChip(sevRaw?: string) {
    const sev = norm(sevRaw);
    const base = 'inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold';
    if (['critical', 'sev0', 'sev-0', 'p0'].includes(sev)) return `${base} border-rose-500/30 bg-rose-500/10 text-rose-200`;
    if (['high', 'sev1', 'sev-1', 'p1'].includes(sev)) return `${base} border-amber-500/30 bg-amber-500/10 text-amber-200`;
    if (['medium', 'sev2', 'sev-2', 'p2'].includes(sev)) return `${base} border-sky-500/30 bg-sky-500/10 text-sky-200`;
    return `${base} border-white/10 bg-white/5 text-white/70`;
}

function statusChip(statusRaw?: string) {
    const st = norm(statusRaw);
    const base = 'inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium';
    if (st === 'investigating') return `${base} border-amber-500/20 bg-amber-500/10 text-amber-200`;
    if (st === 'open') return `${base} border-white/10 bg-white/5 text-white/70`;
    if (st === 'mitigated') return `${base} border-sky-500/20 bg-sky-500/10 text-sky-200`;
    if (st === 'resolved' || st === 'closed' || st === 'done') return `${base} border-emerald-500/20 bg-emerald-500/10 text-emerald-200`;
    return `${base} border-white/10 bg-white/5 text-white/70`;
}

function actionChip() {
    return 'inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-white/70';
}

function fmtTime(ts?: string) {
    if (!ts) return '—';
    const d = new Date(ts);
    if (Number.isNaN(d.getTime())) return '—';
    return d.toLocaleString();
}

function isHandled(action: IncidentActionState | null) {
    return Boolean(action?.acked || action?.resolved);
}

export default function CeoIncidentsPage() {
    const [incidents, setIncidents] = React.useState<Incident[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [err, setErr] = React.useState<string | null>(null);

    const [hideHandled, setHideHandled] = React.useState(false);
    const [actions, setActions] = React.useState<Record<string, IncidentActionState>>({});

    // load incidents
    const fetchIncidents = React.useCallback(async () => {
        setLoading(true);
        setErr(null);
        try {
            const res = await fetch('/api/incidents', { cache: 'no-store' });
            if (!res.ok) throw new Error(`Bad response from /api/incidents: ${res.status}`);
            const json: unknown = await res.json();
            const list = asArray(json);
            setIncidents(list);
        } catch (e) {
            setIncidents([]);
            setErr(e instanceof Error ? e.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    }, []);

    React.useEffect(() => {
        fetchIncidents();
    }, [fetchIncidents]);

    // bulk load actions + subscribe to changes
    React.useEffect(() => {
        const refresh = () => setActions(readIncidentActions());
        refresh();
        return subscribeIncidentActions(refresh);
    }, []);

    const derived = React.useMemo(() => {
        const all = incidents.map((i) => {
            const action = actions[i.id] ?? null;
            return { incident: i, action };
        });

        const visible = hideHandled ? all.filter(({ action }) => !isHandled(action)) : all;

        const openCount = incidents.filter((i) => isOpenStatus(i.status ?? '')).length;
        const handledCount = all.filter(({ action }) => isHandled(action)).length;

        return { all, visible, openCount, handledCount };
    }, [incidents, actions, hideHandled]);

    return (
        <div className="mx-auto max-w-6xl px-4 pb-10">
            <div className="mb-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <h1 className="text-3xl font-semibold text-white/90">Incidents</h1>
                        <p className="mt-2 text-sm text-white/60">
                            Triage view backed by <code className="text-white/75">/api/incidents</code> + local action memory.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/75">
                            <input
                                type="checkbox"
                                checked={hideHandled}
                                onChange={(e) => setHideHandled(e.target.checked)}
                                className="h-4 w-4 accent-white/80"
                            />
                            Hide handled
                        </label>

                        <button
                            type="button"
                            onClick={fetchIncidents}
                            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
                        >
                            Refresh
                        </button>
                    </div>
                </div>

                <div className="mt-3 text-xs text-white/55">
                    {loading ? (
                        'Loading…'
                    ) : (
                        <>
                            Total: {incidents.length} · Open-ish: {derived.openCount} · Handled: {derived.handledCount} · Showing:{' '}
                            {derived.visible.length}
                        </>
                    )}
                </div>

                {err && <div className="mt-2 text-sm text-rose-200/90">{err}</div>}
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-black/20">
                            <tr className="text-xs text-white/60">
                                <th className="px-4 py-3 font-medium">Incident</th>
                                <th className="px-4 py-3 font-medium">Severity</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                                <th className="px-4 py-3 font-medium">Triage</th>
                                <th className="px-4 py-3 font-medium">Last update</th>
                            </tr>
                        </thead>

                        <tbody className="text-sm text-white/80">
                            {!loading && derived.visible.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-6 text-center text-sm text-white/55">
                                        No incidents to show.
                                    </td>
                                </tr>
                            )}

                            {derived.visible.map(({ incident, action }) => {
                                const title = incident.title ?? '(untitled)';
                                const sev = incident.severity ?? '—';
                                const st = incident.status ?? '—';
                                const appName = incident.appName ?? incident.appId ?? '';
                                const handled = isHandled(action);

                                return (
                                    <tr key={incident.id} className="border-t border-white/10 hover:bg-white/5">
                                        <td className="px-4 py-3 align-top">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-mono text-[11px] text-white/50">{incident.id}</span>

                                                {/* NOTE: This is the correct link shape for Next app router */}
                                                <Link href={`/ceo/incidents/${incident.id}`} className="hover:underline">
                                                    {title}
                                                </Link>

                                                <div className="text-[11px] text-white/50">
                                                    {appName ? `${appName} · ` : ''}
                                                    Detected by {String(incident.detectedBy ?? '—').replace('-', ' ')}
                                                </div>

                                                {handled && (
                                                    <div className="mt-1 text-[11px] text-white/45">
                                                        Handled locally · updated {fmtTime(action?.updatedAt)}
                                                    </div>
                                                )}
                                            </div>
                                        </td>

                                        <td className="px-4 py-3 align-top">
                                            <span className={severityChip(sev)}>{String(sev).toUpperCase()}</span>
                                        </td>

                                        <td className="px-4 py-3 align-top">
                                            <span className={statusChip(st)}>{String(st).toLowerCase()}</span>
                                        </td>

                                        <td className="px-4 py-3 align-top">
                                            <div className="flex flex-wrap gap-2">
                                                {action?.acked && <span className={actionChip()}>Acked</span>}
                                                {action?.resolved && <span className={actionChip()}>Resolved</span>}
                                                {!action?.acked && !action?.resolved && <span className="text-xs text-white/40">—</span>}
                                            </div>
                                        </td>

                                        <td className="px-4 py-3 align-top text-xs text-white/55">{fmtTime(incident.updatedAt ?? incident.startedAt)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-6">
                <Link
                    href="/ceo"
                    className="inline-flex rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
                >
                    Back to CEO
                </Link>
            </div>
        </div>
    );
}