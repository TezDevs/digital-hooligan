"use client";

import React from "react";

type PingState = "checking" | "ok" | "error";

export function HealthStatusChip() {
    const [state, setState] = React.useState<PingState>("checking");

    React.useEffect(() => {
        let cancelled = false;

        async function runCheck() {
            try {
                const res = await fetch("/api/health/ping");
                if (!res.ok) {
                    throw new Error(`Ping responded with ${res.status}`);
                }

                const data = (await res.json()) as { ok: boolean };

                if (cancelled) return;
                setState(data.ok ? "ok" : "error");
            } catch {
                if (!cancelled) {
                    setState("error");
                }
            }
        }

        // initial ping
        void runCheck();

        // light polling so the chip stays fresh
        const id = setInterval(() => {
            void runCheck();
        }, 60_000);

        return () => {
            cancelled = true;
            clearInterval(id);
        };
    }, []);

    let label = "Checking systems…";
    let ring = "ring-slate-700/80";
    let bg = "bg-slate-900/80";
    let text = "text-slate-200";

    if (state === "ok") {
        label = "Systems nominal";
        ring = "ring-emerald-500/70";
        bg = "bg-emerald-500/10";
        text = "text-emerald-200";
    } else if (state === "error") {
        label = "Check systems";
        ring = "ring-amber-500/80";
        bg = "bg-amber-500/10";
        text = "text-amber-100";
    }

    return (
        <span
            className={[
                "inline-flex items-center rounded-full px-3 py-1 text-[0.75rem] font-medium",
                "shadow-sm shadow-black/40",
                "transition-colors",
                bg,
                text,
                ring,
            ].join(" ")}
        >
            {label}
        </span>
    );
}