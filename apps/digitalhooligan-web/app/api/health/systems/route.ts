import { NextResponse } from 'next/server';

type PillState = 'green' | 'yellow' | 'red' | 'error';

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

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const origin = url.origin;

        const [appsRes, incRes] = await Promise.all([
            fetch(`${origin}/api/health/apps`, { cache: 'no-store' }),
            fetch(`${origin}/api/incidents`, { cache: 'no-store' }),
        ]);

        if (!appsRes.ok || !incRes.ok) {
            return NextResponse.json(
                { state: 'error', counts: { degraded: 0, down: 0, open: 0, critical: 0 }, reasons: {}, ts: Date.now() },
                { status: 200 }
            );
        }

        const appsJson: unknown = await appsRes.json();
        const incJson: unknown = await incRes.json();

        const apps = asArray(appsJson);
        const incidents = asArray(incJson);

        const degradedApps: string[] = [];
        const downApps: string[] = [];

        for (const a of apps) {
            const bucket = appHealthBucket(a);
            if (bucket === 'degraded') degradedApps.push(appName(a));
            if (bucket === 'down') downApps.push(appName(a));
        }

        const openIncidents = incidents.filter(isOpenIncident);
        const openTitles = openIncidents.map(incidentTitle);

        const criticalIncidents = openIncidents.filter(isCriticalIncident);
        const criticalTitles = criticalIncidents.map(incidentTitle);

        let state: PillState = 'green';
        if (downApps.length > 0 || criticalTitles.length > 0) state = 'red';
        else if (degradedApps.length > 0 || openTitles.length > 0) state = 'yellow';

        const body = {
            state,
            counts: {
                degraded: degradedApps.length,
                down: downApps.length,
                open: openTitles.length,
                critical: criticalTitles.length,
            },
            reasons: {
                degradedApps,
                downApps,
                openIncidents: openTitles,
                criticalIncidents: criticalTitles,
            },
            ts: Date.now(),
        };

        // Cache in CDN/edge for 15s; allow short stale while revalidating
        const res = NextResponse.json(body, { status: 200 });
        res.headers.set('Cache-Control', 'public, s-maxage=15, stale-while-revalidate=60');
        return res;
    } catch {
        const res = NextResponse.json(
            { state: 'error', counts: { degraded: 0, down: 0, open: 0, critical: 0 }, reasons: {}, ts: Date.now() },
            { status: 200 }
        );
        res.headers.set('Cache-Control', 'no-store');
        return res;
    }
}