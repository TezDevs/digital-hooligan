'use client';

import * as React from 'react';

type IncidentState = {
    id: string;
    acked?: boolean;
    ackedAt?: number;
    ackedBy?: string;
    resolved?: boolean;
    resolvedAt?: number;
    resolvedBy?: string;
};

function fmt(ts?: number) {
    if (!ts) return '—';
    try {
        return new Date(ts).toLocaleString();
    } catch {
        return '—';
    }
}

export default function IncidentActionsClient({ incidentId }: { incidentId: string }) {
    const [state, setState] = React.useState<IncidentState>({ id: incidentId });
    const [by, setBy] = React.useState('Courtez');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const load = React.useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/incidents/${encodeURIComponent(incidentId)}/actions`, {
                cache: 'no-store',
            });
            if (!res.ok) throw new Error('Failed to load incident action state');
            const json = (await res.json()) as { state?: IncidentState };
            setState(json.state ?? { id: incidentId });
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    }, [incidentId]);

    React.useEffect(() => {
        load();
    }, [load]);

    const act = async (action: 'ack' | 'resolve') => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/incidents/${encodeURIComponent(incidentId)}/actions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action, by: by.trim() || 'CEO' }),
            });
            if (!res.ok) {
                const maybe = (await res.json().catch(() => null)) as { error?: string } | null;
                throw new Error(maybe?.error || 'Action failed');
            }
            const json = (await res.json()) as { state?: IncidentState };
            setState(json.state ?? { id: incidentId });
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    const chip = (label: string) => (
        <span className="w-fit rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-semibold text-white/70">
            {label}
        </span>
    );

    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <div className="text-sm font-semibold text-white">Actions</div>
                    <div className="mt-1 flex flex-wrap gap-2">
                        {state.acked ? chip('acked') : chip('not acked')}
                        {state.resolved ? chip('resolved') : chip('not resolved')}
                    </div>
                </div>

                <button
                    type="button"
                    onClick={load}
                    disabled={loading}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85 hover:bg-white/10 disabled:opacity-60"
                >
                    {loading ? 'Loading…' : 'Refresh'}
                </button>
            </div>

            {error && (
                <div className="mt-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-100">
                    {error}
                </div>
            )}

            <div className="mt-4 grid gap-2">
                <input
                    value={by}
                    onChange={(e) => setBy(e.target.value)}
                    placeholder="By (name)"
                    className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/85 placeholder:text-white/40"
                />

                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={() => act('ack')}
                        disabled={loading || !!state.acked}
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85 hover:bg-white/10 disabled:opacity-60"
                    >
                        {state.acked ? 'Acknowledged' : 'Acknowledge'}
                    </button>

                    <button
                        type="button"
                        onClick={() => act('resolve')}
                        disabled={loading || !!state.resolved}
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85 hover:bg-white/10 disabled:opacity-60"
                    >
                        {state.resolved ? 'Resolved' : 'Resolve'}
                    </button>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                    <div className="text-xs text-white/60">Ack</div>
                    <div className="mt-1 text-sm text-white/80">{fmt(state.ackedAt)}</div>
                    <div className="mt-1 text-xs text-white/50">{state.ackedBy ? `by ${state.ackedBy}` : '—'}</div>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                    <div className="text-xs text-white/60">Resolve</div>
                    <div className="mt-1 text-sm text-white/80">{fmt(state.resolvedAt)}</div>
                    <div className="mt-1 text-xs text-white/50">{state.resolvedBy ? `by ${state.resolvedBy}` : '—'}</div>
                </div>
            </div>
        </div>
    );
}