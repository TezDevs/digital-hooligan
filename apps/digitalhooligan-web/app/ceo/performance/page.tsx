import { Suspense } from "react";
import { CeoPerformanceClient } from "./CeoPerformanceClient";

export default function PerformancePage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-neutral-950 px-4 py-8 text-neutral-400">
                    <div className="mx-auto max-w-6xl">
                        <p className="text-sm">Loading CEO performance view…</p>
                    </div>
                </div>
            }
        >
            <CeoPerformanceClient />
        </Suspense>
    );
}