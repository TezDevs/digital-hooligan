import Link from 'next/link';
import { headers } from 'next/headers';
import IncidentNotesClient from './IncidentNotesClient';

type JsonObject = Record<string, unknown>;

function isObject(v: unknown): v is JsonObject {
    return typeof v === 'object' && v !== null;
}

function asArray(payload: unknown): unknown[] {
    if (Array.isArray(payload)) return payload;
    if (isObject(payload)) {
        const items = payload.items;
        if (Array.isArray(items)) return items;
        const data = payload.data;
        if (Array.isArray(data)) return data;
        const incidents = payload.incidents;
        if (Array.isArray(incidents)) return incidents;
    }
    return [];
}

function readFirstString(obj: JsonObject, keys: string[]): string | undefined {
    for (const k of keys) {
        const val = obj[k];
        if (typeof val === 'string') return val;
    }
    return undefined;
}

function norm(v: unknown): string {
    return String(v ?? '').trim();
}

async function getOrigin(): Promise<string> {
    const h = await headers();
    const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3000';
    const proto =
        h.get('x-forwarded-proto') ??
        (host.includes('localhost') || host.includes('127.0.0.1') ? 'http' : 'https');
    return `${proto}://${host}`;
}

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    // ✅ Next 16: params is a Promise
    const { id } = await params;

    const origin = await getOrigin();

    const res = await fetch(`${origin}/api/incidents`, { cache: 'no-store' }).catch(() => null);
    const json: unknown = res && 'ok' in res && res.ok ? await res.json() : null;
    const incidents = asArray(json);

    const incident = incidents.find((x) => {
        if (!isObject(x)) return false;
        const cand = readFirstString(x, ['id', 'key', 'code', 'slug']);
        return cand === id;
    });

    const title = incident && isObject(incident) ? readFirstString(incident, ['title', 'name', 'summary']) : undefined;
    const status = incident && isObject(incident) ? readFirstString(incident, ['status', 'state']) : undefined;
    const severity = incident && isObject(incident) ? readFirstString(incident, ['severity', 'sev', 'priority']) : undefined;
    const created = incident && isObject(incident) ? readFirstString(incident, ['startedAt', 'startTime', 'createdAt', 'created']) : undefined;
    const description = incident && isObject(incident) ? readFirstString(incident, ['description', 'details', 'body', 'summary']) : undefined;

    return (
        <div className="p-6">
            <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                    <div className="text-xs text-white/60">
                        <Link href="/ceo" className="hover:underline">
                            CEO
                        </Link>{' '}
                        <span className="mx-1">/</span>
                        <Link href="/ceo/incidents" className="hover:underline">
                            Incidents
                        </Link>{' '}
                        <span className="mx-1">/</span>
                        <span className="text-white/80">{id}</span>
                    </div>

                    <h1 className="mt-2 text-2xl font-semibold text-white">{title ?? 'Incident'}</h1>
                    <p className="mt-1 text-sm text-white/60">Drilldown view + timeline notes.</p>
                </div>

                <div className="flex gap-2">
                    <Link
                        href="/ceo/incidents"
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
                    >
                        Back to incidents
                    </Link>
                    <Link
                        href="/ceo/health"
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
                    >
                        View health
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    {!incident ? (
                        <div className="text-sm text-white/70">
                            Incident not found in <code className="text-white/85">/api/incidents</code>.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                                    <div className="text-xs text-white/60">Status</div>
                                    <div className="mt-1 text-sm text-white/85">{norm(status) || '—'}</div>
                                </div>

                                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                                    <div className="text-xs text-white/60">Severity</div>
                                    <div className="mt-1 text-sm text-white/85">{norm(severity) || '—'}</div>
                                </div>

                                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                                    <div className="text-xs text-white/60">Started</div>
                                    <div className="mt-1 text-sm text-white/85">{norm(created) || '—'}</div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                                <div className="text-xs text-white/60">Summary</div>
                                <div className="mt-2 text-sm text-white/80">{norm(description) || '—'}</div>
                            </div>
                        </div>
                    )}
                </div>

                <IncidentNotesClient incidentId={id} />
            </div>
        </div>
    );
}