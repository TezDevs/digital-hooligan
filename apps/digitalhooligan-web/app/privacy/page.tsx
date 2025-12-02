export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-black px-4 pb-16 pt-24 text-zinc-100 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-3xl flex-col gap-8">
                <header className="space-y-3">
                    <p className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-400">
                        Digital Hooligan LLC
                    </p>
                    <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        Privacy Policy
                    </h1>
                    <p className="text-xs text-zinc-500">
                        Last updated: {new Date().getFullYear()}
                    </p>
                    <p className="text-sm text-zinc-400">
                        Digital Hooligan LLC (&quot;Digital Hooligan,&quot; &quot;we,&quot;
                        &quot;us,&quot; or &quot;our&quot;) builds software, tools, and
                        experimental apps. This Privacy Policy explains how we handle
                        information when you visit our website or interact with our apps and
                        services.
                    </p>
                </header>

                <section className="space-y-2 text-sm text-zinc-300">
                    <h2 className="text-sm font-semibold text-zinc-100">
                        1. What we (currently) collect
                    </h2>
                    <p className="text-zinc-400">
                        At this stage, Digital Hooligan does not operate a large
                        account-based platform. Most visits are simple brochure traffic to
                        learn about the studio and its projects. Depending on how you use
                        the site, we may collect:
                    </p>
                    <ul className="list-disc space-y-1 pl-5 text-zinc-400">
                        <li>
                            <span className="font-medium text-zinc-100">
                                Basic usage data
                            </span>{" "}
                            such as pages visited, approximate region, and device/browser
                            information (via standard analytics or server logs).
                        </li>
                        <li>
                            <span className="font-medium text-zinc-100">
                                Contact information
                            </span>{" "}
                            you choose to send, such as your name, email address, and message
                            content via the contact form or email links.
                        </li>
                        <li>
                            <span className="font-medium text-zinc-100">
                                Early-access or beta details
                            </span>{" "}
                            if you sign up for waiting lists or pilots for tools like
                            PennyWize, DropSignal, HypeWatch, or Ops Toys.
                        </li>
                    </ul>
                </section>

                <section className="space-y-2 text-sm text-zinc-300">
                    <h2 className="text-sm font-semibold text-zinc-100">
                        2. How we use information
                    </h2>
                    <p className="text-zinc-400">
                        We use the information we collect to:
                    </p>
                    <ul className="list-disc space-y-1 pl-5 text-zinc-400">
                        <li>Operate, maintain, and improve the website and apps.</li>
                        <li>
                            Respond to messages and inquiries about work, collaborations, or
                            support.
                        </li>
                        <li>
                            Understand what tools, features, or experiments people are most
                            interested in.
                        </li>
                    </ul>
                    <p className="text-xs text-zinc-500">
                        We do not sell personal information, and we do not run ads on this
                        site.
                    </p>
                </section>

                <section className="space-y-2 text-sm text-zinc-300">
                    <h2 className="text-sm font-semibold text-zinc-100">
                        3. Cookies & analytics
                    </h2>
                    <p className="text-zinc-400">
                        Digital Hooligan may use basic analytics or performance tooling to
                        understand how the site is used (for example, page views or error
                        rates). These tools may set cookies or collect pseudonymous
                        identifiers like IP address, device type, and browser version.
                    </p>
                    <p className="text-zinc-400">
                        Any analytics in use are chosen to be minimal and focused on product
                        improvement, not ad tracking.
                    </p>
                </section>

                <section className="space-y-2 text-sm text-zinc-300">
                    <h2 className="text-sm font-semibold text-zinc-100">
                        4. Data retention
                    </h2>
                    <p className="text-zinc-400">
                        We keep information only as long as needed for the purposes
                        described in this policy or as required by law or contractual
                        obligations. For example, if you email about a project, your message
                        may be retained in normal email archives.
                    </p>
                </section>

                <section className="space-y-2 text-sm text-zinc-300">
                    <h2 className="text-sm font-semibold text-zinc-100">
                        5. Third-party services
                    </h2>
                    <p className="text-zinc-400">
                        Some Digital Hooligan projects may use third-party infrastructure
                        (for example: hosting, analytics, payments, or communication tools).
                        When that happens, those providers may process limited data on our
                        behalf under their own privacy terms.
                    </p>
                    <p className="text-xs text-zinc-500">
                        Specific integrations (like payment processors or auth providers)
                        will be documented in the relevant app or onboarding flow as they
                        come online.
                    </p>
                </section>

                <section className="space-y-2 text-sm text-zinc-300">
                    <h2 className="text-sm font-semibold text-zinc-100">
                        6. Security
                    </h2>
                    <p className="text-zinc-400">
                        No system is perfectly secure, but we aim to follow reasonable
                        engineering practices for the size and stage of the studio: limiting
                        access to systems, using modern hosting platforms, and keeping
                        software dependencies reasonably up to date.
                    </p>
                </section>

                <section className="space-y-2 text-sm text-zinc-300">
                    <h2 className="text-sm font-semibold text-zinc-100">
                        7. Your choices
                    </h2>
                    <p className="text-zinc-400">
                        If you have questions about what information Digital Hooligan has
                        about you, or you want something updated or removed, reach out and
                        we&apos;ll do our best to help where legally and technically
                        possible.
                    </p>
                </section>

                <section className="space-y-2 text-sm text-zinc-300">
                    <h2 className="text-sm font-semibold text-zinc-100">
                        8. Contact
                    </h2>
                    <p className="text-zinc-400">
                        To ask a question about this policy or how Digital Hooligan handles
                        data, you can contact the studio using the form on the main site or
                        via the email listed in the contact section.
                    </p>
                </section>

                <p className="text-[11px] text-zinc-500">
                    This page is intended to provide a clear, plain-language summary of
                    how Digital Hooligan currently handles data. As the studio and its
                    products evolve, this policy will be updated.
                </p>
            </div>
        </main>
    );
}