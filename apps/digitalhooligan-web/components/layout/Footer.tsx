import Link from "next/link";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-zinc-900 bg-black">
            {/* Upper multi-column footer */}
            <div className="mx-auto max-w-6xl px-6 py-10 md:px-12">
                <div className="grid gap-8 md:grid-cols-4">
                    {/* Column 1: Studio intro */}
                    <div className="space-y-3">
                        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-zinc-500">
                            Digital Hooligan
                        </p>
                        <p className="text-sm text-zinc-200">
                            Out-of-the-box software &amp; web design studio for people who
                            hate boring tools and forgettable sites.
                        </p>
                        <p className="text-[11px] text-zinc-500">
                            Brand-first design, hands-on engineering, and a bias toward small,
                            sharp projects that actually ship.
                        </p>
                    </div>

                    {/* Column 2: Studio links */}
                    <div className="space-y-3">
                        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                            Studio
                        </p>
                        <ul className="space-y-1.5 text-sm text-zinc-300">
                            <li>
                                <Link href="/#about" className="hover:text-zinc-50">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/apps" className="hover:text-zinc-50">
                                    Apps &amp; experiments
                                </Link>
                            </li>
                            <li>
                                <Link href="/labs" className="hover:text-zinc-50">
                                    Hooligan Labs
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="hover:text-zinc-50">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/#contact" className="hover:text-zinc-50">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Legal / statements */}
                    <div className="space-y-3">
                        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                            Legal &amp; Privacy
                        </p>
                        <ul className="space-y-1.5 text-sm text-zinc-300">
                            <li>
                                <Link href="/privacy" className="hover:text-zinc-50">
                                    Privacy policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-zinc-50">
                                    Terms of use
                                </Link>
                            </li>
                            <li className="text-[11px] text-zinc-500">
                                Digital Hooligan LLC is a one-person studio. No ad tracking or
                                dark patterns; basic analytics only to keep things running.
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Internal & social */}
                    <div className="space-y-3">
                        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                            Internal &amp; Links
                        </p>
                        <ul className="space-y-1.5 text-sm text-zinc-300">
                            <li>
                                <Link
                                    href="https://github.com/TezDevs"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-zinc-50"
                                >
                                    GitHub · TezDevs
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://www.linkedin.com/in/courtez-cannady-a"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-zinc-50"
                                >
                                    LinkedIn · Courtez M. Cannady
                                </Link>
                            </li>
                        </ul>

                        <div className="pt-2 text-[11px] text-zinc-500">
                            <p className="mb-1 font-medium text-zinc-400">
                                Internal dashboards
                            </p>
                            <p>
                                <Link
                                    href="/labs/hq"
                                    className="underline underline-offset-4 hover:text-zinc-100"
                                >
                                    Labs HQ
                                </Link>{" "}
                                · experiments, ops toys, and work-in-progress views.
                            </p>
                            <p className="mt-1">
                                <Link
                                    href="/ceo/login"
                                    className="underline underline-offset-4 hover:text-zinc-100"
                                >
                                    CEO dashboard
                                </Link>{" "}
                                · private operations view for Digital Hooligan.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-zinc-900 bg-black px-6 py-4 md:px-12">
                <div className="mx-auto flex max-w-6xl flex-col gap-4 text-[11px] text-zinc-500 md:flex-row md:items-center md:justify-between">
                    {/* Left: logo + LLC name */}
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 bg-zinc-950 text-xs font-medium text-zinc-200">
                            N
                        </div>
                        <div className="tracking-[0.25em] text-zinc-500">
                            DIGITAL HOOLIGAN LLC
                        </div>
                    </div>

                    {/* Middle: copyright line */}
                    <p className="md:text-center">
                        © {year} Digital Hooligan LLC. All rights reserved. Built in the lab
                        by TezDevs.
                    </p>

                    {/* Right: quick legal / contact links */}
                    <nav className="flex items-center justify-start gap-4 md:justify-end">
                        <Link href="/privacy" className="hover:text-zinc-100">
                            Privacy
                        </Link>
                        <Link href="/terms" className="hover:text-zinc-100">
                            Terms
                        </Link>
                        <Link href="/#contact" className="hover:text-zinc-100">
                            Contact
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
}