'use client';

import * as React from 'react';
import Link from 'next/link';

import HealthStatusChip from '@/components/ceo/HealthStatusChip';

type SystemsState = 'green' | 'yellow' | 'red';

type SystemsResponse = {
    ok: true;
    state: SystemsState;
    counts: { down: number; degraded: number; open: number; critical: number };
    reasons?: {
        downApps?: string[];
        degradedApps?: string[];
        openIncidents?: string[];
        criticalIncidents?: string[];
    };
    meta?: { generatedAt?: string };
};

type RegistryEntry = {
    id: string;
    name: string;
    kind: string;
    lifecycle: string;
};

type RegistryResponse = {
    ok: true;
    type: 'apps_registry';
    apps: RegistryEntry[];
    summary: {
        total: number;
        byKind: Record<string, number>;
        byLifecycle: Record<string, number>;
    };
    timestamp: string;
};

type RefreshCadence = 30_000 | 60_000 | 120_000;
const CADENCE_KEY = 'dh_refresh_cadence';

function readCadence(): RefreshCadence {
    if (typeof window === 'undefined') return 30_000;
    const raw = window.localStorage.getItem(CADENCE_KEY);
    if (raw === '60000') return 60_000;
    if (raw === '120000') return 120_000;
    return 30_000;
}

function writeCadence(ms: RefreshCadence) {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(CADENCE_KEY, String(ms));
    window.dispatchEvent(new CustomEvent('dh:cadence'));
}

function pillClass(state: SystemsState) {
    const base =
        'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide';
    if (state === 'green') return `${base} border-emerald-500/30 bg-emerald-500/10 text-emerald-200`;
    if (state === 'yellow') return `${base} border-amber-500/30 bg-amber-500/10 text-amber-200`;
    return `${base} border-rose-500/30 bg-rose-500/10 text-rose-200`;
}

function pillLabel(state: SystemsState) {
    if (state === 'green') return 'Systems: NOMINAL';
    if (state === 'yellow') return 'Systems: DEGRADED';
    return 'Systems: CRITICAL';
}

function fmt(ts?: string | number | null) {
    if (!ts) return '—';
    const d = typeof ts === 'number' ? new Date(ts) : new Date(ts);
    if (Number.isNaN(d.getTime())) return '—';
    return d.toLocaleString();
}

