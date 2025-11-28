"use client";

import Link from "next/link";
import clsx from "clsx";
import Container from "./Container";

const NAV_SECTIONS = [
  { label: "Apps", href: "/#apps" },
  { label: "Hooligan Labs", href: "/#labs" },
  { label: "Street Cred", href: "/#street-cred" },
  { label: "Why DH?", href: "/#why" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-dh-street-gray/60 bg-dh-black/80 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/#top" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg border border-dh-electric-mint/60 bg-dh-black shadow-[0_0_18px_rgba(30,255,203,0.7)]" />
            <div className="flex flex-col leading-none">
              <span className="text-[10px] font-mono uppercase tracking-[0.32em] text-dh-street-gray">
                Digital
              </span>
              <span className="text-xs font-semibold text-white">
                Hooligan
              </span>
            </div>
          </Link>

          {/* Nav + CTA */}
          <div className="flex items-center gap-6">
            <nav className="hidden items-center gap-4 text-[11px] text-dh-street-gray/80 md:flex">
              {NAV_SECTIONS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "group relative px-2 py-1 font-medium transition-colors duration-150",
                    "hover:text-white"
                  )}
                >
                  <span>{item.label}</span>
                  <span
                    className={clsx(
                      "pointer-events-none absolute inset-x-1 -bottom-1 h-0.5 origin-center scale-x-50 rounded-full bg-dh-electric-mint/70 opacity-0 transition-all duration-200",
                      "group-hover:opacity-100 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              ))}
            </nav>

            {/* CTA button – always bright */}
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full border border-dh-electric-mint bg-dh-electric-mint px-3 py-1.5 text-[11px] font-semibold text-dh-black shadow-[0_0_18px_rgba(30,255,203,0.6)] transition hover:brightness-110 hover:shadow-[0_0_26px_rgba(30,255,203,0.8)]"
            >
              Let&apos;s build
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
