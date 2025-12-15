import { NextResponse } from 'next/server';

type IncidentState = {
    id: string;
    acked?: boolean;
    ackedAt?: number;
    ackedBy?: string;
    resolved?: boolean;
    resolvedAt?: number;
    resolvedBy?: string;
};

const stateStore: Map<string, IncidentState> = new Map();

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
    const s = stateStore.get(id) ?? { id };
    return NextResponse.json({ incidentId: id, state: s }, { status: 200 });
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

    const existing = stateStore.get(id) ?? { id };

    if (action === 'ack') {
        const next: IncidentState = {
            ...existing,
            id,
            acked: true,
            ackedAt: existing.ackedAt ?? now(),
            ackedBy: existing.ackedBy ?? by,
        };
        stateStore.set(id, next);
        return NextResponse.json({ incidentId: id, state: next }, { status: 200 });
    }

    // resolve
    const next: IncidentState = {
        ...existing,
        id,
        resolved: true,
        resolvedAt: existing.resolvedAt ?? now(),
        resolvedBy: existing.resolvedBy ?? by,
        // resolving implies acked
        acked: true,
        ackedAt: existing.ackedAt ?? now(),
        ackedBy: existing.ackedBy ?? by,
    };
    stateStore.set(id, next);
    return NextResponse.json({ incidentId: id, state: next }, { status: 200 });
}