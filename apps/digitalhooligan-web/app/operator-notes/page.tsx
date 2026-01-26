import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Operator Notes · Digital Hooligan",
  description: "Decisions, signals, lessons.",
};

const panel = "rounded-2xl border border-dh-border bg-dh-panel p-5";

export default function OperatorNotesPage() {
  return (
    <main className="min-h-screen bg-dh-carbon px-4 py-12 text-dh-text sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-3">
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Operator Notes
          </h1>
          <p className="max-w-3xl text-pretty text-dh-muted">
            Decisions, signals, lessons.
          </p>
        </header>

        <section className={panel}>
          <p className="text-sm text-dh-muted">Operator Notes document:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-dh-muted">
            <li>Postmortems</li>
            <li>Decision logs</li>
            <li>System learnings</li>
          </ul>
          <p className="mt-3 text-sm text-dh-muted">
            They exist to reduce repeated mistakes — not to chase trends.
          </p>
        </section>
      </div>
    </main>
  );
}
