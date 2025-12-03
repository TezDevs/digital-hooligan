// app/ceo/ai-hub/page.tsx
import type { Metadata } from "next";
import { CeoHeader } from "@/components/ceo/CeoHeader";

export const metadata: Metadata = {
    title: "CEO AI Hub | Digital Hooligan",
    description:
        "Home for Strategy AI and Ops AI assistants for the Digital Hooligan CEO dashboard."
};

export default function CeoAiHubPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50">
            <CeoHeader />

            <main className="mx-auto max-w-6xl px-4 py-6 space-y-4">
                {/* Top intro */}
                <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h1 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                            AI Hub
                        </h1>
                        <p className="mt-1 text-[12px] text-slate-400">
                            Central home for your AI assistants. Strategy AI keeps an eye on the
                            whole business; Ops AI dives into code, infra, and dashboards.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-[11px] text-slate-300">
                        <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1">
                            v1: mock layout &amp; prompts
                        </span>
                        <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1">
                            v2+: real AI wiring
                        </span>
                    </div>
                </header>

                {/* Two main assistants */}
                <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {/* Strategy AI */}
                    <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-3">
                        <div className="flex items-center justify-between gap-2">
                            <div>
                                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                    Strategy AI
                                </h2>
                                <p className="mt-1 text-[11px] text-slate-400">
                                    Big-picture helper. Looks across revenue, burn, runway, pipeline, and
                                    tasks to help decide what to do next.
                                </p>
                            </div>
                            <span className="rounded-full border border-emerald-500/60 bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-100">
                                CEO co-pilot
                            </span>
                        </div>

                        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-[11px] space-y-2">
                            <div className="text-[10px] font-semibold tracking-[0.2em] text-slate-500 uppercase">
                                Example questions
                            </div>
                            <ul className="space-y-1 text-slate-300">
                                <li>• &ldquo;Given my runway, can I take a smaller gov contract this month?&rdquo;</li>
                                <li>• &ldquo;Which app should I push next: PennyWize, DropSignal, HypeWatch, or Ops Toys?&rdquo;</li>
                                <li>• &ldquo;What 3 tasks should I tackle today to protect runway?&rdquo;</li>
                            </ul>
                            <p className="text-[10px] text-slate-500">
                                Future: this box becomes a real chat window tied to your CEO data (tasks,
                                deals, finance, dashboards).
                            </p>
                        </div>
                    </article>

                    {/* Ops AI */}
                    <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-3">
                        <div className="flex items-center justify-between gap-2">
                            <div>
                                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                    Ops AI
                                </h2>
                                <p className="mt-1 text-[11px] text-slate-400">
                                    Engineering &amp; infra helper. Focused on code reviews, refactors,
                                    dashboards, and small internal automations.
                                </p>
                            </div>
                            <span className="rounded-full border border-sky-500/60 bg-sky-500/10 px-2 py-1 text-[10px] text-sky-100">
                                Dev co-pilot
                            </span>
                        </div>

                        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-[11px] space-y-2">
                            <div className="text-[10px] font-semibold tracking-[0.2em] text-slate-500 uppercase">
                                Example requests
                            </div>
                            <ul className="space-y-1 text-slate-300">
                                <li>• &ldquo;Refactor this Next.js page for readability and performance.&rdquo;</li>
                                <li>• &ldquo;Suggest logging + metrics for DropSignal price checks.&rdquo;</li>
                                <li>• &ldquo;Draft a new Ops Toys idea based on recent errors.&rdquo;</li>
                            </ul>
                            <p className="text-[10px] text-slate-500">
                                Future: this panel can attach code snippets, logs, or metrics directly and
                                push changes into your repos.
                            </p>
                        </div>
                    </article>
                </section>

                {/* Mock playground area */}
                <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 pb-6 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                        <div>
                            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                Playground (mock)
                            </h2>
                            <p className="mt-1 text-[11px] text-slate-400">
                                A tiny preview of where AI interactions will live. No real calls yet —
                                just a sketch so we can design around it.
                            </p>
                        </div>
                        <span className="rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1 text-[10px] text-slate-400">
                            v1: static · v2: wired to backend
                        </span>
                    </div>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-[2fr_1fr] text-[11px]">
                        {/* Fake chat window */}
                        <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-950/80">
                            <div className="border-b border-slate-800 px-3 py-2 text-[10px] text-slate-500">
                                Conversation (mock)
                            </div>
                            <div className="flex-1 space-y-2 px-3 py-3 text-[11px]">
                                <div className="flex justify-end">
                                    <div className="max-w-[75%] rounded-lg bg-emerald-500/10 px-3 py-2 text-emerald-50">
                                        How much runway do I have if I keep spending like the last 30 days?
                                    </div>
                                </div>
                                <div className="flex justify-start">
                                    <div className="max-w-[75%] rounded-lg bg-slate-800 px-3 py-2 text-slate-100">
                                        Based on mock data, you have ~6–8 months of runway. When we connect
                                        to real finance data, this answer will update automatically.
                                    </div>
                                </div>
                            </div>
                            <div className="border-t border-slate-800 px-3 py-2 text-[10px] text-slate-500">
                                Input disabled in v1 — wiring real AI comes later.
                            </div>
                        </div>

                        {/* Context summary */}
                        <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 space-y-2">
                            <div className="text-[10px] font-semibold tracking-[0.2em] text-slate-500 uppercase">
                                Context AI will see
                            </div>
                            <ul className="space-y-1 text-[11px] text-slate-300">
                                <li>• High-level metrics from Overview (/ceo).</li>
                                <li>• Tasks &amp; focus from /ceo/tasks.</li>
                                <li>• Pipeline from /ceo/deals.</li>
                                <li>• Finance data (revenue, burn, runway) from /ceo/finance.</li>
                            </ul>
                            <p className="text-[10px] text-slate-500">
                                This helps you design exactly what the assistant should know and keeps
                                everything privacy-aware when we add real APIs.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}