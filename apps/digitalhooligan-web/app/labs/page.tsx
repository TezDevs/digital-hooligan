import Container from "@/components/Container";

type LabTrack = {
    name: string;
    focus: string;
    status: string;
    notes: string;
};

const LAB_TRACKS: LabTrack[] = [
    {
        name: "PennyWize",
        focus: "Penny stock radar signals",
        status: "Tuning signal quality • Web UI next",
        notes:
            "Right now, the main work is refining which metrics actually matter for the types of traders PennyWize will serve — volume spikes, float, unusual options flow, and good old-fashioned price action.",
    },
    {
        name: "DropSignal",
        focus: "Sneakers & streetwear drop tracking",
        status: "Bot prototyping • Retail integrations research",
        notes:
            "Testing different sources and tracking strategies so we can build assist-mode alerts first, and add-to-cart flows later via official retailers and marketplaces.",
    },
    {
        name: "HypeWatch",
        focus: "Collectibles market experiments",
        status: "Data sourcing • Scoring experiments",
        notes:
            "Playing with price history, grading tiers, and pop reports to explore how a 'hype score' might look for things like cards, figures, magazines, and watches.",
    },
    {
        name: "Ops Toys",
        focus: "Developer experience and ops helpers",
        status: "Idea backlog • Tiny prototypes",
        notes:
            "Collecting pain points across infra, logging, and workflow, then building small toys that reduce friction: log scrapers, status dashboards, and deployment helpers.",
    },
];

export default function LabsPage() {
    return (
        <main className="min-h-screen bg-dh-black pt-16 pb-24">
            <Container>
                <header className="max-w-3xl">
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-dh-graffiti-yellow/80">
                        Hooligan Labs
                    </p>
                    <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                        Where the weird experiments live.
                    </h1>
                    <p className="mt-4 text-sm text-dh-street-gray/80 sm:text-base">
                        Labs is the sandbox for Digital Hooligan — the place where bots,
                        scrapers, dashboards, and strange little utilities get built out in
                        the open. Not everything here will ship as a full product, but
                        everything here teaches us something useful.
                    </p>
                    <p className="mt-3 text-xs text-dh-street-gray/70">
                        Expect rough edges, broken ideas, and strange prototypes. If you
                        land here, you&apos;re seeing work before it&apos;s had a chance to
                        put on a suit.
                    </p>
                </header>

                <section className="mt-10 space-y-6 sm:mt-12">
                    {LAB_TRACKS.map((lab) => (
                        <article
                            key={lab.name}
                            className="rounded-2xl border border-dh-street-gray/70 bg-gradient-to-br from-dh-black/95 via-dh-black to-dh-black/85 p-5 shadow-[0_16px_60px_rgba(0,0,0,0.75)] sm:p-6"
                        >
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-white sm:text-xl">
                                        {lab.name}
                                    </h2>
                                    <p className="mt-1 text-xs font-mono uppercase tracking-[0.2em] text-dh-graffiti-yellow/80">
                                        {lab.focus}
                                    </p>
                                </div>

                                <div className="rounded-full border border-dh-electric-mint/40 bg-dh-black px-3 py-1.5 text-[11px] font-medium text-dh-electric-mint/90">
                                    {lab.status}
                                </div>
                            </div>

                            <p className="mt-4 text-sm leading-relaxed text-dh-street-gray/80">
                                {lab.notes}
                            </p>
                        </article>
                    ))}
                </section>
            </Container>
        </main>
    );
}
