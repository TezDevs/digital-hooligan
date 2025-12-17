import { NextResponse } from 'next/server';

type SystemsState = 'green' | 'yellow' | 'red';

type SystemsResponse = {
    ok: true;
    state: SystemsState;
    counts: {
        down: number;
        degraded: number;
        open: number;
        critical: number;
    };
    reasons: {
        downApps: string[];
        degradedApps: string[];
        openIncidents: string[]; // titles
        criticalIncidents: string[]; // titles
    };
    meta: {
        generatedAt: string;
        source: 'computed';
    };
};

type JsonObject = Record<string, unknown>;

function isObject(v: unknown): v is JsonObject {
    return typeof v === 'object' && v !== null;
}

function asArray(payload: unknown): unknown[] {
    if (Array.isArray(payload)) return payload;
    if (isObject(payload)) {
        if (Array.isArray(payload.apps)) return payload.apps;
        if (Array.isArray(payload.incidents)) return payload.incidents;
        if (Array.isArray(payload.items)) return payload.items;
        if (Array.isArray(payload.data)) return payload.data;
    }
    return [];
}

function readString(obj: JsonObject, keys: string[]): string | undefined {
    for (const k of keys) {
        const v = obj[k];
        if (typeof v === 'string' && v.trim()) return v;
    }
    return undefined;
}

function norm(v: unknown): string {
    return String(v ?? '').trim().toLowerCase();
}

function appName(app: unknown): string {
    if (!isObject(app)) return 'App';
    return (
        readString(app, ['appId', 'name', 'app', 'slug', 'id', 'code']) ??
        'App'
    );
}

function appBucket(app: unknown): 'healthy' | 'degraded' | 'down' {
    if (!isObject(app)) return 'healthy';
    const s = norm(readString(app, ['status', 'health', 'state']) ?? '');
    if (['down', 'offline', 'fail', 'failed', 'error', 'unhealthy'].includes(s)) return 'down';
    if (['degraded', 'warn', 'warning', 'slow', 'partial', 'maintenance'].includes(s)) return 'degraded';
    return 'healthy';
}

function incidentIsOpen(inc: unknown): boolean {
    if (!isObject(inc)) return false;
    const s = norm(readString(inc, ['status', 'state']) ?? '');
    return !['closed', 'resolved', 'done'].includes(s);
}

function incidentIsCritical(inc: unknown): boolean {
    if (!isObject(inc)) return false;
    const sev = norm(readString(inc, ['severity', 'sev', 'priority']) ?? '');
    return ['critical', 'sev1', 'sev-1', 'p0', 'p1'].includes(sev);
}

function incidentTitle(inc: unknown): string {
    if (!isObject(inc)) return 'Incident';
    return (
        readString(inc, ['title', 'name', 'summary']) ??
        (typeof inc.id === 'string' ? inc.id : 'Incident')
    );
}

export async function GET(request: Request) {
    const origin = new URL(request.url).origin;

    const [appsRes, incRes] = await Promise.all([
        fetch(`${origin}/api/health/apps`, { cache: 'no-store' }),
        fetch(`${origin}/api/incidents`, { cache: 'no-store' }),
    ]);

    // If either upstream fails, still return a stable payload (yellow -> error-ish)
    let appsPayload: unknown = null;
    let incPayload: unknown = null;

    try {
        appsPayload = appsRes.ok ? await appsRes.json() : null;
    } catch {
        appsPayload = null;
    }

    try {
        incPayload = incRes.ok ? await incRes.json() : null;
    } catch {
        incPayload = null;
    }

    const apps = asArray(appsPayload);
    const incidents = asArray(incPayload);

    const downApps = apps.filter((a) => appBucket(a) === 'down').map(appName);
    const degradedApps = apps.filter((a) => appBucket(a) === 'degraded').map(appName);

    const openIncidents = incidents.filter(incidentIsOpen);
    const criticalIncidents = openIncidents.filter(incidentIsCritical);

    const openTitles = openIncidents.map(incidentTitle);
    const criticalTitles = criticalIncidents.map(incidentTitle);

    const counts = {
        down: downApps.length,
        degraded: degradedApps.length,
        open: openIncidents.length,
        critical: criticalIncidents.length,
    };

    let state: SystemsState = 'green';
    if (counts.critical > 0 || counts.down > 0) state = 'red';
    else if (counts.degraded > 0 || counts.open > 0) state = 'yellow';

    const body: SystemsResponse = {
        ok: true,
        state,
        counts,
        reasons: {
            downApps,
            degradedApps,
            openIncidents: openTitles,
            criticalIncidents: criticalTitles,
        },
        meta: {
            generatedAt: new Date().toISOString(),
            source: 'computed',
        },
    };

    return NextResponse.json(body);
}