'use client';

import * as React from 'react';
import Link from 'next/link';

type PillState = 'green' | 'yellow' | 'red' | 'error' | 'loading';

type SystemsApiResponse = {
    state?: 'green' | 'yellow' | 'red' | 'error';
    counts?: { degraded?: number; down?: number; open?: number; critical?: number };
    ts?: number;
};

function format(ts?: number) {
    if (!ts) return '—';
    try {
        return new Date(ts).toLocaleString();
    } catch {
        return '—';
    }
}

function cardBorder(state: PillState) {
    if (state === 'green') return 'border-emerald-500/20';
    if (state === 'yellow') return 'border-amber-500/20';
    if (state === 'red') return 'border-rose-500/20';
    if (state === 'error') return 'border-white/10';
    return 'border-white/10';
}

function pillDot(state: PillState) {
    if (state === 'green') return 'bg-emerald-400';
    if (state === 'yellow') return 'bg-amber-400';
    if (state === 'red') return 'bg-rose-400';
    if (state === 'error') return 'bg-white/40';
    return 'bg-white/40';
}

function titleFor(state: PillState) {
    if (state === 'green') return 'Systems nominal';
    if (state === 'yellow') return 'Systems degraded';
    if (state === 'red') return 'Systems critical';
    if (state === 'error') return 'Systems unknown';
    return 'Systems checking…';
}

function safeNum(n: unknown): number {
    return typeof n === 'number' && Number.isFinite(n) ? n : 0;
}

export default function SystemsSummaryCard() {
    const [state, setState] = React.useState<PillState>('loading');
    const [counts, setCounts] = React.useState({ degraded: 0, down: 0, open: 0, critical: 0 });
    const [lastRefreshed, setLastRefreshed] = React.useState<number | undefined>(undefined);
    const [isRefreshing, setIsRefreshing] = React.useState(false);

    const fetchSummary = React.useCallback(async () => {
        setIsRefreshing(true);
        try {
            const res = await fetch('/api/health/systems', { cache: 'no-store' });
            if (!res.ok) throw new Error('Bad response');
            const json = (await res.json()) as SystemsApiResponse;

            const nextState: PillState =
                json.state === 'green' || json.state === 'yellow' || json.state === 'red'
                    ? json.state
                    : json.state === 'error'
                        ? 'error'
                        : 'error';

            const c = json.counts ?? {};
            setCounts({
                degraded: safeNum(c.degraded),
                down: safeNum(c.down),
                open: safeNum(c.open),
                critical: safeNum(c.critical),
            });
            setState(nextState);
            setLastRefreshed(typeof json.ts === 'number' ? json.ts : Date.now());
        } catch {
            setState('error');
            setCounts({ degraded: 0, down: 0, open: 0, critical: 0 });
            setLastRefreshed(Date.now());
        } finally {
            setIsRefreshing(false);
        }
    }, []);

    React.useEffect(() => {
        fetchSummary();
    }, [fetchSummary]);

    const subtitle = `${counts.down} down · ${counts.degraded} degraded · ${counts.critical} critical · ${counts.open} open`;

    return (
        <div className={`rounded-2xl border ${cardBorder(state)} bg-white/5 p-4`}>
            <div className="flex items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${pillDot(state)}`} />
                        <div className="text-sm font-semibold text-white">{titleFor(state)}</div>
                    </div>
                    <div className="mt-1 text-xs text-white/60">{subtitle}</div>
                    <div className="mt-2 text-xs text-white/50">Last refreshed: {format(lastRefreshed)}</div>
                </div>

                <button
                    type="button"
                    onClick={fetchSummary}
                    disabled={isRefreshing}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85 hover:bg-white/10 disabled:opacity-60"
                >
                    {isRefreshing ? 'Refreshing…' : 'Refresh'}
                </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
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
    );
}