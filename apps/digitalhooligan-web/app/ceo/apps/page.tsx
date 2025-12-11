import { Suspense } from "react";
import { CeoAppsClient } from "./CeoAppsClient";

export default function CeoAppsPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-neutral-950 px-4 py-8 text-neutral-400">
                    <div className="mx-auto max-w-6xl">
                        <p className="text-sm">Loading CEO App Registry…</p>
                    </div>
                </div>
            }
        >
            <CeoAppsClient />
        </Suspense>
    );
}