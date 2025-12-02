import Link from "next/link";

export default function Contact() {
    return (
        <section
            id="contact"
            className="border-t border-zinc-900 bg-black px-6 py-16 md:px-12 lg:px-24"
        >
            <div className="mx-auto max-w-6xl">
                {/* Section label */}
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-400">
                    Contact
                </p>

                {/* Heading */}
                <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
                    Tell me about the thing you can&apos;t stop thinking about.
                </h2>

                {/* Lead copy */}
                <p className="mt-4 max-w-2xl text-sm text-zinc-400 sm:text-base">
                    Whether it&apos;s a tiny internal tool or a full product, I&apos;m
                    interested in ideas that feel a little risky, a little niche, and very
                    real. Reach out through whatever channel fits best and we&apos;ll
                    figure out the next step.
                </p>

                {/* Contact cards */}
                <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {/* Email */}
                    <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 px-5 py-6 shadow-[0_0_35px_rgba(16,185,129,0.16)]">
                        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                            Email
                        </p>
                        <p className="mt-3 text-sm font-semibold text-zinc-50">
                            <Link href="mailto:ceo@digitalhooligan.io">
                                ceo@digitalhooligan.io
                            </Link>
                        </p>
                        <p className="mt-3 text-[11px] text-zinc-400">
                            Best for project ideas, collabs, and anything that needs detail.
                        </p>
                    </div>

                    {/* Phone */}
                    <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 px-5 py-6 shadow-[0_0_35px_rgba(16,185,129,0.12)]">
                        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                            Phone
                        </p>
                        <p className="mt-3 text-sm font-semibold text-zinc-50">
                            <Link href="tel:5402876266">540-287-6266</Link>
                        </p>
                        <p className="mt-3 text-[11px] text-zinc-400">
                            Quick calls for scoping, follow-ups, or talking through an idea.
                        </p>
                    </div>

                    {/* GitHub */}
                    <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 px-5 py-6 shadow-[0_0_35px_rgba(16,185,129,0.12)]">
                        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                            GitHub
                        </p>
                        <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-zinc-50">
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-zinc-700 text-[11px]">
                                {/* Simple GH mark substitute */}
                                G
                            </span>
                            <Link
                                href="https://github.com/TezDevs"
                                target="_blank"
                                rel="noreferrer"
                            >
                                TezDevs
                            </Link>
                        </p>
                        <p className="mt-3 text-[11px] text-zinc-400">
                            See what I&apos;m shipping and how I think about code.
                        </p>
                    </div>

                    {/* LinkedIn */}
                    <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 px-5 py-6 shadow-[0_0_35px_rgba(16,185,129,0.12)]">
                        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                            LinkedIn
                        </p>
                        <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-zinc-50">
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-sm border border-zinc-700 text-[11px]">
                                in
                            </span>
                            <Link
                                href="https://www.linkedin.com/in/courtez-cannady-a"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Courtez M. Cannady
                            </Link>
                        </p>
                        <p className="mt-3 text-[11px] text-zinc-400">
                            Connect professionally and keep up with what I&apos;m building
                            next.
                        </p>
                    </div>
                </div>

                {/* One-person studio note */}
                <p className="mt-8 max-w-3xl text-[11px] text-zinc-500">
                    I&apos;m a one-person studio, so you&apos;re talking directly to the
                    builder, not an account manager. If I&apos;m in the middle of a
                    deployment or workout, I&apos;ll get back to you as soon as I can.
                </p>
            </div>
        </section>
    );
}