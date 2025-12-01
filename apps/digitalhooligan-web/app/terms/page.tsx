import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Use | Digital Hooligan",
    description:
        "Read the Terms of Use for Digital Hooligan LLC and our apps, bots, and services.",
};

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-black text-zinc-100">
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                <header className="mb-10 border-b border-zinc-800 pb-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
                        Legal
                    </p>
                    <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                        Terms of Use
                    </h1>
                    <p className="mt-4 max-w-2xl text-sm text-zinc-400">
                        These Terms of Use (&quot;Terms&quot;) govern your access to and use
                        of Digital Hooligan LLC&apos;s websites, apps, bots, APIs, and other
                        services (collectively, the &quot;Services&quot;). By using the
                        Services, you agree to these Terms.
                    </p>
                    <p className="mt-2 text-xs text-zinc-500">
                        Last updated:{" "}
                        <span className="font-medium text-zinc-300">December 1, 2025</span>
                    </p>
                </header>

                <div className="space-y-8 text-sm leading-relaxed text-zinc-300">
                    <section>
                        <h2 className="text-base font-semibold text-zinc-100">
                            1. Acceptance of terms
                        </h2>
                        <p className="mt-2 text-zinc-400">
                            By accessing or using the Services, you confirm that you are at
                            least 18 years old (or the age of majority in your jurisdiction)
                            and that you have the legal capacity to agree to these Terms. If
                            you do not agree, you may not use the Services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-zinc-100">
                            2. Use of the services
                        </h2>
                        <p className="mt-2 text-zinc-400">
                            You agree to use the Services only for lawful purposes and in
                            accordance with these Terms. This includes:
                        </p>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-400">
                            <li>Not attempting to disrupt or overload our systems.</li>
                            <li>
                                Not using the Services to harass, abuse, or harm others or
                                violate their rights.
                            </li>
                            <li>
                                Respecting any usage limits, rate limits, or access controls we
                                implement.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-zinc-100">
                            3. Experimental tools and no guarantees
                        </h2>
                        <p className="mt-2 text-zinc-400">
                            Many of our projects, including Hooligan Labs experiments, bots,
                            and automations, are early-stage or experimental. They may change,
                            break, or be discontinued at any time.
                        </p>
                        <p className="mt-2 text-zinc-400">
                            The Services are provided on an &quot;AS IS&quot; and &quot;AS
                            AVAILABLE&quot; basis without warranties of any kind, whether
                            express or implied, including fitness for a particular purpose or
                            non-infringement.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-zinc-100">
                            4. No financial, investment, or legal advice
                        </h2>
                        <p className="mt-2 text-zinc-400">
                            Some Services, such as tools related to prices, alerts, or
                            analytics for stocks, sneakers, collectibles, or similar items,
                            may display or process financial or market-related data. These
                            tools are for informational and educational purposes only.
                        </p>
                        <p className="mt-2 text-zinc-400">
                            Digital Hooligan LLC does not provide financial, investment, tax,
                            or legal advice. You are solely responsible for any decisions you
                            make based on information from the Services and should consult
                            qualified professionals when needed.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-zinc-100">
                            5. Intellectual property
                        </h2>
                        <p className="mt-2 text-zinc-400">
                            Unless otherwise indicated, all content, code, branding, logos,
                            and other materials available through the Services are owned by or
                            licensed to Digital Hooligan LLC and are protected by intellectual
                            property laws.
                        </p>
                        <p className="mt-2 text-zinc-400">
                            You may not copy, modify, distribute, or create derivative works
                            from our content or code except as allowed by applicable law or by
                            explicit written permission from us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-zinc-100">
                            6. Third-party links and services
                        </h2>
                        <p className="mt-2 text-zinc-400">
                            The Services may link to or integrate with third-party websites,
                            APIs, marketplaces, payment processors, or other services. We do
                            not control and are not responsible for third-party content,
                            policies, or practices. Your use of third-party services is
                            subject to their terms and privacy policies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-zinc-100">
                            7. Limitation of liability
                        </h2>
                        <p className="mt-2 text-zinc-400">
                            To the fullest extent permitted by law, Digital Hooligan LLC and
                            its members, affiliates, and partners will not be liable for any
                            indirect, incidental, special, consequential, or punitive damages,
                            or for any loss of profits or data, arising out of or in
                            connection with your use of the Services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-zinc-100">
                            8. Changes to the services or these terms
                        </h2>
                        <p className="mt-2 text-zinc-400">
                            We may update the Services or these Terms from time to time. When
                            we make material changes, we may provide notice (for example, by
                            updating the &quot;Last updated&quot; date or posting a notice on
                            our website). Your continued use of the Services after changes
                            become effective means you accept the updated Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-zinc-100">
                            9. Termination
                        </h2>
                        <p className="mt-2 text-zinc-400">
                            We may suspend or terminate your access to the Services at any
                            time, with or without notice, if we believe you have violated
                            these Terms or are otherwise using the Services in a way that
                            could harm us or others.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-zinc-100">
                            10. Governing law
                        </h2>
                        <p className="mt-2 text-zinc-400">
                            These Terms are governed by the laws of the United States and, to
                            the extent applicable, the laws of the state where Digital
                            Hooligan LLC is organized, without regard to conflict-of-law
                            principles.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-zinc-100">
                            11. Contact us
                        </h2>
                        <p className="mt-2 text-zinc-400">
                            If you have questions about these Terms, you can contact:
                        </p>
                        <p className="mt-2 text-zinc-300">
                            <span className="block font-medium">Digital Hooligan LLC</span>
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