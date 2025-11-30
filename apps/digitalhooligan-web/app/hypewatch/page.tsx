export const metadata = {
    title: "HypeWatch • Digital Hooligan",
    description:
        "HypeWatch is a lab experiment from Digital Hooligan — a small automation bot + app for display collectibles like graded cards, figures, watches, and magazines.",
};

export default function HypeWatchPage() {
    return (
        <main className="min-h-screen bg-dh-black text-slate-100">
            {/* Hero */}
            <section className="border-b border-dh-street-gray/60 bg-gradient-to-br from-dh-black via-black to-dh-electric-mint/10">
                <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                    <span className="inline-flex items-center rounded-full border border-dh-electric-mint/60 bg-dh-black/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-dh-electric-mint">
                        Hooligan Labs • Ops Toy • Bot + App
                    </span>

                    <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                        HypeWatch
                    </h1>

                    <p className="mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
                        A radar for the stuff that lives in the display case. HypeWatch
                        watches graded cards, figures, watches, magazines, and other
                        collectibles, tracks price moves, and lets you know when a piece
                        finally hits the range you said you&apos;d pay.
                    </p>

                    <div className="mt-8 grid gap-4 text-xs sm:text-sm sm:grid-cols-3">
                        <div className="rounded-xl border border-dh-street-gray/60 bg-dh-black/70 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                Built for
                            </p>
                            <p className="mt-2 font-medium text-slate-100">
                                Collectors, display-obsessed nerds, and deal hunters
                            </p>
                        </div>
                        <div className="rounded-xl border border-dh-street-gray/60 bg-dh-black/70 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                Format
                            </p>
                            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-slate-200">
                                Bot → Web app → Mobile apps
                            </p>
                            <p className="mt-1 text-xs text-slate-300">
                                Starts as a small automation bot and web surface watching your
                                grails. If it earns it, native apps follow on Apple App Store
                                and Google Play.
                            </p>
                        </div>
                        <div className="rounded-xl border border-dh-street-gray/60 bg-dh-black/70 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                Status & pricing
                            </p>
                            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-300">
                                Assist mode now • Grown-up later
                            </p>
                            <p className="mt-1 text-xs text-slate-300">
                                Today: alerts + deep links. Later: cleaner add-to-cart / bid
                                handoff on supported marketplaces with bot + app tiers at
                                different price points (pricing TBD).
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Overview */}
            <section
                id="overview"
                className="border-b border-dh-street-gray/60 bg-dh-black"
            >
                <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                    <div className="grid gap-10 lg:grid-cols-[3fr,2fr] lg:items-start">
                        <div>
                            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                                Watch the display market without living on auctions
                            </h2>
                            <p className="mt-3 text-sm text-slate-300 sm:text-[15px]">
                                Right now, keeping up with collectibles pricing usually means:
                            </p>
                            <ul className="mt-3 space-y-2 text-sm text-slate-300">
                                <li className="flex gap-2">
                                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
                                    <span>
                                        Bouncing between auction houses, marketplaces, and Discord
                                        screenshots to guess where floors really are.
                                    </span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
                                    <span>
                                        Bookmarking listings and{" "}
                                        <span className="text-slate-100">
                                            manually checking if they actually moved
                                        </span>{" "}
                                        or just relisted higher.
                                    </span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
                                    <span>
                                        Missing a clean slab or grail because you weren&apos;t on
                                        your phone at the right 10-minute window.
                                    </span>
                                </li>
                            </ul>
                            <p className="mt-4 text-sm text-slate-300 sm:text-[15px]">
                                HypeWatch flips that. You tell the bot{" "}
                                <span className="text-slate-100">
                                    which cards, figures, watches, or sets you care about and
                                    what range you&apos;re comfortable paying,
                                </span>{" "}
                                and it quietly keeps score for you.
                            </p>
                            <p className="mt-3 text-sm text-slate-300 sm:text-[15px]">
                                In early phases it lives in{" "}
                                <span className="text-slate-100">assist mode</span> — sending
                                you context and clean links so you can review and check out on
                                official marketplace and auction platforms yourself. If it earns
                                it, later phases explore a safe,{" "}
                                <span className="text-slate-100">
                                    grown-up add-to-cart / bid mode
                                </span>{" "}
                                on supported platforms, with different bot/app tiers and prices
                                once things are real (pricing TBD), and eventually mobile apps
                                if it deserves it.
                            </p>
                        </div>

                        <div className="space-y-3 rounded-2xl border border-dh-street-gray/60 bg-gradient-to-br from-black via-[#050711] to-[#060b12] p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Example watchlist
                            </p>
                            <div className="space-y-3 text-xs sm:text-sm">
                                <div className="flex items-center justify-between rounded-xl border border-dh-street-gray/60 bg-dh-black/80 px-4 py-3">
                                    <div>
                                        <p className="font-medium text-slate-100">
                                            PSA 10 rookie card
                                        </p>
                                        <p className="text-[11px] text-slate-400">
                                            Pop control • Last sold tracking
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[11px] text-slate-400">Target</p>
                                        <p className="text-sm font-semibold text-emerald-300">
                                            -15% vs 30d avg
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between rounded-xl border border-dh-street-gray/60 bg-dh-black/80 px-4 py-3">
                                    <div>
                                        <p className="font-medium text-slate-100">
                                            Limited run figure
                                        </p>
                                        <p className="text-[11px] text-slate-400">
                                            With box • Specific edition
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[11px] text-slate-400">Target</p>
                                        <p className="text-sm font-semibold text-emerald-300">
                                            &lt; $250
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between rounded-xl border border-dh-street-gray/60 bg-dh-black/80 px-4 py-3">
                                    <div>
                                        <p className="font-medium text-slate-100">
                                            Vintage magazine cover
                                        </p>
                                        <p className="text-[11px] text-slate-400">
                                            High grade • Key issue
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[11px] text-slate-400">Target</p>
                                        <p className="text-sm font-semibold text-emerald-300">
                                            &lt; $120
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <p className="pt-1 text-[11px] text-slate-500">
                                All examples. Actual integrations, marketplaces, and alert
                                channels are still in lab mode.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section
                id="how-it-works"
                className="border-b border-dh-street-gray/60 bg-[#05060a]"
            >
                <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                    <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                        How HypeWatch behaves in your stack
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-[15px]">
                        Think of HypeWatch as a little ops bot parked next to your display
                        case — watching feeds, crunching prices, and only bothering you
                        when something is genuinely interesting.
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/80 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                1 • You define the grails
                            </p>
                            <p className="mt-3 text-sm text-slate-200">
                                Pick the slabs, figures, watches, or sets you care about. Add
                                grade, edition, and the range you&apos;re willing to explore.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/80 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                2 • The bot watches the feeds
                            </p>
                            <p className="mt-3 text-sm text-slate-200">
                                Background jobs scan markets, auction results, and price
                                history, turning noisy listings into clean events with context.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/80 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                3 • You get the signal
                            </p>
                            <p className="mt-3 text-sm text-slate-200">
                                In assist mode, alerts land in one lane (email / DM style) with
                                links out to official marketplaces so you can check out or bid
                                yourself. Later, higher-tier plans may offer safe add-to-cart /
                                bid handoffs on supported platforms and eventually mobile flows.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who it's for */}
            <section
                id="who-for"
                className="border-b border-dh-street-gray/60 bg-dh-black"
            >
                <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                    <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                        Who HypeWatch is meant to enable
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-[15px]">
                        It&apos;s not a full trading desk. It&apos;s a focused bot + app
                        that protects you from missing obvious plays on the stuff you
                        actually display.
                    </p>

                    <div className="mt-6 grid gap-4 lg:grid-cols-3">
                        <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/80 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                                Card collectors
                            </p>
                            <p className="mt-2 text-sm text-slate-200">
                                Graded slabs, key rookies, short prints — let the bot watch pops
                                and floors while you enjoy the hobby.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/80 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
                                Figure & display nerds
                            </p>
                            <p className="mt-2 text-sm text-slate-200">
                                Figures, statues, vinyl, watches, mags — anything you pose in a
                                case can be tracked for soft spots and dips.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/80 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-300">
                                Ops-minded collectors
                            </p>
                            <p className="mt-2 text-sm text-slate-200">
                                You like small automation toys wired into your collection
                                workflow. HypeWatch turns FOMO into structured signals.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Roadmap / status */}
            <section
                id="roadmap"
                className="border-b border-dh-street-gray/60 bg-[#05060a]"
            >
                <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                    <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                        Lab status & rough roadmap
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-[15px]">
                        HypeWatch is deep in Digital Hooligan lab territory. The goal is a
                        small, opinionated tool — not a generic &quot;everything&quot;
                        marketplace scraper.
                    </p>

                    <div className="mt-6 grid gap-4 lg:grid-cols-3">
                        <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/80 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Now • Bot + web (assist mode)
                            </p>
                            <ul className="mt-3 space-y-2 text-sm text-slate-200">
                                <li>• Core concepts, UX, and flows being shaped.</li>
                                <li>• Market watching & alert logic sketched out.</li>
                                <li>
                                    • Focus on alerts with clean links out to official platforms.
                                </li>
                            </ul>
                        </div>

                        <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/80 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Next • Private alpha
                            </p>
                            <ul className="mt-3 space-y-2 text-sm text-slate-200">
                                <li>• Limited collectors with tight feedback loops.</li>
                                <li>• Tuning signal quality vs noise for each niche.</li>
                                <li>
                                    • Exploring safe add-to-cart / bid handoff flows on supported
                                    platforms using official integrations.
                                </li>
                            </ul>
                        </div>

                        <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/80 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Maybe later • Productized (bot + app tiers & mobile)
                            </p>
                            <ul className="mt-3 space-y-2 text-sm text-slate-200">
                                <li>
                                    • Public launch if it proves useful and non-sketchy for
                                    collectors.
                                </li>
                                <li>
                                    • Deeper integrations with marketplaces and grading/auction
                                    platforms people already trust.
                                </li>
                                <li>
                                    • Different bot/app tiers and eventual iOS + Android apps if
                                    it earns that level of investment (pricing TBD).
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section id="contact" className="bg-dh-black">
                <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                    <div className="rounded-2xl border border-dh-electric-mint/50 bg-gradient-to-r from-black via-[#020712] to-[#021510] p-[1px]">
                        <div className="flex flex-col gap-4 rounded-2xl bg-dh-black/95 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-7">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-dh-electric-mint">
                                    Early signal only
                                </p>
                                <h3 className="mt-2 text-lg font-semibold tracking-tight sm:text-xl">
                                    Want to help shape HypeWatch?
                                </h3>
                                <p className="mt-2 max-w-xl text-sm text-slate-300">
                                    If you care way too much about what&apos;s in your display
                                    case and like the idea of automation bots and apps doing the
                                    boring watching, reach out and mention{" "}
                                    <span className="font-semibold text-dh-electric-mint">
                                        &quot;HypeWatch alpha&quot;
                                    </span>
                                    .
                                </p>
                            </div>
                            <div className="shrink-0">
                                <a
                                    href="#contact"
                                    className="inline-flex items-center justify-center rounded-full border border-dh-electric-mint/70 bg-dh-electric-mint/10 px-4 py-2 text-sm font-medium text-dh-electric-mint shadow-[0_0_18px_rgba(30,255,203,0.4)] transition hover:bg-dh-electric-mint/20"
                                >
                                    Ping the Hooligan
                                </a>
                                <p className="mt-1 text-[11px] text-slate-500">
                                    Contact details are on the main site&apos;s contact section.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
