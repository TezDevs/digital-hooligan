import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Digital Hooligan",
    description:
        "Learn how Digital Hooligan LLC collects, uses, and protects your information.",
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-black text-zinc-100">
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                <header className="mb-10 border-b border-zinc-800 pb-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
                        Legal
                    </p>
                    <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                        Privacy Policy
                    </h1>
                    <p className="mt-4 max-w-2xl text-sm text-zinc-400">
                        This Privacy Policy explains how Digital Hooligan LLC collects, uses,
                        and protects information in connection with our websites, apps,
                        bots, APIs, and related services (collectively, the “Services”).
                    </p>
                    <p className="mt-2 text-xs text-zinc-500">
                        Last updated:{" "}
                        <span className="font-medium text-zinc-300">December 1, 2025</span>
                    </p>
                </header>

                <div className="space-y-8 text-sm leading-relaxed text-zinc-300">
                    <section>
                        <h2 className="text-base font-semibold text-zinc-100">
                            1. Who we are
                        </h2>
                        <p className="mt-2 text-zinc-400">
                            Digital Hooligan LLC (“Digital Hooligan,” “we,” “us,” or “our”) is
                            a U.S.-based software and web application studio focused on tools,
                            automation, and experimental apps for things like infrastructure,
                            sneakers, collectibles, and more.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-zinc-100">
                            2. Information we collect
                        </h2>
                        <p className="mt-2 text-zinc-400">
                            The information we collect depends on how you interact with our
                            Services. This may include:
                        </p>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-400">
                            <li>
                                <span className="font-medium text-zinc-200">
                                    Basic account and contact information
                                </span>{" "}
                                such as your name, email address, and any other details you
                                choose to provide when you contact us.
                            </li>
                            <li>
                                <span className="font-medium text-zinc-200">
                                    Usage and analytics data
                                </span>{" "}
                                such as page views, clicks, device information, and general
                                usage patterns, often collected via analytics tools and server
                                logs.
                            </li>
                            <li>
                                <span className="font-medium text-zinc-200">Preference data</span>{" "}
                                such as alert settings, saved items, or other configuration
                                choices you make in our apps or bots.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-zinc-100">
                            3. How we use information
                        </h2>
                        <p className="mt-2 text-zinc-400">
                            We use the information we collect to:
                        </p>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-400">
                            <li>Provide, maintain, and improve our Services.</li>
                            <li>
                                Operate experimental tools, automations, and dashboards within
                                Hooligan Labs.
                            </li>
                            <li>
                                Communicate with you, including responding to questions or
                                feedback.
                            </li>
                            <li>
                                Monitor performance, troubleshoot issues, and protect against
                                abuse, spam, or misuse.
                            </li>
                            <li>
                                Analyze aggregated usage trends to inform product decisions and
                                future features.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-zinc-100">
                            4. Cookies and similar technologies
                        </h2>
                        <p className="mt-2 text-zinc-400">
                            Our Services may use cookies, local storage, or similar
                            technologies to remember your preferences, keep you signed in, and
                            help us understand how the Services are used. You can usually
                            control cookies through your browser settings, but disabling them
                            may affect certain features.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-zinc-100">
                            5. Third-party services
                        </h2>
                        <p className="mt-2 text-zinc-400">
                            We may use third-party providers for infrastructure, hosting,
                            analytics, payment processing, and similar functions. These
                            providers may process limited personal data on our behalf and are
                            expected to handle that information securely and in accordance
                            with their own privacy policies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-zinc-100">
                            6. Data retention
                        </h2>
                        <p className="mt-2 text-zinc-400">
                            We retain information only for as long as reasonably necessary to
                            provide the Services, meet legal or regulatory requirements, or
                            resolve disputes. When information is no longer needed, we will
                            take steps to delete or de-identify it where practical.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-zinc-100">
                            7. Your choices
                        </h2>
                        <p className="mt-2 text-zinc-400">
                            Depending on your location, you may have rights to access, update,
                            or delete certain personal information. You can also contact us to
                            ask questions about how your data is used, or to request changes
                            where applicable.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-zinc-100">
                            8. Children&apos;s privacy
                        </h2>
                        <p className="mt-2 text-zinc-400">
                            Our Services are not directed to children under 13, and we do not
                            knowingly collect personal information from children. If you
                            believe a child has provided us with personal data, please contact
                            us so we can take appropriate action.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-zinc-100">
                            9. Changes to this policy
                        </h2>
                        <p className="mt-2 text-zinc-400">
                            We may update this Privacy Policy from time to time as our
                            Services evolve or as legal requirements change. When we do, we
                            will revise the “Last updated” date above. Your continued use of
                            the Services after any changes means you accept the updated
                            policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-zinc-100">
                            10. Contact us
                        </h2>
                        <p className="mt-2 text-zinc-400">
                            If you have questions about this Privacy Policy or how we handle
                            your information, you can contact:
                        </p>
                        <p className="mt-2 text-zinc-300">
                            <span className="block font-medium">
                                Digital Hooligan LLC – Privacy
                            </span>
                            <span className="block text-zinc-400">
                                Email:{" "}
                                <a
                                    href="mailto:legal@digitalhooligan.io"
                                    className="underline decoration-emerald-500 decoration-2 underline-offset-4 hover:text-emerald-300"
                                >
                                    legal@digitalhooligan.io
                                </a>
                            </span>
                        </p>
                        <p className="mt-4 text-xs text-zinc-500">
                            This page is provided for informational purposes only and does not
                            constitute legal advice. You should consult with a qualified
                            attorney for guidance specific to your situation.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}