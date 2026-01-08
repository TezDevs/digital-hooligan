import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy · Digital Hooligan",
  description:
    "Privacy policy for Digital Hooligan LLC, a small software studio building web apps, bots, and internal tools.",
};

const neutralCta =
  "rounded-full border border-dh-border bg-transparent px-4 py-2 font-medium text-dh-text transition hover:bg-white/5";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-dh-carbon text-dh-text">
      <section className="border-b border-dh-border px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-dh-muted">
            Privacy policy
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            How Digital Hooligan handles data and privacy.
          </h1>
          <p className="text-sm text-dh-muted sm:text-base">
            Digital Hooligan LLC (&quot;Digital Hooligan&quot;, &quot;we&quot;,
            &quot;us&quot;, or &quot;our&quot;) is a small software studio that
            builds web apps, bots, and internal tools. This Privacy Policy
            explains, in plain language, what information we may collect, how we
            may use it, and what choices you have.
          </p>
          <p className="text-xs text-dh-muted/80">
            This policy is an early, lightweight statement intended for the
            studio&apos;s initial site and experiments. As the products mature,
            this page will be updated to reflect any new data practices.
          </p>
        </div>
      </section>

      <section className="border-b border-dh-border bg-dh-carbon px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6 text-sm text-dh-muted">
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-dh-text">
              1. Information we may collect
            </h2>
            <p>
              At this stage, Digital Hooligan&apos;s public site is primarily an
              informational and portfolio-style website. We do not currently run
              user accounts or take payments here. However, we may collect:
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li>
                <span className="font-medium text-dh-text">Basic usage data</span>{" "}
                such as page views, device type, and rough location (city /
                region) via analytics tools.
              </li>
              <li>
                <span className="font-medium text-dh-text">Contact information</span>{" "}
                you voluntarily provide, such as your name, email address, or
                project details when you reach out.
              </li>
              <li>
                <span className="font-medium text-dh-text">Log information</span>{" "}
                such as IP address, browser type, and timestamps, which may be
                generated automatically by our hosting and security providers.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-dh-text">
              2. How we use information
            </h2>
            <p>We use information we collect to:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Respond to project and collaboration inquiries.</li>
              <li>Understand how people find and use the site.</li>
              <li>Improve the design, copy, and performance of our projects.</li>
              <li>Maintain the security and reliability of infrastructure.</li>
            </ul>
            <p>
              We do <span className="font-semibold text-dh-text">not</span> sell
              your personal information.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-dh-text">
              3. Cookies and analytics
            </h2>
            <p>
              The site may use cookies or similar technologies for basic
              analytics and performance monitoring. These tools help us
              understand which pages are useful and how the site is performing.
            </p>
            <p>
              As the studio grows, we may adopt privacy-respecting analytics
              tools that do not rely on invasive tracking. If that changes in a
              material way, this policy will be updated.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-dh-text">
              4. Third-party services
            </h2>
            <p>
              Digital Hooligan relies on third-party providers for hosting,
              analytics, error monitoring, and similar infrastructure. These
              providers may process limited personal information on our behalf
              in order to deliver their services.
            </p>
            <p>
              We aim to work with reputable providers and configure services in
              a way that respects privacy wherever possible.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-dh-text">
              5. Data retention
            </h2>
            <p>
              We retain personal information only for as long as it is
              reasonably necessary for the purposes described in this policy, or
              as required by law.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-dh-text">
              6. Your choices and rights
            </h2>
            <p>
              You can choose whether to provide contact information when you
              reach out. If you&apos;ve shared details and later want them
              removed or updated, you can request that at any time using the
              contact information below.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-dh-text">7. Security</h2>
            <p>
              Digital Hooligan takes reasonable technical and organizational
              measures to protect the information it handles. However, no method
              of transmission or storage is completely risk-free, and we cannot
              guarantee absolute security.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-dh-text">
              8. Children&apos;s privacy
            </h2>
            <p>
              This site and the current projects are not directed to children
              under 13, and we do not knowingly collect personal information
              from children under 13.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-dh-text">
              9. Changes to this policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time as the
              business, apps, and legal requirements evolve. When we do, we
              will change the &quot;Last updated&quot; date at the bottom of
              this page.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-dh-text">10. Contact</h2>
            <p>
              If you have questions about this policy or how Digital Hooligan
              handles data, you can reach out via the contact section on the
              homepage.
            </p>
          </section>
        </div>
      </section>

      <section className="bg-dh-carbon px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 border-t border-dh-border pt-5 text-xs text-dh-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Last updated: 2025.</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/" className={neutralCta}>
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
