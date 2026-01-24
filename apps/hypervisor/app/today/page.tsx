import Link from "next/link";

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl p-10 space-y-4">
      <h1 className="text-2xl font-semibold">Today — Mission Control</h1>
      <p className="text-neutral-700">App Router is live for Hypervisor.</p>
      <Link className="inline-flex rounded-xl border px-4 py-2 hover:bg-neutral-50" href="/">
        Back
      </Link>
    </main>
  );
}
