import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/nav/Breadcrumb";

export const metadata: Metadata = {
  title: "Systems Map · Digital Hooligan",
  description: "A clear map of spines, product lines, and internal engines.",
};

const card = "rounded-2xl border border-dh-border bg-dh-panel p-5";
const linkCard =
  "rounded-2xl border border-dh-border bg-dh-panel p-5 transition hover:bg-white/5";

export default function AppsPage() {
  return (
    <main className="min-h-screen bg-dh-carbon px-4 py-12 text-dh-text sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="space-y-3">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Systems" }]}
          />

          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Systems Map
          </h1>

          <p className="max-w-3xl text-sm text-dh-muted sm:text-base">
            This is the hub. It maps the spines, the product line, and the
            boundaries between them. Nothing here is a conversion funnel.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <article className={card}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-steel-blue">
              RadixOS — Spine Product
            </p>
            <p className="mt-3 text-sm font-semibold text-dh-text">
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
            <p className="mt-3 text-sm font-semibold text-dh-text">
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
            <p className="mt-3 text-sm font-semibold text-dh-text">
              Packaged operator kits for execution
            </p>
          </article>

          <article className={card}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-muted">
              Pondus — Internal Engine
            </p>
            <p className="mt-3 text-sm font-semibold text-dh-text">
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
            <p className="mt-3 text-sm font-semibold text-dh-text">
              Legacy product
            </p>
            <p className="mt-2 text-sm text-dh-muted">(Replaced by Solum)</p>
          </article>
        </section>

        <section className="space-y-4 border-t border-dh-border pt-6">
          <h2 className="text-lg font-semibold text-dh-text">Entry points</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/dropsignal" className={linkCard}>
              <p className="text-sm font-semibold text-dh-text">DropSignal</p>
              <p className="mt-2 text-sm text-dh-muted">
                A Solum lens for product drop signals with evidence + sources.
              </p>
              <p className="mt-3 text-sm text-dh-steel-blue">Open lens →</p>
            </Link>

            <Link href="/hypewatch" className={linkCard}>
              <p className="text-sm font-semibold text-dh-text">HypeWatch</p>
              <p className="mt-2 text-sm text-dh-muted">
                Evidence-first trend signals without predictions.
              </p>
              <p className="mt-3 text-sm text-dh-steel-blue">Open lens →</p>
            </Link>

            <Link href="/ops-toys" className={linkCard}>
              <p className="text-sm font-semibold text-dh-text">OpsToys</p>
              <p className="mt-2 text-sm text-dh-muted">
                Packaged operator kits designed for scoped rollouts.
              </p>
              <p className="mt-3 text-sm text-dh-steel-blue">See kits →</p>
            </Link>

            <Link href="/labs" className={linkCard}>
              <p className="text-sm font-semibold text-dh-text">Labs</p>
              <p className="mt-2 text-sm text-dh-muted">
                Explorations and experiments. Not products.
              </p>
              <p className="mt-3 text-sm text-dh-steel-blue">Browse Labs →</p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
