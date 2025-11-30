export const metadata = {
    title: "DropSignal • Digital Hooligan",
    description:
        "DropSignal is a lab experiment from Digital Hooligan — a small automation bot + app for sneakerheads and streetwear heads that watches the market and pings you when prices actually move.",
};

export default function DropSignalPage() {
    return (
        <main className="min-h-screen bg-dh-black text-slate-100">
            {/* Hero */}
            <section className="border-b border-dh-street-gray/60 bg-gradient-to-br from-dh-black via-black to-dh-electric-mint/10">
                <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                    <span className="inline-flex items-center rounded-full border border-dh-electric-mint/60 bg-dh-black/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-dh-electric-mint">
                        Hooligan Labs • Ops Toy • Bot + App
                    </span>

                    <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                        DropSignal
                    </h1>

                    <p className="mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
                        A radar for sneakerheads and streetwear heads. DropSignal watches
                        marketplaces and boutique sites, tracks price moves, and lets you
                        know when that Jordan, Kith drop, or Mitchell &amp; Ness jersey
                        finally hits your number — without living on refresh.
                    </p>

                    <div className="mt-8 grid gap-4 text-xs sm:text-sm sm:grid-cols-3">
                        <div className="rounded-xl border border-dh-street-gray/60 bg-dh-black/70 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                Built for
                            </p>
                            <p className="mt-2 font-medium text-slate-100">
                                Sneakerheads, streetwear addicts, and deal hunters
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
                                Starts as a small automation bot and web surface. If it earns
                                it, native apps follow on Apple App Store and Google Play.
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
                                Today: alerts + deep links. Later: cleaner add-to-cart handoff
                                on supported retailers with bot + app tiers at different price
                                points (pricing TBD).
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
                                Watch the market without babysitting tabs
                            </h2>
                            <p className="mt-3 text-sm text-slate-300 sm:text-[15px]">
                                Right now, staying on top of sneaker and streetwear prices
                                usually means:
                            </p>
                            <ul className="mt-3 space-y-2 text-sm text-slate-300">
                                <li className="flex gap-2">
                                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
                                    <span>
                                        Cycling between apps, boutiques, and marketplaces like{" "}
                                        <span className="text-slate-100">
                                            SNKRS, Kith, and resale platforms,
                                        </span>{" "}
                                        refreshing the same searches all day.
                                    </span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
                                    <span>
                                        Setting generic alerts that ping you on{" "}
                                        <span className="text-slate-100">every new listing</span>,
                                        even when the price is trash or way above ask.
                                    </span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
                                    <span>
                                        Missing the one clean undercut because you were actually{" "}
                                        <span className="text-slate-100">living real life</span>.
                                    </span>
                                </li>
                            </ul>
                            <p className="mt-4 text-sm text-slate-300 sm:text-[15px]">
                                DropSignal flips that. You tell the bot{" "}
                                <span className="text-slate-100">
                                    which pairs and pieces you care about and what you&apos;re
                                    willing to pay,
                                </span>{" "}
                                and it quietly watches for you.
                            </p>
                            <p className="mt-3 text-sm text-slate-300 sm:text-[15px]">
                                In early phases it lives in{" "}
                                <span className="text-slate-100">assist mode</span> — sending
                                you context and clean links so you can check out on official
                                retailer and marketplace sites yourself. If it earns it, later
                                phases explore a safe,{" "}
                                <span className="text-slate-100">
                                    grown-up add-to-cart mode
                                </span>{" "}
                                on supported platforms, with different bot/app tiers and prices
                                once things are real (pricing TBD), and eventually mobile apps
                                if that makes sense.
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
                                            Jordan 4 &quot;Fire Red&quot;
                                        </p>
                                        <p className="text-[11px] text-slate-400">
                                            Size 10 • DS • Market floor
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[11px] text-slate-400">Target</p>
                                        <p className="text-sm font-semibold text-emerald-300">
                                            &lt; $320
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between rounded-xl border border-dh-street-gray/60 bg-dh-black/80 px-4 py-3">
                                    <div>
                                        <p className="font-medium text-slate-100">
                                            Kith hoodie (seasonal drop)
                                        </p>
                                        <p className="text-[11px] text-slate-400">
                                            Size L • Specific colorway
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[11px] text-slate-400">Target</p>
                                        <p className="text-sm font-semibold text-emerald-300">
                                            -20% vs retail
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between rounded-xl border border-dh-street-gray/60 bg-dh-black/80 px-4 py-3">
                                    <div>
                                        <p className="font-medium text-slate-100">
                                            Mitchell &amp; Ness throwback jersey
                                        </p>
                                        <p className="text-[11px] text-slate-400">
                                            Team + player set • Size XL
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[11px] text-slate-400">Target</p>
                                        <p className="text-sm font-semibold text-emerald-300">
                                            &lt; $200
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <p className="pt-1 text-[11px] text-slate-500">
                                All examples. Actual integrations, retailers, and alert
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
                        How DropSignal behaves in your stack
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-[15px]">
                        Think of DropSignal as a little ops bot that sits next to your
                        sneaker and streetwear habit — watching feeds, crunching numbers,
                        and pinging you only when it matters.
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/80 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                1 • You set the hunt
                            </p>
                            <p className="mt-3 text-sm text-slate-200">
                                Pick the pairs, jerseys, and pieces you care about. Add size,
                                colorway, and your true max price or discount.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/80 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                2 • The bot watches the feeds
                            </p>
                            <p className="mt-3 text-sm text-slate-200">
                                Background jobs scan markets, boutiques, and price history,
                                turning noisy listings into clean &quot;worth a look&quot;
                                events.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/80 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                3 • You get the signal
                            </p>
                            <p className="mt-3 text-sm text-slate-200">
                                In assist mode, alerts hit a single lane (email / DM style) with
                                links out to official retailer or marketplace pages so you can
                                check out yourself. Later, grown-up modes explore safe
                                add-to-cart flows on supported platforms, likely as higher-tier
                                bot/app plans and eventually mobile app flows.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who it's for / Use cases */}
            <section
                id="who-for"
                className="border-b border-dh-street-gray/60 bg-dh-black"
            >
                <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                    <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                        Who DropSignal is meant to enable
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-[15px]">
                        It&apos;s not a full-blown trading terminal. It&apos;s a focused bot
                        + app that keeps you from missing obvious plays on pairs and pieces
                        you actually want to wear.
                    </p>

                    <div className="mt-6 grid gap-4 lg:grid-cols-3">
                        <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/80 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                                Sneakerheads
                            </p>
                            <p className="mt-2 text-sm text-slate-200">
                                You know your sizes and colorways. Let the bot babysit the
                                market while you touch grass and rock your rotation.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/80 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
                                Streetwear heads
                            </p>
                            <p className="mt-2 text-sm text-slate-200">
                                Hoodies, jerseys, and brand collabs — anything with drops,
                                restocks, and resale floors can be watched for soft spots.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/80 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-300">
                                Ops-minded nerds
                            </p>
                            <p className="mt-2 text-sm text-slate-200">
                                You like small automation toys wired into your life. Drops and
                                deals become another signal lane, not chaos.
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
                        DropSignal is still very much a Digital Hooligan lab experiment.
                        The goal is a small, opinionated tool — not an everything app.
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
                                    • Focus on alerts with clean links out to official retailers
                                    and marketplaces.
                                </li>
                            </ul>
                        </div>

                        <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/80 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Next • Private alpha
                            </p>
                            <ul className="mt-3 space-y-2 text-sm text-slate-200">
                                <li>• Limited test users with tight feedback loops.</li>
                                <li>• Tuning signal quality vs noise.</li>
                                <li>
                                    • Exploring safe add-to-cart handoff flows on supported
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
                                    users.
                                </li>
                                <li>
                                    • Deeper integrations with the shops and marketplaces people
                                    already trust.
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
                                    Want to help shape DropSignal?
                                </h3>
                                <p className="mt-2 max-w-xl text-sm text-slate-300">
                                    If you live in the sneaker or streetwear world and like the
                                    idea of automation bots and apps doing the boring watching,
                                    reach out and mention{" "}
                                    <span className="font-semibold text-dh-electric-mint">
                                        &quot;DropSignal alpha&quot;
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
