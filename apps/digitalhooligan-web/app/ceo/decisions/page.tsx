import Link from "next/link";

export default function DecisionsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-semibold">Decisions</h1>
        <p className="text-sm text-muted-foreground">
          Review and inspect recorded decisions. This surface is read-only.
        </p>
      </header>

      <section className="space-y-2">
        <h2 className="text-sm font-medium">Recent</h2>

        {/* Temporary manual entry until list wiring */}
        <Link
          href="/ceo/decisions/review/decision-local-001"
          className="inline-block text-sm font-medium text-blue-600 hover:underline"
        >
          View Decision: decision-local-001 →
        </Link>
      </section>

      <section className="text-xs text-muted-foreground">
        Editing and creation flows are intentionally disabled.
      </section>
    </div>
  );
}
