'use client';

import * as React from 'react';
import Link from 'next/link';
import { asArray, computeSystemsWhy, titleFromWhy, type SystemsWhy } from '@/lib/systemsHealth';
import { cadenceMs, readCadence, REFRESH_CADENCE_EVENT, REFRESH_CADENCE_KEY, type RefreshCadence } from '@/lib/refreshCadence';






function formatTs(ts?: number) {
    if (!ts) return '—';
    try {
        return new Date(ts).toLocaleString();
    } catch {
        return '—';
    }
}

function headline(why: SystemsWhy): { text: string; dotClass: string } {
    if (why.state === 'red') return { text: 'Systems critical', dotClass: 'bg-rose-400' };
    if (why.state === 'yellow') return { text: 'Systems degraded', dotClass: 'bg-amber-400' };
    return { text: 'Systems nominal', dotClass: 'bg-emerald-400' };
}

export default function SystemsSummaryCard() {
    const [why, setWhy] = React.useState<SystemsWhy>({
        state: 'green',
        degradedApps: [],
        downApps: [],
        openCriticalIncidents: [],
        openNonCriticalIncidents: [],
    });

    const [lastRefreshed, setLastRefreshed] = React.useState<number | undefined>(undefined);
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [cadence, setCadence] = React.useState<RefreshCadence>('30s');


    // keep cadence synced with RefreshCadenceControl (localStorage + storage event)
    React.useEffect(() => {
        setCadence(readCadence('30s'));

        const onStorage = (e: StorageEvent) => {
            if (e.key === REFRESH_CADENCE_KEY) setCadence(readCadence('30s'));
        };
        window.addEventListener('storage', onStorage);

        const onCustom = () => setCadence(readCadence('30s'));
        window.addEventListener(REFRESH_CADENCE_EVENT, onCustom as EventListener);

        return () => {
            window.removeEventListener('storage', onStorage);
            window.removeEventListener(REFRESH_CADENCE_EVENT, onCustom as EventListener);
        };
    }, []);

    const fetchAll = React.useCallback(async () => {
        setIsRefreshing(true);
        setError(null);

        try {
            const [appsRes, incRes] = await Promise.all([
                fetch('/api/health/apps', { cache: 'no-store' }),
                fetch('/api/incidents', { cache: 'no-store' }),
            ]);

            if (!appsRes.ok || !incRes.ok) throw new Error('Bad response from health/incidents');

            const appsJson: unknown = await appsRes.json();
            const incJson: unknown = await incRes.json();

            const computed = computeSystemsWhy(asArray(appsJson), asArray(incJson));
            setWhy(computed);
            setLastRefreshed(Date.now());
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Unknown error');
            setLastRefreshed(Date.now());
        } finally {
            setIsRefreshing(false);
        }
    }, []);

    // initial fetch + cadence interval
    React.useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    React.useEffect(() => {
        const ms = cadenceMs(cadence);
        if (!ms) return;

        const t = window.setInterval(() => {
            fetchAll();
        }, ms);

        return () => window.clearInterval(t);
    }, [cadence, fetchAll]);

    const { text, dotClass } = headline(why);

    const down = why.downApps.length;
    const degraded = why.degradedApps.length;
    const critical = why.openCriticalIncidents.length;
    const open = why.openNonCriticalIncidents.length;

    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${dotClass}`} />
                        <div className="text-sm font-semibold text-white/90">{text}</div>
                    </div>

                    <div className="mt-1 text-xs text-white/60" title={titleFromWhy(why)}>
                        {down} down · {degraded} degraded · {critical} critical · {open} open
                    </div>

                    <div className="mt-1 text-[11px] text-white/45">
                        Last refreshed: {formatTs(lastRefreshed)}
                    </div>

                    {error && (
                        <div className="mt-2 text-[11px] text-rose-200/90">
                            {error}
                        </div>
                    )}

                    <div className="mt-3 flex flex-wrap gap-2">
                        <Link
                            href="/ceo/health"
                            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
                        >
                            View health
                        </Link>

                        <Link
                            href="/ceo/incidents"
                            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
                        >
                            View incidents
                        </Link>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={fetchAll}
                    disabled={isRefreshing}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85 hover:bg-white/10 disabled:opacity-60"
                >
                    {isRefreshing ? 'Refreshing…' : 'Refresh'}
                </button>
            </div>
        </div>
    );
}