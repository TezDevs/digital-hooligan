import Link from "next/link";
import Image from "next/image";

const NAV_ITEMS = [
  { href: "/#apps", label: "Apps" },
  { href: "/services", label: "Services" },
  { href: "/company", label: "Company" },
  { href: "/labs", label: "Labs" },
  { href: "/#street-cred", label: "Street Cred" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-900 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand: icon + DIGITAL / Hooligan */}
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-1 py-1 hover:bg-zinc-900/60"
        >
          <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-2xl border border-emerald-500/70 bg-emerald-500/10 shadow-[0_0_32px_rgba(16,185,129,0.55)]">
            {/* ⬇️ Update src to whatever path you already use for the Hooligan Labs icon */}
            <Image
              src="/apps/hooligan-labs.png"
              alt="Hooligan Labs icon"
              fill
              sizes="36px"
              className="object-contain"
              priority
            />
          </div>
          <div className="leading-tight">
            <span className="block text-[10px] font-medium uppercase tracking-[0.35em] text-zinc-500">
              Digital
            </span>
            <span className="block text-sm font-semibold text-zinc-100">
              Hooligan
            </span>
          </div>
        </Link>

        {/* Nav items */}
        <nav className="flex items-center gap-6 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-emerald-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}