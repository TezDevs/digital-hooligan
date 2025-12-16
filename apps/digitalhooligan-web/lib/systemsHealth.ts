export type PillState = 'green' | 'yellow' | 'red';

export type SystemsWhy = {
    state: PillState;
    degradedApps: string[];
    downApps: string[];
    openNonCriticalIncidents: string[]; // titles
    openCriticalIncidents: string[]; // titles
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

export function asArray(payload: unknown): unknown[] {
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

export function incidentIsOpen(inc: unknown): boolean {
    if (!isObject(inc)) return false;
    const status = norm(readFirstString(inc, ['status', 'state']) ?? '');
    // open = anything not explicitly closed/resolved/done
    return !['closed', 'resolved', 'done'].includes(status);
}

export function incidentIsCritical(inc: unknown): boolean {
    if (!isObject(inc)) return false;
    const sev = norm(readFirstString(inc, ['severity', 'sev', 'priority']) ?? '');
    return ['critical', 'sev1', 'sev-1', 'p0', 'p1'].includes(sev);
}

export function incidentTitle(inc: unknown): string {
    if (!isObject(inc)) return 'Incident';
    return readFirstString(inc, ['title', 'name', 'summary']) ?? 'Incident';
}

export function appName(app: unknown): string {
    if (!isObject(app)) return 'App';
    return readFirstString(app, ['name', 'app', 'slug', 'id', 'code', 'appId']) ?? 'App';
}

export function appHealthBucket(app: unknown): 'healthy' | 'degraded' | 'down' {
    if (!isObject(app)) return 'healthy';

    // support your /api/health/apps shape (appId + status)
    const s = norm(readFirstString(app, ['status', 'health', 'state']) ?? '');

    // treat maintenance like degraded (yellow), not critical
    if (['down', 'offline', 'fail', 'failed', 'error', 'unhealthy'].includes(s)) return 'down';
    if (['degraded', 'warn', 'warning', 'slow', 'partial', 'maintenance', 'unknown'].includes(s))
        return 'degraded';

    return 'healthy';
}

export function computeSystemsWhy(apps: unknown[], incidents: unknown[]): SystemsWhy {
    const degradedApps: string[] = [];
    const downApps: string[] = [];

    for (const a of apps) {
        const b = appHealthBucket(a);
        if (b === 'degraded') degradedApps.push(appName(a));
        if (b === 'down') downApps.push(appName(a));
    }

    const open = incidents.filter(incidentIsOpen);
    const openCritical = open.filter(incidentIsCritical).map(incidentTitle);
    const openNonCritical = open.filter((i) => !incidentIsCritical(i)).map(incidentTitle);

    // Rules:
    // red: any down OR any open critical
    // yellow: any degraded OR any open non-critical
    // green: otherwise
    let state: PillState = 'green';
    if (downApps.length > 0 || openCritical.length > 0) state = 'red';
    else if (degradedApps.length > 0 || openNonCritical.length > 0) state = 'yellow';

    return {
        state,
        degradedApps,
        downApps,
        openNonCriticalIncidents: openNonCritical,
        openCriticalIncidents: openCritical,
    };
}

export function titleFromWhy(why: SystemsWhy): string {
    const parts: string[] = [];
    if (why.downApps.length) parts.push(`${why.downApps.length} down`);
    if (why.degradedApps.length) parts.push(`${why.degradedApps.length} degraded`);
    if (why.openCriticalIncidents.length)
        parts.push(
            `${why.openCriticalIncidents.length} critical incident${why.openCriticalIncidents.length === 1 ? '' : 's'
            }`
        );
    if (why.openNonCriticalIncidents.length)
        parts.push(
            `${why.openNonCriticalIncidents.length} open incident${why.openNonCriticalIncidents.length === 1 ? '' : 's'
            }`
        );

    return parts.length ? parts.join(' · ') : 'All healthy · no open incidents';
}

export function encodeWhy(why: SystemsWhy): string {
    const payload = {
        s: why.state,
        d: why.degradedApps,
        dn: why.downApps,
        oc: why.openCriticalIncidents,
        on: why.openNonCriticalIncidents,
    };
    return encodeURIComponent(JSON.stringify(payload));
}