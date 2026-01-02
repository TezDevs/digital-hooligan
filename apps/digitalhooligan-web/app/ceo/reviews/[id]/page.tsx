import Link from "next/link";

export default function DecisionReviewDetailPage() {
  return (
    <main className="p-6 space-y-4">
      <p className="text-sm text-muted-foreground">
        This review shows the decision summary and recorded context. Full
        decision details live in the dossier.
      </p>
      <p className="text-sm text-muted-foreground">
        Decision detail view is temporarily disabled.
      </p>

      <p className="text-sm text-muted-foreground">
        Decision Review v1 is summary-only and read-only.
      </p>

      <Link
        href="/ceo/reviews"
        className="text-sm underline hover:text-foreground"
      >
        ← Back to Review Queue
      </Link>
    </main>
  );
}
