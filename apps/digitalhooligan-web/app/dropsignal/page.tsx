import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/nav/Breadcrumb";

export const metadata: Metadata = {
  title: "DropSignal · Digital Hooligan",
  description:
    "A lens for surfacing product drops with evidence and official links.",
};

const neutralCta =
  "inline-flex items-center justify-center rounded-full border border-dh-border bg-transparent px-5 py-2.5 text-sm font-semibold text-dh-text transition hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-dh-steel-blue/40";

const panel = "rounded-2xl border border-dh-border bg-dh-panel p-5";

export default function DropSignalPage() {
  return (
    <main className="min-h-screen bg-dh-carbon px-4 py-12 text-dh-text sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-3">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Systems", href: "/apps" },
              { label: "DropSignal" },
            ]}
          />

          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            DropSignal
          </h1>
          <p className="max-w-3xl text-pretty text-dh-muted">
            A lens for surfacing product drops with evidence and official links.
          </p>
        </header>

        <section className={panel}>
          <h2 className="text-lg font-semibold text-dh-text">
            What This Lens Surfaces
          </h2>
          <p className="mt-3 text-sm text-dh-muted">DropSignal surfaces:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-dh-muted">
            <li>Release signals</li>
            <li>Timing context</li>
            <li>Verified source links</li>
          </ul>
          <p className="mt-3 text-sm text-dh-muted">
            <span className="font-semibold text-dh-text">
              It is designed to filter noise without creating urgency theater.
            </span>
          </p>
        </section>

        <section className={panel}>
          <h2 className="text-lg font-semibold text-dh-text">
            Powered by Solum
          </h2>
          <p className="mt-3 text-sm text-dh-muted">
            DropSignal is powered by Solum’s signal and evidence spine.
          </p>
          <p className="mt-3 text-sm text-dh-muted">
            <span className="font-semibold text-dh-text">
              This lens surfaces signals and evidence. It does not tell you what
              to do.
            </span>
          </p>
        </section>

        <section className="flex flex-wrap items-center gap-3 border-t border-dh-border pt-6">
          <Link href="/apps" className={neutralCta}>
            Back to Systems Map →
          </Link>
        </section>
      </div>
    </main>
  );
}
