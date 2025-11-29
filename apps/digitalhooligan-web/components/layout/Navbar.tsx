"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";

const navItems = [
  { id: "apps", label: "Apps" },
  { id: "labs", label: "Labs" },
  { id: "about", label: "About" },
  { id: "street-cred", label: "Street Cred" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const getHref = (id: string) => {
    if (id === "labs") {
      // Always go to the dedicated Labs page
      return "/labs";
    }

    // Other sections live on the homepage
    if (isHome) {
      return `#${id}`;
    }

    return `/#${id}`;
  };

  const isActive = (id: string) => {
    if (id === "labs") {
      return pathname === "/labs";
    }

    // Simple default: highlight Apps on home, Labs on /labs
    if (isHome && id === "apps") return true;

    return false;
  };

  return (
    <header className="sticky top-0 z-40 border-b border-dh-street-gray/60 bg-dh-black/80 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo / Brand */}
          <Link href={isHome ? "#hero" : "/"} className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg border border-dh-electric-mint/60 bg-dh-black shadow-[0_0_18px_rgba(30,255,203,0.7)]" />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-white">
                Digital Hooligan
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-dh-street-gray">
                App Studio · Hooligan Labs
              </span>
            </div>
          </Link>

          {/* Nav */}
          <nav className="hidden items-center gap-6 text-xs font-medium text-dh-street-gray sm:flex">
            {navItems.map((item) => {
              const active = isActive(item.id);

              return (
                <Link
                  key={item.id}
                  href={getHref(item.id)}
                  className={[
                    "relative transition-colors",
                    active ? "text-dh-electric-mint" : "hover:text-white",
                  ].join(" ")}
                >
                  {item.label}
                  {/* underline for active item */}
                  {active && (
                    <span className="pointer-events-none absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-dh-electric-mint" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile nav placeholder (can expand later) */}
          <div className="flex sm:hidden">
            {/* For now we just keep the brand visible; real mobile menu can be a later feature */}
          </div>
        </div>
      </Container>
    </header>
  );
}
