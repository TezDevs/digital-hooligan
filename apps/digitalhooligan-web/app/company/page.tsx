import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/nav/Breadcrumb";

export const metadata: Metadata = {
  title: "Company · Digital Hooligan",
  description: "Decisions over dashboards.",
};

const neutralCta =
  "inline-flex items-center justify-center rounded-full border border-dh-border bg-transparent px-5 py-2.5 text-sm font-semibold text-dh-text transition hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-dh-steel-blue/40";

const panel = "rounded-2xl border border-dh-border bg-dh-panel p-5";

export default function CompanyPage() {
  return (
    <main className="min-h-screen bg-dh-carbon px-4 py-12 text-dh-text sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-3">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Systems", href: "/apps" },
              { label: "Company" },
            ]}
          />

          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Why This Exists
          </h1>
          <p className="max-w-3xl text-pretty text-dh-muted">
            Decisions over dashboards.
          </p>
        </header>

        <section className={panel}>
          <p className="text-sm text-dh-muted">
            Digital Hooligan exists to make responsibility visible.
          </p>
          <p className="mt-3 text-sm text-dh-muted">We believe:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-dh-muted">
            <li>Humans own decisions</li>
            <li>Systems should preserve context</li>
            <li>Accountability should survive hindsight</li>
          </ul>
          <p className="mt-3 text-sm text-dh-muted">
            This company is built around those constraints.
          </p>
        </section>

        <section className="flex flex-wrap items-center gap-3 border-t border-dh-border pt-6">
          <Link href="/apps" className={neutralCta}>
            Explore the systems →
          </Link>
        </section>
      </div>
    </main>
  );
}
