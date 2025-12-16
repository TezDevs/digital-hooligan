'use client';

import * as React from 'react';
import Link from 'next/link';

type JsonObject = Record<string, unknown>;
type Filter = 'all' | 'open' | 'critical' | 'closed';

type ActionState = {
    id: string;
    acked?: boolean;
    resolved?: boolean;
};

function isObject(v: unknown): v is JsonObject {
    return typeof v === 'object' && v !== null;
}

function asArray(payload: unknown): unknown[] {
    if (Array.isArray(payload)) return payload;
    if (isObject(payload)) {
        if (Array.isArray(payload.items)) return payload.items;
        if (Array.isArray(payload.data)) return payload.data;
        if (Array.isArray(payload.incidents)) return payload.incidents;
    }
    return [];
}

function norm(v: unknown): string {
    return String(v ?? '').trim().toLowerCase();
}

function readFirstString(obj: JsonObject, keys: string[]): string | undefined {
    for (const k of keys) {
        const val = obj[k];
        if (typeof val === 'string') return val;
    }
    return undefined;
}

function readId(inc: unknown): string {
    if (!isObject(inc)) return 'INC-UNKNOWN';
    return readFirstString(inc, ['id', 'key', 'code', 'slug']) ?? 'INC-UNKNOWN';
}

function readTitle(inc: unknown): string {
    if (!isObject(inc)) return 'Incident';
    return readFirstString(inc, ['title', 'name', 'summary']) ?? 'Incident';
}

function readDetectedBy(inc: unknown): string {
    if (!isObject(inc)) return 'unknown';
    return readFirstString(inc, ['detectedBy', 'detector', 'source']) ?? 'unknown';
}

function readStatus(inc: unknown): string {
    if (!isObject(inc)) return 'unknown';
    return readFirstString(inc, ['status', 'state']) ?? 'unknown';
}

function readSeverity(inc: unknown): string {
    if (!isObject(inc)) return 'unknown';
    return readFirstString(inc, ['severity', 'sev', 'priority']) ?? 'unknown';
}

function isOpenIncident(inc: unknown): boolean {
    const s = norm(readStatus(inc));
    return !['closed', 'resolved', 'done'].includes(s);
}

function isCriticalIncident(inc: unknown): boolean {
    const sev = norm(readSeverity(inc));
    return ['critical', 'sev1', 'sev-1', 'p0', 'p1'].includes(sev);
}

function readStarted(inc: unknown): string {
    if (!isObject(inc)) return '—';
    return readFirstString(inc, ['startedAt', 'startTime', 'createdAt', 'created']) ?? '—';
}

function readLastUpdate(inc: unknown): string {
    if (!isObject(inc)) return '—';
    return readFirstString(inc, ['updatedAt', 'lastUpdate', 'lastUpdated', 'modifiedAt']) ?? '—';
}

function readSummary(inc: unknown): string {
    if (!isObject(inc)) return '—';
    return readFirstString(inc, ['summary', 'description', 'details']) ?? '—';
}

function matchesQuery(inc: unknown, q: string): boolean {
    if (!q) return true;
    const hay = [readId(inc), readTitle(inc), readDetectedBy(inc), readStatus(inc), readSeverity(inc), readSummary(inc)]
        .join(' ')
        .toLowerCase();
    return hay.includes(q);
}

function pillBase(active: boolean) {
    const base = 'rounded-full border px-3 py-1 text-xs font-semibold tracking-wide';
    return active
        ? `${base} border-white/20 bg-white/10 text-white`
        : `${base} border-white/10 bg-white/5 text-white/70 hover:bg-white/10`;
}

function formatTs(ts?: number) {
    if (!ts) return '—';
    try {
        return new Date(ts).toLocaleString();
    } catch {
        return '—';
    }
}

