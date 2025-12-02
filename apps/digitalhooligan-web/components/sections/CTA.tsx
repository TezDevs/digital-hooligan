export default function CTA() {
    return (
        <section
            id="cta"
            className="border-b border-white/5 bg-gradient-to-r from-slate-950 via-black to-slate-950 px-4 py-14 sm:px-6 md:py-18 lg:px-8"
        >
            <div className="mx-auto max-w-6xl">
                <div className="overflow-hidden rounded-3xl border border-emerald-500/40 bg-gradient-to-r from-emerald-500/15 via-slate-950 to-fuchsia-500/15 p-[1px]">
                    <div className="flex flex-col gap-6 rounded-3xl bg-black/80 px-6 py-8 sm:px-8 sm:py-10 lg:flex-row lg:items-center lg:justify-between">
                        <div className="max-w-xl space-y-3">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-300">
                                READY WHEN YOU ARE
                            </p>
                            <h2 className="text-balance text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
                                Need a hooligan-minded builder for your next thing?
                            </h2>
                            <p className="text-sm text-slate-200 sm:text-base">
                                Whether it&apos;s a focused internal tool, a sneaker/collectible
                                data play, or a gov/enterprise dashboard, Digital Hooligan can
                                own the 0 → 1 build and keep the ops side from becoming chaos.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 text-sm lg:items-end">
                            <div className="flex flex-wrap gap-2">
                                <a
                                    href="/services"
                                    className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-black shadow shadow-emerald-500/40 transition hover:bg-emerald-300"
                                >
                                    Discuss a project
                                </a>
                                <a
                                    href="/labs"
                                    className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-black/70 px-4 py-2 text-sm font-semibold text-slate-100 hover:border-sky-400/70"
                                >
                                    Browse experiments
                                </a>
                            </div>
                            <p className="text-xs text-slate-300">
                                Prefer email? Jump down to{" "}
                                <a href="#contact" className="text-emerald-300 underline-offset-2 hover:underline">
                                    contact
                                </a>{" "}
                                and send a quick outline.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
