"use client";

import { useEffect, useMemo, useState } from "react";
import { AttentionPanel } from "@/components/ceo/AttentionPanel";
import { attentionMock } from "./data/attention.mock";

type Metric = {
  label: string;
  value: number;
};

const METRICS: Metric[] = [
  { label: "Critical", value: 2 },
  { label: "High", value: 1 },
  { label: "Open", value: 0 },
  { label: "Handled", value: 0 },
];

export default function CEOOverviewPage() {
  /**
   * Hydration guard
   * - Server render: mounted = false
   * - First client paint: mounted = false (matches server)
   * - After hydration: mounted = true
   */
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Decision State Logic
   * (simple + opinionated by design)
   */
  const criticalCount = METRICS.find((m) => m.label === "Critical")?.value ?? 0;
  const highCount = METRICS.find((m) => m.label === "High")?.value ?? 0;

  const decisionState = useMemo<"nominal" | "watch" | "act">(() => {
    if (criticalCount > 0) return "act";
    if (highCount > 0) return "watch";
    return "nominal";
  }, [criticalCount, highCount]);

  const decisionConfig = {
    nominal: {
      label: "Nominal",
      color: "border-green-500 bg-green-500/10 text-green-400",
      message: "No immediate action required. Systems are stable.",
    },
    watch: {
      label: "Watch",
      color: "border-yellow-500 bg-yellow-500/10 text-yellow-400",
      message: "Degraded conditions detected. Monitor closely.",
    },
    act: {
      label: "Act",
      color: "border-red-500 bg-red-500/10 text-red-400",
      message: "Immediate decision required. Active critical incident.",
    },
  }[decisionState];

  /**
   * Metrics rendered on server MUST match first client render
   * We only show real values AFTER mounted === true
   */
  const visibleMetrics = useMemo(() => {
    if (!mounted) {
      return METRICS.map((m) => ({
        ...m,
        value: 0,
      }));
    }

    return METRICS;
  }, [mounted]);

  return (
    <div className="p-6 space-y-6">
      {/* Decision State Banner */}
      <div className={`rounded-lg border px-6 py-4 ${decisionConfig.color}`}>
        <p className="text-sm uppercase tracking-wide opacity-80">
          Decision State
        </p>
        <h2 className="text-xl font-semibold">
          {decisionConfig.label}
        </h2>
        <p className="mt-1 text-sm opacity-90">
          {decisionConfig.message}
        </p>
      </div>

      {/* CEO Overview */}
      <h1 className="text-xl font-semibold mb-4">CEO Overview</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <AttentionPanel items={attentionMock} />

        {visibleMetrics.map(({ label, value }) => (
          <div
            key={label}
            className="rounded border border-white/10 bg-white/5 px-4 py-3"
          >
            <div className="text-xs text-white/60">{label}</div>
            <div className="text-2xl font-semibold">
              {mounted ? value : 0}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}