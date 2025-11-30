import Image from "next/image";
import Link from "next/link";

const experiments = [
    {
        slug: "pennywize",
        name: "PennyWize",
        phase: "Building",
        tagline:
            "The penny stock scraper that digs through the sketchy corners of the market so you don’t have to.",
        icon: "/apps/pennywize.png",
    },
    {
        slug: "dropsignal",
        name: "DropSignal",
        phase: "Discovery → Building",
        tagline:
            "Bot-powered radar for sneaker and streetwear deals before your size disappears.",
        icon: "/apps/dropsignal.png",
    },
    {
        slug: "hypewatch",
        name: "HypeWatch",
        phase: "Discovery",
        tagline:
            "Price tracking for collectibles you actually flex: cards, figures, magazines, watches, and more.",
        icon: "/apps/hypewatch.png",
    },
    {
        slug: "ops-toys",
        name: "Ops Toys",
        phase: "Discovery",
        tagline:
            "A drawer full of tiny automation toys that keep infra, logging, and dev workflow less painful.",
        icon: "/apps/ops-toys.png",
    },
];

export default function LabsPage() {
    return (
        <main className="min-h-screen bg-dh-black text-dh-offwhite">
            <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                {/* Header */}
                <header className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dh-electric-mint">
                        Hooligan Labs
                    </p>
                    <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                        The experiment bench.
                    </h1>
                    <p className="max-w-2xl text-sm text-dh-street-gray sm:text-base">
                        This is where Digital Hooligan tools are born. Most start as bots
                        and scrapers, then graduate into proper apps once they prove they
                        can pull their weight.
                    </p>
                    <div className="inline-flex flex-wrap gap-2 text-[11px] text-dh-street-gray">
                        <span className="rounded-full border border-dh-street-gray/40 px-2 py-0.5">
                            Discovery = ideas and prototypes
                        </span>
                        <span className="rounded-full border border-dh-street-gray/40 px-2 py-0.5">
                            Building = wiring up real workflows
                        </span>
                        <span className="rounded-full border border-dh-street-gray/40 px-2 py-0.5">
                            Polishing = almost ready for prime time
                        </span>
                    </div>
                </header>

                {/* Experiments grid */}
                <section className="grid gap-5 md:grid-cols-2">
                    {experiments.map((exp) => (
                        <article
                            key={exp.slug}
                            className="group flex flex-col justify-between rounded-2xl border border-dh-street-gray/40 bg-gradient-to-br from-dh-black/80 to-dh-black/40 p-4 transition duration-200 hover:border-dh-electric-mint/70 hover:shadow-[0_0_24px_rgba(30,255,203,0.25)]"
                        >
                            <div className="flex items-start gap-3">
                                <div className="mt-1 flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-dh-street-gray/30 bg-dh-black/80">
                                    <Image
                                        src={exp.icon}
                                        alt={`${exp.name} icon`}
                                        width={32}
                                        height={32}
                                        className="h-8 w-8 object-contain"
                                    />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <h2 className="text-sm font-semibold text-dh-offwhite sm:text-base">
                                            {exp.name}
                                        </h2>
                                        <span className="inline-flex items-center gap-1 rounded-full border border-dh-electric-mint/60 bg-dh-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-dh-electric-mint">
                                            <span className="h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
                                            {exp.phase}
                                        </span>
                                    </div>
                                    <p className="text-xs text-dh-street-gray sm:text-sm">
                                        {exp.tagline}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between text-xs">
                                <Link
                                    href={`/${exp.slug}`}
                                    className="font-medium text-dh-electric-mint group-hover:translate-x-0.5 group-hover:text-dh-electric-mint/90"
                                >
                                    View details →
                                </Link>
                                <Link
                                    href="/"
                                    className="text-dh-street-gray hover:text-dh-electric-mint/80"
                                >
                                    Back to home
                                </Link>
                            </div>
                        </article>
                    ))}
                </section>
            </div>
        </main>
    );
}
