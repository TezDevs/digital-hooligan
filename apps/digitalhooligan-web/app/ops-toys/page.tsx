import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "OpsToys · Digital Hooligan",
  description:
    "Packaged execution kits for operators who want momentum without chaos.",
};

const primaryCta =
  "inline-flex items-center justify-center rounded-full bg-dh-rebel-red px-5 py-2.5 text-sm font-semibold text-white shadow shadow-dh-rebel-red/30 transition hover:bg-dh-rebel-red/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-dh-rebel-red/60";

const neutralCta =
  "inline-flex items-center justify-center rounded-full border border-dh-border bg-transparent px-5 py-2.5 text-sm font-semibold text-dh-text transition hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-dh-steel-blue/40";

const panel = "rounded-2xl border border-dh-border bg-dh-panel p-5";

export default function OpsToysPage() {
  return (
    <main className="min-h-screen bg-dh-carbon px-4 py-12 text-dh-text sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-3">
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            OpsToys
          </h1>
          <p className="max-w-3xl text-pretty text-dh-muted">
            Packaged execution kits for operators who want momentum without
            chaos.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <article className={panel}>
            <h2 className="text-lg font-semibold text-dh-text">
              What These Kits Do
            </h2>
            <p className="mt-3 text-sm text-dh-muted">
              <span className="text-dh-text font-semibold">
                OpsToys target friction in common operational workflows.
              </span>
            </p>
            <p className="mt-3 text-sm text-dh-muted">They provide:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-dh-muted">
              <li>Clear structure</li>
              <li>
                <span className="text-dh-text font-semibold">
                  Practical workflows
                </span>
              </li>
              <li>Defined scope</li>
            </ul>
            <p className="mt-3 text-sm text-dh-muted">
              They are designed to be adopted quickly and reviewed honestly.
            </p>
          </article>

          <article className={panel}>
            <h2 className="text-lg font-semibold text-dh-text">
              What They Explicitly Do Not Do
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-dh-muted">
              <li>OpsToys do not define strategy.</li>
              <li>They do not replace judgment.</li>
              <li>They do not function as systems of record.</li>
            </ul>
          </article>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-dh-text">
            Sprint Bands (Structure Only)
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            <div className={panel}>
              <p className="text-sm font-semibold text-dh-text">
                Conservative Sprint
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-dh-muted">
                <li>Single workflow</li>
                <li>Minimal integrations</li>
                <li>Fast deployment</li>
              </ul>
            </div>

            <div className={panel}>
              <p className="text-sm font-semibold text-dh-text">Core Sprint</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-dh-muted">
                <li>Multi-step workflow</li>
                <li>Context artifacts</li>
                <li>Review cadence alignment</li>
              </ul>
            </div>

            <div className={panel}>
              <p className="text-sm font-semibold text-dh-text">
                Advanced Sprint
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-dh-muted">
                <li>Cross-team usage</li>
                <li>Governance considerations</li>
                <li>Extended handoff</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="flex flex-wrap items-center gap-3 border-t border-dh-border pt-6">
          {/* Sole conversion CTA surface (per spec) */}
          <Link href="/contact" className={primaryCta}>
            Request an OpsToys sprint →
          </Link>

          <Link href="/apps" className={neutralCta}>
            Explore the systems →
          </Link>
        </section>
      </div>
    </main>
  );
}
