"use client";

import React from "react";
import { DecisionEntry } from "@/lib/ceoDashboardData";
import { isReviewSessionCandidate } from "@/lib/decisionReviewSession";
import { decisionReviewPriority } from "@/lib/decisionReviewPriority";
import { DecisionStaleBadge } from "@/components/decision/DecisionStaleBadge";
import { DecisionNeedsReviewBadge } from "@/components/decision/DecisionNeedsReviewBadge";

export function DecisionReviewSessionPanel({
  decisions,
}: {
  decisions: DecisionEntry[];
}) {
  const reviewDecisions = React.useMemo(() => {
    return decisions
      .filter((d) =>
        isReviewSessionCandidate({
          date: d.date,
          area: d.area,
          impact: d.impact,
        })
      )
      .slice()
      .sort((a, b) => {
        const scoreA = decisionReviewPriority({
          date: a.date,
          area: a.area,
          impact: a.impact,
        });

        const scoreB = decisionReviewPriority({
          date: b.date,
          area: b.area,
          impact: b.impact,
        });

        return scoreB - scoreA;
      });
  }, [decisions]);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-3">
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Decision Review Session
        </h2>
        <p className="mt-1 text-[11px] text-slate-400">
          Snapshot of decisions that warranted attention during this review.
        </p>
      </div>

      {reviewDecisions.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-800 bg-slate-950/60 px-3 py-4 text-center text-slate-500 text-[11px]">
          No decisions currently require review.
        </div>
      ) : (
        <div className="space-y-2 text-[11px]">
          {reviewDecisions.map((d) => (
            <article
              key={d.id}
              className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="text-[10px] text-slate-500">{d.date}</div>
                    <DecisionStaleBadge updatedAt={d.date} />
                    <DecisionNeedsReviewBadge
                      date={d.date}
                      area={d.area}
                      impact={d.impact}
                    />
                  </div>

                  <div className="text-[12px] font-medium text-slate-200">
                    {d.title}
                  </div>

                  {d.details && (
                    <p className="mt-1 text-[11px] text-slate-400">
                      {d.details}
                    </p>
                  )}
                </div>

                <div className="text-[10px] text-slate-500">{d.area}</div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
