import Link from "next/link";
import { notFound } from "next/navigation";

import { loadDecisionEntries } from "../../../../lib/decisionEntryStore";
import type { DecisionEntry } from "../../../../lib/decisionEntryTypes";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DecisionPage({ params }: PageProps) {
  // ✅ unwrap params (THIS WAS THE MISSING PIECE)
  const { id } = await params;

  console.log("DECISION ID:", id);

  const decisions: DecisionEntry[] = loadDecisionEntries();
  const decision = decisions.find((d) => d.id === id);

  if (!decision) {
    notFound();
  }

  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold">{decision.title}</h1>
        <p className="text-sm text-muted-foreground">
          Decision ID: {decision.id}
        </p>
        <p className="text-xs text-muted-foreground">
          Last updated: {new Date(decision.updatedAt).toLocaleString()}
        </p>
      </header>

      <section className="rounded-lg border p-4">
        <h2 className="font-medium">Current State</h2>
        <p className="text-sm">{decision.state}</p>
      </section>

      <section className="flex gap-4 pt-2">
        <Link
          href={`/ceo/decisions/review/${decision.id}`}
          className="text-sm underline text-primary"
        >
          Open Review
        </Link>

        <Link
          href="/ceo/decisions"
          className="text-sm underline text-muted-foreground"
        >
          Back to Decisions
        </Link>
      </section>
    </div>
  );
}
