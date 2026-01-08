"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PUBLIC_NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Company", href: "/company" },
  { label: "Gov", href: "/gov" },
  { label: "Labs", href: "/labs" },
  { label: "Contact", href: "/contact" },
];

// Hide global public nav on internal/admin surfaces (allowed; not public links)
const HIDE_NAV_PREFIXES = ["/ceo", "/labs/hq", "/labs/app-registry", "/labs/experiments"];

export default function GlobalNav() {
  const pathname = usePathname();

  const hideNav = HIDE_NAV_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (hideNav) return null;

  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-800 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
        {PUBLIC_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                isActive
                  ? "text-dh-electric-mint"
                  : "transition-colors hover:text-dh-electric-mint"
              }
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
