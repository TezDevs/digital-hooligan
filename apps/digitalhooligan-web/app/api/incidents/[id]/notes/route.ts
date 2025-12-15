import { NextResponse } from 'next/server';

type Note = {
    id: string;
    ts: number;
    author?: string;
    text: string;
};

// In-memory store (dev stub). Resets on server restart.
const store: Map<string, Note[]> = new Map();

function safeString(v: unknown): string {
    return typeof v === 'string' ? v : '';
}

function makeNoteId() {
    return `note_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    // ✅ Next 16: params is a Promise
    const { id } = await params;

    const notes = store.get(id) ?? [];
    return NextResponse.json({ incidentId: id, notes }, { status: 200 });
}

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    // ✅ Next 16: params is a Promise
    const { id } = await params;

    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const obj = body && typeof body === 'object' ? (body as Record<string, unknown>) : {};
    const text = safeString(obj.text).trim();
    const author = safeString(obj.author).trim() || undefined;

    if (!text) return NextResponse.json({ error: 'text is required' }, { status: 400 });
    if (text.length > 2000) return NextResponse.json({ error: 'text too long (max 2000)' }, { status: 400 });

    const note: Note = { id: makeNoteId(), ts: Date.now(), author, text };
    const notes = store.get(id) ?? [];
    notes.unshift(note);
    store.set(id, notes);

    return NextResponse.json({ incidentId: id, note, notes }, { status: 201 });
}