import Link from "next/link";
import Image from "next/image";

const NAV_ITEMS = [
  { href: "/services", label: "Services" },
  { href: "/company", label: "Company" },
  { href: "/gov", label: "Gov" },
  { href: "/labs", label: "Labs" },
  { href: "/contact", label: "Contact" },
];

const LOGO_SRC = "/brand/digital_hooligan_logo_square.png";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-dh-border bg-dh-carbon/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="Digital Hooligan homepage"
          className="flex items-center gap-3 rounded-xl px-1 py-1 transition-colors hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-dh-steel-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-dh-carbon"
        >
          <div className="relative h-6 w-6 overflow-hidden rounded-lg bg-white/95 shadow-[0_0_28px_rgba(255,255,255,0.08)] sm:h-8 sm:w-8">
            <Image
              src={LOGO_SRC}
              alt="Digital Hooligan logo"
              fill
              sizes="(max-width: 640px) 24px, 32px"
              className="object-contain"
              priority
            />
          </div>

          <div className="leading-tight">
            <span className="block text-[10px] font-medium uppercase tracking-[0.35em] text-dh-muted/70">
              Digital
            </span>
            <span className="block text-sm font-semibold text-dh-text">Hooligan</span>
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
