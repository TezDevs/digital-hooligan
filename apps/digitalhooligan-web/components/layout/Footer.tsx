import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8 text-sm text-slate-400">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Digital Hooligan LLC
            </p>
            <p className="max-w-md text-slate-400">
              A small, veteran-led software studio building web apps,
              dashboards, and automation — with clean delivery, tight scope, and
              maintainable code.
            </p>
            <p className="text-slate-500">
              NAICS 541511 · SAM.gov registered · SDVOSB · VOSB · SBA 8(a)
              Business Development
            </p>
            <p className="text-slate-500">UEI/CAGE available upon request.</p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Public
              </p>
              <ul className="space-y-1.5">
                <li>
                  <Link
                    href="/"
                    className="transition-colors hover:text-dh-electric-mint"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="transition-colors hover:text-dh-electric-mint"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/company"
                    className="transition-colors hover:text-dh-electric-mint"
                  >
                    Company
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="transition-colors hover:text-dh-electric-mint"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Programs
              </p>
              <ul className="space-y-1.5">
                <li>
                  <Link
                    href="/gov"
                    className="transition-colors hover:text-dh-electric-mint"
                  >
                    Government services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/labs"
                    className="transition-colors hover:text-dh-electric-mint"
                  >
                    Hooligan Labs
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Legal
              </p>
              <ul className="space-y-1.5">
                <li>
                  <Link
                    href="/privacy"
                    className="transition-colors hover:text-dh-electric-mint"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="transition-colors hover:text-dh-electric-mint"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-800 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Digital Hooligan LLC. All rights
            reserved.
          </p>
          <p className="text-slate-500">
            Built with disciplined engineering, rapid iteration, and a little
            bit of hooligan energy.
          </p>
        </div>
      </div>
    </footer>
  );
}
