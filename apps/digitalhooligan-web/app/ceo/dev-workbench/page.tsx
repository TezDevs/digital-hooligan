import { Suspense } from "react";
import { CeoDevWorkbenchClient } from "./CeoDevWorkbenchClient";

export default function DevWorkbenchPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-neutral-950 px-4 py-8 text-neutral-400">
                    <div className="mx-auto max-w-6xl">
                        <p className="text-sm">Loading Dev Workbench…</p>
                    </div>
                </div>
            }
        >
            <CeoDevWorkbenchClient />
        </Suspense>
    );
}