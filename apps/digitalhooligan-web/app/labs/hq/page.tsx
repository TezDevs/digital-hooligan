import type { Metadata } from "next";
import Breadcrumb from "@/components/nav/Breadcrumb";

export const metadata: Metadata = {
  title: "LaunchHQ — Internal Operations Environment",
  description:
    "LaunchHQ is Digital Hooligan’s internal operating environment. Shared to explain how decisions are executed.",
  alternates: { canonical: "https://digitalhooligan.io/labs/hq" },
  openGraph: {
    title: "LaunchHQ (Internal)",
    description:
      "Our internal HQ for cadence, decisions, and execution. Shared for clarity, not sold.",
    url: "https://digitalhooligan.io/labs/hq",
    siteName: "Digital Hooligan",
    type: "website",
  },
};

const panel = "rounded-2xl border border-dh-border bg-dh-panel p-5";

export default function LabsHqPage() {
  return (
    <main className="min-h-screen bg-dh-carbon px-4 py-12 text-dh-text sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-3">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Systems", href: "/apps" },
              { label: "Labs", href: "/labs" },
              { label: "HQ" },
            ]}
          />

          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Launch HQ
          </h1>
          <p className="max-w-3xl text-pretty text-dh-muted">
            Decisions → Execution
          </p>
        </header>

        <section className={panel}>
          <p className="text-sm text-dh-muted">
            Launch HQ consumes decisions created in RadixOS and turns them into
            tracked execution.
          </p>
          <p className="mt-3 text-sm text-dh-muted">
            It exists to show how work moves — not to sell anything.
          </p>
        </section>
      </div>
    </main>
  );
}
