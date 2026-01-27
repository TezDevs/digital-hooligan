import type { Metadata } from "next";
import Breadcrumb from "@/components/nav/Breadcrumb";

export const metadata: Metadata = {
  title: "Labs — How We Dogfood the System",
  description:
    "Labs shows how Digital Hooligan operates internally. Experiments, tooling, and lessons. Not a product.",
  alternates: { canonical: "https://digitalhooligan.io/labs" },
  openGraph: {
    title: "Labs (Dogfooding)",
    description:
      "A transparent look at how we operate and test our own systems.",
    url: "https://digitalhooligan.io/labs",
    siteName: "Digital Hooligan",
    type: "website",
  },
};

const panel = "rounded-2xl border border-dh-border bg-dh-panel p-5";

export default function LabsPage() {
  return (
    <main className="min-h-screen bg-dh-carbon px-4 py-12 text-dh-text sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-3">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Systems", href: "/apps" },
              { label: "Labs" },
            ]}
          />

          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Labs
          </h1>
          <p className="max-w-3xl text-pretty text-dh-muted">
            Exploration only. Labs are explorations, not products.
          </p>
        </header>

        <section className={panel}>
          <h2 className="text-lg font-semibold text-dh-text">
            Exploration Only
          </h2>
          <p className="mt-3 text-sm text-dh-muted">
            Labs contains experiments, prototypes, and early ideas.
          </p>
          <p className="mt-3 text-sm text-dh-muted">There is no roadmap.</p>
          <p className="mt-3 text-sm text-dh-muted">There are no promises.</p>
          <p className="mt-3 text-sm text-dh-muted">
            Nothing here implies future availability.
          </p>
        </section>
      </div>
    </main>
  );
}
