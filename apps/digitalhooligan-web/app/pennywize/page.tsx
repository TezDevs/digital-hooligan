import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PennyWize (Deprecated)",
  description:
    "PennyWize was an early experiment that evolved into Solum. Preserved for historical context.",
  alternates: { canonical: "https://digitalhooligan.io/pennywize" },
  openGraph: {
    title: "PennyWize (Historical)",
    description: "An early experiment that informed Solum. No longer active.",
    url: "https://digitalhooligan.io/pennywize",
    siteName: "Digital Hooligan",
    type: "website",
  },
};

const neutralCta =
  "inline-flex items-center justify-center rounded-full border border-dh-border bg-transparent px-5 py-2.5 text-sm font-semibold text-dh-text transition hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-dh-steel-blue/40";

const panel = "rounded-2xl border border-dh-border bg-dh-panel p-5";

export default function PennyWizePage() {
  return (
    <main className="min-h-screen bg-dh-carbon px-4 py-12 text-dh-text sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-3">
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            PennyWize (Deprecated)
          </h1>
          <p className="max-w-3xl text-pretty text-dh-muted">
            This product has been replaced.
          </p>
        </header>

        <section className={panel}>
          <h2 className="text-lg font-semibold text-dh-text">
            Why It Was Replaced
          </h2>
          <p className="mt-3 text-sm text-dh-muted">
            PennyWize introduced early signal concepts that now live inside
            Solum.
          </p>
          <p className="mt-3 text-sm text-dh-muted">
            Solum provides clearer boundaries, better explainability, and a
            broader evidence model.
          </p>
        </section>

        <section className="flex flex-wrap items-center gap-3 border-t border-dh-border pt-6">
          <Link href="/apps" className={neutralCta}>
            Explore Solum →
          </Link>
        </section>
      </div>
    </main>
  );
}
