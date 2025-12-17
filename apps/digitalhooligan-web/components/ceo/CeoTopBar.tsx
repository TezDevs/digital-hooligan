import Link from 'next/link';

export default function CeoTopBar() {
    return (
        <div className="mx-auto max-w-6xl px-4 pt-6 pb-4">
            <div className="flex items-center justify-between gap-4">
                <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                    Digital Hooligan · CEO
                </div>

                <div className="flex items-center gap-2">
                    <Link
                        href="/ceo/performance"
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75 hover:bg-white/10"
                    >
                        Performance
                    </Link>
                    <Link
                        href="/ceo/incidents"
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75 hover:bg-white/10"
                    >
                        Incidents
                    </Link>
                    <Link
                        href="/ceo/health"
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75 hover:bg-white/10"
                    >
                        Health
                    </Link>
                    <Link
                        href="/ceo/dev-workbench"
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75 hover:bg-white/10"
                    >
                        Dev Workbench
                    </Link>
                </div>
            </div>

            <div className="mt-4 h-px w-full bg-white/10" />
        </div>
    );
}