export type IncidentActionState = {
    acked?: boolean;
    resolved?: boolean;
    updatedAt?: string; // ISO
};

export type IncidentActionsById = Record<string, IncidentActionState>;

const KEY = 'dh_incident_actions_by_id';
const EVENT = 'dh_incident_actions_changed';

function safeParse(json: string | null): IncidentActionsById {
    if (!json) return {};
    try {
        const v = JSON.parse(json) as unknown;
        if (typeof v !== 'object' || v === null) return {};
        return v as IncidentActionsById;
    } catch {
        return {};
    }
}

export function readIncidentActions(): IncidentActionsById {
    if (typeof window === 'undefined') return {};
    return safeParse(window.localStorage.getItem(KEY));
}

export function writeIncidentActions(next: IncidentActionsById) {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
        // ignore
    }
    try {
        window.dispatchEvent(new Event(EVENT));
    } catch {
        // ignore
    }
}

export function setIncidentAction(id: string, patch: IncidentActionState) {
    if (typeof window === 'undefined') return;
    const current = readIncidentActions();
    const prev = current[id] ?? {};
    const merged: IncidentActionState = {
        ...prev,
        ...patch,
        updatedAt: new Date().toISOString(),
    };
    writeIncidentActions({ ...current, [id]: merged });
}

export function clearIncidentAction(id: string) {
    if (typeof window === 'undefined') return;
    const current = readIncidentActions();
    const { [id]: _removed, ...rest } = current; // eslint-friendly discard
    writeIncidentActions(rest);
}

export function subscribeIncidentActions(cb: () => void) {
    if (typeof window === 'undefined') return () => { };
    const onCustom = () => cb();
    window.addEventListener(EVENT, onCustom as EventListener);

    // cross-tab updates
    const onStorage = (e: StorageEvent) => {
        if (e.key === KEY) cb();
    };
    window.addEventListener('storage', onStorage);

    return () => {
        window.removeEventListener(EVENT, onCustom as EventListener);
        window.removeEventListener('storage', onStorage);
    };
}