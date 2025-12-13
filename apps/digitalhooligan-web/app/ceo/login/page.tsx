import { Suspense } from "react";
import { CeoLoginClient } from "./CeoLoginClient";

export default function CeoLoginPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-neutral-950 px-4 py-8 text-neutral-400">
                    <div className="mx-auto max-w-md">
                        <p className="text-sm">Loading CEO entrance…</p>
                    </div>
                </div>
            }
        >
            <CeoLoginClient />
        </Suspense>
    );
}