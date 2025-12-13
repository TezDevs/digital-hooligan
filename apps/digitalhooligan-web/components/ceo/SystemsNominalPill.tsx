'use client';

import * as React from 'react';

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

function isOpenIncident(inc: unknown): boolean {
    if (!isObject(inc)) return false;
    const status = norm(readFirstString(inc, ['status', 'state']) ?? '');
    return !['closed', 'resolved', 'done'].includes(status);
}

function isCriticalIncident(inc: unknown): boolean {
    if (!isObject(inc)) return false;
    const sev = norm(readFirstString(inc, ['severity', 'sev', 'priority']) ?? '');
    return ['critical', 'sev1', 'sev-1', 'p0', 'p1'].includes(sev);
}

function appHealthBucket(app: unknown): 'healthy' | 'degraded' | 'down' {
    if (!isObject(app)) return 'healthy';

    const s = norm(readFirstString(app, ['status', 'health', 'state']) ?? '');

    if (['down', 'offline', 'fail', 'failed', 'error', 'unhealthy'].includes(s)) return 'down';
    if (['degraded', 'warn', 'warning', 'slow', 'partial'].includes(s)) return 'degraded';
    return 'healthy';
}

function computeState(apps: unknown[], incidents: unknown[]): PillState {
    const openIncidents = incidents.filter(isOpenIncident);
    const openCritical = openIncidents.some(isCriticalIncident);

    const buckets = apps.map(appHealthBucket);
    const anyDown = buckets.includes('down');
    const anyDegraded = buckets.includes('degraded');

    // red if ANY app down OR ANY open critical incident
    if (openCritical || anyDown) return 'red';

    // yellow if ANY app degraded OR ANY open (non-critical) incident
    if (openIncidents.length > 0 || anyDegraded) return 'yellow';

    // green only when all healthy AND no open incidents
    return 'green';
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

export default function SystemsNominalPill({ refreshMs = 30_000 }: { refreshMs?: number }) {
    const [state, setState] = React.useState<PillState>('loading');

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

            setState(computeState(apps, incidents));
        } catch {
            setState('error');
        }
    }, []);

    React.useEffect(() => {
        run();
        const t = window.setInterval(run, refreshMs);
        return () => window.clearInterval(t);
    }, [run, refreshMs]);

    return (
        <span className={pillClasses(state)} title="Computed from /api/health/apps + /api/incidents">
            <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
            {label(state)}
        </span>
    );
}