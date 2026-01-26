import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Systems Map · Digital Hooligan",
  description: "A clear map of spines, product lines, and internal engines.",
};

const card = "rounded-2xl border border-dh-border bg-dh-panel p-5";

export default function AppsPage() {
  return (
    <main className="min-h-screen bg-dh-carbon px-4 py-12 text-dh-text sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="space-y-3">
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Systems Map
          </h1>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <article className={card}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-steel-blue">
              RadixOS — Spine Product
            </p>
            <p className="mt-3 text-sm text-dh-text font-semibold">
              Decision Operating System
            </p>
            <p className="mt-2 text-sm text-dh-muted">
              (Primary spine for ownership and judgment)
            </p>
          </article>

          <article className={card}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-steel-blue">
              Solum — Spine Product
            </p>
            <p className="mt-3 text-sm text-dh-text font-semibold">
              Signals + Research Assist
            </p>
            <p className="mt-2 text-sm text-dh-muted">
              (Primary spine for evidence and context)
            </p>
          </article>

          <article className={card}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-muted">
              OpsToys — Product Line
            </p>
            <p className="mt-3 text-sm text-dh-text font-semibold">
              Packaged operator kits for execution
            </p>
          </article>

          <article className={card}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-muted">
              Pondus — Internal Engine
            </p>
            <p className="mt-3 text-sm text-dh-text font-semibold">
              Internal orchestration layer
            </p>
            <p className="mt-2 text-sm text-dh-muted">
              (Not publicly accessible)
            </p>
          </article>

          <article className={card}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-muted">
              PennyWize — (Deprecated)
            </p>
            <p className="mt-3 text-sm text-dh-text font-semibold">
              Legacy product
            </p>
            <p className="mt-2 text-sm text-dh-muted">(Replaced by Solum)</p>
          </article>
        </section>
      </div>
    </main>
  );
}
