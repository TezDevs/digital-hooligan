'use client';

import * as React from 'react';
import { cadenceMs, readCadence, writeCadence, type RefreshCadence } from '@/lib/refreshCadence';

export default function RefreshCadenceControl() {
    const [cadence, setCadence] = React.useState<RefreshCadence>('30s');

    React.useEffect(() => {
        setCadence(readCadence('30s'));

        const onStorage = (e: StorageEvent) => {
            if (e.key === 'dh_refresh_cadence') setCadence(readCadence('30s'));
        };
        window.addEventListener('storage', onStorage);

        const onCustom = () => setCadence(readCadence('30s'));
        window.addEventListener('dh_refresh_cadence_changed', onCustom as EventListener);

        return () => {
            window.removeEventListener('storage', onStorage);
            window.removeEventListener('dh_refresh_cadence_changed', onCustom as EventListener);
        };
    }, []);

    const label = cadence === 'off' ? 'Off' : cadence;

    return (
        <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2 py-1">
            <span className="text-xs text-white/70">Refresh</span>

            <select
                value={cadence}
                onChange={(e) => {
                    const next = e.target.value as RefreshCadence;
                    setCadence(next);
                    writeCadence(next);
                }}
                className="rounded-lg border border-white/10 bg-black/20 px-2 py-1 text-xs text-white/85"
                title={cadenceMs(cadence) ? `Auto-refresh every ${label}` : 'Auto-refresh off'}
            >
                <option value="15s">15s</option>
                <option value="30s">30s</option>
                <option value="60s">60s</option>
                <option value="off">Off</option>
            </select>
        </div>
    );
}