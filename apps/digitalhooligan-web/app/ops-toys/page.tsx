import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ops Toys — Digital Hooligan Labs",
  description:
    "Ops Toys is a drawer full of tiny automation tools that make infra, logging, and dev workflows less painful.",
};

export default function OpsToysPage() {
  return (
    <main className="min-h-screen bg-black px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-10">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dh-electric-mint">
            Hooligan Labs · Experiment
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
            Ops Toys
          </h1>
          <p className="max-w-2xl text-pretty text-slate-300">
            A drawer full of tiny automation tools that keep infra, logging, and
            dev workflow less painful for real-world engineers.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-dh-offwhite">What it is</h2>
          <p className="max-w-3xl text-slate-300">
            Ops Toys is a bundle of bite-sized utilities: little loggers, health
            checks, alert shapers, and workflow helpers that plug into your
            existing stack instead of replacing it.
          </p>

          <ul className="list-disc space-y-2 pl-5 text-slate-300">
            <li>
              Tiny log search and summarization to speed up incident triage
            </li>
            <li>
              Health and status probes you can drop in front of services or cron
              jobs
            </li>
            <li>
              CI/CD helpers for version bumping, changelog generation, and
              release notes
            </li>
            <li>
              Notification shapers that turn noisy alerts into readable
              summaries
            </li>
            <li>
              Designed as a tool drawer, not yet another monolithic platform
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-dh-offwhite">
            How it works
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-dh-street-gray/40 bg-dh-black/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dh-electric-mint">
                Phase 1
              </p>
              <h3 className="mt-2 text-base font-semibold text-slate-50">
                Bots & scripts
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                CLI and scriptable toys that plug into logs, metrics, and
                pipelines.
              </p>
            </div>

            <div className="rounded-2xl border border-dh-street-gray/40 bg-dh-black/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dh-electric-mint">
                Phase 2
              </p>
              <h3 className="mt-2 text-base font-semibold text-slate-50">
                Web ops
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                A small web console to configure toys, view summaries, and
                manage integrations.
              </p>
            </div>

            <div className="rounded-2xl border border-dh-street-gray/40 bg-dh-black/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dh-electric-mint">
                Phase 3
              </p>
              <h3 className="mt-2 text-base font-semibold text-slate-50">
                Mobile ops
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Lightweight mobile view for on-call status, key logs, and
                summarized alerts.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-dh-offwhite">
            Current phase
          </h2>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-dh-electric-mint/60 bg-dh-electric-mint/10 px-3 py-1 text-xs font-medium text-dh-electric-mint">
            Discovery
          </span>
          <p className="max-w-3xl text-slate-300">
            We’re collecting the most painful ops and dev workflow chores and
            picking the first toys to ship.
          </p>
        </section>

        <section className="flex flex-wrap gap-3 border-t border-dh-street-gray/40 pt-6">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-dh-rebel-red px-5 py-2.5 text-sm font-semibold text-black shadow shadow-dh-rebel-red/30 transition hover:opacity-90"
          >
            Talk about Ops Toys
          </Link>

          <Link
            href="/labs"
            className="inline-flex items-center justify-center rounded-full border border-dh-electric-mint/70 bg-dh-electric-mint/10 px-5 py-2.5 text-sm font-medium text-dh-electric-mint transition hover:bg-dh-electric-mint/20"
          >
            Back to Hooligan Labs
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-dh-street-gray/60 bg-dh-black/60 px-5 py-2.5 text-sm font-medium text-dh-offwhite transition hover:border-dh-electric-mint/60 hover:text-dh-electric-mint"
          >
            Back to Home
          </Link>
        </section>
      </div>
    </main>
  );
}
