import Link from "next/link";
import Image from "next/image";

const LOGO_SRC = "/brand/digital_hooligan_logo_square.png";

export default function Footer() {
  return (
    <footer className="border-t border-dh-border bg-dh-carbon px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8 text-sm text-dh-muted">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-xl py-1 pr-2 transition-colors hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-dh-steel-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-dh-carbon"
              aria-label="Digital Hooligan homepage"
            >
              <div className="relative h-7 w-7 overflow-hidden rounded-lg bg-white/95 shadow-[0_0_24px_rgba(255,255,255,0.08)]">
                <Image
                  src={LOGO_SRC}
                  alt="Digital Hooligan logo"
                  fill
                  sizes="28px"
                  className="object-contain"
                />
              </div>

              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dh-muted/80">
                Digital Hooligan LLC
              </p>
            </Link>

            <p className="max-w-md text-dh-muted">
              A small, veteran-led software studio building web apps, dashboards, and automation — with
              clean delivery, tight scope, and maintainable code.
            </p>
            <p className="text-dh-muted/80">
              NAICS 541511 · SAM.gov registered · SDVOSB · VOSB · SBA 8(a) Business Development
            </p>
            <p className="text-dh-muted/80">UEI/CAGE available upon request.</p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dh-muted/80">
                Public
              </p>
              <ul className="space-y-1.5">
                <li>
                  <Link href="/" className="transition-colors hover:text-dh-steel-blue">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="transition-colors hover:text-dh-steel-blue">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/company" className="transition-colors hover:text-dh-steel-blue">
                    Company
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="transition-colors hover:text-dh-steel-blue">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dh-muted/80">
                Programs
              </p>
              <ul className="space-y-1.5">
                <li>
                  <Link href="/gov" className="transition-colors hover:text-dh-steel-blue">
                    Government services
                  </Link>
                </li>
                <li>
                  <Link href="/labs" className="transition-colors hover:text-dh-steel-blue">
                    Hooligan Labs
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dh-muted/80">
                Legal
              </p>
              <ul className="space-y-1.5">
                <li>
                  <Link href="/privacy" className="transition-colors hover:text-dh-steel-blue">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="transition-colors hover:text-dh-steel-blue">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-dh-border pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Digital Hooligan LLC. All rights reserved.</p>
          <p className="text-dh-muted/80">
            Built with disciplined engineering, rapid iteration, and a little bit of hooligan energy.
          </p>
        </div>
      </div>
    </footer>
  );
}
