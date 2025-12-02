import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "PennyWize · Digital Hooligan",
    description:
        "PennyWize is a penny stock scraper that turns noisy tickers into watchlists, alerts, and a social layer around the data.",
};

export default function PennyWizePage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-slate-50">
            {/* Intro */}
            <section className="border-b border-white/5 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                <div className="mx-auto max-w-5xl space-y-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-300">
                        PENNYWIZE · HOOLIGAN LABS
                    </p>
                    <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                        Penny stock noise, turned into something you can actually use.
                    </h1>
                    <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
                        PennyWize is a{" "}
                        <span className="font-medium text-slate-100">
                            penny stock scraper and signal surface
                        </span>{" "}
                        built by Digital Hooligan. It watches noisy tickers, cleans the
                        data up, and turns it into watchlists, alerts, and—eventually—a
                        social layer around what traders are actually looking at.
                    </p>
                    <p className="max-w-2xl text-xs text-slate-400 sm:text-sm">
                        It starts as a{" "}
                        <span className="font-medium text-slate-100">
                            Labs experiment
                        </span>{" "}
                        and graduates into a proper web + mobile app once the flows are
                        dialed in.
                    </p>
                </div>
            </section>

            {/* What PennyWize does */}
            <section className="border-b border-white/5 bg-slate-950/80 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)]">
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-slate-50">
                            What PennyWize actually does
                        </h2>
                        <p className="text-sm text-slate-300">
                            Instead of chasing random callouts, PennyWize focuses on{" "}
                            <span className="font-medium text-slate-100">
                                structured penny stock data
                            </span>{" "}
                            and shows you the story behind your watchlists.
                        </p>
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li>
                                • <span className="font-medium text-slate-100">Scrapes</span>{" "}
                                penny stock tickers and key stats from configured sources.
                            </li>
                            <li>
                                • <span className="font-medium text-slate-100">Cleans</span>{" "}
                                and normalizes the data so signals are easier to compare.
                            </li>
                            <li>
                                • <span className="font-medium text-slate-100">Builds</span>{" "}
                                watchlists around themes, sectors, or patterns you care about.
                            </li>
                            <li>
                                • <span className="font-medium text-slate-100">Alerts</span>{" "}
                                when something moves or crosses thresholds you set.
                            </li>
                            <li>
                                • Eventually <span className="font-medium text-slate-100">
                                    shares
                                </span>{" "}
                                anonymized heatmaps and feeds so you&apos;re not trading alone.
                            </li>
                        </ul>
                    </div>

                    <aside className="space-y-3 rounded-2xl border border-slate-800 bg-black/80 p-4 text-xs text-slate-300">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                            IDEAL USERS
                        </p>
                        <ul className="space-y-1.5">
                            <li>• Traders who live in the penny stock corner of the market.</li>
                            <li>• People who want data-first tools, not hype-first chats.</li>
                            <li>• Builders who want a clean API surface later.</li>
                        </ul>
                        <p className="pt-2 text-[11px] text-slate-500">
                            Initial versions are focused on{" "}
                            <span className="font-medium text-slate-100">
                                internal use and small test groups
                            </span>
                            , wired straight into Hooligan Labs and the CEO dashboard.
                        </p>
                    </aside>
                </div>
            </section>

            {/* How it works: flow */}
            <section className="border-b border-white/5 bg-black px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                <div className="mx-auto max-w-5xl space-y-6">
                    <h2 className="text-lg font-semibold text-slate-50">
                        The PennyWize flow
                    </h2>
                    <div className="grid gap-4 md:grid-cols-4">
                        <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                                STEP 1
                            </p>
                            <h3 className="text-sm font-semibold text-slate-50">
                                Ingest & scrape
                            </h3>
                            <p>
                                Bring in penny stock tickers and stats from configured
                                sources—designed to be swappable over time.
                            </p>
                        </div>
                        <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                                STEP 2
                            </p>
                            <h3 className="text-sm font-semibold text-slate-50">
                                Clean & score
                            </h3>
                            <p>
                                Normalize, filter, and score the data so your watchlists reflect
                                real conditions instead of raw noise.
                            </p>
                        </div>
                        <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                                STEP 3
                            </p>
                            <h3 className="text-sm font-semibold text-slate-50">
                                Watchlists & alerts
                            </h3>
                            <p>
                                Build watchlists by theme, then set alerts around moves,
                                volume, or other conditions that matter to you.
                            </p>
                        </div>
                        <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                                STEP 4
                            </p>
                            <h3 className="text-sm font-semibold text-slate-50">
                                Feed & social layer
                            </h3>
                            <p>
                                Over time, surface anonymized activity and shared feeds so you
                                can see where attention is clustering.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Roadmap & phases */}
            <section className="border-b border-white/5 bg-slate-950 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)]">
                    <div className="space-y-3">
                        <h2 className="text-lg font-semibold text-slate-50">
                            Rollout roadmap
                        </h2>
                        <ol className="space-y-2 text-sm text-slate-300">
                            <li>
                                <span className="font-semibold text-slate-100">
                                    Phase 0 · Internal bot
                                </span>{" "}
                                – CLI / script-based tools inside Hooligan Labs, used only by
                                the studio to prove value.
                            </li>
                            <li>
                                <span className="font-semibold text-slate-100">
                                    Phase 1 · Web app
                                </span>{" "}
                                – A focused web experience for managing watchlists and viewing
                                signals, with early testers.
                            </li>
                            <li>
                                <span className="font-semibold text-slate-100">
                                    Phase 2 · Mobile apps
                                </span>{" "}
                                – iOS and Android versions once the flows are stable enough to
                                live in people&apos;s pockets.
                            </li>
                            <li>
                                <span className="font-semibold text-slate-100">
                                    Phase 3 · API & integrations
                                </span>{" "}
                                – API access and integrations for builders who want to wire
                                PennyWize data into their own tools.
                            </li>
                        </ol>
                    </div>

                    <aside className="space-y-3 rounded-2xl border border-slate-800 bg-black/80 p-4 text-xs text-slate-300">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                            TIED INTO THE CEO DASHBOARD
                        </p>
                        <p>
                            Inside <span className="font-medium text-slate-100">/ceo</span>,
                            PennyWize shows up as:
                        </p>
                        <ul className="mt-1 space-y-1.5">
                            <li>• A card with current build status and milestones.</li>
                            <li>• Tasks associated with upcoming features and fixes.</li>
                            <li>• A future “PennyWize health” snapshot: uptime, jobs, errors.</li>
                        </ul>
                        <p className="pt-2 text-[11px] text-slate-500">
                            The AI assistant will use this data to suggest what to work on
                            next, how to schedule tasks, and when to push PennyWize closer to
                            launch.
                        </p>
                    </aside>
                </div>
            </section>

            {/* CTA / navigation */}
            <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto flex max-w-5xl flex-col gap-4 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1 text-sm text-slate-200">
                        <p className="font-semibold text-slate-50">
                            Want to build around PennyWize?
                        </p>
                        <p className="text-xs text-slate-400">
                            In the future, there will be early tester slots and API access
                            for builders who want to play with the data.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                        <Link
                            href="/#contact"
                            className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-4 py-2 font-semibold text-black shadow shadow-emerald-500/40 hover:bg-emerald-300"
                        >
                            Contact Digital Hooligan
                        </Link>
                        <Link
                            href="/labs"
                            className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950 px-4 py-2 font-semibold text-slate-100 hover:border-emerald-400/70"
                        >
                            Back to Hooligan Labs
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}