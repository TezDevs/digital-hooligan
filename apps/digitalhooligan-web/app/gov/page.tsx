import type { Metadata } from "next";
import Breadcrumb from "@/components/nav/Breadcrumb";

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
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Systems", href: "/apps" },
              { label: "Gov" },
            ]}
          />

          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Governance
          </h1>
          <p className="max-w-3xl text-pretty text-dh-muted">
            Decision accountability by design.
          </p>
        </header>

        {/* Boundary statement (above fold) + non-certification fence */}
        <section className={panel}>
          <p className="text-sm text-dh-muted">
            This page describes governance boundaries and operational
            discipline.
          </p>
          <p className="mt-3 text-sm text-dh-muted">
            <span className="font-semibold text-dh-text">
              “Government-ready” here means the work is designed to support
              audits, reviews, and traceability.
            </span>{" "}
            It is not a certification claim, and it does not imply compliance
            with any specific framework unless explicitly contracted and
            verified.
          </p>
          <p className="mt-3 text-sm text-dh-muted">
            All systems here assume humans own outcomes. No system decides for
            you. No signal absolves responsibility. Governance is explicit — not
            implied.
          </p>
        </section>

        {/* Government-Ready Operations subsection (informational, no new page) */}
        <section className={panel}>
          <h2 className="text-lg font-semibold text-dh-text">
            Government-Ready Operations
          </h2>
          <p className="mt-3 text-sm text-dh-muted">
            Typical governance-ready work is designed to produce reviewable
            artifacts such as:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-dh-muted">
            <li>Clear ownership and decision records</li>
            <li>Explicit boundaries (what the system does / does not do)</li>
            <li>Cadence and review rituals that survive turnover</li>
            <li>Audit-friendly exports and change history</li>
          </ul>
          <p className="mt-3 text-sm text-dh-muted">
            The goal is legibility: decisions, evidence, and responsibility
            remain readable over time.
          </p>
        </section>
      </div>
    </main>
  );
}
