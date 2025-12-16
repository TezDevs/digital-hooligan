'use client';

import * as React from 'react';
import Link from 'next/link';
import {
    asArray,
    computeSystemsWhy,
    encodeWhy,
    titleFromWhy,
    type SystemsWhy,
    type PillState,
} from '@/lib/systemsHealth';

function pillClasses(state: PillState | 'loading' | 'error'): string {
    const base =
        'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide';
    if (state === 'green') return `${base} border-emerald-500/30 bg-emerald-500/10 text-emerald-100`;
    if (state === 'yellow') return `${base} border-amber-500/30 bg-amber-500/10 text-amber-100`;
    if (state === 'red') return `${base} border-rose-500/30 bg-rose-500/10 text-rose-100`;
    return `${base} border-white/10 bg-white/5 text-white/70`;
}

function label(state: PillState | 'loading' | 'error'): string {
    if (state === 'red') return 'Systems: CRITICAL';
    if (state === 'yellow') return 'Systems: DEGRADED';
    if (state === 'green') return 'Systems: NOMINAL';
    if (state === 'error') return 'Systems: UNKNOWN';
    return 'Systems: CHECKING…';
}

const EMPTY_WHY: SystemsWhy = {
    state: 'green',
    degradedApps: [],
    downApps: [],
    openCriticalIncidents: [],
    openNonCriticalIncidents: [],
};

export default function SystemsNominalPill({ refreshMs = 30_000 }: { refreshMs?: number }) {
    const [state, setState] = React.useState<PillState | 'loading' | 'error'>('loading');
    const [why, setWhy] = React.useState<SystemsWhy>(EMPTY_WHY);

    const run = React.useCallback(async () => {
        try {
            const [appsRes, incRes] = await Promise.all([
                fetch('/api/health/apps', { cache: 'no-store' }),
                fetch('/api/incidents', { cache: 'no-store' }),
            ]);
            if (!appsRes.ok || !incRes.ok) throw new Error('Bad response');

            const appsJson: unknown = await appsRes.json();
            const incJson: unknown = await incRes.json();

            const computed = computeSystemsWhy(asArray(appsJson), asArray(incJson));
            setWhy(computed);
            setState(computed.state);
        } catch {
            setWhy(EMPTY_WHY);
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
            href={`/ceo/health?why=${encodeWhy(why)}`}
            className={pillClasses(state)}
            title={titleFromWhy(why)}
        >
            <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
            <span>{label(state)}</span>
        </Link>
    );
}