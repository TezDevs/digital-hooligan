import { NextResponse } from 'next/server';
import { getManyActionStates } from '@/lib/incidentsActionStore';

export async function GET(req: Request) {
    const url = new URL(req.url);
    const idsParam = url.searchParams.get('ids') ?? '';
    const ids = idsParam
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

    return NextResponse.json({ states: getManyActionStates(ids) }, { status: 200 });
}