export type RefreshCadence = '15s' | '30s' | '60s' | 'off';

export const REFRESH_CADENCE_KEY = 'dh_refresh_cadence';
export const REFRESH_CADENCE_EVENT = 'dh_refresh_cadence_changed';

export function isCadence(v: unknown): v is RefreshCadence {
    return v === '15s' || v === '30s' || v === '60s' || v === 'off';
}

export function readCadence(defaultValue: RefreshCadence = '30s'): RefreshCadence {
    try {
        const v = window.localStorage.getItem(REFRESH_CADENCE_KEY);
        return isCadence(v) ? v : defaultValue;
    } catch {
        return defaultValue;
    }
}

export function writeCadence(value: RefreshCadence) {
    try {
        window.localStorage.setItem(REFRESH_CADENCE_KEY, value);
    } catch {
        // ignore
    }
    // same-tab notification (storage event only fires cross-tab)
    try {
        window.dispatchEvent(new Event(REFRESH_CADENCE_EVENT));
    } catch {
        // ignore
    }
}

export function cadenceMs(c: RefreshCadence): number | null {
    if (c === 'off') return null;
    if (c === '15s') return 15_000;
    if (c === '60s') return 60_000;
    return 30_000;
}