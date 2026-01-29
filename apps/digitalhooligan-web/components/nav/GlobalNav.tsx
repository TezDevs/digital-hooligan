"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const PUBLIC_NAV_ITEMS = [
  { label: "Services", href: "/services" },
  { label: "Apps", href: "/apps" },
  { label: "OpsToys", href: "/ops-toys" },
  { label: "Company", href: "/company" },
  { label: "Gov", href: "/gov" },
  { label: "Labs", href: "/labs" },
  { label: "Operator Notes (Writing)", href: "/operator-notes" },
  { label: "RadixOS", href: "/radixos" },
];

// Hide global public nav on internal/admin-ish surfaces (allowed; not public links)
const HIDE_NAV_PREFIXES = [
  "/labs/hq",
  "/labs/app-registry",
  "/labs/experiments",
];

const LOGO_SRC = "/brand/digital_hooligan_logo_square.png";

export default function GlobalNav() {
  const pathname = usePathname();

  const hideNav = HIDE_NAV_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );
  if (hideNav) return null;

  return (
    <header className="sticky top-0 z-50 overflow-x-hidden border-b border-dh-border bg-dh-carbon/80 backdrop-blur">
      <div className="mx-auto flex min-w-0 max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="Digital Hooligan homepage"
          className="flex shrink-0 items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-dh-steel-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-dh-carbon"
        >
          <div className="relative h-6 w-6 overflow-hidden rounded-lg bg-white/95 shadow-[0_0_28px_rgba(255,255,255,0.08)] sm:h-8 sm:w-8">
            <Image
              src={LOGO_SRC}
              alt="Digital Hooligan logo"
              fill
              sizes="(max-width: 640px) 24px, 32px"
              className="object-contain"
              priority
            />
          </div>

          <div className="leading-tight">
            <span className="block text-[10px] font-medium uppercase tracking-[0.35em] text-dh-muted/70">
              Digital
            </span>
            <span className="block text-sm font-semibold text-dh-text">
              Hooligan
            </span>
          </div>
        </Link>

        <nav className="flex min-w-0 flex-wrap items-center justify-end gap-x-2 gap-y-2">
          {PUBLIC_NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "break-words rounded-full px-3 py-2 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors",
                  isActive
                    ? "text-dh-text"
                    : "text-dh-muted/70 hover:text-dh-steel-blue",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
