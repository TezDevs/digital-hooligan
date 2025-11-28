"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Container from "./Container";

// Make sure these IDs match your sections:
// <section id="apps">, <section id="labs">, <section id="street-cred">, <section id="why">
const NAV_SECTIONS = [
  { id: "apps", label: "Apps", href: "#apps" },
  { id: "labs", label: "Hooligan Labs", href: "#labs" },
  { id: "street-cred", label: "Street Cred", href: "#street-cred" },
  { id: "why", label: "Why DH?", href: "#why" },
];

const SECTION_IDS = NAV_SECTIONS.map((s) => s.id);

export default function Navbar() {
  const [activeId, setActiveId] = useState<string>("apps");
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll-based active section detection
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const probeY = scrollY + viewportHeight * 0.3; // 30% from top feels nice

      let currentId = "apps";

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const top = rect.top + scrollY;
        const bottom = top + rect.height;

        if (probeY >= top && probeY < bottom) {
          currentId = id;
          break;
        }
      }

      setActiveId(currentId);
      setIsScrolled(scrollY > 10);
    };

    handleScroll(); // run once on mount
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-40 border-b border-dh-street-gray/60 backdrop-blur transition-colors duration-200",
        isScrolled ? "bg-dh-black/90" : "bg-dh-black/70"
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="#top" className="flex items-center gap-2">
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
              {NAV_SECTIONS.map((section) => {
                const isActive = activeId === section.id;

                return (
                  <Link
                    key={section.id}
                    href={section.href}
                    className={clsx(
                      "relative px-2 py-1 font-medium transition-colors duration-150",
                      "hover:text-white",
                      isActive && "text-dh-electric-mint"
                    )}
                  >
                    <span>{section.label}</span>
                    <span
                      className={clsx(
                        "pointer-events-none absolute inset-x-1 -bottom-1 h-0.5 rounded-full bg-dh-electric-mint/70 transition-all duration-200",
                        isActive
                          ? "opacity-100 scale-x-100"
                          : "opacity-0 scale-x-50"
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* CTA button */}
            <Link
              href="#contact"
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
