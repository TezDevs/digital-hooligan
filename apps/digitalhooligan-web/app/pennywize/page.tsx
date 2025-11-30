import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "PennyWize – Digital Hooligan Labs",
    description:
        "PennyWize is the penny stock scraper that surfaces high-volatility tickers with real data instead of hype.",
};

export default function PennyWizePage() {
    return (
        <main className="min-h-screen bg-dh-black text-dh-offwhite">
            <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                {/* Hero */}
                <header className="space-y-3">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-dh-electric-mint">
                        Hooligan Labs · Experiment
                    </p>
                    <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                        PennyWize
                    </h1>
                    <p className="text-sm leading-relaxed text-dh-street-gray">
                        The penny stock scraper that digs through the sketchy corners of the
                        market so you don&apos;t have to. Surfacing high-volatility penny
                        stocks with real data instead of hype.
                    </p>
                </header>

                {/* What it does */}
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold text-dh-offwhite">
                        What it does
                    </h2>
                    <p className="text-sm text-dh-street-gray">
                        PennyWize is your always-on penny stock scout. It scrapes multiple
                        data sources for tiny tickers, then organizes the chaos into
                        something a human can actually read.
                    </p>
                    <ul className="space-y-2 text-sm text-dh-street-gray">
                        <li>• Scrapes price, volume, and volatility spikes across tickers.</li>
                        <li>
                            • Pulls in filings, news, and basic sentiment signals for quick
                            context.
                        </li>
                        <li>• Flags weird activity like sudden volume or unusual gaps.</li>
                        <li>• Helps you build watchlists to track tickers over time.</li>
                        <li>
                            • Designed as a tool-first workflow, not a social feed
                            (social layer comes later).
                        </li>
                    </ul>
                </section>

                {/* How it works */}
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold text-dh-offwhite">
                        How it works
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="rounded-xl border border-dh-street-gray/40 bg-dh-black/60 p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dh-electric-mint">
                                Phase 1
                            </p>
                            <h3 className="mt-2 text-sm font-semibold">Bot</h3>
                            <p className="mt-2 text-xs text-dh-street-gray">
                                Bots scrape data on a schedule, normalize it, and keep an
                                internal dataset fresh.
                            </p>
                        </div>
                        <div className="rounded-xl border border-dh-street-gray/40 bg-dh-black/60 p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dh-electric-mint">
                                Phase 2
                            </p>
                            <h3 className="mt-2 text-sm font-semibold">Web app</h3>
                            <p className="mt-2 text-xs text-dh-street-gray">
                                A dashboard where you filter by volume, price action, sector, or
                                risk level and save watchlists.
                            </p>
                        </div>
                        <div className="rounded-xl border border-dh-street-gray/40 bg-dh-black/60 p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dh-electric-mint">
                                Phase 3
                            </p>
                            <h3 className="mt-2 text-sm font-semibold">Mobile</h3>
                            <p className="mt-2 text-xs text-dh-street-gray">
                                Mobile alerts for wild moves, new filings, and custom penny
                                stock triggers.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Current phase */}
                <section className="space-y-3">
                    <h2 className="text-lg font-semibold text-dh-offwhite">
                        Current phase
                    </h2>
                    <div className="inline-flex items-center gap-2 rounded-full border border-dh-electric-mint/60 bg-dh-black/60 px-3 py-1 text-xs">
                        <span className="h-2 w-2 rounded-full bg-dh-electric-mint" />
                        <span className="font-semibold uppercase tracking-[0.2em]">
                            Building
                        </span>
                    </div>
                    <p className="text-sm text-dh-street-gray">
                        We&apos;re wiring up the scraping logic, data normalization, and
                        the first internal dashboards before opening this up wider.
                    </p>
                </section>

                {/* CTA */}
                <section className="flex flex-wrap gap-3 border-t border-dh-street-gray/40 pt-6">
                    <Link
                        href="/labs"
                        className="inline-flex items-center justify-center rounded-lg border border-dh-electric-mint/70 bg-dh-electric-mint/10 px-4 py-2 text-sm font-medium text-dh-electric-mint hover:bg-dh-electric-mint/20"
                    >
                        ← Back to Hooligan Labs
                    </Link>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-lg border border-dh-street-gray/60 px-4 py-2 text-sm font-medium text-dh-street-gray hover:border-dh-electric-mint/60 hover:text-dh-electric-mint"
                    >
                        ← Back to Home
                    </Link>
                </section>
            </div>
        </main>
    );
}