export default function Page() {
    const [items, setItems] = React.useState<unknown[]>([]);
    const [filter, setFilter] = React.useState<Filter>('all');
    const [q, setQ] = React.useState('');
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [lastRefreshed, setLastRefreshed] = React.useState<number | undefined>(undefined);
    const [error, setError] = React.useState<string | null>(null);

    const [actionStates, setActionStates] = React.useState<Record<string, ActionState>>({});

    const fetchIncidents = React.useCallback(async () => {
        setIsRefreshing(true);
        setError(null);
        try {
            const res = await fetch('/api/incidents', { cache: 'no-store' });
            if (!res.ok) throw new Error('Bad response from /api/incidents');
            const json: unknown = await res.json();
            setItems(asArray(json));
            setLastRefreshed(Date.now());
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Unknown error');
            setItems([]);
            setLastRefreshed(Date.now());
        } finally {
            setIsRefreshing(false);
        }
    }, []);

    React.useEffect(() => {
        fetchIncidents();
    }, [fetchIncidents]);

    const open = React.useMemo(() => items.filter(isOpenIncident), [items]);
    const criticalOpen = React.useMemo(() => open.filter(isCriticalIncident), [open]);
    const closed = React.useMemo(() => items.filter((x) => !isOpenIncident(x)), [items]);

    const filtered = React.useMemo(() => {
        const qq = norm(q);
        const base =
            filter === 'all' ? items : filter === 'open' ? open : filter === 'critical' ? criticalOpen : closed;
        return base.filter((inc) => matchesQuery(inc, qq));
    }, [items, open, criticalOpen, closed, filter, q]);

    // Bulk ids string (stable dependency)
    const bulkIds = React.useMemo(() => {
        const ids = filtered.map(readId).filter(Boolean);
        return ids.join(',');
    }, [filtered]);

    // Bulk fetch action state for visible rows
    React.useEffect(() => {
        if (!bulkIds) return;

        fetch(`/api/incidents/actions?ids=${encodeURIComponent(bulkIds)}`, { cache: 'no-store' })
            .then((r) => (r.ok ? r.json() : null))
            .then((json) => {
                const states = (json?.states ?? {}) as Record<string, ActionState>;
                setActionStates(states);
            })
            .catch(() => {
                // ignore; chips just won't show
            });
    }, [bulkIds]);

    return (
        <div className="p-6">
            <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                    <div className="text-xs text-white/60">
                        <Link href="/ceo" className="hover:underline">
                            CEO
                        </Link>{' '}
                        <span className="mx-1">/</span>
                        <span className="text-white/80">Incidents</span>
                    </div>

                    <h1 className="mt-2 text-2xl font-semibold text-white">Incidents</h1>
                    <p className="mt-1 text-sm text-white/60">
                        Triage view from <code className="text-white/80">/api/incidents</code>.
                    </p>

                    <div className="mt-2 text-xs text-white/50">Last refreshed: {formatTs(lastRefreshed)}</div>
                </div>

                <div className="flex gap-2">
                    <Link
                        href="/ceo/health"
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
                    >
                        View health
                    </Link>

                    <button
                        type="button"
                        onClick={fetchIncidents}
                        disabled={isRefreshing}
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85 hover:bg-white/10 disabled:opacity-60"
                    >
                        {isRefreshing ? 'Refreshing…' : 'Refresh'}
                    </button>
                </div>
            </div>

            {/* Controls */}
            <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap gap-2">
                    <button className={pillBase(filter === 'all')} onClick={() => setFilter('all')}>
                        All ({items.length})
                    </button>
                    <button className={pillBase(filter === 'open')} onClick={() => setFilter('open')}>
                        Open ({open.length})
                    </button>
                    <button className={pillBase(filter === 'critical')} onClick={() => setFilter('critical')}>
                        Critical ({criticalOpen.length})
                    </button>
                    <button className={pillBase(filter === 'closed')} onClick={() => setFilter('closed')}>
                        Closed ({closed.length})
                    </button>
                </div>

                <div className="flex w-full gap-2 md:w-[420px]">
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search id, title, detector, status…"
                        className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/85 placeholder:text-white/40"
                    />
                    <button
                        type="button"
                        onClick={() => setQ('')}
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
                    >
                        Clear
                    </button>
                </div>
            </div>

            {error && (
                <div className="mb-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-100">
                    {error}
                </div>
            )}

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm text-white/85">
                        <thead className="border-b border-white/10 bg-black/20 text-xs text-white/60">
                            <tr>
                                <th className="px-4 py-3 font-medium">Incident</th>
                                <th className="px-4 py-3 font-medium">Started</th>
                                <th className="px-4 py-3 font-medium">Last update</th>
                                <th className="px-4 py-3 font-medium">Summary</th>
                                <th className="px-4 py-3 font-medium">Links</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td className="px-4 py-6 text-sm text-white/60" colSpan={5}>
                                        No results.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((incident) => {
                                    const id = readId(incident);
                                    const title = readTitle(incident);
                                    const detectedBy = readDetectedBy(incident);
                                    const status = readStatus(incident);
                                    const sev = readSeverity(incident);
                                    const started = readStarted(incident);
                                    const updated = readLastUpdate(incident);
                                    const summary = readSummary(incident);

                                    const openNow = isOpenIncident(incident);
                                    const criticalNow = openNow && isCriticalIncident(incident);

                                    const a = actionStates[id];

                                    return (
                                        <tr key={id} className="border-t border-slate-900/60 hover:bg-slate-900/40">
                                            <td className="px-4 py-3 align-top">
                                                <div className="flex flex-col gap-1">
                                                    <span className="font-mono text-[11px] text-slate-400">{id}</span>

                                                    <Link href={`/ceo/incidents/${id}`} className="hover:underline">
                                                        {title}
                                                    </Link>

                                                    <span className="text-[11px] text-slate-500">
                                                        Detected by {detectedBy.replace('-', ' ')}
                                                    </span>

                                                    <span className="text-[11px] text-white/60">
                                                        status: <span className="text-white/80">{status}</span> · severity:{' '}
                                                        <span className="text-white/80">{sev}</span>
                                                    </span>

                                                    <div className="mt-1 flex flex-wrap gap-2">
                                                        {criticalNow ? (
                                                            <span className="w-fit rounded-full border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 text-[11px] font-semibold text-rose-100">
                                                                critical
                                                            </span>
                                                        ) : openNow ? (
                                                            <span className="w-fit rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[11px] font-semibold text-amber-100">
                                                                open
                                                            </span>
                                                        ) : (
                                                            <span className="w-fit rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-semibold text-white/60">
                                                                closed
                                                            </span>
                                                        )}

                                                        {a?.acked && (
                                                            <span className="w-fit rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-semibold text-white/70">
                                                                acked
                                                            </span>
                                                        )}

                                                        {a?.resolved && (
                                                            <span className="w-fit rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-100">
                                                                resolved
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-4 py-3 align-top text-white/70">{started}</td>
                                            <td className="px-4 py-3 align-top text-white/70">{updated}</td>

                                            <td className="px-4 py-3 align-top text-white/70">
                                                <div className="max-w-[520px]">{summary}</div>
                                            </td>

                                            <td className="px-4 py-3 align-top">
                                                <div className="flex flex-col gap-2">
                                                    <Link href={`/ceo/incidents/${id}`} className="text-sm text-white/80 hover:underline">
                                                        View
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}