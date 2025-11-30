export const metadata = {
    title: "PennyWize • Digital Hooligan",
    description:
        "PennyWize is a lab-born web app from Digital Hooligan — a penny stock scraper and radar for sketchy-but-interesting tickers trading under a few bucks.",
};

export default function PennyWizePage() {
    return (
        <main className="min-h-screen bg-dh-black text-slate-100">
            {/* Hero */}
            <section className="border-b border-dh-street-gray/60 bg-gradient-to-br from-dh-black via-black to-dh-electric-mint/10">
                <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                    <span className="inline-flex items-center rounded-full border border-dh-electric-mint/60 bg-dh-black/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-dh-electric-mint">
                        Hooligan Labs • Web App
                    </span>

                    <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                        PennyWize
                    </h1>

                    <p className="mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
                        A penny stock scraper for people who like digging in the sketchy
                        end of the market. PennyWize pulls together cheap tickers, volume
                        spikes, and weird moves so you can see what&apos;s waking up
                        without living inside 10 broker tabs.
                    </p>

                    <div className="mt-8 grid gap-4 text-xs sm:text-sm sm:grid-cols-3">
                        <div className="rounded-xl border border-dh-street-gray/60 bg-dh-black/70 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                Built for
                            </p>
                            <p className="mt-2 font-medium text-slate-100">
                                Retail traders who watch sub-$5 tickers and odd movers
                            </p>
                        </div>
                        <div className="rounded-xl border border-dh-street-gray/60 bg-dh-black/70 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                Format
                            </p>
                            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-slate-200">
                                Web app now • Mobile later
                            </p>
                            <p className="mt-1 text-xs text-slate-300">
                                Starts as a browser dashboard. If it earns it, a mobile app
                                follows on Apple App Store and Google Play.
                            </p>
                        </div>
                        <div className="rounded-xl border border-dh-street-gray/60 bg-dh-black/70 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                Status
                            </p>
                            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-300">
                                Lab prototype • Not advice
                            </p>
                            <p className="mt-1 text-xs text-slate-300">
                                Helps you see flows and weirdness. What you do with it is on
                                you — not a broker, not a signal service.
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
                                Scrape the cheap seats without frying your brain
                            </h2>
                            <p className="mt-3 text-sm text-slate-300 sm:text-[15px]">
                                If you watch penny stocks, you already know the pain:
                            </p>
                            <ul className="mt-3 space-y-2 text-sm text-slate-300">
                                <li className="flex gap-2">
                                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
                                    <span>
                                        Broker screens and watchlists that{" "}
                                        <span className="text-slate-100">
                                            bury cheap tickers under everything else.
                                        </span>
                                    </span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
                                    <span>
                                        Manually sorting for movers, volume spikes, or news in{" "}
                                        <span className="text-slate-100">
                                            multiple tabs and scanners.
                                        </span>
                                    </span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
                                    <span>
                                        Seeing a ticker after it already ran because you were busy
                                        with real life.
                                    </span>
                                </li>
                            </ul>
                            <p className="mt-4 text-sm text-slate-300 sm:text-[15px]">
                                PennyWize is a{" "}
                                <span className="text-slate-100">
                                    penny stock scraper and dashboard
                                </span>{" "}
                                that keeps eyes on the bottom of the market — cheap names,
                                odd volume, weird percent moves — so you can scan once and get
                                back to work.
                            </p>
                            <p className="mt-3 text-sm text-slate-400 sm:text-[13px]">
                                Nothing here is a trade recommendation, target, or guarantee.
                                It&apos;s just structured information for adults who make their
                                own calls.
                            </p>
                        </div>

                        <div className="space-y-3 rounded-2xl border border-dh-street-gray/60 bg-gradient-to-br from-black via-[#050711] to-[#060b12] p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Example board view
                            </p>
                            <div className="space-y-3 text-xs sm:text-sm">
                                <div className="rounded-xl border border-dh-street-gray/60 bg-dh-black/80 p-4">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                        Scanner tiles
                                    </p>
                                    <p className="mt-2 text-sm text-slate-200">
                                        Columns for price, % change, volume vs average, float,
                                        sector, and basic flags like &quot;news&quot; or
                                        &quot;halt history&quot;.
                                    </p>
                                </div>
                                <div className="rounded-xl border border-dh-street-gray/60 bg-dh-black/80 p-4">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                        Saved watchlists
                                    </p>
                                    <p className="mt-2 text-sm text-slate-200">
                                        Keep your own bucket of tickers and let the app surface
                                        the ones actually moving today.
                                    </p>
                                </div>
                                <div className="rounded-xl border border-dh-street-gray/60 bg-dh-black/80 p-4">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                        Future: light alerts
                                    </p>
                                    <p className="mt-2 text-sm text-slate-200">
                                        If it earns it, basic alerts and mobile notifications sit
                                        on top of the web app and later the mobile app.
                                    </p>
                                </div>
                            </div>
                            <p className="pt-1 text-[11px] text-slate-500">
                                All examples. Data sources, brokers, and alert channels are
                                still in lab mode.
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
                        How PennyWize behaves in your stack
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-[15px]">
                        Think of PennyWize as a focused web app that lives next to your
                        broker and charting tools — scraping, sorting, and surfacing the
                        cheap stuff so your main tools stay clean.
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/80 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                1 • You set the filters
                            </p>
                            <p className="mt-3 text-sm text-slate-200">
                                Define what &quot;penny&quot; means to you — price range,
                                volume thresholds, sectors you care about, and danger zones
                                you avoid.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/80 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                2 • The app scrapes & surfaces
                            </p>
                            <p className="mt-3 text-sm text-slate-200">
                                Background jobs pull data from supported sources, then the web
                                app arranges it into boards and views that make scan time fast.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/80 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                3 • Later: alerts & mobile
                            </p>
                            <p className="mt-3 text-sm text-slate-200">
                                If the core feels right, PennyWize grows into light alerting
                                and eventually companion mobile apps on iOS and Android —
                                carrying your boards in your pocket.
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
                        Who PennyWize is meant to enable
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-[15px]">
                        It&apos;s not a broker. It&apos;s a helper that keeps the penny
                        side of your world organized.
                    </p>

                    <div className="mt-6 grid gap-4 lg:grid-cols-3">
                        <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/80 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                                Penny hunters
                            </p>
                            <p className="mt-2 text-sm text-slate-200">
                                You&apos;re comfortable with risk and volatility, you just
                                want better visibility into the chaos.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/80 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
                                Pattern spotters
                            </p>
                            <p className="mt-2 text-sm text-slate-200">
                                You care about flows more than hype. Boards help you see what
                                keeps repeating.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/80 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-300">
                                Ops-minded traders
                            </p>
                            <p className="mt-2 text-sm text-slate-200">
                                You like tools that do one thing well and plug into the stack
                                you already use.
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
                        PennyWize is a Digital Hooligan lab project. The entire point is to
                        test whether a focused penny stock scraper actually earns a place in
                        your daily routine.
                    </p>

                    <div className="mt-6 grid gap-4 lg:grid-cols-3">
                        <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/80 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Now • Web prototype
                            </p>
                            <ul className="mt-3 space-y-2 text-sm text-slate-200">
                                <li>• Core scraping ideas and board views.</li>
                                <li>• Validating if the UX is actually helpful.</li>
                                <li>• No promises, no polished edges.</li>
                            </ul>
                        </div>

                        <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/80 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Next • Stronger web app
                            </p>
                            <ul className="mt-3 space-y-2 text-sm text-slate-200">
                                <li>• Cleaner filters and saved views.</li>
                                <li>• Experimental alerts and basic notifications.</li>
                                <li>• Deeper integration with your daily workflow.</li>
                            </ul>
                        </div>

                        <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/80 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Maybe later • Mobile apps
                            </p>
                            <ul className="mt-3 space-y-2 text-sm text-slate-200">
                                <li>
                                    • Native apps for Apple App Store and Google Play if the web
                                    app earns it.
                                </li>
                                <li>• Carry your boards + alerts in your pocket.</li>
                                <li>• Pricing and tiers TBD once it&apos;s real.</li>
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
                                    Early lab only
                                </p>
                                <h3 className="mt-2 text-lg font-semibold tracking-tight sm:text-xl">
                                    Want to help shape PennyWize?
                                </h3>
                                <p className="mt-2 max-w-xl text-sm text-slate-300">
                                    If you live in penny land and want a cleaner way to see
                                    what&apos;s moving, reach out and mention{" "}
                                    <span className="font-semibold text-dh-electric-mint">
                                        &quot;PennyWize alpha&quot;
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
