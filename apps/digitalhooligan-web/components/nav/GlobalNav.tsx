import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Apps", href: "/apps" },
  { label: "Labs", href: "/labs" },

  // Quiet entry point for thinking / writing
  { label: "Writing", href: "/docs/attention-content-2" },
];

export default function GlobalNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-800 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                isActive
                  ? "text-zinc-100"
                  : "hover:text-zinc-300 transition-colors"
              }
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}