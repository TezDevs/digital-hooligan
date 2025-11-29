import Image from "next/image";
import Link from "next/link";
import Container from "../layout/Container";

const experiments = [
    {
        id: "pennywize",
        name: "PennyWize",
        tag: "Smart Money Ops",
        description:
            "Prototype for a money co-pilot that watches subs, bills, and spend so you can focus on shipping.",
        status: "Prototyping",
    },
    {
        id: "dropsignal",
        name: "DropSignal",
        tag: "Drop & price alerts",
        description:
            "Signals for sneakerheads and collectors when heat drops, prices move, or stock comes back.",
        status: "Concept",
    },
    {
        id: "ops-toys",
        name: "Ops Toys",
        tag: "Ops automation toys",
        description:
            "A drawer full of little tools that keep infra, logging, and dev workflow less painful.",
        status: "Idea",
    },
];

export default function LabsSection() {
    return (
        <section
            id="labs"
            className="border-y border-dh-street-gray/60 bg-gradient-to-b from-[#050509] via-dh-black to-dh-black py-16 md:py-24"
        >
            <Container>
                <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center">
                    {/* Left: copy */}
                    <div className="space-y-5">
                        <p className="text-xs font-mono uppercase tracking-[0.25em] text-dh-graffiti-yellow">
                            Hooligan Labs
                        </p>
                        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                            The sandbox where Digital Hooligan breaks things on purpose.
                        </h2>
                        <p className="max-w-xl text-sm text-dh-street-gray sm:text-base">
                            Hooligan Labs is the R&amp;D wing of the brand. It&apos;s where
                            PennyWize, DropSignal, and a pile of ops toys get stress-tested
                            against real-world workflows before they grow into full products.
                        </p>

                        <div className="mt-4 grid gap-4 sm:grid-cols-3">
                            {experiments.map((exp) => (
                                <div
                                    key={exp.id}
                                    className="flex flex-col rounded-2xl border border-dh-street-gray/60 bg-dh-black/80 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
                                >
                                    <div className="mb-2 flex items-center justify-between gap-2">
                                        <div>
                                            <h3 className="text-sm font-semibold text-white">
                                                {exp.name}
                                            </h3>
                                            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-dh-graffiti-yellow">
                                                {exp.tag}
                                            </p>
                                        </div>
                                        <span className="inline-flex items-center rounded-full border border-dh-street-gray/60 bg-dh-black px-2.5 py-1 text-[10px] font-medium text-dh-street-gray">
                                            {exp.status}
                                        </span>
                                    </div>
                                    <p className="text-xs text-dh-street-gray">{exp.description}</p>
                                </div>
                            ))}
                        </div>

                        {/* New CTA linking to /labs */}
                        <div className="mt-6 flex flex-wrap gap-4">
                            <Link
                                href="/labs"
                                className="inline-flex items-center rounded-full bg-dh-electric-mint px-5 py-2 text-sm font-medium text-dh-black transition hover:bg-dh-electric-mint/90"
                            >
                                View full Labs page
                            </Link>
                            <p className="text-xs text-dh-street-gray">
                                /labs shows deeper details on each experiment, the stack, and
                                where it&apos;s headed.
                            </p>
                        </div>
                    </div>

                    {/* Right: visual */}
                    <div className="flex justify-center md:justify-end">
                        <div className="relative inline-flex items-center justify-center rounded-3xl border border-dh-electric-mint/40 bg-dh-black/80 p-4 shadow-[0_0_26px_rgba(30,255,203,0.45)]">
                            <div className="absolute -inset-6 -z-10 bg-[radial-gradient(circle_at_top,_rgba(30,255,203,0.2),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(255,64,129,0.22),_transparent_60%)]" />
                            <Image
                                src="/labs/hooligan-labs.png"
                                alt="Hooligan Labs icon"
                                width={220}
                                height={220}
                                className="h-40 w-40 rounded-2xl object-contain sm:h-48 sm:w-48"
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
