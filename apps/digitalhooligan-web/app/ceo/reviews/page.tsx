"use client";

import { loadDecisionEntries } from "@/lib/decisionEntryStore";
import Link from "next/link";
import { useMemo, useState } from "react";

type StatusFilter = "all" | "draft" | "final";
type DateFilter = "all" | "7" | "30" | "90";

/**
 * Anchor time once at module load.
 * This is NOT render-time and is compiler-safe.
 */
const NOW = Date.now();

export default function DecisionReviewQueuePage() {
  const allEntries = loadDecisionEntries();

  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");

  const filteredEntries = useMemo(() => {
    return allEntries.filter((entry) => {
      if (statusFilter !== "all" && entry.status !== statusFilter) {
        return false;
      }

      if (dateFilter !== "all") {
        const days = Number(dateFilter);
        const cutoff = NOW - days * 24 * 60 * 60 * 1000;

        if (new Date(entry.createdAt).getTime() < cutoff) {
          return false;
        }
      }

      return true;
    });
  }, [allEntries, statusFilter, dateFilter]);

  return (
    <main className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Decision Review Queue</h1>
        <Link
          href="/ceo"
          className="text-sm text-muted-foreground hover:underline"
        >
          ← Back to CEO Dashboard
        </Link>
      </header>

      {/* Filters */}
      <section className="flex flex-wrap gap-4 text-sm">
        <label className="flex items-center gap-2">
          Status
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="rounded border border-neutral-800 bg-transparent px-2 py-1"
          >
            <option value="all">All</option>
            <option value="draft">Draft</option>
            <option value="final">Final</option>
          </select>
        </label>

        <label className="flex items-center gap-2">
          Created
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as DateFilter)}
            className="rounded border border-neutral-800 bg-transparent px-2 py-1"
          >
            <option value="all">All time</option>
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
        </label>
      </section>

      {/* List */}
      {filteredEntries.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No decision entries match the current filters.
        </p>
      ) : (
        <ul className="space-y-3">
          {filteredEntries.map((entry) => (
            <li
              key={entry.id}
              className="rounded-lg border border-neutral-800 p-4"
            >
              <div className="flex items-center justify-between">
                <div className="font-medium">{entry.title}</div>
                <span className="text-xs text-muted-foreground">
                  {entry.status.toUpperCase()}
                </span>
              </div>

              <div className="mt-1 text-sm text-muted-foreground">
                {entry.summary}
              </div>

              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  Created: {new Date(entry.createdAt).toLocaleString()}
                </span>
                <Link
                  href={`/ceo/dossier/${entry.id}`}
                  className="hover:underline"
                >
                  Open Dossier →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
