export default function About() {
    return (
        <section
            id="about"
            className="border-t border-white/5 bg-slate-950 px-4 py-12 sm:px-6 md:py-16 lg:px-8"
        >
            <div className="mx-auto max-w-5xl space-y-8">
                {/* About copy */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
                        About Digital Hooligan
                    </h2>
                    <p className="text-sm text-slate-300 sm:text-base">
                        Digital Hooligan LLC is a{" "}
                        <span className="font-semibold text-slate-100">
                            single-member software studio
                        </span>{" "}
                        focused on web apps, SaaS tools, APIs, and automation. The goal:
                        build tools that feel a little rebellious on the surface, but are
                        rock-solid enough for gov &amp; enterprise teams behind the scenes.
                    </p>
                    <p className="text-sm text-slate-300 sm:text-base">
                        The studio is led by an engineer and test manager with hands-on
                        experience in{" "}
                        <span className="font-semibold text-slate-100">
                            defense and government programs
                        </span>
                        , used to rigorous requirements, high-availability systems, and
                        real-world constraints. That mindset shows up in how the apps, bots,
                        and dashboards are designed, tested, and monitored.
                    </p>
                    <p className="text-sm text-slate-300 sm:text-base">
                        Strategy is simple:{" "}
                        <span className="font-semibold text-slate-100">
                            tool-first apps with a data layer
                        </span>{" "}
                        and a social layer built around what users are watching, buying, and
                        tracking—whether that&apos;s sneakers, collectibles, or stocks.
                    </p>
                </div>

                {/* Top pills */}
                <div className="grid gap-3 md:grid-cols-3">
                    {/* Gov & enterprise */}
                    <div className="space-y-1 rounded-2xl border border-slate-800 bg-black/80 p-4">
                        <p className="text-xs font-semibold text-slate-50">
                            Gov &amp; enterprise
                        </p>
                        <p className="text-[11px] text-slate-300">
                            NAICS 541511 · SAM.gov registered · veteran-owned small business
                            (VSOB) operating under SBA small business standards, built with
                            compliance and paperwork in mind.
                        </p>
                    </div>

                    {/* Apps & automations */}
                    <div className="space-y-1 rounded-2xl border border-slate-800 bg-black/80 p-4">
                        <p className="text-xs font-semibold text-slate-50">
                            Apps &amp; automations
                        </p>
                        <p className="text-[11px] text-slate-300">
                            Price-watching, alerts, dashboards, and ops automation toys that
                            evolve into full SaaS products when they prove themselves.
                        </p>
                    </div>

                    {/* Long-term view */}
                    <div className="space-y-1 rounded-2xl border border-slate-800 bg-black/80 p-4">
                        <p className="text-xs font-semibold text-slate-50">Long-term view</p>
                        <p className="text-[11px] text-slate-300">
                            Foundation today for future marketplaces, APIs, and B2B/B2G
                            integrations tomorrow—starting small, but built to grow up.
                        </p>
                    </div>
                </div>

                {/* Company snapshot card */}
                <div className="space-y-3 rounded-3xl border border-slate-800 bg-black/80 p-5 sm:p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                        COMPANY SNAPSHOT
                    </p>
                    <div className="grid gap-4 text-xs text-slate-300 sm:grid-cols-2">
                        <div className="space-y-2">
                            <div>
                                <p className="font-medium text-slate-100">Entity</p>
                                <p>Digital Hooligan LLC · single-member</p>
                            </div>
                            <div>
                                <p className="font-medium text-slate-100">Ownership</p>
                                <p>Veteran-owned small business (VSOB)</p>
                            </div>
                            <div>
                                <p className="font-medium text-slate-100">SBA</p>
                                <p>
                                    Meets Small Business Administration (SBA) small business size
                                    standards for NAICS 541511
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div>
                                <p className="font-medium text-slate-100">Focus</p>
                                <p>Software / web app development, SaaS, APIs, automation tools</p>
                            </div>
                            <div>
                                <p className="font-medium text-slate-100">NAICS</p>
                                <p>541511 (Custom Computer Programming Services)</p>
                            </div>
                            <div>
                                <p className="font-medium text-slate-100">Primary audiences</p>
                                <p>
                                    Sneakerheads, collectors, traders, and operators · gov &amp;
                                    enterprise teams
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}