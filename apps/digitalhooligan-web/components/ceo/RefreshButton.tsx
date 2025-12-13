"use client";

import { useRouter } from "next/navigation";

export default function RefreshButton() {
    const router = useRouter();

    return (
        <button
            type="button"
            onClick={() => router.refresh()}
            className="inline-flex items-center justify-center rounded-lg bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 ring-1 ring-white/10 hover:bg-white/10"
            aria-label="Refresh performance data"
            title="Refresh"
        >
            Refresh
        </button>
    );
}