'use client';

import * as React from 'react';
import Link from 'next/link';

type PillState = 'green' | 'yellow' | 'red' | 'loading' | 'error';

type WhySummary = {
    state: PillState;
    degradedApps: string[];
    downApps: string[];
    openIncidents: string[]; // titles
    criticalIncidents: string[]; // titles
};

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
        if (Array.isArray(payload.apps)) return payload.apps;
        if (Array.isArray(payload.items)) return payload.items;
        if (Array.isArray(payload.data)) return payload.data;
        if (Array.isArray(payload.incidents)) return payload.incidents;
    }
    return [];
}

function norm(v: unknown): string {
    return String(v ?? '').trim().toLowerCase();
}

function isOpenIncident(inc: unknown): boolean {
    if (!isObject(inc)) return false;
    const status = norm(readFirstString(inc, ['status', 'state']) ?? '');
    // open if NOT explicitly closed/resolved/done
    return !['closed', 'resolved', 'done'].includes(status);
}

function isCriticalIncident(inc: unknown): boolean {
    if (!isObject(inc)) return false;
    const sev = norm(readFirstString(inc, ['severity', 'sev', 'priority']) ?? '');
    return ['critical', 'sev1', 'sev-1', 'p0', 'p1'].includes(sev);
}

function incidentTitle(inc: unknown): string {
    if (!isObject(inc)) return 'Incident';
    return readFirstString(inc, ['title', 'name', 'summary']) ?? 'Incident';
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

function computeWhy(apps: unknown[], incidents: unknown[]): WhySummary {
    const degradedApps: string[] = [];
    const downApps: string[] = [];

    for (const a of apps) {
        const b = appHealthBucket(a);
        if (b === 'degraded') degradedApps.push(appName(a));
        if (b === 'down') downApps.push(appName(a));
    }

    const open = incidents.filter(isOpenIncident);
    const openIncidents = open.map(incidentTitle);
    const criticalIncidents = open.filter(isCriticalIncident).map(incidentTitle);

    // ✅ RULES:
    // red: any down OR any open critical
    // yellow: any degraded OR any open non-critical
    // green: otherwise
    let state: PillState = 'green';
    if (downApps.length > 0 || criticalIncidents.length > 0) state = 'red';
    else if (degradedApps.length > 0 || openIncidents.length > 0) state = 'yellow';

    return { state, degradedApps, downApps, openIncidents, criticalIncidents };
}

function pillClasses(state: PillState): string {
    const base =
        'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide';
    if (state === 'green') return `${base} border-emerald-500/30 bg-emerald-500/10 text-emerald-100`;
    if (state === 'yellow') return `${base} border-amber-500/30 bg-amber-500/10 text-amber-100`;
    if (state === 'red') return `${base} border-rose-500/30 bg-rose-500/10 text-rose-100`;
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

function titleText(why: WhySummary): string {
    const parts: string[] = [];
    if (why.downApps.length) parts.push(`${why.downApps.length} down`);
    if (why.degradedApps.length) parts.push(`${why.degradedApps.length} degraded`);
    if (why.criticalIncidents.length)
        parts.push(
            `${why.criticalIncidents.length} critical incident${why.criticalIncidents.length === 1 ? '' : 's'}`
        );
    else if (why.openIncidents.length)
        parts.push(
            `${why.openIncidents.length} open incident${why.openIncidents.length === 1 ? '' : 's'}`
        );

    return parts.length ? parts.join(' · ') : 'All healthy · no open incidents';
}

function encodeWhy(why: WhySummary): string {
    const payload = {
        s: why.state,
        d: why.degradedApps,
        dn: why.downApps,
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

            const computed = computeWhy(asArray(appsJson), asArray(incJson));
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

    return (
        <Link
            href={`/ceo/health?why=${encodeWhy(why)}`}
            className={pillClasses(state)}
            title={titleText(why)}
        >
            <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
            <span>{label(state)}</span>
        </Link>
    );
}