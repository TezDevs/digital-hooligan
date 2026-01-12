"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

const CTA_URLS = {
  exploreTemplates: "", // TODO: Notion embed or Figma preview URL (placeholder allowed)
  seeOurSystem: "", // TODO: public Notion view URL (placeholder allowed)
  buildYourHQ: "", // TODO: onboarding waitlist URL (placeholder allowed)
} as const;

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function AnchorButton(props: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const primary = props.variant !== "secondary";
  return (
    <a
      href={props.href}
      className={cx(
        "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition",
        primary
          ? "bg-rose-500 text-neutral-950 hover:bg-rose-400"
          : "border border-neutral-800 bg-neutral-950/40 text-neutral-100 hover:bg-neutral-900"
      )}
    >
      {props.children}
    </a>
  );
}

function ExternalButton(props: {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const primary = props.variant !== "secondary";

  // ✅ direct guard narrows props.href to string below
  if (!props.href) {
    return (
      <span
        className={cx(
          "inline-flex cursor-not-allowed items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium opacity-60",
          primary
            ? "bg-rose-500 text-neutral-950"
            : "border border-neutral-800 bg-neutral-950/40 text-neutral-100"
        )}
        aria-disabled="true"
        title="Link target not set yet"
      >
        {props.children} (placeholder)
      </span>
    );
  }

  return (
    <Link
      href={props.href}
      target="_blank"
      rel="noreferrer"
      className={cx(
        "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition",
        primary
          ? "bg-rose-500 text-neutral-950 hover:bg-rose-400"
          : "border border-neutral-800 bg-neutral-950/40 text-neutral-100 hover:bg-neutral-900"
      )}
    >
      {props.children}
    </Link>
  );
}

function SectionShell(props: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section id={props.id} className="py-14 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8">
        {props.eyebrow ? (
          <div className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
            {props.eyebrow}
          </div>
        ) : null}
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-50 sm:text-3xl">
          {props.title}
        </h2>
        {props.description ? (
          <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-400 sm:text-base">
            {props.description}
          </p>
        ) : null}
        {props.children ? <div className="mt-8">{props.children}</div> : null}
      </div>
    </section>
  );
}

function Pill(props: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-800 bg-neutral-950/40 px-3 py-1 text-xs text-neutral-200">
      {props.children}
    </span>
  );
}

type ProofTile = {
  title: string;
  // Replace these with finalized Product Copy Studio text when you paste it.
  alt: string;
  caption: string;
  fileName: string; // must exist in /public/labs/hq/proof/
};

const PROOF_TILES: ProofTile[] = [
  {
    title: "Internal workspace screenshots — real usage",
    alt: "Internal workspace screenshots — real usage",
    caption: "Internal workspace screenshots — real usage",
    fileName: "internal-workspace-real-usage.png",
  },
  {
    title: "Board taxonomy — validates ops loop",
    alt: "Board taxonomy — validates ops loop",
    caption: "Board taxonomy — validates ops loop",
    fileName: "board-taxonomy-ops-loop.png",
  },
  {
    title: "Weekly review template — cadence proof",
    alt: "Weekly review template — cadence proof",
    caption: "Weekly review template — cadence proof",
    fileName: "weekly-review-cadence-proof.png",
  },
  {
    title: "Definition of Done examples — scope control proof",
    alt: "Definition of Done examples — scope control proof",
    caption: "Definition of Done examples — scope control proof",
    fileName: "definition-of-done-scope-control.png",
  },
  {
    title: "Decision & Change Log — governance proof",
    alt: "Decision & Change Log — governance proof",
    caption: "Decision & Change Log — governance proof",
    fileName: "decision-change-log-governance.png",
  },
  {
    title: "Mode Switch Diagram — execution model proof",
    alt: "Mode Switch Diagram — execution model proof",
    caption: "Mode Switch Diagram — execution model proof",
    fileName: "mode-switch-execution-model.png",
  },
  {
    title: "Public changelog — evolution proof",
    alt: "Public changelog — evolution proof",
    caption: "Public changelog — evolution proof",
    fileName: "public-changelog-evolution.png",
  },
];

