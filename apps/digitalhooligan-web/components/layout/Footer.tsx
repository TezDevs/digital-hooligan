import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6 text-xs text-slate-400">
        {/* Top row */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand + tagline */}
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              DIGITAL HOOLIGAN LLC
            </p>
            <p className="max-w-sm text-[11px] text-slate-400">
              A small, veteran-led software studio building web apps,
              dashboards, and automation — with clean delivery, tight scope, and
              maintainable code.
            </p>
            <p className="text-[11px] text-slate-500">
              NAICS 541511 · SAM.gov registered · SDVOSB · VOSB · SBA 8(a)
              Business Development
            </p>
          </div>

          {/* Link columns */}
          <div className="grid gap-6 sm:grid-cols-3">
            {/* Public */}
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                PUBLIC
              </p>
              <div className="flex flex-col gap-1.5">
                <Link href="/" className="transition-colors hover:text-red-200">
                  Home
                </Link>
                <Link
                  href="/services"
                  className="transition-colors hover:text-red-200"
                >
                  Services
                </Link>
                <Link
                  href="/company"
                  className="transition-colors hover:text-red-200"
                >
                  Company
                </Link>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-red-200"
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Gov / Labs */}
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                PROGRAMS
              </p>
              <div className="flex flex-col gap-1.5">
                <Link
                  href="/gov"
                  className="transition-colors hover:text-red-200"
                >
                  Government services
                </Link>
                <Link
                  href="/labs"
                  className="transition-colors hover:text-red-200"
                >
                  Hooligan Labs
                </Link>
              </div>
            </div>

            {/* Legal */}
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                LEGAL
              </p>
              <div className="flex flex-col gap-1.5">
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-red-200"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-red-200"
                >
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col gap-2 border-t border-slate-800 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px]">
            © {new Date().getFullYear()} Digital Hooligan LLC. All rights
            reserved.
          </p>
          <p className="text-[11px] text-slate-500">
            Built with disciplined engineering, rapid iteration, and a little
            bit of hooligan energy.
          </p>
        </div>
      </div>
    </footer>
  );
}
