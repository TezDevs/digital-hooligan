import Link from "next/link";

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl p-8 space-y-3">
      <h1 className="text-2xl font-semibold">Today — Mission Control</h1>
      <p className="text-neutral-700">
        MVP checkpoint: Next.js is now detectable + buildable from apps/hypervisor.
        Next PR: identity shell + deterministic assembly cards.
      </p>
      <Link className="inline-flex px-4 py-2 rounded-xl border hover:bg-neutral-50" href="/">
        Back
      </Link>
    </main>
  );
}
