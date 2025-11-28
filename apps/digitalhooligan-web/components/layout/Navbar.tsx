"use client";

import Link from "next/link";
import Container from "./Container";

const navLinks = [
  { href: "#apps", label: "Apps" },
  { href: "#labs", label: "Hooligan Labs" },
  { href: "#street-cred", label: "Street Cred" },
  { href: "#cta", label: "Why DH?" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-dh-street-gray/60 bg-dh-black/80 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo + wordmark */}
          <Link href="#top" className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-lg border border-dh-electric-mint/60 bg-dh-black shadow-[0_0_18px_rgba(30,255,203,0.7)] transition group-hover:shadow-[0_0_28px_rgba(30,255,203,0.9)]" />
            <div className="flex flex-col leading-none">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-dh-street-gray">
                Digital
              </span>
              <span className="text-sm font-semibold text-white group-hover:text-dh-electric-mint">
                Hooligan
              </span>
            </div>
          </Link>

          {/* Nav links + CTA */}
          <nav className="flex items-center gap-4 sm:gap-6">
            {/* Main nav */}
            <ul className="hidden items-center gap-4 text-xs font-medium text-dh-street-gray sm:flex">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 tracking-wide transition hover:text-white"
                  >
                    <span className="h-1 w-1 rounded-full bg-dh-street-gray/70" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Primary CTA */}
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-dh-electric-mint bg-dh-electric-mint px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-dh-black shadow-[0_0_22px_rgba(30,255,203,0.75)] transition hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(30,255,203,0.9)]"
            >
              Let&apos;s build
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}
