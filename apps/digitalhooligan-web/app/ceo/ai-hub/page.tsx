"use client";

import React from "react";
import Link from "next/link";

/* ---------- Types ---------- */

type AiAppSummaryResponse = {
  ok: true;
  type: "ai_app_summary";
  appId: string;
  appName: string;
  headline: string;
  bullets: string[];
  suggestions: string[];
  timestamp: string;
};

type AiSummaryState =
  | { status: "idle"; appId: string }
  | { status: "loading"; appId: string }
  | { status: "ready"; appId: string; data: AiAppSummaryResponse }
  | { status: "error"; appId: string; message: string };

type AppRegistryApiResponse = {
  ok: boolean;
  apps: {
    id: string;
    name: string;
    shortName?: string;
    internalOnly?: boolean;
  }[];
};

type AppSelectItem = {
  id: string;
  label: string;
};

const DEFAULT_APP_ID = "digital-hooligan-site";

/* ---------- Page ---------- */

export default function AiHubPage() {
  const [selectedAppId, setSelectedAppId] =
    React.useState<string>(DEFAULT_APP_ID);

  const [summaryState, setSummaryState] = React.useState<AiSummaryState>({
    status: "idle",
    appId: DEFAULT_APP_ID,
  });

  const [appOptions, setAppOptions] = React.useState<AppSelectItem[]>([
    {
      id: DEFAULT_APP_ID,
      label: "Digital Hooligan Site (digital-hooligan-site)",
    },
  ]);

  const [appsLoading, setAppsLoading] = React.useState<boolean>(false);
  const [appsError, setAppsError] = React.useState<string | null>(null);

  const runSummary = React.useCallback(async (appId: string) => {
    const cleaned = appId.trim();
    if (!cleaned) return;

    setSummaryState({ status: "loading", appId: cleaned });

    try {
      const params = new URLSearchParams({ appId: cleaned });
      const res = await fetch(`/api/ai/app-summary?${params.toString()}`);
      if (!res.ok) throw new Error(`AI summary API ${res.status}`);
      const data: AiAppSummaryResponse = await res.json();

      setSummaryState({ status: "ready", appId: cleaned, data });
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Unexpected error calling /api/ai/app-summary.";
      setSummaryState({ status: "error", appId: cleaned, message });
    }
  }, []);

  const loadAppsFromRegistry = React.useCallback(async () => {
    setAppsLoading(true);
    setAppsError(null);

    try {
      const res = await fetch("/api/apps/registry");
      if (!res.ok) {
        throw new Error(`Registry API ${res.status}`);
      }

      const data = (await res.json()) as AppRegistryApiResponse;

      const mapped: AppSelectItem[] = data.apps.map((app) => {
        const labelName = app.shortName ?? app.name;
        return {
          id: app.id,
          label: `${labelName} (${app.id})`,
        };
      });

      if (mapped.length > 0) {
        setAppOptions(mapped);

        // If current selection isn't in the registry, snap to the first app.
        const stillValid = mapped.some((opt) => opt.id === selectedAppId);
        if (!stillValid) {
          setSelectedAppId(mapped[0].id);
          void runSummary(mapped[0].id);
        }
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Unexpected error loading app registry.";
      setAppsError(message);
    } finally {
      setAppsLoading(false);
    }
  }, [selectedAppId, runSummary]);

  React.useEffect(() => {
    void loadAppsFromRegistry();
    void runSummary(DEFAULT_APP_ID);
  }, [loadAppsFromRegistry, runSummary]);

  function handleRefresh() {
    void runSummary(selectedAppId);
  }

  function handleAppChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const id = event.target.value;
    setSelectedAppId(id);
    void runSummary(id);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:pt-10">
        {/* Header */}
        <header className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
              AI Hub
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-slate-300/85 md:text-base">
              Internal AI surface for wiring summaries, assistant hints, and
              future copilots that sit on top of your apps, deals, and health
              feeds.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[0.75rem] text-slate-300">
            <span className="inline-flex items-center rounded-full bg-slate-900/70 px-2.5 py-1 text-[0.7rem] font-medium text-emerald-300 ring-1 ring-emerald-500/70">
              Mode: assist preview
            </span>
            <Link
              href="/ceo"
              className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1 text-[0.75rem] font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
            >
              ← Back to CEO overview
            </Link>
          </div>
        </header>

        {/* CEO tabs */}
        <nav className="mb-6 overflow-x-auto">
          <div className="flex gap-2 text-sm">
            <CeoTab href="/ceo" label="Overview" />
            <CeoTab href="/ceo/tasks" label="Tasks" />
            <CeoTab href="/ceo/deals" label="Deals" />
            <CeoTab href="/ceo/finance" label="Finance" />
            <CeoTab href="/ceo/performance" label="Performance" />
            <CeoTab href="/ceo/ai-hub" label="AI Hub" active />
            <CeoTab href="/ceo/dev-workbench" label="Dev WB" />
            <CeoTab href="/ceo/settings" label="Settings" />
            <CeoTab href="/ceo/logout" label="Logout" />
          </div>
        </nav>

        {/* 2-column layout */}
        <section className="grid gap-4 lg:grid-cols-2">
          <AppInsightColumn
            selectedAppId={selectedAppId}
            onChangeApp={handleAppChange}
            onRefresh={handleRefresh}
            summaryState={summaryState}
            appOptions={appOptions}
            appsLoading={appsLoading}
            appsError={appsError}
          />
          <AiWiringNotesCard />
        </section>
      </div>
    </main>
  );
}

