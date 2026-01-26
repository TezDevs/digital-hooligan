import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Governance · Digital Hooligan",
  description: "Decision accountability by design.",
};

const panel = "rounded-2xl border border-dh-border bg-dh-panel p-5";

export default function GovPage() {
  return (
    <main className="min-h-screen bg-dh-carbon px-4 py-12 text-dh-text sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-3">
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Governance
          </h1>
          <p className="max-w-3xl text-pretty text-dh-muted">
            Decision accountability by design.
          </p>
        </header>

        <section className={panel}>
          <p className="text-sm text-dh-muted">
            All systems here assume humans own outcomes.
          </p>
          <p className="mt-3 text-sm text-dh-muted">
            No system decides for you.
          </p>
          <p className="mt-3 text-sm text-dh-muted">
            No signal absolves responsibility.
          </p>
          <p className="mt-3 text-sm text-dh-muted">
            Governance is explicit — not implied.
          </p>
        </section>
      </div>
    </main>
  );
}
