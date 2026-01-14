"use client";

import React from "react";
import Link from "next/link";
import {
  SlidersHorizontal,
  Bell,
  ShieldCheck,
  Palette,
  Bot,
  Moon,
  SunMedium,
} from "lucide-react";

type TabProps = {
  href: string;
  label: string;
  isActive?: boolean;
};

function Tab({ href, label, isActive }: TabProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition ${
        isActive
          ? "bg-white text-slate-900 ring-2 ring-primary shadow-sm"
          : "border border-border bg-card text-muted-foreground hover:bg-muted"
      }`}
    >
      <span className="flex items-center gap-1.5">
        <span>{label}</span>
        {isActive && (
          <span className="h-2 w-2 rounded-full bg-primary ring-2 ring-primary/40" />
        )}
      </span>
    </Link>
  );
}

type PreferenceItem = {
  label: string;
  description: string;
};

const CEO_PREFERENCES: PreferenceItem[] = [
  {
    label: "Show CEO Copilot panel on Overview by default",
    description:
      "Keep the Copilot preview visible at the top of the dashboard instead of hiding it behind a toggle.",
  },
  {
    label: "Highlight tasks that touch money, risk, or external clients",
    description:
      "Subtle emphasis in Tasks view for anything tagged Finance, Gov, or Deals.",
  },
  {
    label: "Collapse low-priority sections on mobile",
    description:
      "On small screens, show money, tasks, and Copilot first; tuck others into accordions.",
  },
];

const NOTIFICATION_PREFS: PreferenceItem[] = [
  {
    label: "Deals & revenue",
    description:
      "Notify when deals change stage, a proposal is accepted, or a new high-quality lead appears.",
  },
  {
    label: "App incidents & performance",
    description:
      "Ping for uptime issues, error spikes, or sustained latency on any app.",
  },
  {
    label: "AI suggestions & summaries",
    description:
      "Allow CEO Copilot and Dev Workbench to surface daily briefings and refactor suggestions.",
  },
];

const PRIVACY_PREFS: PreferenceItem[] = [
  {
    label: "Keep a decision log for key changes",
    description:
      "Record major calls in the CEO dashboard so future you knows why something was done.",
  },
  {
    label: "Audit trail for automations",
    description:
      "Log when AI assistants propose actions vs. when you explicitly approve them.",
  },
  {
    label: "Separate lab experiments from production data",
    description:
      "Clearly mark anything coming from Hooligan Labs as experimental, not official company data.",
  },
];

export default function CeoSettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header + nav */}
      <header className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Settings
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Tune how the CEO dashboard, notifications, and AI assistants show
              up for Digital Hooligan.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Config: safe defaults, ready for future wiring</span>
          </div>
        </div>

        <nav className="flex flex-wrap gap-2">
          <Tab href="/ceo" label="Overview" />
          <Tab href="/ceo/tasks" label="Tasks" />
          <Tab href="/ceo/deals" label="Deals" />
          <Tab href="/ceo/finance" label="Finance" />
          <Tab href="/ceo/performance" label="Performance" />
          <Tab href="/ceo/ai-hub" label="AI Hub" />
          <Tab href="/ceo/dev-workbench" label="Dev WB" />
          <Tab href="/ceo/settings" label="Settings" isActive />
          <Tab href="/ceo/logout" label="Logout" />
        </nav>
      </header>

      {/* Layout + theme row */}
      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.4fr)]">
        {/* Layout & behavior */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Layout & behavior
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                How the CEO dashboard behaves by default.
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
              <SlidersHorizontal className="h-4 w-4" />
            </div>
          </div>

          <ul className="mt-4 space-y-2 text-xs">
            {CEO_PREFERENCES.map((pref) => (
              <li
                key={pref.label}
                className="flex items-start gap-3 rounded-xl border border-border bg-background/60 px-3 py-2"
              >
                <div className="mt-1 flex h-4 w-7 items-center justify-center rounded-full border border-border bg-card text-[9px] font-semibold text-muted-foreground">
                  ON
                </div>
                <div>
                  <p className="font-medium">{pref.label}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {pref.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Theme */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Theme & density
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Visual flavor of the CEO dashboard.
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
              <Palette className="h-4 w-4" />
            </div>
          </div>

          <div className="mt-4 grid gap-3 text-xs">
            <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background/60 px-3 py-2">
              <div className="flex items-center gap-2">
                <SunMedium className="h-3.5 w-3.5" />
                <div>
                  <p className="font-medium">Dark mode primary</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    The CEO dashboard assumes a dark, cyberpunk-friendly theme
                    by default.
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background/60 px-3 py-2">
              <div className="flex items-center gap-2">
                <Moon className="h-3.5 w-3.5" />
                <div>
                  <p className="font-medium">Cozy density</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Slightly padded cards and rounded corners, tuned for long
                    sessions rather than cramped tables.
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-slate-500/10 px-2 py-0.5 text-[10px] font-semibold text-slate-200">
                Default
              </span>
            </div>
          </div>

          <p className="mt-3 text-[11px] text-muted-foreground">
            Later, these toggles can map to real themes, layout density, and
            personalization options per user.
          </p>
        </div>
      </section>

      {/* Notifications + AI preferences */}
      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1.5fr)]">
        {/* Notifications */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Notifications
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                What should ping you vs. stay quiet.
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
              <Bell className="h-4 w-4" />
            </div>
          </div>

          <ul className="mt-4 space-y-2 text-xs">
            {NOTIFICATION_PREFS.map((pref) => (
              <li
                key={pref.label}
                className="flex items-start gap-3 rounded-xl border border-border bg-background/60 px-3 py-2"
              >
                <div className="mt-1 flex h-4 w-7 items-center justify-center rounded-full border border-border bg-card text-[9px] font-semibold text-muted-foreground">
                  ON
                </div>
                <div>
                  <p className="font-medium">{pref.label}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {pref.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-3 text-[11px] text-muted-foreground">
            In the future, these can control email, push, and in-dashboard
            banners powered by CEO Copilot and Ops Monitor.
          </p>
        </div>

        {/* AI assistants behavior */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                AI assistants behavior
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                How CEO Copilot, Dev Workbench, and others should behave.
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
              <Bot className="h-4 w-4" />
            </div>
          </div>

          <div className="mt-4 space-y-2 text-xs">
            <div className="flex items-start gap-3 rounded-xl border border-border bg-background/60 px-3 py-2">
              <div className="mt-1 flex h-4 w-7 items-center justify-center rounded-full border border-border bg-card text-[9px] font-semibold text-muted-foreground">
                ON
              </div>
              <div>
                <p className="font-medium">
                  Explain the “why” behind suggestions
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  When CEO Copilot or Dev Workbench suggests a change, show the
                  reasoning in plain language, not just commands.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-border bg-background/60 px-3 py-2">
              <div className="mt-1 flex h-4 w-7 items-center justify-center rounded-full border border-border bg-card text-[9px] font-semibold text-muted-foreground">
                ON
              </div>
              <div>
                <p className="font-medium">
                  Always offer a “small version” of automations
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Prefer small, low-risk actions over huge, sweeping changes
                  unless you explicitly opt in.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-border bg-background/60 px-3 py-2">
              <div className="mt-1 flex h-4 w-7 items-center justify-center rounded-full border border-border bg-card text-[9px] font-semibold text-muted-foreground">
                OFF
              </div>
              <div>
                <p className="font-medium">
                  Allow assistants to make changes without approval
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  By default, assistants propose actions and drafts only. You
                  stay in the loop for anything that changes code, money, or
                  client-facing content.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-3 text-[11px] text-muted-foreground">
            These toggles are conceptual today, but they sketch how AI should
            behave once you wire real assistants into the stack.
          </p>
        </div>
      </section>

      {/* Privacy & audit */}
      <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Data, privacy & audit trail
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              How you want Digital Hooligan to treat logs, decisions, and AI
              activity.
            </p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
            <ShieldCheck className="h-4 w-4" />
          </div>
        </div>

        <ul className="mt-4 space-y-2 text-xs">
          {PRIVACY_PREFS.map((pref) => (
            <li
              key={pref.label}
              className="flex items-start gap-3 rounded-xl border border-border bg-background/60 px-3 py-2"
            >
              <div className="mt-1 flex h-4 w-7 items-center justify-center rounded-full border border-border bg-card text-[9px] font-semibold text-muted-foreground">
                ON
              </div>
              <div>
                <p className="font-medium">{pref.label}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {pref.description}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-3 text-[11px] text-muted-foreground">
          In a future iteration, this section can mirror your actual privacy
          policy and terms, with clear links out to /privacy and /terms and a
          dedicated audit log view.
        </p>
      </section>
    </div>
  );
}