/* ---------- Shared CEO tab ---------- */

function CeoTab(props: { href: string; label: string; active?: boolean }) {
  const { href, label, active } = props;

  if (active) {
    return (
      <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-900">
        {label}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-full bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-200 ring-1 ring-slate-700/80 hover:bg-slate-800 hover:text-emerald-200 hover:ring-emerald-500/70"
    >
      {label}
    </Link>
  );
}

/* ---------- Left column: App Insight (AI) ---------- */

function AppInsightColumn(props: {
  selectedAppId: string;
  onChangeApp: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onRefresh: () => void;
  summaryState: AiSummaryState;
  appOptions: AppSelectItem[];
  appsLoading: boolean;
  appsError: string | null;
}) {
  const {
    selectedAppId,
    onChangeApp,
    onRefresh,
    summaryState,
    appOptions,
    appsLoading,
    appsError,
  } = props;

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
        {/* Header row */}
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md space-y-1">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
              App insight (AI)
            </p>
            <p className="text-[0.85rem] leading-relaxed text-slate-300">
              Early assistant-style summary pulled from{" "}
              <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.7rem] text-emerald-300">
                /api/ai/app-summary
              </code>
              . App list is loaded from{" "}
              <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.7rem] text-emerald-300">
                /api/apps/registry
              </code>{" "}
              so it stays in sync with Labs + CEO.
            </p>
          </div>

          <div className="flex flex-col items-stretch gap-2 self-start text-[0.75rem] md:flex-row md:items-center">
            <label className="flex items-center gap-1.5">
              <span className="text-[0.7rem] text-slate-300">App:</span>
              <select
                value={selectedAppId}
                onChange={onChangeApp}
                className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-[0.8rem] text-slate-100 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/70"
              >
                {appOptions.map((app) => (
                  <option key={app.id} value={app.id}>
                    {app.label}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={onRefresh}
              className="inline-flex items-center justify-center rounded-full border border-emerald-500/70 bg-emerald-500/10 px-3 py-1 text-[0.75rem] font-medium text-emerald-200 hover:bg-emerald-500/20"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Registry load state */}
        {appsLoading && (
          <p className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-[0.8rem] text-slate-300">
            Loading app registry…
          </p>
        )}

        {appsError && (
          <p className="rounded-xl border border-amber-500/60 bg-amber-950/40 px-3 py-2 text-[0.8rem] text-amber-50">
            Couldn&apos;t load app registry: {appsError}
          </p>
        )}

        {/* AI summary states */}
        {summaryState.status === "idle" && (
          <p className="mt-3 rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-3 text-[0.85rem] text-slate-300">
            Pick an app and hit <span className="font-semibold">Refresh</span>{" "}
            to see its AI summary.
          </p>
        )}

        {summaryState.status === "loading" && (
          <p className="mt-3 rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-3 text-[0.85rem] text-slate-300">
            Calling{" "}
            <code className="bg-slate-900 px-1 py-0.5 text-[0.7rem]">
              /api/ai/app-summary
            </code>{" "}
            for <span className="font-semibold">{summaryState.appId}</span>…
          </p>
        )}

        {summaryState.status === "error" && (
          <div className="mt-3 rounded-xl border border-rose-500/60 bg-rose-950/40 px-3 py-3 text-[0.85rem] text-rose-100">
            <p className="font-semibold">
              Error calling AI summary for {summaryState.appId}.
            </p>
            <p className="mt-1 text-[0.8rem]">{summaryState.message}</p>
          </div>
        )}

        {summaryState.status === "ready" && (
          <div className="mt-3 space-y-3">
            <div className="rounded-xl border border-emerald-600/70 bg-emerald-950/40 px-3 py-3 text-[0.9rem]">
              <p className="text-[0.8rem] font-semibold text-emerald-200">
                {summaryState.data.headline}
              </p>
              {summaryState.data.bullets.length > 0 && (
                <ul className="mt-2 space-y-1.5 text-[0.85rem] text-emerald-50">
                  {summaryState.data.bullets.map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/90 px-3 py-3 text-[0.85rem]">
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Suggested next moves
              </p>
              {summaryState.data.suggestions.length > 0 ? (
                <ul className="mt-2 space-y-1.5">
                  {summaryState.data.suggestions.map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-[0.8rem] text-slate-300">
                  No suggestions returned yet. Once the endpoint includes them,
                  they&apos;ll show up here as concrete next steps.
                </p>
              )}
            </div>

            <p className="text-[0.7rem] text-slate-400">
              Timestamp: {summaryState.data.timestamp}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Right column: wiring notes ---------- */

function AiWiringNotesCard() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
      <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
        AI wiring notes
      </p>
      <p className="mt-1 text-sm text-slate-200">
        Design doc in disguise for how future assistants should behave.
      </p>
      <ul className="mt-3 space-y-1.5 text-[0.85rem] text-slate-300">
        <li>
          • <span className="font-semibold">Input:</span> app id + registry +
          health context from <code>/api/apps/registry</code> and{" "}
          <code>/api/health/*</code>.
        </li>
        <li>
          • <span className="font-semibold">Output:</span> headline, bullets,
          and concrete next moves that map to Tasks, Deals, or Dev Workbench.
        </li>
        <li>
          • <span className="font-semibold">Later:</span> assistants in Dev WB
          can call the same summary endpoint plus GitHub + CI for branch-level
          work.
        </li>
      </ul>
    </div>
  );
}
