import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "HypeWatch · Digital Hooligan",
  description: "Evidence-first trend signals without predictions.",
};

const neutralCta =
  "inline-flex items-center justify-center rounded-full border border-dh-border bg-transparent px-5 py-2.5 text-sm font-semibold text-dh-text transition hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-dh-steel-blue/40";

const panel = "rounded-2xl border border-dh-border bg-dh-panel p-5";

export default function HypeWatchPage() {
  return (
    <main className="min-h-screen bg-dh-carbon px-4 py-12 text-dh-text sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-3">
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            HypeWatch
          </h1>
          <p className="max-w-3xl text-pretty text-dh-muted">
            Evidence-first trend signals without predictions.
          </p>
        </header>

        <section className={panel}>
          <h2 className="text-lg font-semibold text-dh-text">
            Evidence, Not Predictions
          </h2>
          <p className="mt-3 text-sm text-dh-muted">
            HypeWatch tracks attention patterns and supporting artifacts.
          </p>
          <p className="mt-3 text-sm text-dh-muted">
            <span className="text-dh-text font-semibold">
              It frames signals across contrasts such as:
            </span>
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-dh-muted">
            <li>Loud vs. meaningful</li>
            <li>Sustained vs. fleeting</li>
            <li>Documented vs. speculative</li>
          </ul>
          <p className="mt-3 text-sm text-dh-muted">
            Signals ≠ hype. Context always matters.
          </p>
        </section>

        <section className="flex flex-wrap items-center gap-3 border-t border-dh-border pt-6">
          <Link href="/apps" className={neutralCta}>
            Learn about Solum →
          </Link>
        </section>
      </div>
    </main>
  );
}
