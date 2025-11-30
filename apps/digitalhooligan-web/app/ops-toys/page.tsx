import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Ops Toys – Digital Hooligan Labs",
    description:
        "Ops Toys is a drawer full of tiny automation tools that make infra, logging, and dev workflow less painful.",
};

export default function OpsToysPage() {
    return (
        <main className="min-h-screen bg-dh-black text-dh-offwhite">
            <div className="mx-auto flex max-w-4xl flex-col gap-12 px-4 py-16 sm:px-6 lg:px-8">
                {/* Hero */}
                <header className="space-y-3">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-dh-electric-mint">
                        Hooligan Labs · Experiment
                    </p>
                    <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                        Ops Toys
                    </h1>
                    <p className="max-w-2xl text-sm text-dh-street-gray sm:text-base">
                        A drawer full of tiny automation toys that keep infra, logging, and
                        dev workflow less painful for real-world engineers.
                    </p>
                </header>

                {/* What it does */}
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold text-dh-offwhite">
                        What it does
                    </h2>
                    <p className="text-sm text-dh-street-gray">
                        Ops Toys is a bundle of bite-sized utilities—log diggers, health
                        checkers, alert shapers, and workflow helpers—that plug into your
                        existing stack instead of replacing it.
                    </p>
                    <ul className="space-y-2 text-sm text-dh-street-gray">
                        <li>
                            • Tiny log-search and summarization toys to speed up incident
                            triage.
                        </li>
                        <li>
                            • Health and status probes you can drop in front of services or
                            cron jobs.
                        </li>
                        <li>
                            • CI/CD helpers for version bumping, changelog generation, and
                            release notes.
                        </li>
                        <li>
                            • Notification shapers that turn noisy alerts into readable
                            summaries.
                        </li>
                        <li>
                            • Designed as a tool drawer, not yet another monolithic platform.
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
                            <h3 className="mt-2 text-sm font-semibold">Bots &amp; scripts</h3>
                            <p className="mt-2 text-xs text-dh-street-gray">
                                CLI and scriptable toys that plug into logs, metrics, and
                                pipelines.
                            </p>
                        </div>
                        <div className="rounded-xl border border-dh-street-gray/40 bg-dh-black/60 p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dh-electric-mint">
                                Phase 2
                            </p>
                            <h3 className="mt-2 text-sm font-semibold">Web app</h3>
                            <p className="mt-2 text-xs text-dh-street-gray">
                                A small web console to configure toys, view summaries, and
                                manage integrations.
                            </p>
                        </div>
                        <div className="rounded-xl border border-dh-street-gray/40 bg-dh-black/60 p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dh-electric-mint">
                                Phase 3
                            </p>
                            <h3 className="mt-2 text-sm font-semibold">Mobile</h3>
                            <p className="mt-2 text-xs text-dh-street-gray">
                                Lightweight mobile views for on-call status, key logs, and
                                summarized alerts.
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
                        We&apos;re collecting the most painful ops and dev workflow chores
                        and picking the first toys to ship.
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
