import Link from "next/link";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-zinc-800 bg-black px-4 py-6 text-xs text-zinc-500 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                {/* Left: brand + tagline */}
                <div className="space-y-1">
                    <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-600">
                        Digital Hooligan LLC
                    </p>
                    <p className="text-[11px] text-zinc-500">
                        © {year} Digital Hooligan LLC. All rights reserved. Built in the
                        lab by TezDevs.
                    </p>
                </div>

                {/* Right: legal + contact links */}
                <div className="flex flex-wrap items-center gap-4 text-[11px] text-zinc-500">
                    <Link
                        href="/privacy"
                        className="transition hover:text-emerald-300 hover:underline hover:underline-offset-4"
                    >
                        Privacy
                    </Link>
                    <Link
                        href="/terms"
                        className="transition hover:text-emerald-300 hover:underline hover:underline-offset-4"
                    >
                        Terms
                    </Link>
                    <Link
                        href="/#contact"
                        className="transition hover:text-emerald-300 hover:underline hover:underline-offset-4"
                    >
                        Contact
                    </Link>

                    {/* CEO entry point – intentionally subtle */}
                    <Link
                        href="/ceo/login"
                        className="text-[10px] text-zinc-700 hover:text-emerald-400"
                        aria-label="CEO login"
                    >
                        .
                    </Link>
                </div>
            </div>
        </footer>
    );
}