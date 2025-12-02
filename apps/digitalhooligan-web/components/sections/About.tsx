export default function About() {
    return (
        <section
            id="about"
            className="border-b border-white/5 bg-slate-950 px-4 py-16 sm:px-6 md:py-20 lg:px-8"
        >
            <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)] md:items-start">
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
                        About Digital Hooligan
                    </h2>
                    <p className="text-sm text-slate-300 sm:text-base">
                        Digital Hooligan LLC is a{" "}
                        <span className="font-medium text-slate-100">
                            single-member software studio
                        </span>{" "}
                        focused on web apps, SaaS tools, APIs, and automation. The goal:
                        build tools that feel a little rebellious on the surface, but are
                        rock-solid enough for{" "}
                        <span className="font-medium text-slate-100">
                            gov & enterprise teams
                        </span>{" "}
                        behind the scenes.
                    </p>
                    <p className="text-sm text-slate-300 sm:text-base">
                        The studio is led by an engineer and test manager with hands-on
                        experience in{" "}
                        <span className="font-medium text-slate-100">
                            defense and government programs
                        </span>
                        , used to rigorous requirements, high-availability systems, and
                        real-world constraints. That mindset shows up in how the apps, bots,
                        and dashboards are designed, tested, and monitored.
                    </p>
                    <p className="text-sm text-slate-300 sm:text-base">
                        Strategy is simple:{" "}
                        <span className="font-medium text-slate-100">
                            tool-first apps with a data layer
                        </span>{" "}
                        and a social layer built around what users are watching, buying, and
                        tracking — whether that&apos;s sneakers, collectibles, or stocks.
                    </p>

                    <div className="mt-4 grid gap-3 text-xs sm:grid-cols-3">
                        <div className="space-y-1 rounded-2xl border border-slate-800 bg-black/70 p-3">
                            <p className="font-semibold text-slate-100">Gov & enterprise</p>
                            <p className="text-slate-400">
                                NAICS 541511 · SAM.gov registration in progress · built with
                                compliance and paperwork in mind.
                            </p>
                        </div>
                        <div className="space-y-1 rounded-2xl border border-slate-800 bg-black/70 p-3">
                            <p className="font-semibold text-slate-100">Apps & automations</p>
                            <p className="text-slate-400">
                                Price-watching, alerts, dashboards, and ops automation toys that
                                evolve into full SaaS products.
                            </p>
                        </div>
                        <div className="space-y-1 rounded-2xl border border-slate-800 bg-black/70 p-3">
                            <p className="font-semibold text-slate-100">Long-term view</p>
                            <p className="text-slate-400">
                                Foundation today for future marketplaces, APIs, and B2B/B2G
                                integrations tomorrow.
                            </p>
                        </div>
                    </div>
                </div>

                <aside className="space-y-3 rounded-2xl border border-slate-800 bg-black/70 p-4 text-xs text-slate-300">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                        COMPANY SNAPSHOT
                    </p>
                    <dl className="mt-2 space-y-2">
                        <div>
                            <dt className="text-slate-400">Entity</dt>
                            <dd className="font-medium text-slate-100">
                                Digital Hooligan LLC · single-member
                            </dd>
                        </div>
                        <div>
                            <dt className="text-slate-400">Focus</dt>
                            <dd className="font-medium text-slate-100">
                                Software / web app development, SaaS, APIs, automation tools
                            </dd>
                        </div>
                        <div>
                            <dt className="text-slate-400">NAICS</dt>
                            <dd className="font-medium text-slate-100">541511 (Custom software)</dd>
                        </div>
                        <div>
                            <dt className="text-slate-400">Primary audiences</dt>
                            <dd className="font-medium text-slate-100">
                                Sneakerheads, collectors, traders, and operators · gov &
                                enterprise teams
                            </dd>
                        </div>
                    </dl>
                </aside>
            </div>
        </section>
    );
}