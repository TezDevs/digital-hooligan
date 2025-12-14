'use client';

import * as React from 'react';
import Link from 'next/link';

type JsonObject = Record<string, unknown>;

function isObject(v: unknown): v is JsonObject {
    return typeof v === 'object' && v !== null;
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

function asArray(payload: unknown): unknown[] {
    if (Array.isArray(payload)) return payload;
    if (isObject(payload)) {
        const apps = payload.apps;
        if (Array.isArray(apps)) return apps;
        const data = payload.data;
        if (Array.isArray(data)) return data;
        const items = payload.items;
        if (Array.isArray(items)) return items;
    }
    return [];
}

function appName(app: unknown): string {
    if (!isObject(app)) return 'App';
    return readFirstString(app, ['name', 'app', 'slug', 'id', 'code']) ?? 'App';
}

function appHealthBucket(app: unknown): 'healthy' | 'degraded' | 'down' {
    if (!isObject(app)) return 'healthy';
    const s = norm(readFirstString(app, ['status', 'health', 'state']) ?? '');
    if (['down', 'offline', 'fail', 'failed', 'error', 'unhealthy'].includes(s)) return 'down';
    if (['degraded', 'warn', 'warning', 'slow', 'partial'].includes(s)) return 'degraded';
    return 'healthy';
}

function incidentTitle(inc: unknown): string {
    if (!isObject(inc)) return 'Incident';
    return (
        readFirstString(inc, ['title', 'name', 'summary']) ??
        (typeof inc.id === 'string' ? inc.id : 'Incident')
    );
}

function incidentStatus(inc: unknown): string {
    if (!isObject(inc)) return 'unknown';
    return readFirstString(inc, ['status', 'state']) ?? 'unknown';
}

function incidentSeverity(inc: unknown): string {
    if (!isObject(inc)) return 'unknown';
    return readFirstString(inc, ['severity', 'sev', 'priority']) ?? 'unknown';
}

function isOpenIncident(inc: unknown): boolean {
    const s = norm(incidentStatus(inc));
    return !['closed', 'resolved', 'done'].includes(s);
}

function isCriticalIncident(inc: unknown): boolean {
    const sev = norm(incidentSeverity(inc));
    return ['critical', 'sev1', 'sev-1', 'p0', 'p1'].includes(sev);
}

type WhyPayload = { s?: string; d?: string[]; x?: string[]; o?: string[]; c?: string[] };

function safeParseWhy(raw: string | null): WhyPayload | null {
    if (!raw) return null;
    try {
        const decoded = decodeURIComponent(raw);
        const parsed = JSON.parse(decoded) as unknown;
        if (!isObject(parsed)) return null;

        const s = typeof parsed.s === 'string' ? parsed.s : undefined;
        const d = Array.isArray(parsed.d) ? parsed.d.filter((x): x is string => typeof x === 'string') : [];
        const x = Array.isArray(parsed.x) ? parsed.x.filter((y): y is string => typeof y === 'string') : [];
        const o = Array.isArray(parsed.o) ? parsed.o.filter((z): z is string => typeof z === 'string') : [];
        const c = Array.isArray(parsed.c) ? parsed.c.filter((w): w is string => typeof w === 'string') : [];

        return { s, d, x, o, c };
    } catch {
        return null;
    }
}

function badgeClasses(kind: 'healthy' | 'degraded' | 'down' | 'open' | 'closed' | 'critical') {
    const base = 'inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold';
    switch (kind) {
        case 'healthy':
            return `${base} border-emerald-500/30 bg-emerald-500/15 text-emerald-200`;
        case 'degraded':
            return `${base} border-amber-500/30 bg-amber-500/15 text-amber-200`;
        case 'down':
            return `${base} border-rose-500/30 bg-rose-500/15 text-rose-200`;
        case 'critical':
            return `${base} border-rose-500/30 bg-rose-500/15 text-rose-200`;
        case 'open':
            return `${base} border-amber-500/30 bg-amber-500/15 text-amber-200`;
        case 'closed':
        default:
            return `${base} border-white/10 bg-white/5 text-white/70`;
    }
}

function format(ts: number) {
    try {
        return new Date(ts).toLocaleString();
    } catch {
        return '—';
    }
}

export default function HealthClient({ whyRaw }: { whyRaw: string | null }) {
    const [apps, setApps] = React.useState<unknown[]>([]);
    const [incidents, setIncidents] = React.useState<unknown[]>([]);
    const [lastRefreshed, setLastRefreshed] = React.useState<number>(() => Date.now());
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const why = React.useMemo(() => safeParseWhy(whyRaw), [whyRaw]);

    const fetchAll = React.useCallback(async () => {
        setIsRefreshing(true);
        setError(null);
        try {
            const [appsRes, incRes] = await Promise.all([
                fetch('/api/health/apps', { cache: 'no-store' }),
                fetch('/api/incidents', { cache: 'no-store' }),
            ]);

            if (!appsRes.ok || !incRes.ok) throw new Error('Bad response from APIs');

            const appsJson: unknown = await appsRes.json();
            const incJson: unknown = await incRes.json();

            setApps(asArray(appsJson));
            setIncidents(asArray(incJson));
            setLastRefreshed(Date.now());
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Unknown error');
        } finally {
            setIsRefreshing(false);
        }
    }, []);

    React.useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    const openIncidents = incidents.filter(isOpenIncident);
    const openCritical = openIncidents.filter(isCriticalIncident);

    const degradedApps = apps.filter((a) => appHealthBucket(a) === 'degraded');
    const downApps = apps.filter((a) => appHealthBucket(a) === 'down');

    const showWhy =
        Boolean(why) &&
        Boolean((why?.d?.length ?? 0) + (why?.x?.length ?? 0) + (why?.o?.length ?? 0) + (why?.c?.length ?? 0));

    return (
        <div className="p-6">
            <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                    <div className="text-xs text-white/60">
                        <Link href="/ceo" className="hover:underline">
                            CEO
                        </Link>{' '}
                        <span className="mx-1">/</span>
                        <span className="text-white/80">Health</span>
                    </div>
                    <h1 className="mt-2 text-2xl font-semibold text-white">System Health</h1>
                    <p className="mt-1 text-sm text-white/60">
                        Live view from <code className="text-white/80">/api/health/apps</code> +{' '}
                        <code className="text-white/80">/api/incidents</code>.
                    </p>
                </div>

                <div className="flex gap-2">
                    <Link
                        href="/ceo/incidents"
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
                    >
                        View incidents
                    </Link>
                </div>
            </div>

            {/* Refresh bar */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm text-white/80">
                    Last refreshed: <span className="text-white">{format(lastRefreshed)}</span>
                </div>

                <button
                    type="button"
                    onClick={fetchAll}
                    disabled={isRefreshing}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85 hover:bg-white/10 disabled:opacity-60"
                >
                    {isRefreshing ? 'Refreshing…' : 'Refresh now'}
                </button>
            </div>

            {error && (
                <div className="mb-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-100">
                    {error}
                </div>
            )}

            {/* Why panel (from pill clickthrough param) */}
            {showWhy && (
                <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm font-semibold text-white">Why this is not nominal</div>

                    {(why?.x?.length ?? 0) > 0 && (
                        <div className="mt-3">
                            <div className="text-xs font-semibold text-rose-200">Down apps</div>
                            <ul className="mt-1 list-disc pl-5 text-xs text-white/80">
                                {(why?.x ?? []).map((n) => (
                                    <li key={n}>{n}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {(why?.d?.length ?? 0) > 0 && (
                        <div className="mt-3">
                            <div className="text-xs font-semibold text-amber-200">Degraded apps</div>
                            <ul className="mt-1 list-disc pl-5 text-xs text-white/80">
                                {(why?.d ?? []).map((n) => (
                                    <li key={n}>{n}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {(why?.c?.length ?? 0) > 0 && (
                        <div className="mt-3">
                            <div className="text-xs font-semibold text-rose-200">Critical incidents (open)</div>
                            <ul className="mt-1 list-disc pl-5 text-xs text-white/80">
                                {(why?.c ?? []).map((t) => (
                                    <li key={t}>{t}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {(why?.o?.length ?? 0) > 0 && (why?.c?.length ?? 0) === 0 && (
                        <div className="mt-3">
                            <div className="text-xs font-semibold text-amber-200">Incidents (open)</div>
                            <ul className="mt-1 list-disc pl-5 text-xs text-white/80">
                                {(why?.o ?? []).map((t) => (
                                    <li key={t}>{t}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Apps */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold text-white">Apps</div>
                        <div className="text-xs text-white/60">
                            {downApps.length > 0
                                ? `${downApps.length} down`
                                : degradedApps.length > 0
                                    ? `${degradedApps.length} degraded`
                                    : 'all healthy'}
                        </div>
                    </div>

                    <div className="mt-3 space-y-2">
                        {apps.length === 0 && !error && (
                            <div className="text-sm text-white/60">
                                No apps returned. Check <code className="text-white/80">/api/health/apps</code>.
                            </div>
                        )}

                        {apps.map((a, idx) => {
                            const bucket = appHealthBucket(a);
                            const name = appName(a);
                            return (
                                <div
                                    key={`${name}-${idx}`}
                                    className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 py-2"
                                >
                                    <div className="text-sm text-white/85">{name}</div>
                                    <span className={badgeClasses(bucket)}>{bucket}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Incidents */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold text-white">Incidents</div>
                        <div className="text-xs text-white/60">
                            {openCritical.length > 0
                                ? `${openCritical.length} critical open`
                                : openIncidents.length > 0
                                    ? `${openIncidents.length} open`
                                    : 'none open'}
                        </div>
                    </div>

                    <div className="mt-3 space-y-2">
                        {incidents.length === 0 && !error && (
                            <div className="text-sm text-white/60">
                                No incidents returned. Check <code className="text-white/80">/api/incidents</code>.
                            </div>
                        )}

                        {incidents.map((i, idx) => {
                            const title = incidentTitle(i);
                            const open = isOpenIncident(i);
                            const critical = isCriticalIncident(i);
                            const sev = incidentSeverity(i);
                            const st = incidentStatus(i);

                            return (
                                <div
                                    key={`${title}-${idx}`}
                                    className="rounded-xl border border-white/10 bg-black/20 px-3 py-2"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <div className="truncate text-sm text-white/85">{title}</div>
                                            <div className="mt-1 text-xs text-white/60">
                                                status: <span className="text-white/80">{st}</span> · severity:{' '}
                                                <span className="text-white/80">{sev}</span>
                                            </div>
                                        </div>

                                        {critical ? (
                                            <span className={badgeClasses('critical')}>critical</span>
                                        ) : open ? (
                                            <span className={badgeClasses('open')}>open</span>
                                        ) : (
                                            <span className={badgeClasses('closed')}>closed</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}