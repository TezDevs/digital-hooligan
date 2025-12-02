export default function TermsPage() {
    return (
        <main className="min-h-screen bg-black px-4 pb-16 pt-24 text-zinc-100 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-3xl flex-col gap-8">
                <header className="space-y-3">
                    <p className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-400">
                        Digital Hooligan LLC
                    </p>
                    <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        Terms of Use
                    </h1>
                    <p className="text-xs text-zinc-500">
                        Last updated: {new Date().getFullYear()}
                    </p>
                    <p className="text-sm text-zinc-400">
                        These Terms of Use (&quot;Terms&quot;) govern your access to and use
                        of the Digital Hooligan website and any apps, tools, or services we
                        make available (collectively, the &quot;Services&quot;). By using
                        the Services, you agree to these Terms.
                    </p>
                </header>

                <section className="space-y-2 text-sm text-zinc-300">
                    <h2 className="text-sm font-semibold text-zinc-100">
                        1. Who we are
                    </h2>
                    <p className="text-zinc-400">
                        Digital Hooligan LLC is a single-member software studio focused on
                        building tools, web experiences, and automation-heavy apps for
                        internal ops, traders, collectors, and similar users.
                    </p>
                </section>

                <section className="space-y-2 text-sm text-zinc-300">
                    <h2 className="text-sm font-semibold text-zinc-100">
                        2. Acceptable use
                    </h2>
                    <p className="text-zinc-400">
                        You agree to use the Services only for lawful purposes and in a way
                        that does not harm Digital Hooligan, its infrastructure, or other
                        users. In particular, you agree not to:
                    </p>
                    <ul className="list-disc space-y-1 pl-5 text-zinc-400">
                        <li>
                            Attempt to gain unauthorized access to systems, data, or accounts.
                        </li>
                        <li>
                            Reverse-engineer, probe, or overload the Services in a way that
                            impacts stability.
                        </li>
                        <li>
                            Use the Services to send spam, launch attacks, or violate any
                            applicable laws or regulations.
                        </li>
                    </ul>
                </section>

                <section className="space-y-2 text-sm text-zinc-300">
                    <h2 className="text-sm font-semibold text-zinc-100">
                        3. Experimental tools & no guarantees
                    </h2>
                    <p className="text-zinc-400">
                        Many Digital Hooligan projects (like PennyWize, DropSignal,
                        HypeWatch, Ops Toys, and other &quot;lab&quot; work) are
                        experimental and may change, break, or be removed without notice.
                        These tools are not guaranteed to be accurate, uninterrupted, or
                        suitable for any particular purpose.
                    </p>
                    <p className="text-xs text-zinc-500">
                        You are responsible for how you use any information surfaced by
                        these tools, including financial or operational decisions.
                    </p>
                </section>

                <section className="space-y-2 text-sm text-zinc-300">
                    <h2 className="text-sm font-semibold text-zinc-100">
                        4. No financial, legal, or investment advice
                    </h2>
                    <p className="text-zinc-400">
                        Unless explicitly stated otherwise, nothing provided by Digital
                        Hooligan should be treated as financial, legal, tax, or investment
                        advice. Any charts, signals, alerts, or price information are for
                        informational and experimental use only.
                    </p>
                </section>

                <section className="space-y-2 text-sm text-zinc-300">
                    <h2 className="text-sm font-semibold text-zinc-100">
                        5. Intellectual property
                    </h2>
                    <p className="text-zinc-400">
                        Unless we say otherwise, the content, design, and code for the
                        Services are owned by Digital Hooligan LLC or its licensors. You may
                        not copy, redistribute, or reuse substantial parts of the Services
                        without permission, except as allowed by applicable law.
                    </p>
                </section>

                <section className="space-y-2 text-sm text-zinc-300">
                    <h2 className="text-sm font-semibold text-zinc-100">
                        6. Third-party services & links
                    </h2>
                    <p className="text-zinc-400">
                        Some parts of the Services may integrate with or link to
                        third-party services (for example, payment providers, data sources,
                        or authentication). Digital Hooligan is not responsible for those
                        third-party sites or services, and your use of them is governed by
                        their own terms and policies.
                    </p>
                </section>

                <section className="space-y-2 text-sm text-zinc-300">
                    <h2 className="text-sm font-semibold text-zinc-100">
                        7. Disclaimer of warranties
                    </h2>
                    <p className="text-zinc-400">
                        The Services are provided on an &quot;as is&quot; and &quot;as
                        available&quot; basis. To the fullest extent permitted by law,
                        Digital Hooligan disclaims all warranties, whether express or
                        implied, including any implied warranties of merchantability, fitness
                        for a particular purpose, and non-infringement.
                    </p>
                </section>

                <section className="space-y-2 text-sm text-zinc-300">
                    <h2 className="text-sm font-semibold text-zinc-100">
                        8. Limitation of liability
                    </h2>
                    <p className="text-zinc-400">
                        To the fullest extent permitted by law, Digital Hooligan will not be
                        liable for any indirect, incidental, special, consequential, or
                        punitive damages arising out of or related to your use of the
                        Services.
                    </p>
                </section>

                <section className="space-y-2 text-sm text-zinc-300">
                    <h2 className="text-sm font-semibold text-zinc-100">
                        9. Changes to these Terms
                    </h2>
                    <p className="text-zinc-400">
                        Digital Hooligan may update these Terms from time to time. When we
                        do, we&apos;ll update the &quot;Last updated&quot; date above. If
                        you continue to use the Services after changes take effect, you
                        accept the revised Terms.
                    </p>
                </section>

                <section className="space-y-2 text-sm text-zinc-300">
                    <h2 className="text-sm font-semibold text-zinc-100">
                        10. Contact
                    </h2>
                    <p className="text-zinc-400">
                        If you have questions about these Terms, reach out through the
                        contact options on the main site.
                    </p>
                </section>

                <p className="text-[11px] text-zinc-500">
                    These Terms are intended as a reasonable, plain-language baseline for
                    a small software studio. For specific contracting work, written
                    agreements will control over anything on this page.
                </p>
            </div>
        </main>
    );
}