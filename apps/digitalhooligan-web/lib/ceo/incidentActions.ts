export type IncidentActionState = {
    acked?: boolean;
    resolved?: boolean;
    updatedAt?: string; // ISO
};

type IncidentActionsMap = Record<string, IncidentActionState>;

const STORAGE_KEY = 'dh_incident_actions_v1';
const EVENT = 'dh:incident-actions-changed';

function safeJsonParse<T>(raw: string | null): T | null {
    if (!raw) return null;
    try {
        return JSON.parse(raw) as T;
    } catch {
        return null;
    }
}

export function readIncidentActions(): IncidentActionsMap {
    if (typeof window === 'undefined') return {};
    const parsed = safeJsonParse<IncidentActionsMap>(window.localStorage.getItem(STORAGE_KEY));
    return parsed && typeof parsed === 'object' ? parsed : {};
}

export function readIncidentAction(id: string): IncidentActionState | null {
    const all = readIncidentActions();
    return all[id] ?? null;
}

function writeIncidentActions(next: IncidentActionsMap) {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent(EVENT));
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
    if (!(id in current)) return;

    const next = { ...current };
    delete next[id];

    writeIncidentActions(next);
}

export function subscribeIncidentActions(cb: () => void) {
    if (typeof window === 'undefined') return () => { };

    const onCustom = () => cb();
    const onStorage = (e: StorageEvent) => {
        if (e.key === STORAGE_KEY) cb();
    };

    window.addEventListener(EVENT, onCustom as EventListener);
    window.addEventListener('storage', onStorage);

    return () => {
        window.removeEventListener(EVENT, onCustom as EventListener);
        window.removeEventListener('storage', onStorage);
    };
}