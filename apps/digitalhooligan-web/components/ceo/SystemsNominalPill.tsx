'use client';

import * as React from 'react';
import Link from 'next/link';

type PillState = 'green' | 'yellow' | 'red' | 'loading' | 'error';
type JsonObject = Record<string, unknown>;

function isObject(v: unknown): v is JsonObject {
    return typeof v === 'object' && v !== null;
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

function norm(v: unknown): string {
    return String(v ?? '').trim().toLowerCase();
}

function incidentIsOpen(inc: unknown): boolean {
    if (!isObject(inc)) return false;
    const status = norm(readFirstString(inc, ['status', 'state']) ?? '');
    return !['closed', 'resolved', 'done'].includes(status);
}

function incidentIsCritical(inc: unknown): boolean {
    if (!isObject(inc)) return false;
    const sev = norm(readFirstString(inc, ['severity', 'sev', 'priority']) ?? '');
    return ['critical', 'sev1', 'sev-1', 'p0', 'p1'].includes(sev);
}

function incidentTitle(inc: unknown): string {
    if (!isObject(inc)) return 'Incident';
    return (
        readFirstString(inc, ['title', 'name', 'summary']) ??
        (typeof inc.id === 'string' ? inc.id : 'Incident')
    );
}

function appHealthBucket(app: unknown): 'healthy' | 'degraded' | 'down' {
    if (!isObject(app)) return 'healthy';
    const s = norm(readFirstString(app, ['status', 'health', 'state']) ?? '');
    if (['down', 'offline', 'fail', 'failed', 'error', 'unhealthy'].includes(s)) return 'down';
    if (['degraded', 'warn', 'warning', 'slow', 'partial'].includes(s)) return 'degraded';
    return 'healthy';
}

function appName(app: unknown): string {
    if (!isObject(app)) return 'App';
    return readFirstString(app, ['name', 'app', 'slug', 'id']) ?? 'App';
}

function pillClasses(state: PillState): string {
    const base =
        'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide';
    if (state === 'green') return `${base} border-emerald-500/30 bg-emerald-500/15 text-emerald-200`;
    if (state === 'yellow') return `${base} border-amber-500/30 bg-amber-500/15 text-amber-200`;
    if (state === 'red') return `${base} border-rose-500/30 bg-rose-500/15 text-rose-200`;
    if (state === 'loading') return `${base} border-white/10 bg-white/5 text-white/70`;
    return `${base} border-white/10 bg-white/5 text-white/70`;
}

function label(state: PillState): string {
    if (state === 'red') return 'Systems: CRITICAL';
    if (state === 'yellow') return 'Systems: DEGRADED';
    if (state === 'green') return 'Systems: NOMINAL';
    if (state === 'error') return 'Systems: UNKNOWN';
    return 'Systems: CHECKING…';
}

type WhySummary = {
    state: PillState;
    degradedApps: string[];
    downApps: string[];
    openIncidents: string[];
    criticalIncidents: string[];
};

function computeWhy(apps: unknown[], incidents: unknown[]): WhySummary {
    const degradedApps: string[] = [];
    const downApps: string[] = [];

    for (const a of apps) {
        const b = appHealthBucket(a);
        if (b === 'degraded') degradedApps.push(appName(a));
        if (b === 'down') downApps.push(appName(a));
    }

    const open = incidents.filter(incidentIsOpen);
    const openIncidents = open.map(incidentTitle);
    const criticalIncidents = open.filter(incidentIsCritical).map(incidentTitle);

    let state: PillState = 'green';
    if (criticalIncidents.length > 0 || downApps.length > 0) state = 'red';
    else if (openIncidents.length > 0 || degradedApps.length > 0) state = 'yellow';

    return { state, degradedApps, downApps, openIncidents, criticalIncidents };
}

function encodeWhy(why: WhySummary): string {
    // keep it compact for URLs
    const payload = {
        s: why.state,
        d: why.degradedApps,
        x: why.downApps,
        o: why.openIncidents,
        c: why.criticalIncidents,
    };
    return encodeURIComponent(JSON.stringify(payload));
}

export default function SystemsNominalPill({ refreshMs = 30_000 }: { refreshMs?: number }) {
    const [state, setState] = React.useState<PillState>('loading');
    const [why, setWhy] = React.useState<WhySummary>({
        state: 'loading',
        degradedApps: [],
        downApps: [],
        openIncidents: [],
        criticalIncidents: [],
    });

    const run = React.useCallback(async () => {
        try {
            const [appsRes, incRes] = await Promise.all([
                fetch('/api/health/apps', { cache: 'no-store' }),
                fetch('/api/incidents', { cache: 'no-store' }),
            ]);

            if (!appsRes.ok || !incRes.ok) throw new Error('Bad response');

            const appsJson: unknown = await appsRes.json();
            const incJson: unknown = await incRes.json();

            const apps = asArray(appsJson);
            const incidents = asArray(incJson);

            const computed = computeWhy(apps, incidents);
            setWhy(computed);
            setState(computed.state);
        } catch {
            setState('error');
            setWhy({
                state: 'error',
                degradedApps: [],
                downApps: [],
                openIncidents: [],
                criticalIncidents: [],
            });
        }
    }, []);

    React.useEffect(() => {
        run();
        const t = window.setInterval(run, refreshMs);
        return () => window.clearInterval(t);
    }, [run, refreshMs]);

    const href = `/ceo/health?why=${encodeWhy(why)}`;

    function countsTitle(why: {
        degradedApps: string[];
        downApps: string[];
        openIncidents: string[];
        criticalIncidents: string[];
    }) {
        const parts: string[] = [];

        if (why.downApps.length) parts.push(`${why.downApps.length} down`);
        if (why.degradedApps.length) parts.push(`${why.degradedApps.length} degraded`);

        if (why.criticalIncidents.length) parts.push(`${why.criticalIncidents.length} critical incident${why.criticalIncidents.length === 1 ? '' : 's'}`);
        else if (why.openIncidents.length) parts.push(`${why.openIncidents.length} open incident${why.openIncidents.length === 1 ? '' : 's'}`);

        return parts.length ? parts.join(' · ') : 'All healthy · no open incidents';
    }

    return (
        <Link
            href={href}
            className={pillClasses(state)}
            title={`Click for details (computed from /api/health/apps + /api/incidents) — ${countsTitle(why)}`}
        >
            <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
            {label(state)}
        </Link>
    );
}