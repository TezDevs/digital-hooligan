'use client';

import * as React from 'react';
import Link from 'next/link';

type AppHealth = {
    appId?: string;
    name?: string;
    status?: string;
    latencyMs?: number;
    checkedAt?: string;
    message?: string;
};

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
};

type SystemsState = 'green' | 'yellow' | 'red';
type SystemsPayload = {
    ok: true;
    state: SystemsState;
    counts: { down: number; degraded: number; open: number; critical: number };
    reasons: {
        downApps: string[];
        degradedApps: string[];
        openIncidents: string[];
        criticalIncidents: string[];
    };
    meta?: { generatedAt?: string };
};

type JsonObject = Record<string, unknown>;

function isObject(v: unknown): v is JsonObject {
    return typeof v === 'object' && v !== null;
}

function asArray(payload: unknown): unknown[] {
    if (Array.isArray(payload)) return payload;
    if (!isObject(payload)) return [];
    if (Array.isArray(payload.apps)) return payload.apps;
    if (Array.isArray(payload.incidents)) return payload.incidents;
    if (Array.isArray(payload.items)) return payload.items;
    if (Array.isArray(payload.data)) return payload.data;
    return [];
}

function norm(v: unknown): string {
    return String(v ?? '').trim().toLowerCase();
}

function chipTone(status?: string) {
    const s = norm(status);
    if (['healthy', 'ok', 'up', 'nominal'].includes(s)) return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200';
    if (['degraded', 'warn', 'warning', 'slow', 'partial', 'maintenance'].includes(s))
        return 'border-amber-500/30 bg-amber-500/10 text-amber-200';
    if (['down', 'offline', 'fail', 'failed', 'error', 'unhealthy'].includes(s))
        return 'border-rose-500/30 bg-rose-500/10 text-rose-200';
    return 'border-white/10 bg-white/5 text-white/70';
}

function severityTone(sev?: string) {
    const s = norm(sev);
    if (['critical', 'sev1', 'sev-1', 'p0', 'p1'].includes(s)) return 'border-rose-500/30 bg-rose-500/10 text-rose-200';
    if (['high', 'sev2', 'p2'].includes(s)) return 'border-amber-500/30 bg-amber-500/10 text-amber-200';
    if (['medium', 'sev3', 'p3'].includes(s)) return 'border-sky-500/30 bg-sky-500/10 text-sky-200';
    return 'border-white/10 bg-white/5 text-white/70';
}

function fmtTime(iso?: string) {
    if (!iso) return '—';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '—';
    return d.toLocaleString();
}

function isOpenIncident(inc: Incident) {
    const s = norm(inc.status);
    return !['closed', 'resolved', 'done'].includes(s);
}

function isCriticalIncident(inc: Incident) {
    const s = norm(inc.severity);
    return ['critical', 'sev1', 'sev-1', 'p0', 'p1'].includes(s);
}

