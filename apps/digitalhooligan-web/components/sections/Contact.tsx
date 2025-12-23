export default function Contact() {
    const email = "hello@digitalhooligan.io"; // update if you route elsewhere

    return (
        <section
            id="contact"
            className="relative py-24"
        >
            <div className="mx-auto max-w-3xl space-y-6">
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
                        Contact
                    </h2>
                    <p className="mt-2 text-sm text-slate-300 sm:text-base">
                        Short, clear emails win. Share what you&apos;re trying to build,
                        your rough timeline, and whether this is for yourself, a team, or a
                        government/enterprise program.
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-black/80 p-5 text-sm text-slate-200">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                        EMAIL
                    </p>
                    <p className="mt-1 text-base font-medium text-emerald-300">
                        <a href={`mailto:${email}`} className="hover:underline">
                            {email}
                        </a>
                    </p>
                    <ul className="mt-4 space-y-1.5 text-xs text-slate-300">
                        <li>• What you want to build or improve</li>
                        <li>• Rough scope (MVP, experiment, internal tool, etc.)</li>
                        <li>• Any constraints (timeline, environment, budget band)</li>
                        <li>• If it ties into gov/enterprise or existing systems</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}