export default function CeoDashboardPage() {
    const [cadence, setCadence] = React.useState<RefreshCadence>(30_000);

    const [systems, setSystems] = React.useState<SystemsResponse | null>(null);
    const [systemsErr, setSystemsErr] = React.useState<string | null>(null);

    const [registry, setRegistry] = React.useState<RegistryResponse | null>(null);
    const [registryErr, setRegistryErr] = React.useState<string | null>(null);

    const [lastRefreshed, setLastRefreshed] = React.useState<number | null>(null);
    const [refreshing, setRefreshing] = React.useState(false);

    // initialize cadence + keep in sync with other controls/pages
    React.useEffect(() => {
        setCadence(readCadence());

        const onCadence = () => setCadence(readCadence());
        window.addEventListener('storage', onCadence);
        window.addEventListener('dh:cadence', onCadence as EventListener);

        return () => {
            window.removeEventListener('storage', onCadence);
            window.removeEventListener('dh:cadence', onCadence as EventListener);
        };
    }, []);

    const refreshAll = React.useCallback(async () => {
        setRefreshing(true);
        setSystemsErr(null);
        setRegistryErr(null);

        try {
            const [sysRes, regRes] = await Promise.all([
                fetch('/api/health/systems', { cache: 'no-store' }),
                fetch('/api/apps/registry', { cache: 'no-store' }),
            ]);

            if (!sysRes.ok) throw new Error(`Bad response from /api/health/systems: ${sysRes.status}`);
            const sysJson = (await sysRes.json()) as SystemsResponse;
            setSystems(sysJson);

            if (regRes.ok) {
                const regJson = (await regRes.json()) as RegistryResponse;
                setRegistry(regJson);
            } else {
                setRegistry(null);
                setRegistryErr(`Bad response from /api/apps/registry: ${regRes.status}`);
            }

            setLastRefreshed(Date.now());
        } catch (e) {
            setSystems(null);
            setRegistry(null);
            setSystemsErr(e instanceof Error ? e.message : 'Unknown error');
        } finally {
            setRefreshing(false);
        }
    }, []);

    // initial load + interval refresh
    React.useEffect(() => {
        refreshAll();
        const t = window.setInterval(refreshAll, cadence);
        return () => window.clearInterval(t);
    }, [refreshAll, cadence]);

    const counts = systems?.counts ?? { down: 0, degraded: 0, critical: 0, open: 0 };
    const state: SystemsState = systems?.state ?? 'green';

    const titleLine =
        systems?.reasons
            ? [
                systems.reasons.downApps?.length ? `${systems.reasons.downApps.length} down` : null,
                systems.reasons.degradedApps?.length ? `${systems.reasons.degradedApps.length} degraded` : null,
                systems.reasons.criticalIncidents?.length
                    ? `${systems.reasons.criticalIncidents.length} critical incident${systems.reasons.criticalIncidents.length === 1 ? '' : 's'}`
                    : null,
                systems.reasons.openIncidents?.length
                    ? `${systems.reasons.openIncidents.length} open incident${systems.reasons.openIncidents.length === 1 ? '' : 's'}`
                    : null,
            ]
                .filter(Boolean)
                .join(' · ')
            : '';

    return (
        <div className="mx-auto max-w-6xl px-4 py-8">
            {/* Top bar */}
            <div className="mb-6 flex items-center justify-between">
                <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                    Digital Hooligan · CEO
                </div>

                <div className="flex items-center gap-2">
                    <Link
                        href="/ceo/performance"
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75 hover:bg-white/10"
                    >
                        Performance
                    </Link>
                    <Link
                        href="/ceo/incidents"
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75 hover:bg-white/10"
                    >
                        Incidents
                    </Link>
                    <Link
                        href="/ceo/health"
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75 hover:bg-white/10"
                    >
                        Health
                    </Link>
                    <Link
                        href="/ceo/dev-workbench"
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75 hover:bg-white/10"
                    >
                        Dev Workbench
                    </Link>
                </div>
            </div>

            {/* Hero */}
            <div className="mb-6 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-black/0 p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-semibold text-white/90">CEO dashboard</h1>
                        <p className="mt-2 max-w-2xl text-sm text-white/60">
                            One place to see money, products, deals, and app health across Digital Hooligan.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Main pill (computed) */}
                        <span className={pillClass(state)} title={titleLine || 'Computed from /api/health/systems'}>
                            <span className="h-2 w-2 rounded-full bg-current opacity-80" />
                            {pillLabel(state)}
                        </span>

                        {/* Refresh cadence */}
                        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                            <span className="text-xs text-white/70">Refresh</span>
                            <select
                                value={cadence}
                                onChange={(e) => {
                                    const v = Number(e.target.value) as RefreshCadence;
                                    setCadence(v);
                                    writeCadence(v);
                                }}
                                className="bg-transparent text-xs text-white/80 outline-none"
                            >
                                <option value={30_000}>30s</option>
                                <option value={60_000}>60s</option>
                                <option value={120_000}>120s</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Systems card */}
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-current opacity-80" />
                                <div className="text-sm font-semibold text-white/85">
                                    {state === 'red' ? 'Systems critical' : state === 'yellow' ? 'Systems degraded' : 'Systems nominal'}
                                </div>
                            </div>

                            <div className="mt-2 text-xs text-white/55">
                                {counts.down} down · {counts.degraded} degraded · {counts.critical} critical · {counts.open} open
                            </div>

                            <div className="mt-1 text-xs text-white/45">
                                Last refreshed: {fmt(lastRefreshed ?? systems?.meta?.generatedAt ?? null)}
                            </div>

                            {systemsErr && <div className="mt-2 text-xs text-rose-200/90">{systemsErr}</div>}
                            {registryErr && <div className="mt-2 text-xs text-amber-200/90">{registryErr}</div>}

                            <div className="mt-4 flex flex-wrap gap-2">
                                <Link
                                    href="/ceo/health"
                                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
                                >
                                    View health
                                </Link>
                                <Link
                                    href="/ceo/incidents"
                                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
                                >
                                    View incidents
                                </Link>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={refreshAll}
                            disabled={refreshing}
                            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10 disabled:opacity-60"
                        >
                            {refreshing ? 'Refreshing…' : 'Refresh'}
                        </button>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="text-sm font-semibold text-white/85">Quick Links</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                        <Link className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 hover:bg-white/10" href="/ceo/health">
                            Health
                        </Link>
                        <Link className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 hover:bg-white/10" href="/ceo/performance">
                            Performance
                        </Link>
                        <Link className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 hover:bg-white/10" href="/ceo/incidents">
                            Incidents
                        </Link>
                        <Link className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 hover:bg-white/10" href="/ceo/dev-workbench">
                            Dev Workbench
                        </Link>
                    </div>
                </div>
            </div>

            {/* Overview strip */}
            <div className="mb-6 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/90">Overview</span>
                <Link className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 hover:bg-white/10" href="/ceo/tasks">
                    Tasks
                </Link>
                <Link className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 hover:bg-white/10" href="/ceo/deals">
                    Deals
                </Link>
                <Link className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 hover:bg-white/10" href="/ceo/finance">
                    Finance
                </Link>
                <Link className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 hover:bg-white/10" href="/ceo/performance">
                    Performance
                </Link>
                <Link className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 hover:bg-white/10" href="/ceo/ai-hub">
                    AI Hub
                </Link>
                <Link className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 hover:bg-white/10" href="/ceo/dev-workbench">
                    Dev WB
                </Link>
                <Link className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 hover:bg-white/10" href="/ceo/settings">
                    Settings
                </Link>
                <Link className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 hover:bg-white/10" href="/ceo/logout">
                    Logout
                </Link>
            </div>

            {/* Main cards */}
            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="text-xs tracking-widest text-white/40">MONEY</div>
                    <div className="mt-3 text-4xl font-semibold text-white/90">$4,250</div>
                    <div className="mt-2 text-sm text-white/60">Est. MRR across all live products once initial apps ship.</div>
                    <div className="mt-3 text-xs text-white/45">Pipeline blend from gov + SaaS assumptions.</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="text-xs tracking-widest text-white/40">DEALS</div>
                    <div className="mt-3 text-4xl font-semibold text-white/90">{counts.open}</div>
                    <div className="mt-2 text-sm text-white/60">Open incidents right now (triage + postmortems).</div>
                    <div className="mt-3 text-xs text-white/45">You can wire real deal tracking later.</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="text-xs tracking-widest text-white/40">APP PERFORMANCE</div>
                    <div className="mt-3 text-4xl font-semibold text-white/90">99.92%</div>
                    <div className="mt-2 text-sm text-white/60">
                        All apps healthy + {counts.open} open incidents (for now).
                    </div>
                    <div className="mt-3 text-xs text-white/45">Dig deeper in App performance for latency + incidents.</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="text-xs tracking-widest text-white/40">SYSTEMS PILL</div>
                    <div className="mt-3">
                        {/* keep this here so you can verify it renders */}
                        <HealthStatusChip />
                    </div>
                    <div className="mt-2 text-xs text-white/45">Top header chip is driven by /api/health/systems.</div>
                </div>
            </div>

            {/* Registry snapshot */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="text-xs tracking-widest text-white/40">APP PORTFOLIO SNAPSHOT</div>
                        <div className="mt-2 text-sm text-white/60">
                            Quick view of how many apps, bots, and internal tools exist in the registry. Backed by{' '}
                            <code className="text-white/75">/api/apps/registry</code>.
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={refreshAll}
                        disabled={refreshing}
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10 disabled:opacity-60"
                    >
                        {refreshing ? 'Refreshing…' : 'Refresh'}
                    </button>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-4">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                        <div className="text-xs tracking-widest text-white/40">LIVE / BETA</div>
                        <div className="mt-2 text-2xl font-semibold text-white/90">{registry?.summary?.byLifecycle?.live ?? 1}</div>
                        <div className="mt-1 text-xs text-white/45">0 in beta</div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                        <div className="text-xs tracking-widest text-white/40">PUBLIC-READY</div>
                        <div className="mt-2 text-2xl font-semibold text-white/90">{registry?.summary?.byLifecycle?.public ?? 3}</div>
                        <div className="mt-1 text-xs text-white/45">0 in build</div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                        <div className="text-xs tracking-widest text-white/40">INTERNAL-ONLY</div>
                        <div className="mt-2 text-2xl font-semibold text-white/90">{registry?.summary?.byLifecycle?.internal ?? 2}</div>
                        <div className="mt-1 text-xs text-white/45">0 in idea/design</div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                        <div className="text-xs tracking-widest text-white/40">REGISTRY DETAIL</div>
                        <div className="mt-2 text-2xl font-semibold text-white/90">{registry?.summary?.total ?? 5}</div>
                        <div className="mt-1 text-xs text-white/45">1 source of truth</div>
                    </div>
                </div>
            </div>

            {/* Focus */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-xs tracking-widest text-white/40">TODAY&apos;S FOCUS</div>
                <div className="mt-2 text-sm text-white/60">High-impact moves for future Tez across product, gov, and admin.</div>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/70">
                    <li>Finish CEO dashboard shell + navigation.</li>
                    <li>Close out Labs HQ wiring with registry + health.</li>
                </ul>
            </div>
        </div>
    );
}