function Badge({ children, tone }: { children: React.ReactNode; tone: string }) {
    return (
        <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${tone}`}>
            {children}
        </span>
    );
}

function systemsLabel(state: SystemsState | 'unknown') {
    if (state === 'red') return 'Systems critical';
    if (state === 'yellow') return 'Systems degraded';
    if (state === 'green') return 'Systems nominal';
    return 'Systems';
}

export default function CeoHealthClient() {
    const [apps, setApps] = React.useState<AppHealth[]>([]);
    const [incidents, setIncidents] = React.useState<Incident[]>([]);
    const [systems, setSystems] = React.useState<SystemsPayload | null>(null);

    const [lastRefreshed, setLastRefreshed] = React.useState<number | null>(null);
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const fetchAll = React.useCallback(async () => {
        setIsRefreshing(true);
        setError(null);

        try {
            const [systemsRes, appsRes, incRes] = await Promise.all([
                fetch('/api/health/systems', { cache: 'no-store' }),
                fetch('/api/health/apps', { cache: 'no-store' }),
                fetch('/api/incidents', { cache: 'no-store' }),
            ]);

            if (!systemsRes.ok) throw new Error(`Bad response from /api/health/systems: ${systemsRes.status}`);
            if (!appsRes.ok) throw new Error(`Bad response from /api/health/apps: ${appsRes.status}`);
            if (!incRes.ok) throw new Error(`Bad response from /api/incidents: ${incRes.status}`);

            const systemsJson = (await systemsRes.json()) as SystemsPayload;
            const appsJson: unknown = await appsRes.json();
            const incJson: unknown = await incRes.json();

            setSystems(systemsJson);

            const appsArr = asArray(appsJson) as AppHealth[];
            const incArr = asArray(incJson) as Incident[];

            setApps(Array.isArray(appsArr) ? appsArr : []);
            setIncidents(Array.isArray(incArr) ? incArr : []);

            setLastRefreshed(Date.now());
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Unknown error');
            setSystems(null);
            setApps([]);
            setIncidents([]);
        } finally {
            setIsRefreshing(false);
        }
    }, []);

    React.useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    const openIncidents = React.useMemo(() => incidents.filter(isOpenIncident), [incidents]);
    const criticalOpen = React.useMemo(() => openIncidents.filter(isCriticalIncident), [openIncidents]);

    const degradedApps = React.useMemo(
        () => apps.filter((a) => ['degraded', 'warn', 'warning', 'slow', 'partial', 'maintenance'].includes(norm(a.status))),
        [apps]
    );

    const headerCounts = systems?.counts ?? {
        down: 0,
        degraded: degradedApps.length,
        open: openIncidents.length,
        critical: criticalOpen.length,
    };

    const headerState: SystemsState | 'unknown' = systems?.state ?? 'unknown';

    return (
        <div className="mx-auto max-w-6xl px-4 py-8">
            <div className="mb-6">
                <div className="text-xs text-white/40">CEO / Health</div>
                <h1 className="mt-1 text-3xl font-semibold text-white/90">System Health</h1>
                <p className="mt-2 text-sm text-white/60">Live view from /api/health/apps + /api/incidents.</p>
                {error && <p className="mt-3 text-sm text-rose-200/90">{error}</p>}
            </div>

            {/* Unified counts header */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="min-w-0">
                    <div className="text-sm font-semibold text-white/85">{systemsLabel(headerState)}</div>
                    <div className="mt-1 text-xs text-white/55">
                        {headerCounts.down} down · {headerCounts.degraded} degraded · {headerCounts.critical} critical · {headerCounts.open} open
                    </div>
                    <div className="mt-1 text-sm text-white/70">
                        Last refreshed:{' '}
                        <span className="text-white/85">
                            {lastRefreshed ? new Date(lastRefreshed).toLocaleString() : '—'}
                        </span>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={fetchAll}
                    disabled={isRefreshing}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10 disabled:opacity-60"
                >
                    {isRefreshing ? 'Refreshing…' : 'Refresh now'}
                </button>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Apps */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="text-base font-semibold text-white/85">Apps</div>
                        <div className="text-xs text-white/50">
                            {degradedApps.length ? `${degradedApps.length} degraded` : 'all nominal'}
                        </div>
                    </div>

                    <div className="space-y-3">
                        {apps.map((a, idx) => {
                            const name = a.appId ?? a.name ?? `app-${idx + 1}`;
                            const status = a.status ?? 'unknown';
                            return (
                                <div
                                    key={`${name}-${idx}`}
                                    className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3"
                                >
                                    <div className="min-w-0">
                                        <div className="truncate text-sm text-white/85">{name}</div>
                                        <div className="mt-1 text-[11px] text-white/45">
                                            latency: {typeof a.latencyMs === 'number' ? `${a.latencyMs}ms` : '—'} · checked:{' '}
                                            {a.checkedAt ? fmtTime(a.checkedAt) : '—'}
                                            {a.message ? ` · ${a.message}` : ''}
                                        </div>
                                    </div>
                                    <Badge tone={chipTone(status)}>{status}</Badge>
                                </div>
                            );
                        })}

                        {apps.length === 0 && !isRefreshing && (
                            <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-6 text-sm text-white/60">
                                No apps returned. Check <code className="text-white/70">/api/health/apps</code>.
                            </div>
                        )}
                    </div>
                </div>

                {/* Incidents */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="text-base font-semibold text-white/85">Incidents</div>
                        <div className="text-xs text-white/50">
                            {openIncidents.length
                                ? `${openIncidents.length} open · ${criticalOpen.length} critical`
                                : incidents.length
                                    ? 'none open'
                                    : '—'}
                        </div>
                    </div>

                    <div className="space-y-3">
                        {openIncidents.slice(0, 6).map((inc) => (
                            <div
                                key={inc.id}
                                className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3"
                            >
                                <div className="min-w-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-mono text-[11px] text-white/45">{inc.id}</span>
                                        <Badge tone={severityTone(inc.severity)}>{(inc.severity ?? 'unknown').toUpperCase()}</Badge>
                                        <Badge tone={chipTone(inc.status)}>{inc.status ?? 'unknown'}</Badge>
                                    </div>

                                    <div className="mt-2 truncate text-sm text-white/85">
                                        <Link href={`/ceo/incidents/${inc.id}`} className="hover:underline">
                                            {inc.title ?? 'Untitled incident'}
                                        </Link>
                                    </div>

                                    <div className="mt-1 text-[11px] text-white/45">
                                        {inc.appName ?? inc.appId ?? '—'} · updated {fmtTime(inc.updatedAt ?? inc.startedAt)}
                                    </div>
                                </div>

                                <Link
                                    href={`/ceo/incidents/${inc.id}`}
                                    className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/70 hover:bg-white/10"
                                >
                                    View
                                </Link>
                            </div>
                        ))}

                        {incidents.length === 0 && !isRefreshing && (
                            <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-6 text-sm text-white/60">
                                No incidents returned. Check <code className="text-white/70">/api/incidents</code>.
                            </div>
                        )}

                        {incidents.length > 0 && openIncidents.length === 0 && (
                            <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-6 text-sm text-white/60">
                                No open incidents 🎉
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <Link
                    href="/ceo"
                    className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
                >
                    Back to CEO
                </Link>
            </div>
        </div>
    );
}