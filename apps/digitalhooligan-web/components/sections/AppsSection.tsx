"use client";

import React from "react";
import { AppGrid } from "./AppGrid";

export default function AppsSection() {
    return (
        <section
            id="apps"
            className="mt-6 space-y-4"
        >
            <header className="flex items-baseline justify-between gap-4">
                <div>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-dh-graffiti-yellow">
                        HOOLIGAN APPS
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-semibold">
                        Tools built under the Hooligan banner.
                    </h2>
                </div>
                <p className="hidden text-xs text-neutral-400 sm:block max-w-xs text-right">
                    Fast, focused, and a little unruly — each app is a tiny, sharp tool
                    for people who live in drops, charts, and alerts.
                </p>
            </header>

            <AppGrid />
        </section>
    );
}
