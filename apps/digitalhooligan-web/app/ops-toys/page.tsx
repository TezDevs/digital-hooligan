import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ops Toys — Digital Hooligan Labs",
  description:
    "Ops Toys is a drawer full of tiny automation tools that make infra, logging, and dev workflows less painful.",
};

const primaryCta =
  "inline-flex items-center justify-center rounded-full bg-dh-rebel-red px-5 py-2.5 text-sm font-semibold text-white shadow shadow-dh-rebel-red/30 transition hover:bg-dh-rebel-red/90";
const neutralCta =
  "inline-flex items-center justify-center rounded-full border border-dh-border bg-transparent px-5 py-2.5 text-sm font-semibold text-dh-text transition hover:bg-white/5";

export default function OpsToysPage() {
  return (
    <main className="min-h-screen bg-dh-carbon px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dh-steel-blue">
            Hooligan Labs · Experiment
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-dh-text sm:text-4xl">
            Ops Toys
          </h1>
          <p className="max-w-2xl text-pretty text-dh-muted">
            A drawer full of tiny automation tools that keep infra, logging, and
            dev workflow less painful for real-world engineers.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-dh-text">What it is</h2>
          <p className="max-w-3xl text-dh-muted">
            Ops Toys is a bundle of bite-sized utilities: little loggers, health
            checks, alert shapers, and workflow helpers that plug into your
            existing stack instead of replacing it.
          </p>

          <ul className="list-disc space-y-2 pl-5 text-dh-muted">
            <li>Tiny log search and summarization to speed up incident triage</li>
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
            <li>Designed as a tool drawer, not yet another monolithic platform</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-dh-text">How it works</h2>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-dh-border bg-dh-panel/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dh-steel-blue">
                Phase 1
              </p>
              <h3 className="mt-2 text-base font-semibold text-dh-text">
                Bots &amp; scripts
              </h3>
              <p className="mt-2 text-sm text-dh-muted">
                CLI and scriptable toys that plug into logs, metrics, and
                pipelines.
              </p>
            </div>

            <div className="rounded-2xl border border-dh-border bg-dh-panel/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dh-steel-blue">
                Phase 2
              </p>
              <h3 className="mt-2 text-base font-semibold text-dh-text">
                Web ops
              </h3>
              <p className="mt-2 text-sm text-dh-muted">
                A small web console to configure toys, view summaries, and
                manage integrations.
              </p>
            </div>

            <div className="rounded-2xl border border-dh-border bg-dh-panel/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dh-steel-blue">
                Phase 3
              </p>
              <h3 className="mt-2 text-base font-semibold text-dh-text">
                Mobile ops
              </h3>
              <p className="mt-2 text-sm text-dh-muted">
                Lightweight mobile view for on-call status, key logs, and
                summarized alerts.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-dh-text">Current phase</h2>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-dh-steel-blue/60 bg-dh-steel-blue/10 px-3 py-1 text-xs font-semibold text-dh-steel-blue">
            Discovery
          </span>
          <p className="max-w-3xl text-dh-muted">
            We’re collecting the most painful ops and dev workflow chores and
            picking the first toys to ship.
          </p>
        </section>

        <section className="flex flex-wrap gap-3 border-t border-dh-border pt-6">
          <Link href="/contact" className={primaryCta}>
            Talk about Ops Toys
          </Link>

          <Link href="/labs" className={neutralCta}>
            Back to Hooligan Labs
          </Link>

          <Link href="/" className={neutralCta}>
            Back to Home
          </Link>
        </section>
      </div>
    </main>
  );
}
