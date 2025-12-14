'use client';

import * as React from 'react';
import Link from 'next/link';
import { cadenceToMs, readCadence, type RefreshCadence } from '@/lib/refreshCadence';

type PillState = 'green' | 'yellow' | 'red' | 'loading' | 'error';

type WhySummary = {
    state: PillState;
    degradedApps: string[];
    downApps: string[];
    openIncidents: string[];
    criticalIncidents: string[];
};

type SystemsApiResponse = {
    state?: 'green' | 'yellow' | 'red' | 'error';
    reasons?: {
        degradedApps?: string[];
        downApps?: string[];
        openIncidents?: string[];
        criticalIncidents?: string[];
    };
};

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

function encodeWhy(why: WhySummary): string {
    const payload = {
        s: why.state,
        d: why.degradedApps,
        x: why.downApps,
        o: why.openIncidents,
        c: why.criticalIncidents,
    };
    return encodeURIComponent(JSON.stringify(payload));
}

function countsTitle(why: Pick<WhySummary, 'degradedApps' | 'downApps' | 'openIncidents' | 'criticalIncidents'>) {
    const parts: string[] = [];

    if (why.downApps.length) parts.push(`${why.downApps.length} down`);
    if (why.degradedApps.length) parts.push(`${why.degradedApps.length} degraded`);

    if (why.criticalIncidents.length) {
        parts.push(
            `${why.criticalIncidents.length} critical incident${why.criticalIncidents.length === 1 ? '' : 's'}`
        );
    } else if (why.openIncidents.length) {
        parts.push(`${why.openIncidents.length} open incident${why.openIncidents.length === 1 ? '' : 's'}`);
    }

    return parts.length ? parts.join(' · ') : 'All healthy · no open incidents';
}

export default function SystemsNominalPill() {
    const [state, setState] = React.useState<PillState>('loading');
    const [why, setWhy] = React.useState<WhySummary>({
        state: 'loading',
        degradedApps: [],
        downApps: [],
        openIncidents: [],
        criticalIncidents: [],
    });

    // ✅ cadence hooks MUST be inside the component
    const [cadence, setCadence] = React.useState<RefreshCadence>('30s');

    React.useEffect(() => {
        setCadence(readCadence());

        const onStorage = (e: StorageEvent) => {
            if (e.key === 'dh_refresh_cadence') setCadence(readCadence());
        };

        const onCustom = (e: Event) => {
            const next = (e as CustomEvent).detail as RefreshCadence;
            setCadence(next);
        };

        window.addEventListener('storage', onStorage);
        window.addEventListener('dh:cadence', onCustom);

        return () => {
            window.removeEventListener('storage', onStorage);
            window.removeEventListener('dh:cadence', onCustom);
        };
    }, []);

    const run = React.useCallback(async () => {
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

            const degradedApps = json.reasons?.degradedApps ?? [];
            const downApps = json.reasons?.downApps ?? [];
            const openIncidents = json.reasons?.openIncidents ?? [];
            const criticalIncidents = json.reasons?.criticalIncidents ?? [];

            setWhy({
                state: nextState,
                degradedApps,
                downApps,
                openIncidents,
                criticalIncidents,
            });
            setState(nextState);
        } catch {
            setWhy({
                state: 'error',
                degradedApps: [],
                downApps: [],
                openIncidents: [],
                criticalIncidents: [],
            });
            setState('error');
        }
    }, []);

    // ✅ polling now follows cadence
    React.useEffect(() => {
        run();

        const ms = cadenceToMs(cadence);
        if (!ms) return;

        const t = window.setInterval(run, ms);
        return () => window.clearInterval(t);
    }, [run, cadence]);

    const href = `/ceo/health?why=${encodeWhy(why)}`;

    return (
        <Link
            href={href}
            className={pillClasses(state)}
            title={`Click for details (computed from /api/health/systems) — ${countsTitle(why)}`}
        >
            <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
            {label(state)}
        </Link>
    );
}