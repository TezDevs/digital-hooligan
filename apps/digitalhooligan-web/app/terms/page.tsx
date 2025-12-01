import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Use – Digital Hooligan",
    description:
        "The basic rules for using Digital Hooligan’s site, tools, experiments, and apps.",
};

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-dh-black text-dh-offwhite">
            <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    Terms of Use
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-dh-street-gray">
                    Last updated: {new Date().getFullYear()}
                </p>

                <div className="mt-8 space-y-6 text-sm leading-relaxed text-dh-street-gray">
                    <p>
                        These Terms of Use (&quot;Terms&quot;) govern your access to and use
                        of the website, tools, experiments, and apps provided by{" "}
                        <strong>Digital Hooligan LLC</strong> (&quot;Digital Hooligan&quot;,
                        &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). By accessing
                        or using any part of our services, you agree to be bound by these
                        Terms. If you do not agree, please do not use the site or tools.
                    </p>

                    <section className="space-y-2">
                        <h2 className="text-base font-semibold text-dh-offwhite">
                            1. Who may use the services
                        </h2>
                        <p>
                            You may use our site and tools only if you are able to form a
                            binding contract with us and are not prohibited from doing so
                            under applicable law. By using the services, you represent that
                            you are at least 18 years old (or the age of majority in your
                            jurisdiction).
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-semibold text-dh-offwhite">
                            2. What we provide
                        </h2>
                        <p>
                            Digital Hooligan builds and experiments with tools, bots,
                            scrapers, dashboards, and web apps related to areas like finance,
                            sneakers, collectibles, and developer operations. Some of these
                            are early-stage experiments and may change, break, or disappear
                            without notice.
                        </p>
                        <p>
                            We may update, modify, or discontinue any part of the services at
                            any time, for any reason, without liability to you.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-semibold text-dh-offwhite">
                            3. No financial or investment advice
                        </h2>
                        <p>
                            Some tools and experiments (for example, stock or price-tracking
                            tools like PennyWize, DropSignal, or HypeWatch) may involve
                            financial markets, products, or prices. All such tools are
                            provided for informational and educational purposes only.
                        </p>
                        <p>
                            <strong>
                                Digital Hooligan does not provide investment, financial, legal,
                                or tax advice.
                            </strong>{" "}
                            You are solely responsible for any decisions you make based on
                            information from our services. Trading, buying, or selling any
                            asset involves risk, including the risk of losing money.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-semibold text-dh-offwhite">
                            4. Data accuracy and third-party sources
                        </h2>
                        <p>
                            Our tools may rely on data from third parties (such as
                            marketplaces, brokers, retailers, or other APIs). We do not
                            control these sources and cannot guarantee that any data shown is
                            accurate, complete, or up to date.
                        </p>
                        <p>
                            You understand that prices, availability, and other values may
                            change rapidly and may be wrong or delayed, and you agree not to
                            rely on our services as a single source of truth for critical
                            decisions.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-semibold text-dh-offwhite">
                            5. Acceptable use
                        </h2>
                        <p>You agree that you will not:</p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>Use the services for any unlawful purpose.</li>
                            <li>
                                Attempt to access or interfere with systems or data you are not
                                authorized to access.
                            </li>
                            <li>
                                Reverse engineer, decompile, or attempt to extract source code
                                except where explicitly allowed by law.
                            </li>
                            <li>
                                Use the services to build a directly competing product by
                                copying proprietary ideas, design, or implementation.
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-semibold text-dh-offwhite">
                            6. Intellectual property
                        </h2>
                        <p>
                            Unless otherwise noted, all content, code, branding, logos, and
                            other materials on the site are owned by Digital Hooligan LLC or
                            its licensors and are protected by applicable intellectual
                            property laws. You may not use our name, logos, or branding
                            without prior written permission.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-semibold text-dh-offwhite">
                            7. Third-party links and brands
                        </h2>
                        <p>
                            Our services may reference or link to third-party sites, brands,
                            marketplaces, or products. These references are for convenience
                            only and do not mean we are affiliated with, endorsed by, or
                            officially partnered with those third parties.
                        </p>
                        <p>
                            We do not control and are not responsible for the content,
                            policies, or practices of any third-party site or service.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-semibold text-dh-offwhite">
                            8. Disclaimer of warranties
                        </h2>
                        <p>
                            To the fullest extent permitted by law, the services are provided
                            on an <strong>&quot;as is&quot;</strong> and{" "}
                            <strong>&quot;as available&quot;</strong> basis, without
                            warranties of any kind, whether express or implied.
                        </p>
                        <p>
                            We do not promise that the services will be uninterrupted, secure,
                            or error-free, or that any data will be accurate or reliable.
                            Your use of the services is at your own risk.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-semibold text-dh-offwhite">
                            9. Limitation of liability
                        </h2>
                        <p>
                            To the fullest extent permitted by law, Digital Hooligan LLC and
                            its owner are not liable for any indirect, incidental,
                            consequential, special, or exemplary damages, or any loss of
                            profits or data, arising out of or in connection with your use of
                            the services.
                        </p>
                        <p>
                            Where liability cannot be excluded, it is limited to the amount
                            you paid us, if any, for access to the services in the
                            twelve-month period before the claim arose.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-semibold text-dh-offwhite">
                            10. Changes to these Terms
                        </h2>
                        <p>
                            We may update these Terms from time to time. When we do, we will
                            update the &quot;Last updated&quot; date at the top of this page.
                            If changes are significant, we may provide additional notice. By
                            continuing to use the services after changes take effect, you
                            agree to the revised Terms.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-semibold text-dh-offwhite">
                            11. Governing law
                        </h2>
                        <p>
                            These Terms are governed by the laws of the Commonwealth of
                            Virginia, USA, without regard to its conflict-of-law rules. Any
                            disputes arising out of or relating to these Terms or the
                            services will be handled in the courts located in Virginia,
                            unless otherwise required by applicable law.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-semibold text-dh-offwhite">
                            12. Contact
                        </h2>
                        <p>
                            If you have questions about these Terms, you can contact us at:
                        </p>
                        <p className="text-sm text-dh-offwhite">
                            Digital Hooligan LLC
                            <br />
                            Email: hello@digitalhooligan.io
                        </p>
                    </section>

                    <section className="space-y-2 border-t border-dh-street-gray/40 pt-4 text-[11px]">
                        <p className="text-dh-street-gray">
                            These Terms are provided as a general template and are not legal
                            advice. You should speak with a qualified lawyer to review or
                            adapt them for your specific situation.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
