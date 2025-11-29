import Image from "next/image";
import Link from "next/link";
import Container from "../../components/layout/Container";

const experiments = [
    {
        id: "pennywize",
        name: "PennyWize",
        tag: "Smart Money Ops",
        status: "In active prototyping",
        blurb:
            "Your always-on money lookout. PennyWize watches subs, bills, and spend patterns so you can ship apps instead of spreadsheets.",
        focus: [
            "Subscription & bill tracking",
            "Spend patterns & alerts",
            "Future: mobile-first companion app",
        ],
        stack: ["Next.js", "TypeScript", "Tailwind", "Stripe (planned)"],
    },
    {
        id: "dropsignal",
        name: "DropSignal",
        tag: "Signal for price drops",
        status: "Concept & early UX",
        blurb:
            "A signal tower for drops. Sneakers, collectibles, and other high-heat items — tuned for real humans, not bots.",
        focus: [
            "Price-drop & restock alerts",
            "Sneakers + collectibles focus",
            "Future: multi-market integrations",
        ],
        stack: ["Next.js", "TypeScript", "Background jobs (planned)"],
    },
    {
        id: "ops-toys",
        name: "Ops Toys",
        tag: "Backstage automation",
        status: "Ideas on the whiteboard",
        blurb:
            "A drawer full of little ops toys: scripts, dashboards, and helpers that keep Digital Hooligan running smoother than it has any right to.",
        focus: [
            "Developer experience tools",
            "Monitoring & observability helpers",
            "Automation experiments",
        ],
        stack: ["Node.js", "CLI tools", "APIs (planned)"],
    },
];

export default function LabsPage() {
    return (
        <main className="min-h-screen bg-dh-black text-dh-offwhite">
            {/* Hero */}
            <section className="border-b border-dh-street-gray/60 bg-gradient-to-b from-dh-black via-dh-black to-dh-deep-purple/40 py-16 md:py-24">
                <Container>
                    <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center">
                        {/* Text */}
                        <div className="space-y-6">
                            <p className="text-xs font-mono uppercase tracking-[0.25em] text-dh-graffiti-yellow">
                                Hooligan Labs
                            </p>
                            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                                The R&amp;D playground for Digital Hooligan.
                            </h1>
                            <p className="max-w-xl text-sm text-dh-street-gray sm:text-base">
                                This is where the dangerous ideas live before they graduate into
                                full products. Expect half-broken prototypes, opinionated
                                experiments, and tools built for real-world chaos.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <span className="inline-flex items-center rounded-full border border-dh-electric-mint/40 bg-dh-electric-mint/10 px-3 py-1 text-xs font-medium text-dh-electric-mint">
                                    🧪 Experiments first, polish later
                                </span>
                                <span className="inline-flex items-center rounded-full border border-dh-graffiti-yellow/40 bg-dh-graffiti-yellow/10 px-3 py-1 text-xs font-medium text-dh-graffiti-yellow">
                                    ⚙️ Built for ops, sneakers, and collectors
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-4 pt-2">
                                <Link
                                    href="/"
                                    className="inline-flex items-center rounded-full border border-dh-street-gray/60 px-4 py-2 text-xs font-medium text-dh-street-gray transition hover:border-dh-electric-mint hover:text-dh-electric-mint"
                                >
                                    ← Back to the main site
                                </Link>
                            </div>
                        </div>

                        {/* Visual */}
                        <div className="flex justify-center md:justify-end">
                            <div className="relative inline-flex items-center justify-center rounded-3xl border border-dh-electric-mint/40 bg-dh-black/80 p-4 shadow-[0_0_28px_rgba(30,255,203,0.45)]">
                                <div className="absolute -inset-6 -z-10 bg-[radial-gradient(circle_at_top,_rgba(30,255,203,0.18),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(255,64,129,0.2),_transparent_60%)]" />
                                <Image
                                    src="/labs/hooligan-labs.png"
                                    alt="Hooligan Labs icon"
                                    width={220}
                                    height={220}
                                    className="h-40 w-40 rounded-2xl object-contain sm:h-48 sm:w-48"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Experiments list */}
            <section className="border-b border-dh-street-gray/60 bg-dh-black py-16 md:py-20">
                <Container>
                    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                                Current experiments
                            </h2>
                            <p className="mt-2 max-w-xl text-sm text-dh-street-gray">
                                These are the active toys on the workbench. Some are already in
                                code, others are living in notebooks and Figma. All of them are
                                aimed at making money, ops, or collecting less painful.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3 text-xs text-dh-street-gray">
                            <span className="inline-flex items-center gap-1 rounded-full border border-dh-street-gray/60 px-3 py-1">
                                <span className="h-2 w-2 rounded-full bg-dh-electric-mint" />
                                Active prototyping
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full border border-dh-street-gray/60 px-3 py-1">
                                <span className="h-2 w-2 rounded-full bg-dh-graffiti-yellow" />
                                Concept &amp; UX
                            </span>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {experiments.map((exp) => (
                            <article
                                key={exp.id}
                                className="flex flex-col rounded-2xl border border-dh-street-gray/60 bg-gradient-to-b from-dh-black to-[#050509] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
                            >
                                <div className="mb-3 flex items-center justify-between gap-3">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">
                                            {exp.name}
                                        </h3>
                                        <p className="text-xs font-mono uppercase tracking-[0.18em] text-dh-graffiti-yellow">
                                            {exp.tag}
                                        </p>
                                    </div>
                                    <span className="inline-flex items-center rounded-full border border-dh-street-gray/60 bg-dh-black px-3 py-1 text-[10px] font-medium text-dh-street-gray">
                                        {exp.status}
                                    </span>
                                </div>

                                <p className="mb-4 text-sm text-dh-street-gray">{exp.blurb}</p>

                                <div className="mb-4 space-y-2">
                                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-dh-street-gray">
                                        Focus
                                    </p>
                                    <ul className="space-y-1 text-xs text-dh-street-gray">
                                        {exp.focus.map((item) => (
                                            <li key={item} className="flex gap-2">
                                                <span className="mt-[6px] h-[3px] w-6 rounded-full bg-dh-electric-mint/70" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-auto space-y-2">
                                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-dh-street-gray">
                                        Stack / Ingredients
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.stack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="inline-flex items-center rounded-full border border-dh-street-gray/50 bg-dh-black px-2.5 py-1 text-[11px] text-dh-street-gray"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Outro / CTA */}
            <section className="bg-gradient-to-t from-dh-black via-dh-black to-dh-deep-purple/40 py-14">
                <Container>
                    <div className="flex flex-col items-start gap-6 rounded-3xl border border-dh-street-gray/60 bg-dh-black/80 p-6 shadow-[0_0_30px_rgba(0,0,0,0.65)] md:flex-row md:items-center md:justify-between md:gap-10">
                        <div className="space-y-3">
                            <h2 className="text-xl font-semibold text-white sm:text-2xl">
                                Want to see these experiments graduate?
                            </h2>
                            <p className="max-w-xl text-sm text-dh-street-gray">
                                PennyWize, DropSignal, and Ops Toys are the first wave. As they
                                harden into real products, they&apos;ll move onto their own
                                dedicated apps and landing pages under the Digital Hooligan
                                umbrella.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 text-sm">
                            <p className="text-dh-street-gray">
                                For now, the best place to watch the chaos:
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center rounded-full bg-dh-electric-mint px-5 py-2 text-sm font-medium text-dh-black transition hover:bg-dh-electric-mint/90"
                            >
                                Return to the main homepage
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
}
