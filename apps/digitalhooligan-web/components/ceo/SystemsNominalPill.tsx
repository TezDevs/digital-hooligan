'use client';

import * as React from 'react';
import Link from 'next/link';

type SystemsState = 'green' | 'yellow' | 'red';

type SystemsPayload = {
    ok: true;
    state: SystemsState;
    counts: { down: number; degraded: number; open: number; critical: number };
    reasons: {
        downApps: string[];
        degradedApps: string[];
        openIncidents: string[];
        criticalIncidents: string[];
    };
};

function pillClasses(state: SystemsState | 'loading' | 'error') {
    const base =
        'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide';
    if (state === 'green') return `${base} border-emerald-500/30 bg-emerald-500/15 text-emerald-200`;
    if (state === 'yellow') return `${base} border-amber-500/30 bg-amber-500/15 text-amber-200`;
    if (state === 'red') return `${base} border-rose-500/30 bg-rose-500/15 text-rose-200`;
    if (state === 'loading') return `${base} border-white/10 bg-white/5 text-white/70`;
    return `${base} border-white/10 bg-white/5 text-white/60`;
}

function label(state: SystemsState | 'loading' | 'error') {
    if (state === 'green') return 'Systems: NOMINAL';
    if (state === 'yellow') return 'Systems: DEGRADED';
    if (state === 'red') return 'Systems: CRITICAL';
    if (state === 'loading') return 'Systems: CHECKING…';
    return 'Systems: UNKNOWN';
}

function dotClass(state: SystemsState | 'loading' | 'error') {
    if (state === 'green') return 'bg-emerald-400';
    if (state === 'yellow') return 'bg-amber-400';
    if (state === 'red') return 'bg-rose-400';
    if (state === 'loading') return 'bg-white/30';
    return 'bg-white/20';
}

function hoverText(payload: SystemsPayload | null, state: SystemsState | 'loading' | 'error') {
    if (state === 'loading') return 'Computing from /api/health/apps + /api/incidents…';
    if (state === 'error' || !payload) return 'Unable to compute systems health.';
    const parts: string[] = [];
    if (payload.counts.down) parts.push(`${payload.counts.down} down`);
    if (payload.counts.degraded) parts.push(`${payload.counts.degraded} degraded`);
    if (payload.counts.critical) parts.push(`${payload.counts.critical} critical`);
    else if (payload.counts.open) parts.push(`${payload.counts.open} open incident${payload.counts.open === 1 ? '' : 's'}`);
    return parts.length ? parts.join(' · ') : 'All healthy · no open incidents';
}

export default function SystemsNominalPill({ refreshMs = 30_000 }: { refreshMs?: number }) {
    const [state, setState] = React.useState<SystemsState | 'loading' | 'error'>('loading');
    const [payload, setPayload] = React.useState<SystemsPayload | null>(null);

    const run = React.useCallback(async () => {
        try {
            const res = await fetch('/api/health/systems', { cache: 'no-store' });
            if (!res.ok) throw new Error('Bad response');
            const json = (await res.json()) as SystemsPayload;
            setPayload(json);
            setState(json.state);
        } catch {
            setPayload(null);
            setState('error');
        }
    }, []);

    React.useEffect(() => {
        run();
        const t = window.setInterval(run, refreshMs);
        return () => window.clearInterval(t);
    }, [run, refreshMs]);

    return (
        <Link
            href="/ceo/health"
            className={pillClasses(state)}
            title={hoverText(payload, state)}
        >
            <span className={`h-2 w-2 rounded-full ${dotClass(state)}`} />
            <span>{label(state)}</span>
        </Link>
    );
}