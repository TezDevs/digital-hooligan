"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Mode = "public" | "ceo" | "labs";

function detectMode(pathname: string): Mode {
  if (pathname.startsWith("/ceo")) return "ceo";
  if (pathname.startsWith("/labs")) return "labs";
  return "public";
}

export default function GlobalNav() {
  const pathname = usePathname();
  const mode = detectMode(pathname);

  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-800 bg-black/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* Left */}
        <div className="flex items-center gap-4">
          <Link href="/" className="font-semibold text-white">
            Digital Hooligan
          </Link>

          {mode === "public" && (
            <span className="text-xs text-neutral-400">
              Applied R&D + Prototyping
            </span>
          )}

          {mode === "ceo" && (
            <span className="rounded bg-red-900/40 px-2 py-0.5 text-xs text-red-300">
              CEO MODE
            </span>
          )}

          {mode === "labs" && (
            <span className="rounded bg-emerald-900/40 px-2 py-0.5 text-xs text-emerald-300">
              LABS MODE
            </span>
          )}
        </div>

        {/* Right */}
        <div className="flex items-center gap-4 text-sm">
          {mode === "public" && (
            <>
              <Link href="/#apps" className="text-neutral-300 hover:text-white">
                Apps
              </Link>
              <Link href="/labs" className="text-neutral-300 hover:text-white">
                Labs
              </Link>
              <Link href="/contact" className="text-neutral-300 hover:text-white">
                Contact
              </Link>
              <Link href="/ceo" className="text-neutral-400 hover:text-neutral-200">
                CEO
              </Link>
            </>
          )}

          {mode === "ceo" && (
            <>
              <Link href="/ceo" className="text-neutral-300 hover:text-white">
                Dashboard
              </Link>
              <Link href="/" className="text-neutral-400 hover:text-neutral-200">
                Exit
              </Link>
            </>
          )}

          {mode === "labs" && (
            <>
              <Link href="/labs" className="text-neutral-300 hover:text-white">
                Overview
              </Link>
              <Link href="/" className="text-neutral-400 hover:text-neutral-200">
                Public
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}