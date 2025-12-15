'use client';

import * as React from 'react';

type Note = {
    id: string;
    ts: number;
    author?: string;
    text: string;
};

function fmt(ts: number) {
    try {
        return new Date(ts).toLocaleString();
    } catch {
        return '—';
    }
}

export default function IncidentNotesClient({ incidentId }: { incidentId: string }) {
    const [notes, setNotes] = React.useState<Note[]>([]);
    const [text, setText] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [lastRefreshed, setLastRefreshed] = React.useState<number | null>(null);

    const load = React.useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/incidents/${encodeURIComponent(incidentId)}/notes`, {
                cache: 'no-store',
            });
            if (!res.ok) throw new Error('Failed to load notes');
            const json = (await res.json()) as { notes?: Note[] };
            setNotes(Array.isArray(json.notes) ? json.notes : []);
            setLastRefreshed(Date.now());
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    }, [incidentId]);

    React.useEffect(() => {
        load();
    }, [load]);

    const save = async () => {
        const t = text.trim();
        if (!t) return;

        setSaving(true);
        setError(null);
        try {
            const res = await fetch(`/api/incidents/${encodeURIComponent(incidentId)}/notes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: t, author: author.trim() || undefined }),
            });
            if (!res.ok) {
                const maybe = (await res.json().catch(() => null)) as { error?: string } | null;
                throw new Error(maybe?.error || 'Failed to save note');
            }
            const json = (await res.json()) as { notes?: Note[] };
            setNotes(Array.isArray(json.notes) ? json.notes : notes);
            setText('');
            setLastRefreshed(Date.now());
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Unknown error');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <div className="text-sm font-semibold text-white">Timeline notes</div>
                    <div className="mt-1 text-xs text-white/60">
                        {lastRefreshed ? `Last refreshed: ${fmt(lastRefreshed)}` : '—'}
                    </div>
                </div>

                <button
                    type="button"
                    onClick={load}
                    disabled={loading}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85 hover:bg-white/10 disabled:opacity-60"
                >
                    {loading ? 'Refreshing…' : 'Refresh'}
                </button>
            </div>

            {error && (
                <div className="mt-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-100">
                    {error}
                </div>
            )}

            <div className="mt-4 grid gap-2">
                <input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author (optional)"
                    className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/85 placeholder:text-white/40"
                />
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add a note… (what happened, what you checked, next action)"
                    rows={4}
                    className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/85 placeholder:text-white/40"
                />
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={save}
                        disabled={saving || !text.trim()}
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85 hover:bg-white/10 disabled:opacity-60"
                    >
                        {saving ? 'Saving…' : 'Add note'}
                    </button>
                    <button
                        type="button"
                        onClick={() => setText('')}
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
                    >
                        Clear
                    </button>
                </div>
            </div>

            <div className="mt-4 space-y-2">
                {notes.length === 0 ? (
                    <div className="text-sm text-white/60">No notes yet.</div>
                ) : (
                    notes.map((n) => (
                        <div key={n.id} className="rounded-xl border border-white/10 bg-black/20 p-3">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="text-xs text-white/60">
                                    {n.author ? <span className="text-white/80">{n.author}</span> : 'Unknown'} · {fmt(n.ts)}
                                </div>
                            </div>
                            <div className="mt-2 whitespace-pre-wrap text-sm text-white/80">{n.text}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}