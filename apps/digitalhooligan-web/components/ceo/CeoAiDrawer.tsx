// components/ceo/CeoAiDrawer.tsx
"use client";

import * as React from "react";

interface CeoAiDrawerProps {
    open: boolean;
    onClose: () => void;
}

export function CeoAiDrawer({ open, onClose }: CeoAiDrawerProps) {
    if (!open) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40 bg-slate-900/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Panel */}
            <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-md border-l border-slate-800 bg-slate-950/95 shadow-2xl">
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
                        <div>
                            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                                Strategy AI
                            </div>
                            <div className="text-sm font-semibold text-slate-100">
                                CEO assistant (mock)
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-full border border-slate-700 bg-slate-900 px-2 py-1 text-[11px] text-slate-300 hover:bg-slate-800"
                        >
                            ESC
                        </button>
                    </div>

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 text-[12px]">
                        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                            <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Quick questions
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                                <button
                                    type="button"
                                    className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-left text-[11px] text-slate-200 hover:border-emerald-400/60 hover:bg-slate-900/80"
                                >
                                    What should I focus on today?
                                </button>
                                <button
                                    type="button"
                                    className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-left text-[11px] text-slate-200 hover:border-emerald-400/60 hover:bg-slate-900/80"
                                >
                                    Summarize my pipeline and risks.
                                </button>
                                <button
                                    type="button"
                                    className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-left text-[11px] text-slate-200 hover:border-emerald-400/60 hover:bg-slate-900/80"
                                >
                                    Where can I win revenue in the next 30 days?
                                </button>
                            </div>
                        </div>

                        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3 space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                    Ask anything
                                </div>
                                <span className="text-[10px] text-slate-500">
                                    Future: wired to real AI
                                </span>
                            </div>
                            <textarea
                                rows={4}
                                className="w-full rounded-lg border border-slate-800 bg-slate-950/80 px-3 py-2 text-[12px] text-slate-100 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500/60"
                                placeholder="Ex: Compare gov contracts vs freelance gigs for the next quarter..."
                            />
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-lg border border-emerald-400/70 bg-emerald-500/10 px-3 py-1.5 text-[12px] font-medium text-emerald-100 hover:bg-emerald-500/20"
                            >
                                Send to Strategy AI (mock)
                            </button>
                        </div>

                        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                            <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Notes / scratchpad
                            </div>
                            <p className="text-[11px] text-slate-400">
                                Later we can sync this section to a real notes store or GitHub issues.
                                For now it&apos;s just part of the UI.
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-slate-800 px-4 py-2 text-[10px] text-slate-500">
                        Strategy AI v0.1 (UI shell only) • Future: code assistant, ops assistant,
                        gov bid assistant.
                    </div>
                </div>
            </aside>
        </>
    );
}