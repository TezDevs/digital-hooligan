export type RefreshCadence = 'off' | '30s' | '60s';

const KEY = 'dh_refresh_cadence';

export function cadenceToMs(c: RefreshCadence): number | null {
    if (c === 'off') return null;
    if (c === '30s') return 30_000;
    return 60_000;
}

export function safeCadence(v: unknown): RefreshCadence {
    return v === 'off' || v === '30s' || v === '60s' ? v : '30s';
}

export function readCadence(): RefreshCadence {
    if (typeof window === 'undefined') return '30s';
    try {
        return safeCadence(window.localStorage.getItem(KEY));
    } catch {
        return '30s';
    }
}

export function writeCadence(c: RefreshCadence) {
    try {
        window.localStorage.setItem(KEY, c);
    } catch {
        // ignore
    }
}