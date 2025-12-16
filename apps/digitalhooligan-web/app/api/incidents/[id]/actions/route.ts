import { NextResponse } from 'next/server';
import { getActionState, setActionState, type IncidentActionState } from '@/lib/incidentsActionStore';

function safeString(v: unknown): string {
    return typeof v === 'string' ? v : '';
}

function now() {
    return Date.now();
}

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    return NextResponse.json({ incidentId: id, state: getActionState(id) }, { status: 200 });
}

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const obj = body && typeof body === 'object' ? (body as Record<string, unknown>) : {};
    const action = safeString(obj.action).trim();
    const by = safeString(obj.by).trim() || 'CEO';

    if (action !== 'ack' && action !== 'resolve') {
        return NextResponse.json({ error: 'action must be "ack" or "resolve"' }, { status: 400 });
    }

    const existing = getActionState(id);

    let next: IncidentActionState = { ...existing, id };

    if (action === 'ack') {
        next = {
            ...next,
            acked: true,
            ackedAt: next.ackedAt ?? now(),
            ackedBy: next.ackedBy ?? by,
        };
    } else {
        // resolve implies ack
        next = {
            ...next,
            resolved: true,
            resolvedAt: next.resolvedAt ?? now(),
            resolvedBy: next.resolvedBy ?? by,
            acked: true,
            ackedAt: next.ackedAt ?? now(),
            ackedBy: next.ackedBy ?? by,
        };
    }

    setActionState(id, next);
    return NextResponse.json({ incidentId: id, state: next }, { status: 200 });
}