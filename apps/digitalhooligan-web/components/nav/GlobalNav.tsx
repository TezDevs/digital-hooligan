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

// Hide global public nav on internal/admin-ish surfaces (allowed; not public links)
const HIDE_NAV_PREFIXES = ["/ceo", "/labs/hq", "/labs/app-registry", "/labs/experiments"];

export default function GlobalNav() {
  const pathname = usePathname();

  const hideNav = HIDE_NAV_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (hideNav) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-dh-border bg-dh-carbon/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="rounded-xl px-2 py-2 transition-colors hover:bg-white/5"
          aria-label="Digital Hooligan homepage"
        >
          <div className="leading-tight">
            <span className="block text-[10px] font-medium uppercase tracking-[0.35em] text-dh-muted/70">
              Digital
            </span>
            <span className="block text-sm font-semibold text-dh-text">Hooligan</span>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          {PUBLIC_NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;

            // Primary CTA: conversion only
            if (item.href === "/contact") {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="ml-2 inline-flex items-center justify-center rounded-full bg-dh-rebel-red px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-dh-rebel-red/90 focus:outline-none focus:ring-2 focus:ring-dh-rebel-red/60"
                  aria-current={isActive ? "page" : undefined}
                >
                  Contact
                </Link>
              );
            }

            // Secondary nav links: Steel Blue hover, no mint
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "rounded-full px-3 py-2 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors",
                  isActive ? "text-dh-text" : "text-dh-muted/70 hover:text-dh-steel-blue",
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
