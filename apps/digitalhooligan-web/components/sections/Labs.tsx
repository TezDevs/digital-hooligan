import Image from "next/image";
import Container from "../layout/Container";

const experiments = [
    {
        label: "PennyWize",
        status: "In progress",
        blurb:
            "A smarter way to track and act on your everyday spending, built for people who hate bloated finance tools.",
    },
    {
        label: "DropSignal",
        status: "Concept",
        blurb:
            "Sneaker and collectible drop alerts without the noise — just the signals you actually care about.",
    },
    {
        label: "Ops Toys",
        status: "Lab",
        blurb:
            "Little internal tools and dashboards for incident response, release hygiene, and observability experiments.",
    },
];

export default function Labs() {
    return (
        <section
            id="labs"
            aria-labelledby="labs-title"
            className="border-t border-dh-street-gray/60 bg-dh-black/95"
        >
            <Container>
                <div className="py-16 sm:py-20 lg:py-24">
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
                        {/* Left: Icon + description */}
                        <div>
                            <p className="text-xs font-mono uppercase tracking-[0.25em] text-dh-electric-mint">
                                Hooligan Labs
                            </p>
                            <h2
                                id="labs-title"
                                className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl"
                            >
                                Where the weird ideas get built first.
                            </h2>
                            <p className="mt-4 max-w-2xl text-sm text-dh-street-gray md:text-base">
                                Hooligan Labs is the experiment wing of Digital Hooligan — the place for prototypes,
                                odd ideas, and small tools that might grow into full products. If it breaks, it
                                breaks here first.
                            </p>

                            <div className="mt-6 inline-flex items-center gap-4 rounded-3xl border border-dh-street-gray/70 bg-dh-black/90 px-4 py-3 shadow-[0_0_30px_rgba(30,255,203,0.25)]">
                                <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-dh-black">
                                    <Image
                                        src="/labs/hooligan-labs.png"
                                        alt="Hooligan Labs logo"
                                        fill
                                        sizes="56px"
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                                <div className="space-y-1 text-sm">
                                    <p className="font-semibold text-white">Hooligan Labs</p>
                                    <p className="text-xs text-dh-street-gray">
                                        The R&amp;D corner of Digital Hooligan — part skunkworks, part playground.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Experiments list */}
                        <div className="space-y-4">
                            {experiments.map((item) => (
                                <div
                                    key={item.label}
                                    className="rounded-2xl border border-dh-street-gray/70 bg-dh-black/85 p-4 shadow-[0_0_24px_rgba(30,255,203,0.12)]"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <p className="text-sm font-semibold text-white">{item.label}</p>
                                        <span className="inline-flex items-center rounded-full border border-dh-street-gray/70 bg-dh-black/80 px-2.5 py-1 text-[0.65rem] font-mono uppercase tracking-[0.18em] text-dh-street-gray">
                                            {item.status}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-xs text-dh-street-gray md:text-sm">{item.blurb}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
