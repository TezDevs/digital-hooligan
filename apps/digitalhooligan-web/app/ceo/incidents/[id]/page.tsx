'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
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

export default function IncidentDetailPage() {
    const params = useParams();
    const raw = params?.id;
    const id = Array.isArray(raw) ? raw[0] : raw;

    const [incident, setIncident] = React.useState<Incident | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [err, setErr] = React.useState<string | null>(null);

    const [actionsById, setActionsById] = React.useState<Record<string, IncidentActionState>>({});

    const load = React.useCallback(async () => {
        if (!id) return;
        setLoading(true);
        setErr(null);
        try {
            const res = await fetch('/api/incidents', { cache: 'no-store' });
            if (!res.ok) throw new Error(`Bad response: ${res.status}`);
            const json = (await res.json()) as IncidentsApi;
            const found = (Array.isArray(json.incidents) ? json.incidents : []).find((x) => x.id === id) ?? null;
            setIncident(found);
        } catch (e) {
            setErr(e instanceof Error ? e.message : 'Unknown error');
            setIncident(null);
        } finally {
            setLoading(false);
        }
    }, [id]);

    React.useEffect(() => {
        setActionsById(readIncidentActions());
        const unsub = subscribeIncidentActions(() => setActionsById(readIncidentActions()));
        load();
        return unsub;
    }, [load]);

    const action = id ? actionsById[id] ?? {} : {};
    const acked = Boolean(action.acked);
    const resolved = Boolean(action.resolved);

    if (!id) {
        return <div className="mx-auto max-w-4xl px-4 py-8 text-white/80">Missing incident id.</div>;
    }

    return (
        <div className="mx-auto max-w-4xl px-4 py-8">
            <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                    <Link href="/ceo/incidents" className="text-sm text-white/70 hover:underline">
                        ← Back to incidents
                    </Link>
                    <h1 className="mt-2 text-2xl font-semibold text-white/90">Incident detail</h1>
                    <p className="mt-1 font-mono text-xs text-white/50">{id}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {acked && <Chip tone="border-sky-500/30 bg-sky-500/10 text-sky-100">ACKED</Chip>}
                    {resolved && <Chip tone="border-emerald-500/30 bg-emerald-500/10 text-emerald-100">RESOLVED</Chip>}

                    <button
                        type="button"
                        onClick={() => setIncidentAction(id, { acked: !acked })}
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85 hover:bg-white/10"
                    >
                        {acked ? 'Unack' : 'Ack'}
                    </button>

                    <button
                        type="button"
                        onClick={() => setIncidentAction(id, { resolved: !resolved })}
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85 hover:bg-white/10"
                    >
                        {resolved ? 'Unresolve' : 'Resolve'}
                    </button>

                    {(acked || resolved) && (
                        <button
                            type="button"
                            onClick={() => clearIncidentAction(id)}
                            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/60 hover:bg-white/10"
                        >
                            Clear
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={load}
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85 hover:bg-white/10"
                    >
                        Refresh
                    </button>
                </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                {loading ? (
                    <div className="text-sm text-white/70">Loading…</div>
                ) : err ? (
                    <div className="text-sm text-rose-200/90">{err}</div>
                ) : !incident ? (
                    <div className="text-sm text-white/70">Incident not found in feed.</div>
                ) : (
                    <div className="space-y-3">
                        <div>
                            <div className="text-lg font-semibold text-white/90">{incident.title}</div>
                            <div className="mt-1 text-sm text-white/60">
                                {incident.appName ?? incident.appId ?? '—'} · {incident.status ?? '—'} · {incident.severity ?? '—'}
                            </div>
                        </div>

                        {incident.description && <div className="text-sm text-white/75">{incident.description}</div>}

                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                                <div className="text-xs text-white/50">Detected by</div>
                                <div className="mt-1 text-sm text-white/80">{incident.detectedBy ?? '—'}</div>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                                <div className="text-xs text-white/50">Customer impact</div>
                                <div className="mt-1 text-sm text-white/80">{incident.impactSummary ?? '—'}</div>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                                <div className="text-xs text-white/50">Started</div>
                                <div className="mt-1 text-sm text-white/80">{fmtTime(incident.startedAt)}</div>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                                <div className="text-xs text-white/50">Last updated</div>
                                <div className="mt-1 text-sm text-white/80">{fmtTime(incident.updatedAt)}</div>
                            </div>
                        </div>

                        {action.updatedAt && (
                            <div className="text-[11px] text-white/45">Triage updated: {fmtTime(action.updatedAt)}</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}