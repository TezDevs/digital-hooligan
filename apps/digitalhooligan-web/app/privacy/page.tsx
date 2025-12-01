import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy – Digital Hooligan",
    description:
        "How Digital Hooligan LLC collects, uses, and protects information when you use our site and tools.",
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-dh-black text-dh-offwhite">
            <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    Privacy Policy
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-dh-street-gray">
                    Last updated: {new Date().getFullYear()}
                </p>

                <div className="mt-8 space-y-6 text-sm leading-relaxed text-dh-street-gray">
                    <p>
                        This Privacy Policy explains how <strong>Digital Hooligan LLC</strong>{" "}
                        (&quot;Digital Hooligan&quot;, &quot;we&quot;, &quot;us&quot;, or
                        &quot;our&quot;) collects, uses, and protects information when you
                        visit our website, interact with our content, or use our tools,
                        experiments, and apps.
                    </p>

                    <section className="space-y-2">
                        <h2 className="text-base font-semibold text-dh-offwhite">
                            1. Who we are
                        </h2>
                        <p>
                            Digital Hooligan LLC is a small, founder-led software studio based
                            in the United States, focused on tools, web apps, APIs, and
                            automation for things like finance, sneakers, collectibles, and
                            developer operations.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-semibold text-dh-offwhite">
                            2. Information we collect
                        </h2>
                        <p>Depending on how you use the site, we may collect:</p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>
                                <strong>Basic usage data</strong> – pages you visit, buttons you
                                click, approximate location, device and browser type. This is
                                typically collected via analytics tools.
                            </li>
                            <li>
                                <strong>Contact information</strong> – if you submit a form or
                                reach out directly, we may receive your name, email address,
                                and the contents of your message.
                            </li>
                            <li>
                                <strong>Account or preference data</strong> – if, in the
                                future, we offer logins or saved settings, we may store
                                configuration related to your account.
                            </li>
                            <li>
                                <strong>Payment-related information</strong> – if you buy
                                something from us, payments will be processed by third-party
                                providers (such as Stripe). We do not store full payment card
                                numbers on our own servers.
                            </li>
                            <li>
                                <strong>Log data &amp; security signals</strong> – server logs,
                                IP addresses, and error reports used to keep the site and apps
                                running and secure.
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-semibold text-dh-offwhite">
                            3. How we use information
                        </h2>
                        <p>We use the information we collect to:</p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>Provide, maintain, and improve our site and tools.</li>
                            <li>
                                Respond to messages, support requests, or feedback you send.
                            </li>
                            <li>
                                Understand which experiments, features, or content are most
                                useful so we can prioritize what to build next.
                            </li>
                            <li>
                                Communicate about new features, experiments, or offers (only if
                                you opt in).
                            </li>
                            <li>Detect, prevent, or investigate abuse or security issues.</li>
                        </ul>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-semibold text-dh-offwhite">
                            4. Cookies and similar technologies
                        </h2>
                        <p>
                            We may use cookies or similar technologies to keep basic
                            preferences, understand usage, and improve performance. You can
                            usually control cookies through your browser settings, but some
                            features may not work correctly if you disable them.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-semibold text-dh-offwhite">
                            5. When we share information
                        </h2>
                        <p>
                            We do not sell your personal information. We may share limited
                            information with:
                        </p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>
                                <strong>Service providers</strong> that help us run the
                                business (for example, hosting, analytics, email, or payment
                                processing).
                            </li>
                            <li>
                                <strong>Legal or safety reasons</strong> if we believe
                                disclosure is required to comply with law, protect our rights,
                                or prevent harm.
                            </li>
                            <li>
                                <strong>Business transfers</strong> if we ever explore a
                                merger, acquisition, or sale of some or all of our assets;
                                information may be part of that process.
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-semibold text-dh-offwhite">
                            6. Data retention
                        </h2>
                        <p>
                            We keep information only as long as it is reasonably necessary
                            for the purposes described in this Policy, or as required by law.
                            When we no longer need it, we will take steps to delete or
                            anonymize it.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-semibold text-dh-offwhite">
                            7. Your choices and rights
                        </h2>
                        <p>
                            Depending on where you live, you may have rights over your
                            personal information, such as access, correction, or deletion.
                            Even if not legally required, we aim to be reasonable when you
                            contact us about your data.
                        </p>
                        <p>
                            You can always request that we stop sending you marketing
                            messages, or ask us to remove information you previously shared,
                            by emailing us.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-semibold text-dh-offwhite">
                            8. Security
                        </h2>
                        <p>
                            We use reasonable technical and organizational measures to help
                            protect your information. No method of transmission or storage is
                            perfectly secure, and we cannot guarantee absolute security, but
                            we do care about keeping things locked down.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-semibold text-dh-offwhite">
                            9. Children&apos;s privacy
                        </h2>
                        <p>
                            Our site and tools are not directed to children under 13, and we
                            do not knowingly collect personal information from children. If
                            you believe a child has provided us information, please contact
                            us so we can remove it.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-semibold text-dh-offwhite">
                            10. Changes to this policy
                        </h2>
                        <p>
                            We may update this Privacy Policy from time to time as our
                            products or legal requirements change. When we do, we will update
                            the &quot;Last updated&quot; date at the top of this page. If the
                            changes are significant, we may provide additional notice.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-semibold text-dh-offwhite">
                            11. Contact
                        </h2>
                        <p>
                            If you have questions about this Privacy Policy or how we handle
                            information, you can reach us at:
                        </p>
                        <p className="text-sm text-dh-offwhite">
                            Digital Hooligan LLC
                            <br />
                            Email: hello@digitalhooligan.io
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
