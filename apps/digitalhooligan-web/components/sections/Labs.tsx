export default function Labs() {
    return (
        <section
            id="labs"
            className="border-b border-white/5 bg-black px-4 py-16 sm:px-6 md:py-20 lg:px-8"
        >
            <div className="mx-auto max-w-6xl space-y-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-balance text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
                            Hooligan Labs
                        </h2>
                        <p className="mt-2 max-w-xl text-sm text-slate-300 sm:text-base">
                            The internal playground where{" "}
                            <span className="font-medium text-slate-100">
                                PennyWize, DropSignal, HypeWatch, and Ops Toys
                            </span>{" "}
                            are born, broken, rebuilt, and promoted from “toy” to “product”.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-xs text-slate-300">
                        <p className="font-semibold text-slate-100">
                            Labs HQ · internal dashboards
                        </p>
                        <p className="mt-1">
                            /labs lists public-facing experiments, while{" "}
                            <span className="font-medium text-emerald-300">/labs/hq</span> is
                            the internal dashboard that tracks builds, pipelines, and ops.
                        </p>
                    </div>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                    <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                            EXPERIMENT TRACKS
                        </p>
                        <ul className="mt-2 space-y-1.5 text-sm text-slate-300">
                            <li>• Price-watching for sneakers & streetwear</li>
                            <li>• Collectible & slab price dashboards</li>
                            <li>• Penny-stock scrapers & signals</li>
                            <li>• Ops automation “toys” for infra and logging</li>
                        </ul>
                    </div>

                    <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                            PIPELINE
                        </p>
                        <ul className="mt-2 space-y-1.5 text-sm text-slate-300">
                            <li>• Phase 0: internal script or bot</li>
                            <li>• Phase 1: web app with dashboards</li>
                            <li>• Phase 2: mobile app (Apple & Google Play)</li>
                            <li>• Phase 3: API & automations for partners</li>
                        </ul>
                    </div>

                    <div className="space-y-3 rounded-2xl border border-emerald-500/40 bg-gradient-to-b from-emerald-500/15 via-slate-950 to-black p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                            DASHBOARD THINKING
                        </p>
                        <p className="text-sm text-slate-100">
                            Every experiment is wired into the internal{" "}
                            <span className="font-medium">CEO dashboard</span> so the studio
                            can see what&apos;s working, what&apos;s noisy, and what&apos;s
                            ready to show customers or gov/enterprise partners.
                        </p>
                        <div className="flex flex-wrap gap-2 text-[11px]">
                            <span className="rounded-full bg-black/60 px-3 py-1 text-slate-200">
                                CEO view: /ceo
                            </span>
                            <span className="rounded-full bg-black/60 px-3 py-1 text-slate-200">
                                Labs HQ: /labs/hq
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 text-xs">
                    <a
                        href="/labs"
                        className="inline-flex items-center rounded-full border border-slate-700 bg-slate-950 px-3.5 py-1.5 font-medium text-slate-100 hover:border-emerald-400/70"
                    >
                        Open Labs overview ↗
                    </a>
                    <a
                        href="/labs/hq"
                        className="inline-flex items-center rounded-full border border-slate-800 bg-black px-3.5 py-1.5 font-medium text-slate-200 hover:border-sky-400/70"
                    >
                        Internal Labs HQ (restricted) ↗
                    </a>
                </div>
            </div>
        </section>
    );
}