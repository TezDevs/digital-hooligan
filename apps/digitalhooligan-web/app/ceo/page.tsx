'use client'

import { useEffect, useMemo, useState } from 'react'

type Metric = {
    label: string
    value: number
}

const METRICS: Metric[] = [
    { label: 'Critical', value: 2 },
    { label: 'High', value: 1 },
    { label: 'Open', value: 0 },
    { label: 'Handled', value: 0 },
]

export default function CEOOverviewPage() {
    /**
     * Hydration guard
     * - Server render: mounted = false
     * - First client paint: mounted = false (matches server)
     * - After hydration: mounted = true
     */
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    /**
     * Memoized metrics
     * IMPORTANT:
     * - Values rendered on server MUST match first client render
     * - We only show real values AFTER mounted === true
     */
    const visibleMetrics = useMemo(() => {
        if (!mounted) {
            return METRICS.map((m) => ({
                ...m,
                value: 0,
            }))
        }

        return METRICS
    }, [mounted])

    return (
        <div className="p-6">
            <h1 className="text-xl font-semibold mb-4">CEO Overview</h1>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {visibleMetrics.map(({ label, value }) => (
                    <div
                        key={label}
                        className="rounded border border-white/10 bg-white/5 px-4 py-3"
                    >
                        <div className="text-xs text-white/60">{label}</div>
                        <div className="text-2xl font-semibold">
                            {mounted ? value : 0}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}