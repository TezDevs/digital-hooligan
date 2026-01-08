import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use · Digital Hooligan",
  description:
    "Terms of use for Digital Hooligan LLC, covering this site and early-stage apps and experiments.",
};

const neutralCta =
  "rounded-full border border-dh-border bg-transparent px-4 py-2 font-medium text-dh-text transition hover:bg-white/5";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-dh-carbon text-dh-text">
      <section className="border-b border-dh-border px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-dh-muted">
            Terms of use
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            The ground rules for using Digital Hooligan.
          </h1>
          <p className="text-sm text-dh-muted sm:text-base">
            These Terms of Use (&quot;Terms&quot;) govern your use of the
            Digital Hooligan LLC (&quot;Digital Hooligan&quot;, &quot;we&quot;,
            &quot;us&quot;, or &quot;our&quot;) website and any early-stage
            experiments, apps, or tools we expose through it.
          </p>
          <p className="text-xs text-dh-muted/80">
            By accessing or using this site, you agree to these Terms. If you do
            not agree, please do not use the site.
          </p>
        </div>
      </section>

      <section className="border-b border-dh-border bg-dh-carbon px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6 text-sm text-dh-muted">
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-dh-text">
              1. Use of this site
            </h2>
            <p>
              This site is currently focused on sharing information about
              Digital Hooligan, showcasing early products, and providing a way
              to get in touch. You agree to use the site only for lawful
              purposes and in a way that does not harm the site, services, or
              other users.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-dh-text">
              2. No financial or investment advice
            </h2>
            <p>
              Some experiments and future apps (such as PennyWize) may involve
              financial data, stock information, or market signals. Any such
              information is provided{" "}
              <span className="font-semibold text-dh-text">
                for informational and experimental purposes only
              </span>{" "}
              and does not constitute financial, investment, trading, or legal
              advice.
            </p>
            <p>
              You are solely responsible for any decisions you make based on
              information from Digital Hooligan projects. Always do your own
              research and, where appropriate, consult a qualified professional.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-dh-text">
              3. Early-stage nature and no guarantees
            </h2>
            <p>
              Many tools and experiments, including Hooligan Labs projects like
              PennyWize, DropSignal, HypeWatch, and Ops Toys, are early-stage and
              may change, break, or be discontinued at any time.
            </p>
            <p>
              The site and any exposed tools are provided on an{" "}
              <span className="font-semibold text-dh-text">
                &quot;as is&quot; and &quot;as available&quot;
              </span>{" "}
              basis, without warranties of any kind.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-dh-text">
              4. Intellectual property
            </h2>
            <p>
              Unless otherwise noted, the content on this site—including text,
              graphics, logos, and designs—is owned by or licensed to Digital
              Hooligan and is protected by applicable intellectual property
              laws.
            </p>
            <p>
              You may not copy, modify, distribute, or create derivative works
              from this content without prior written permission, except for
              limited personal, non-commercial use consistent with these Terms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-dh-text">
              5. Third-party links and services
            </h2>
            <p>
              The site may link to or integrate with third-party websites,
              services, APIs, or retailers. We do not control and are not
              responsible for their content, policies, or availability. Your use
              of third-party services is at your own risk and may be governed by
              separate terms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-dh-text">
              6. Limitation of liability
            </h2>
            <p>
              To the fullest extent permitted by law, Digital Hooligan will not
              be liable for any indirect, incidental, special, consequential, or
              punitive damages, or any loss of profits or data, arising out of
              or relating to your use of the site or any experiments, apps, or
              tools we provide.
            </p>
            <p>
              In any case where liability cannot be excluded, it will be limited
              to the amount you paid (if any) to use the relevant service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-dh-text">
              7. Your responsibilities
            </h2>
            <p>
              You agree to use Digital Hooligan projects responsibly and not to
              misuse any tools, data, or integrations. You are responsible for
              complying with any applicable laws, regulations, or policies that
              apply to your use of the site or apps.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-dh-text">
              8. Changes to these Terms
            </h2>
            <p>
              We may update these Terms from time to time as the business and
              products evolve. When we do, we will update the &quot;Last
              updated&quot; date at the bottom of this page. Your continued use
              of the site after changes are posted means you accept the updated
              Terms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-dh-text">9. Contact</h2>
            <p>
              If you have questions about these Terms or how they apply to a
              particular Digital Hooligan project, you can reach out through the
              contact section on the homepage.
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
