"use client";

import { useEffect, useState } from "react";
import Container from "./Container";

type NavItem = {
  href: string;
  label: string;
};

const NAV_ITEMS: NavItem[] = [
  { href: "#apps", label: "Apps" },
  { href: "#labs", label: "Labs" },
  { href: "#about", label: "About" }, // <-- new About nav → #about
  { href: "#street-cred", label: "Street Cred" },
  { href: "#contact", label: "Contact" },
];

const OBSERVED_SECTIONS = ["hero", "apps", "labs", "about", "street-cred", "contact"];

export default function Navbar() {
  const [activeId, setActiveId] = useState<string>("hero");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (OBSERVED_SECTIONS.includes(id)) {
            setActiveId(id);
          }
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "-45% 0px -55% 0px", // focus middle of viewport
      threshold: 0.2,
    });

    const elements: HTMLElement[] = [];

    OBSERVED_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        elements.push(el);
      }
    });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-dh-street-gray/60 bg-dh-black/80 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg border border-dh-electric-mint/60 bg-dh-black shadow-[0_0_18px_rgba(30,255,203,0.7)]" />
            <div className="flex flex-col leading-none">
              <span className="text-[0.65rem] font-mono uppercase tracking-[0.3em] text-dh-street-gray">
                Digital
              </span>
              <span className="text-sm font-semibold tracking-tight text-white">
                Hooligan
              </span>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex flex-1 justify-end">
            <ul className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.18em] text-dh-street-gray md:gap-6">
              {NAV_ITEMS.map((item) => {
                const targetId = item.href.replace("#", "");
                const isActive = activeId === targetId;

                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={[
                        "relative inline-flex items-center transition-colors",
                        "hover:text-dh-electric-mint",
                        isActive ? "text-dh-electric-mint" : "",
                      ].join(" ")}
                    >
                      {item.label}
                      <span
                        className={[
                          "absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-dh-electric-mint transition-transform",
                          isActive ? "scale-x-100" : "",
                        ].join(" ")}
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}
