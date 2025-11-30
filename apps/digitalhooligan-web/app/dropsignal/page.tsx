import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "DropSignal – Digital Hooligan Labs",
    description:
        "DropSignal tracks sneaker and streetwear prices, restocks, and quiet discounts with bot-powered monitoring.",
};

export default function DropSignalPage() {
    return (
        <main className="min-h-screen bg-dh-black text-dh-offwhite">
            <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                {/* Hero */}
                <header className="space-y-3">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-dh-electric-mint">
                        Hooligan Labs · Experiment
                    </p>
                    <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                        DropSignal
                    </h1>
                    <p className="text-sm leading-relaxed text-dh-street-gray">
                        A bot-powered radar for sneaker and streetwear deals before your
                        size disappears. Jordans, Kith, Mitchell &amp; Ness, and more.
                    </p>
                </header>

                {/* What it does */}
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold text-dh-offwhite">
                        What it does
                    </h2>
                    <p className="text-sm text-dh-street-gray">
                        DropSignal keeps an eye on the brands and silhouettes you care
                        about, watching for price dips, restocks, and quiet markdowns that
                        don&apos;t make the front page.
                    </p>
                    <ul className="space-y-2 text-sm text-dh-street-gray">
                        <li>
                            • Monitors sneaker and streetwear retailers for prices and
                            restocks.
                        </li>
                        <li>• Tracks price changes, restocks, and low-key discounts.</li>
                        <li>
                            • Lets you set alerts for specific models, sizes, or max price.
                        </li>
                        <li>
                            • Starts with “assist mode” alerts, later adds add-to-cart flows
                            via official integrations.
                        </li>
                        <li>
                            • Built for real humans using bots and apps at transparent, tiered
                            pricing (TBD).
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
                                Bots scrape prices, restocks, and in-stock sizes across
                                priority retailers.
                            </p>
                        </div>
                        <div className="rounded-xl border border-dh-street-gray/40 bg-dh-black/60 p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dh-electric-mint">
                                Phase 2
                            </p>
                            <h3 className="mt-2 text-sm font-semibold">Web app</h3>
                            <p className="mt-2 text-xs text-dh-street-gray">
                                A dashboard where you plug in grails, sizes, and price targets.
                                DropSignal handles the monitoring.
                            </p>
                        </div>
                        <div className="rounded-xl border border-dh-street-gray/40 bg-dh-black/60 p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dh-electric-mint">
                                Phase 3
                            </p>
                            <h3 className="mt-2 text-sm font-semibold">Mobile</h3>
                            <p className="mt-2 text-xs text-dh-street-gray">
                                Mobile notifications for &quot;price hit your target&quot; or
                                &quot;your size just restocked,&quot; with tighter retailer
                                integrations.
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
                            Discovery → Building
                        </span>
                    </div>
                    <p className="text-sm text-dh-street-gray">
                        We&apos;re mapping priority retailers, pricing tiers, and the first
                        assist-mode workflows before we get fancy with add-to-cart.
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
