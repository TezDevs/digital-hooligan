export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="text-4xl font-semibold">Contact</h1>

      <p className="mt-4 max-w-2xl text-neutral-400">
        Short, clear emails win. Share what you’re trying to build, your rough
        timeline, and whether this is for yourself, a team, or a
        government/enterprise program.
      </p>

      <div className="mt-10 rounded-xl border border-neutral-800 bg-black/60 p-6">
        <p className="text-xs tracking-wide text-neutral-500">EMAIL</p>

        <p className="mt-2 text-lg font-medium text-emerald-400">
          hello@digitalhooligan.io
        </p>

        <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-neutral-400">
          <li>What you want to build or improve</li>
          <li>Rough scope (MVP, experiment, internal tool, etc.)</li>
          <li>Any constraints (timeline, environment, budget band)</li>
          <li>If this ties into gov/enterprise or existing systems</li>
        </ul>
      </div>
    </main>
  );
}