function proofSrc(fileName: string) {
  // Support spaces/en-dashes safely (even though we normalized filenames)
  return encodeURI(`/labs/hq/proof/${fileName}`);
}

export function LabsHqClient() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50">
      {/* Top bar */}
      <div className="border-b border-neutral-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 md:px-6 lg:px-8">
          <Link
            href="/labs"
            className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-rose-300"
          >
            <span className="text-base leading-none">←</span>
            <span>Back to Labs</span>
          </Link>
          <span className="rounded-full border border-neutral-800 bg-neutral-950/40 px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-neutral-500">
            Launch HQ
          </span>
        </div>
      </div>

      {/* SECTION 1 — Above the Fold (Promise + CTA) */}
      <header className="border-b border-neutral-900">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 lg:px-8 sm:py-20">
          <div className="flex flex-wrap items-center gap-2">
            <Pill>Structure. Cadence. Visibility.</Pill>
            <Pill>Notion-first operating system</Pill>
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            Structure your chaos. Ship faster.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-300">
            Launch HQ is your operating system for shipping work with speed,
            clarity, and focus.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <AnchorButton href="#system-overview" variant="primary">
              See How It Works
            </AnchorButton>
            <AnchorButton href="#request-access" variant="secondary">
              Request Access
            </AnchorButton>
          </div>

          <div className="mt-10 grid gap-3 text-sm text-neutral-300 sm:grid-cols-2">
            <div className="rounded-2xl border border-neutral-900 bg-neutral-950/40 p-5">
              <div className="text-sm font-medium text-neutral-100">
                Promise
              </div>
              <p className="mt-2 leading-6 text-neutral-300">
                Launch HQ is the Notion-first operating system that gives your
                business a clear execution rhythm - turning chaos into shipped
                work, without adding overhead.
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-900 bg-neutral-950/40 p-5">
              <div className="text-sm font-medium text-neutral-100">
                Tone &amp; Boundaries
              </div>
              <p className="mt-2 leading-6 text-neutral-300">
                Direct, calm authority. No hype. No guarantees. Launch HQ helps
                you ship better, not sell harder.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-neutral-900 bg-neutral-950/40 p-5">
            <div className="text-sm font-medium text-neutral-100">
              Language Guide
            </div>
            <p className="mt-2 text-sm leading-6 text-neutral-300">
              {`Use "operating system," "work visibility," "cadence," "execution loop."
                Avoid "platform," "dashboard," "AI," "automation."`}
            </p>
          </div>
        </div>
      </header>

      {/* SECTION 2 — Problem & Contrast */}
      <SectionShell
        title="Most teams drown in their own work."
        description="Too many tools. No shared rhythm. Work hides in people's heads."
      >
        <div className="flex flex-wrap gap-3">
          <AnchorButton href="#kanban-visuals" variant="primary">
            Bring Work Into View
          </AnchorButton>
          <AnchorButton href="#system-overview" variant="secondary">
            See the System Overview
          </AnchorButton>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-neutral-900 bg-neutral-950/40 p-5">
            <div className="text-sm font-medium text-neutral-100">
              Tool sprawl
            </div>
            <p className="mt-2 text-sm leading-6 text-neutral-400">
              Work fragments across docs, messages, and trackers — and no one
              can see the whole picture.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-900 bg-neutral-950/40 p-5">
            <div className="text-sm font-medium text-neutral-100">
              No shared rhythm
            </div>
            <p className="mt-2 text-sm leading-6 text-neutral-400">
              Planning resets constantly. Priorities drift. You spend more time
              recalibrating than shipping.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-900 bg-neutral-950/40 p-5">
            <div className="text-sm font-medium text-neutral-100">
              Invisible decisions
            </div>
            <p className="mt-2 text-sm leading-6 text-neutral-400">
              Definitions of done and tradeoffs live in people’s heads — until
              they explode as scope creep.
            </p>
          </div>
        </div>
      </SectionShell>

      {/* SECTION 3 — How Launch HQ Works */}
      <SectionShell
        id="system-overview"
        eyebrow="How it works"
        title={`Launch HQ isn't another project tracker - it's your launch coordination layer, built to help small teams move faster and with fewer decisions.`}
        description="How it works:"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-neutral-900 bg-neutral-950/40 p-6">
            <div className="text-base font-semibold text-neutral-100">
              Structure
            </div>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-neutral-300">
              <li>
                - Central Kanban: every work item visible, triaged, and
                measurable.
              </li>
              <li>
                - Mode system: separate thinking from shipping for focus and
                flow.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-neutral-900 bg-neutral-950/40 p-6">
            <div className="text-base font-semibold text-neutral-100">
              Cadence
            </div>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-neutral-300">
              <li>
                - Built-in cadence: daily flow + weekly planning + monthly
                review.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-neutral-900 bg-neutral-950/40 p-6">
            <div className="text-base font-semibold text-neutral-100">
              Visibility
            </div>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-neutral-300">
              <li>
                - Proof-based governance: decisions and definitions of done
                logged.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <ExternalButton href={CTA_URLS.exploreTemplates} variant="primary">
            Explore Templates
          </ExternalButton>
          <AnchorButton href="#proof" variant="secondary">
            See Proof Assets
          </AnchorButton>
        </div>

        <div
          id="kanban-visuals"
          className="mt-10 rounded-2xl border border-neutral-900 bg-neutral-950/40 p-6"
        >
          <div className="text-sm font-medium text-neutral-100">
            Kanban visuals
          </div>

          <Image
            src="/hero/launch-hq.png"
            alt="Launch HQ — Operational Centerline"
            width={1600}
            height={900}
            priority
            className="mt-4 h-auto w-full rounded-2xl border border-neutral-900"
          />

          {/* Restored placeholder block (for v1 / safety / future swap) */}
          <div className="mt-4 rounded-xl border border-dashed border-neutral-800 bg-neutral-950/60 p-8 text-xs text-neutral-500">
            Kanban screenshot placeholder
          </div>
        </div>
      </SectionShell>

      {/* SECTION 4 — Proof in Practice */}
      <SectionShell
        id="proof"
        eyebrow="Proof in practice"
        title="Used daily at Digital Hooligan."
        description="Screenshots: real boards, DoD, shipping logs."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROOF_TILES.map((tile) => (
            <figure
              key={tile.title}
              className={cx(
                "group relative overflow-hidden rounded-2xl border border-neutral-900 bg-neutral-950/40",
                "transition-transform duration-200 hover:-translate-y-0.5 hover:border-neutral-800"
              )}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={proofSrc(tile.fileName)}
                  alt={tile.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0"
                />
              </div>

              <figcaption className="p-5">
                <div className="text-sm font-medium text-neutral-100">
                  {tile.title}
                </div>
                <p className="mt-2 text-sm leading-6 text-neutral-400">
                  {tile.caption}
                </p>
              </figcaption>

              <a
                href={proofSrc(tile.fileName)}
                className="absolute inset-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500/40"
                aria-label={`${tile.title}: open image`}
              />
            </figure>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <ExternalButton href={CTA_URLS.seeOurSystem} variant="primary">
            See Our System
          </ExternalButton>
          <AnchorButton href="#governance" variant="secondary">
            Governance &amp; Guardrails
          </AnchorButton>
        </div>
      </SectionShell>

      {/* SECTION 5 — Governance & Guardrails */}
      <SectionShell
        id="governance"
        eyebrow="Governance & guardrails"
        title="Clear structure without false certainty."
        description="Who it's for: Founder-led teams and operators who want to move fast without burning out."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-neutral-900 bg-neutral-950/40 p-6">
            <div className="text-base font-semibold text-neutral-100">
              Disclaimers
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-neutral-300">
              <li>
                - Launch HQ provides structure, cadence, and visibility - not
                guarantees of revenue, timelines, or performance.
              </li>
              <li>
                - Results depend on inputs, discipline, and decision quality.
              </li>
              <li>
                - Launch HQ is not legal, accounting, HR, or staffing advice.
              </li>
              <li>
                - Runs inside your workspace; no resale, scraping, or model
                training on client data.
              </li>
              <li>
                - Public examples are sanitized, permissioned, or synthetic.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-neutral-900 bg-neutral-950/40 p-6">
            <div className="text-base font-semibold text-neutral-100">
              Next step
            </div>
            <p className="mt-3 text-sm leading-6 text-neutral-400">
              Thin v1 Scope: Home page + explainer + proof assets section. No
              case studies, no pricing configurator yet.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <ExternalButton href={CTA_URLS.buildYourHQ} variant="primary">
                Build Your HQ
              </ExternalButton>
              <AnchorButton href="#request-access" variant="secondary">
                Request Access
              </AnchorButton>
            </div>
          </div>
        </div>
      </SectionShell>

      {/* SECTION 6 — Closing CTA */}
      <SectionShell
        eyebrow="Closing"
        title="You don't need another app. You need an operating system."
      >
        <div className="rounded-2xl border border-neutral-900 bg-neutral-950/40 p-6">
          <div id="request-access" className="grid gap-6 md:grid-cols-2">
            <div>
              <div className="text-sm font-medium text-neutral-100">
                Request Access to Launch HQ
              </div>
              <p className="mt-2 text-sm leading-6 text-neutral-400">
                Email capture placeholder (no backend wiring in v1).
              </p>

              <form
                className="mt-4 flex flex-col gap-3 sm:flex-row"
                onSubmit={(e) => e.preventDefault()}
              >
                <label className="sr-only" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="w-full rounded-2xl border border-neutral-800 bg-neutral-950/60 px-4 py-2 text-sm text-neutral-100 outline-none focus:ring-2 focus:ring-rose-500/40"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-2xl bg-rose-500 px-4 py-2 text-sm font-medium text-neutral-950 hover:bg-rose-400"
                >
                  Request Access
                </button>
              </form>

              <p className="mt-3 text-xs leading-5 text-neutral-500">
                No hype. No guarantees.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-5">
              <div className="text-sm font-medium text-neutral-100">
                Quick links
              </div>
              <p className="mt-2 text-sm leading-6 text-neutral-400">
                If you already have destinations, set the CTA targets in{" "}
                <code className="rounded bg-neutral-900 px-1 py-0.5">
                  CTA_URLS
                </code>
                .
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <ExternalButton
                  href={CTA_URLS.seeOurSystem}
                  variant="secondary"
                >
                  See Our System
                </ExternalButton>
                <ExternalButton
                  href={CTA_URLS.exploreTemplates}
                  variant="secondary"
                >
                  Explore Templates
                </ExternalButton>
                <ExternalButton href={CTA_URLS.buildYourHQ} variant="secondary">
                  Build Your HQ
                </ExternalButton>
              </div>
            </div>
          </div>
        </div>
      </SectionShell>

      <footer className="border-t border-neutral-900 py-10">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <div className="text-sm font-medium text-neutral-100">Launch HQ</div>
          <p className="mt-2 max-w-3xl text-xs leading-5 text-neutral-500">
            Launch HQ provides structure, cadence, and visibility - not
            guarantees of revenue, timelines, or performance. Public examples
            are sanitized, permissioned, or synthetic.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-xs text-neutral-500">
            <a href="#system-overview" className="hover:text-rose-300">
              System overview
            </a>
            <a href="#kanban-visuals" className="hover:text-rose-300">
              Kanban visuals
            </a>
            <a href="#proof" className="hover:text-rose-300">
              Proof
            </a>
            <a href="#governance" className="hover:text-rose-300">
              Governance
            </a>
            <a href="#request-access" className="hover:text-rose-300">
              Request access
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
