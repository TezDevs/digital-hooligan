import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "HypeWatch – Digital Hooligan Labs",
    description:
        "HypeWatch tracks prices for display-worthy collectibles: cards, figures, magazines, watches, and more.",
};

export default function HypeWatchPage() {
    return (
        <main className="min-h-screen bg-dh-black text-dh-offwhite">
            <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                {/* Hero */}
                <header className="space-y-3">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-dh-electric-mint">
                        Hooligan Labs · Experiment
                    </p>
                    <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                        HypeWatch
                    </h1>
                    <p className="text-sm leading-relaxed text-dh-street-gray">
                        Price tracking for collectibles you actually flex: cards, figures,
                        magazines, watches, and more.
                    </p>
                </header>

                {/* What it does */}
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold text-dh-offwhite">
                        What it does
                    </h2>
                    <p className="text-sm text-dh-street-gray">
                        HypeWatch is a collector&apos;s sidekick. It watches market prices
                        across platforms and categories, then rolls everything into a simple
                        view of how your grails are moving.
                    </p>
                    <ul className="space-y-2 text-sm text-dh-street-gray">
                        <li>
                            • Tracks graded cards, figures, magazines, watches, and other
                            display-piece collectibles.
                        </li>
                        <li>
                            • Follows market prices, recent sales, and trending value ranges.
                        </li>
                        <li>
                            • Helps you log your collection and see portfolio value shifts
                            over time.
                        </li>
                        <li>• Alerts you when a target grail dips into your buy range.</li>
                        <li>
                            • Built to eventually support a social layer around collections
                            and watchlists.
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
                                Collects sale data and price ranges from marketplaces and
                                reference sites.
                            </p>
                        </div>
                        <div className="rounded-xl border border-dh-street-gray/40 bg-dh-black/60 p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dh-electric-mint">
                                Phase 2
                            </p>
                            <h3 className="mt-2 text-sm font-semibold">Web app</h3>
                            <p className="mt-2 text-xs text-dh-street-gray">
                                Dashboard to manage your collection, see value trends, and set
                                price alerts per item.
                            </p>
                        </div>
                        <div className="rounded-xl border border-dh-street-gray/40 bg-dh-black/60 p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dh-electric-mint">
                                Phase 3
                            </p>
                            <h3 className="mt-2 text-sm font-semibold">Mobile</h3>
                            <p className="mt-2 text-xs text-dh-street-gray">
                                Pocket tracker with notifications for key price moves and new
                                sales in your categories.
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
                            Discovery
                        </span>
                    </div>
                    <p className="text-sm text-dh-street-gray">
                        We&apos;re validating which collectible categories and marketplaces
                        matter most and sketching out the collection dashboard.
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
