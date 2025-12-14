'use client';

import * as React from 'react';
import { readCadence, writeCadence, type RefreshCadence } from '@/lib/refreshCadence';

function emitCadenceChanged(c: RefreshCadence) {
    window.dispatchEvent(new CustomEvent('dh:cadence', { detail: c }));
}

export default function RefreshCadenceControl() {
    const [cadence, setCadence] = React.useState<RefreshCadence>('30s');

    React.useEffect(() => {
        setCadence(readCadence());
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const next = e.target.value as RefreshCadence;
        setCadence(next);
        writeCadence(next);
        emitCadenceChanged(next);
    };

    return (
        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
            <div className="text-xs font-semibold text-white/70">Refresh</div>
            <select
                value={cadence}
                onChange={onChange}
                className="rounded-lg border border-white/10 bg-black/30 px-2 py-1 text-xs text-white/85"
            >
                <option value="off">Off</option>
                <option value="30s">30s</option>
                <option value="60s">60s</option>
            </select>
        </div>
    );
}