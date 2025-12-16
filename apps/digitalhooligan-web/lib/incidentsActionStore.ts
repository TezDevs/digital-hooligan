export type IncidentActionState = {
    id: string;
    acked?: boolean;
    ackedAt?: number;
    ackedBy?: string;
    resolved?: boolean;
    resolvedAt?: number;
    resolvedBy?: string;
};

// Dev-stub, in-memory store (resets on server restart)
const store: Map<string, IncidentActionState> = new Map();

export function getActionState(id: string): IncidentActionState {
    return store.get(id) ?? { id };
}

export function setActionState(id: string, state: IncidentActionState): void {
    store.set(id, { ...state, id });
}

export function getManyActionStates(ids: string[]): Record<string, IncidentActionState> {
    const out: Record<string, IncidentActionState> = {};
    for (const id of ids) out[id] = getActionState(id);
    return out;
}