import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "DropSignal · Digital Hooligan",
    description:
        "DropSignal is a sneaker and streetwear price-drop radar built to catch the right moment to buy, starting with assist-mode alerts.",
};

export default function DropSignalPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-slate-50">
            {/* Intro */}
            <section className="border-b border-white/5 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                <div className="mx-auto max-w-5xl space-y-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-300">
                        DROPSIGNAL · HOOLIGAN LABS
                    </p>
                    <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                        Sneaker & streetwear drops, without living in a dozen tabs.
                    </h1>
                    <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
                        DropSignal is a{" "}
                        <span className="font-medium text-slate-100">
                            price-drop radar for sneakers and streetwear
                        </span>{" "}
                        built by Digital Hooligan. It watches pairs and pieces you care
                        about, tracks price and stock changes, and sends{" "}
                        <span className="font-medium text-slate-100">
                            assist-mode alerts
                        </span>{" "}
                        when it&apos;s time to care.
                    </p>
                    <p className="max-w-2xl text-xs text-slate-400 sm:text-sm">
                        The long-term plan: start with{" "}
                        <span className="font-medium text-slate-100">
                            assist-mode notifications
                        </span>{" "}
                        and eventually graduate into{" "}
                        <span className="font-medium text-slate-100">
                            add-to-cart flows
                        </span>{" "}
                        for select retailers once the trust and systems are ready.
                    </p>
                </div>
            </section>

            {/* What DropSignal does */}
            <section className="border-b border-white/5 bg-slate-950/80 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)]">
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-slate-50">
                            What DropSignal actually does
                        </h2>
                        <p className="text-sm text-slate-300">
                            Instead of chasing timelines and random pings, DropSignal focuses
                            on{" "}
                            <span className="font-medium text-slate-100">
                                structured price and stock data
                            </span>{" "}
                            for the stuff you actually wear.
                        </p>
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li>
                                • <span className="font-medium text-slate-100">Tracks</span>{" "}
                                monitored items across chosen retailers and marketplaces.
                            </li>
                            <li>
                                • <span className="font-medium text-slate-100">Watches</span>{" "}
                                price drops, restocks, and size availability.
                            </li>
                            <li>
                                • <span className="font-medium text-slate-100">Alerts</span>{" "}
                                you in assist mode when something hits your rules.
                            </li>
                            <li>
                                • <span className="font-medium text-slate-100">Summarizes</span>{" "}
                                trends so you can see when it&apos;s better to chill or strike.
                            </li>
                            <li>
                                • Later, <span className="font-medium text-slate-100">
                                    suggests add-to-cart flows
                                </span>{" "}
                                for supported retailers when you say go.
                            </li>
                        </ul>
                    </div>

                    <aside className="space-y-3 rounded-2xl border border-slate-800 bg-black/80 p-4 text-xs text-slate-300">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                            IDEAL USERS
                        </p>
                        <ul className="space-y-1.5">
                            <li>• Sneakerheads who rotate pairs, not hoard Ls.</li>
                            <li>• Streetwear fans tracking brands like Kith, Mitchell & Ness.</li>
                            <li>• Collectors who want alerts without full-blown bot farms.</li>
                        </ul>
                        <p className="pt-2 text-[11px] text-slate-500">
                            Early versions are{" "}
                            <span className="font-medium text-slate-100">
                                Labs-first and invite-only
                            </span>
                            , with more details showing up here as the app matures.
                        </p>
                    </aside>
                </div>
            </section>

            {/* How it works: flow */}
            <section className="border-b border-white/5 bg-black px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                <div className="mx-auto max-w-5xl space-y-6">
                    <h2 className="text-lg font-semibold text-slate-50">
                        The DropSignal flow
                    </h2>
                    <div className="grid gap-4 md:grid-cols-4">
                        <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                                STEP 1
                            </p>
                            <h3 className="text-sm font-semibold text-slate-50">
                                Add your targets
                            </h3>
                            <p>
                                Add sneakers, streetwear, or caps you care about—from Jordans to
                                Kith collabs and Mitchell & Ness drops.
                            </p>
                        </div>
                        <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                                STEP 2
                            </p>
                            <h3 className="text-sm font-semibold text-slate-50">
                                Set rules
                            </h3>
                            <p>
                                Define what matters: price thresholds, size availability,
                                restock signals, or specific sales windows.
                            </p>
                        </div>
                        <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                                STEP 3
                            </p>
                            <h3 className="text-sm font-semibold text-slate-50">
                                Assist-mode alerts
                            </h3>
                            <p>
                                Get alerts with context so you can decide if it&apos;s a move or
                                a pass—no auto-checkouts, no surprise carts.
                            </p>
                        </div>
                        <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                                STEP 4
                            </p>
                            <h3 className="text-sm font-semibold text-slate-50">
                                Grown-up add-to-cart
                            </h3>
                            <p>
                                In later phases, connect select retailers so DropSignal can
                                walk you to checkout when you explicitly say yes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Roadmap & status (no CEO/AI text) */}
            <section className="border-b border-white/5 bg-slate-950 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)]">
                    <div className="space-y-3">
                        <h2 className="text-lg font-semibold text-slate-50">
                            Rollout roadmap
                        </h2>
                        <ol className="space-y-2 text-sm text-slate-300">
                            <li>
                                <span className="font-semibold text-slate-100">
                                    Phase 0 · Labs bot
                                </span>{" "}
                                – Internal scripts and bots inside Hooligan Labs, used to dial
                                in rules and alert quality.
                            </li>
                            <li>
                                <span className="font-semibold text-slate-100">
                                    Phase 1 · Web app
                                </span>{" "}
                                – A focused web UI for managing targets, rules, and alerts,
                                starting with invite-only access.
                            </li>
                            <li>
                                <span className="font-semibold text-slate-100">
                                    Phase 2 · Mobile apps
                                </span>{" "}
                                – iOS and Android builds so alerts land where you actually are.
                            </li>
                            <li>
                                <span className="font-semibold text-slate-100">
                                    Phase 3 · Retailer integrations
                                </span>{" "}
                                – Opt-in add-to-cart flows with official integrations for
                                select retailers, no shady bots.
                            </li>
                        </ol>
                    </div>

                    <aside className="space-y-3 rounded-2xl border border-slate-800 bg-black/80 p-4 text-xs text-slate-300">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                            CURRENT STATUS
                        </p>
                        <p>
                            DropSignal is{" "}
                            <span className="font-medium text-slate-100">
                                in Labs exploration
                            </span>
                            , with concepts and early systems under the hood. As it solidifies,
                            this page will reflect early access, supported retailers, and
                            real-world usage.
                        </p>
                    </aside>
                </div>
            </section>

            {/* CTA / navigation */}
            <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto flex max-w-5xl flex-col gap-4 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1 text-sm text-slate-200">
                        <p className="font-semibold text-slate-50">
                            Curious about DropSignal&apos;s future?
                        </p>
                        <p className="text-xs text-slate-400">
                            As the Labs builds solidify, expect early access, more detailed
                            dashboards, and carefully chosen integrations.
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