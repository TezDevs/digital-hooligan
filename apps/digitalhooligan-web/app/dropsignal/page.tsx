import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DropSignal · Digital Hooligan",
  description:
    "DropSignal is hype intelligence and trend radar for sneakers and streetwear—assist-mode alerts first (not resale advice).",
};

const primaryCta =
  "inline-flex items-center justify-center rounded-full bg-dh-rebel-red px-5 py-2.5 text-sm font-semibold text-white shadow shadow-dh-rebel-red/30 transition hover:bg-dh-rebel-red/90";
const secondaryCta =
  "inline-flex items-center justify-center rounded-full border border-slate-700 bg-black px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-dh-rebel-red/60 hover:text-white";

export default function DropSignalPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-slate-50">
      {/* Hero */}
      <section className="border-b border-white/5 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
            HOOLIGAN LABS · PRODUCT PAGE
          </p>

          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-4">
              <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                DropSignal
              </h1>
              <p className="max-w-3xl text-sm text-slate-300 sm:text-base">
                Hype intelligence and{" "}
                <span className="font-semibold text-slate-100">
                  trend radar
                </span>{" "}
                for sneakers and streetwear—built to keep your watchlists clean
                and your timing less chaotic.
              </p>

              <div className="rounded-2xl border border-slate-800 bg-black/60 p-4 text-sm text-slate-300">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Important note
                </p>
                <p className="mt-2">
                  DropSignal is{" "}
                  <span className="font-semibold text-slate-100">not</span>{" "}
                  resale advice. It’s an information and workflow tool (alerts +
                  context) designed for assist-mode first.
                </p>
              </div>
            </div>

            <div className="shrink-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-black/60 px-3 py-1 text-xs">
                <span className="h-2 w-2 rounded-full bg-dh-rebel-red" />
                <span className="font-semibold uppercase tracking-[0.2em]">
                  Status: Prototype
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/contact" className={primaryCta}>
              Contact Digital Hooligan
            </Link>
            <Link href="/labs" className={secondaryCta}>
              Back to Labs
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-white/5 bg-slate-950/70 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
              FEATURES
            </p>
            <h2 className="text-balance text-xl font-semibold text-slate-50 sm:text-2xl">
              Assist-mode alerts with real context.
            </h2>
            <p className="max-w-3xl text-sm text-slate-300 sm:text-base">
              The point is to reduce scroll time and increase signal quality:
              what dropped, why it matters, and what to watch next.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2 rounded-2xl border border-slate-800 bg-black/80 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                ASSIST-MODE ALERTS
              </p>
              <h3 className="text-sm font-semibold text-slate-50">
                Watchlists + notifications
              </h3>
              <p className="text-xs text-slate-300">
                Track targets, get clean pings, and keep noise low—built for
                “assist mode” before any deep retailer integrations.
              </p>
            </div>

            <div className="space-y-2 rounded-2xl border border-slate-800 bg-black/80 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                RESEARCH CONTEXT
              </p>
              <h3 className="text-sm font-semibold text-slate-50">
                Why this alert matters
              </h3>
              <p className="text-xs text-slate-300">
                Simple context panels: what changed, comparable items, and notes
                so you remember why something was on your radar.
              </p>
            </div>

            <div className="space-y-2 rounded-2xl border border-slate-800 bg-black/80 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                DROPS TIMELINE
              </p>
              <h3 className="text-sm font-semibold text-slate-50">
                Calendar view of chaos
              </h3>
              <p className="text-xs text-slate-300">
                A timeline that tracks releases, restocks, and “watch windows”
                so you’re not guessing when to check.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-black/60 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              WHAT IT’S NOT
            </p>
            <p className="mt-2 text-sm text-slate-300">
              DropSignal is{" "}
              <span className="font-semibold text-slate-100">not</span> resale
              advice, not a guarantee of availability, and not an automated
              checkout bot. It’s an alert + context tool designed to help you
              research and act faster inside your own workflow.
            </p>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="border-b border-white/5 bg-black px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)]">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-50">
              Roadmap
            </h2>
            <p className="text-sm text-slate-300">
              Start with assist mode. Earn the right to go “grown-up mode.”
            </p>

            <ol className="space-y-3 text-sm text-slate-300">
              <li>
                <span className="font-semibold text-slate-100">
                  Phase 1 · Assist mode first
                </span>{" "}
                — watchlists, clean alerts, drop timeline, and basic context.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Phase 2 · Workflow / pro mode
                </span>{" "}
                — tagging, queues, notes, and smarter filtering for heavy users.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Phase 3 · Retailer integrations (“grown-up mode”)
                </span>{" "}
                — deeper integrations and partner flows once the signal is real
                and the UX is disciplined.
              </li>
            </ol>
          </div>

          <aside className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              DESIGN PRINCIPLES
            </p>
            <ul className="space-y-1.5">
              <li>• Assist mode over risky automation</li>
              <li>• Context attached to every alert</li>
              <li>• Timeline-first UX</li>
              <li>• Tight scope, fast shipping</li>
            </ul>
          </aside>
        </div>
      </section>

      {/* CTA Row */}
      <section className="bg-slate-950 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 text-sm text-slate-200">
            <p className="font-semibold text-slate-50">
              Want DropSignal-style alerts for your niche?
            </p>
            <p className="text-xs text-slate-400">
              Send a short note with your targets, constraints, and desired workflow.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/contact" className={primaryCta}>
              Contact Digital Hooligan
            </Link>
            <Link href="/labs" className={secondaryCta}>
              Back to Labs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
