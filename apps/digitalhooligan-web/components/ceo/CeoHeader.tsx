// components/ceo/CeoHeader.tsx
"use client";

import * as React from "react";
import { CeoAiDrawer } from "./CeoAiDrawer";

export function CeoHeader() {
    const [aiOpen, setAiOpen] = React.useState(false);

    return (
        <>
            <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-20">
                <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-xs font-semibold text-emerald-300">
                            DH
                        </div>
                        <div>
                            <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                                Digital Hooligan
                            </div>
                            <div className="text-sm font-semibold text-slate-100">
                                CEO Dashboard
                            </div>
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center gap-3 text-xs font-medium text-slate-400">
                        <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-100">
                            Home
                        </span>
                        <a href="/ceo/tasks" className="rounded-full px-3 py-1 hover:bg-slate-800">
                            Tasks
                        </a>
                        <a href="/ceo/finance" className="rounded-full px-3 py-1 hover:bg-slate-800">
                            Finance
                        </a>
                        <a href="/ceo/deals" className="rounded-full px-3 py-1 hover:bg-slate-800">
                            Deals
                        </a>
                        <a href="/labs/hq" className="rounded-full px-3 py-1 hover:bg-slate-800">
                            Labs
                        </a>
                        <a href="/ops" className="rounded-full px-3 py-1 hover:bg-slate-800">
                            Ops HQ
                        </a>
                        <a href="/ceo/settings" className="rounded-full px-3 py-1 hover:bg-slate-800">
                            Settings
                        </a>
                    </nav>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setAiOpen(true)}
                            className="hidden sm:inline-flex items-center gap-1 rounded-full border border-emerald-400/60 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-100 hover:bg-emerald-500/20"
                        >
                            <span className="text-xs">🤖</span>
                            <span>Ask AI</span>
                        </button>

                        <div className="flex flex-col items-end gap-1">
                            <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-2 py-1">
                                <div className="h-6 w-6 rounded-full bg-slate-700 text-[10px] flex items-center justify-center">
                                    T
                                </div>
                                <div className="text-[11px] leading-tight">
                                    <div className="font-medium text-slate-100">Tez</div>
                                    <div className="text-[10px] text-slate-400">CEO • Owner</div>
                                </div>
                                <span className="text-[10px] text-slate-500">▼</span>
                            </div>
                            <a
                                href="/api/ceo/logout"
                                className="text-[10px] text-slate-500 hover:text-rose-300"
                            >
                                Log out
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            <CeoAiDrawer open={aiOpen} onClose={() => setAiOpen(false)} />
        </>
    );
}