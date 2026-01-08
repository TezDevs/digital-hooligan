import Link from "next/link";
import Image from "next/image";

const NAV_ITEMS = [
  { href: "/services", label: "Services" },
  { href: "/company", label: "Company" },
  { href: "/gov", label: "Gov" },
  { href: "/labs", label: "Labs" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-dh-border bg-dh-carbon/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-1 py-1 hover:bg-white/5"
        >
          <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-2xl border border-dh-steel-blue/50 bg-dh-steel-blue/10 shadow-[0_0_32px_rgba(77,163,255,0.25)]">
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
            <span className="block text-[10px] font-medium uppercase tracking-[0.35em] text-dh-muted/70">
              Digital
            </span>
            <span className="block text-sm font-semibold text-dh-text">
              Hooligan
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-6 text-[11px] font-medium uppercase tracking-[0.18em] text-dh-muted/70">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-dh-steel-blue"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
