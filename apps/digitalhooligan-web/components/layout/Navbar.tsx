"use client";

import Container from "./Container";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-dh-street-gray/60 bg-dh-black/80 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg border border-dh-electric-mint/60 bg-dh-black shadow-[0_0_18px_rgba(30,255,203,0.7)]" />
            <div className="flex flex-col leading-none">
              <span className="text-[10px] uppercase tracking-[0.25em] text-dh-graffiti-yellow">
                Digital
              </span>
              <span className="text-lg font-semibold tracking-tight">
                Hooligan
              </span>
            </div>
          </div>

          {/* Nav links */}
          <nav className="hidden gap-6 text-sm text-neutral-300 md:flex">
            <a href="#about" className="hover:text-white">
              What We Do
            </a>
            <a href="#apps" className="hover:text-white">
              Apps
            </a>
            <a href="#labs" className="hover:text-white">
              Labs
            </a>
            <a href="#contact" className="hover:text-white">
              Contact
            </a>
          </nav>


          {/* CTA */}
          {/* CTA */}
          <a
            href="#contact"
            className="rounded-full border border-dh-rebel-red/60 bg-dh-rebel-red/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] shadow-[0_0_18px_rgba(255,77,178,0.7)] hover:bg-dh-rebel-red/40 flex items-center"
          >
            Join the Crew
          </a>
        </div>
      </Container>
    </header>
  );
}
