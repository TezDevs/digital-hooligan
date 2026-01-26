import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Labs · Digital Hooligan",
  description: "Exploration only.",
};

const panel = "rounded-2xl border border-dh-border bg-dh-panel p-5";

export default function LabsPage() {
  return (
    <main className="min-h-screen bg-dh-carbon px-4 py-12 text-dh-text sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-3">
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Labs
          </h1>
          <p className="max-w-3xl text-pretty text-dh-muted">
            Exploration only.
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
