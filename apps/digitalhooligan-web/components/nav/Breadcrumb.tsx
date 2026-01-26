import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

function Crumb({ item }: { item: BreadcrumbItem }) {
  if (!item.href) {
    return <span className="text-dh-text">{item.label}</span>;
  }

  return (
    <Link
      href={item.href}
      className="text-dh-muted/80 transition-colors hover:text-dh-steel-blue"
    >
      {item.label}
    </Link>
  );
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-muted/70">
        {items.map((item, idx) => (
          <li key={`${item.label}-${idx}`} className="flex items-center gap-2">
            <Crumb item={item} />
            {idx < items.length - 1 ? (
              <span className="text-dh-muted/50">→</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
