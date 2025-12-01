// app/services/page.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Services | Digital Hooligan",
    description:
        "Build, automate, and ship smarter with Digital Hooligan. Product management, API development, bots, dashboards, and founder coaching.",
};

type ServiceItem = {
    title: string;
    description: string;
};

type ServiceSection = {
    id: string;
    label: string;
    kicker: string;
    title: string;
    intro: string;
    items: ServiceItem[];
};

const sections: ServiceSection[] = [
    {
        id: "build",
        label: "A",
        kicker: "Build",
        title: "Build: Day 1 to MVP",
        intro:
            "Hands-on dev support to get you from zero to something real in the browser, without overbuilding or stalling out.",
        items: [
            {
                title: "Day 1 Tech Stack Setup",
                description:
                    "Set up GitHub, a monorepo, basic CI, a Next.js/Tailwind app, Vercel deploy, and Cloudflare DNS so you start on a solid, modern foundation.",
            },
            {
                title: "Dev Sandbox & Cloud Environment Setup",
                description:
                    "Create a safe playground in AWS or another cloud with sane IAM, billing alerts, and environments clearly separated from production.",
            },
            {
                title: "Landing Page + Brand Starter Site",
                description:
                    "A one-page marketing site (Next.js on Vercel) with your branding, basic SEO, OG/social images, and a working contact form.",
            },
            {
                title: "Custom Web App / Micro-SaaS Build",
                description:
                    "Design and build small, focused web apps (dashboards, tools, internal portals, or micro-SaaS) from idea to deployed MVP.",
            },
        ],
    },
    {
        id: "automate",
        label: "B",
        kicker: "Automate",
        title: "Automate: Bots, APIs & Ops Toys",
        intro:
            "APIs, integrations, and little automations that quietly keep your business moving while you sleep.",
        items: [
            {
                title: "API & Platform Development ✅",
                description:
                    "Design and build REST APIs (future-proofed for GraphQL), with auth (API keys, OAuth, JWT), error handling, rate limiting, versioning, and real documentation (OpenAPI/Postman).",
            },
            {
                title: "API Integration & Orchestration",
                description:
                    "Integrate with 3rd-party APIs like Stripe, payment providers, analytics, shipping, or marketplaces, and glue them together into real, end-to-end workflows.",
            },
            {
                title: "Bots & Ops Toys Automations",
                description:
                    "Slack/Discord bots, scheduled jobs, tidy-up scripts, log processors, and other tiny tools that automate recurring ops and dev tasks.",
            },
            {
                title: "Data Pipelines, Reports & Auto-Exports",
                description:
                    "Automated daily/weekly reports (CSV, email, or dashboard updates) from systems like Stripe, analytics, or internal tools.",
            },
            {
                title: "Sneaker & Streetwear Price / Drop Tracking",
                description:
                    "DropSignal-style price and availability tracking for sneakers and streetwear, with alerts, watchlists, and “notify me when…” features.",
            },
            {
                title: "Collectible Price & Watchlist Tracking",
                description:
                    "HypeWatch-style features for cards, figures, magazines, watches, and other collectibles, including price-change alerts and grail watchlists.",
            },
            {
                title: "Legit Data Scraping & Watchlists (Within TOS)",
                description:
                    "Public-site scraping where allowed by terms of service, turning noisy data into structured watchlists and alerts for deals, drops, or changes.",
            },
        ],
    },
    {
        id: "product",
        label: "C",
        kicker: "Product Management",
        title: "Product Management: Idea to roadmap",
        intro:
            "Not just tickets. Real product help so you’re building the right thing, not just more things.",
        items: [
            {
                title: "Product Discovery & Strategy",
                description:
                    "Turn loose ideas into clear product visions, target users, problems, and measurable outcomes that actually matter.",
            },
            {
                title: "Roadmapping & Prioritization",
                description:
                    "Organize all the ideas into a realistic 3–6 month roadmap using lightweight prioritization frameworks tailored to your business.",
            },
            {
                title: "MVP Scoping & Release Planning",
                description:
                    "Define the smallest valuable version, break it into releases, and write acceptance criteria devs can actually build against.",
            },
            {
                title: "Product Analytics & Iteration Planning",
                description:
                    "Decide what to track, wire up basic analytics, interpret usage and feedback, and turn it into a “here’s what we ship next” plan.",
            },
        ],
    },
    {
        id: "ship-smarter",
        label: "D",
        kicker: "Ship Smarter",
        title: "Ship Smarter: Delivery, dashboards & ops",
        intro:
            "Get visibility into what’s happening, reduce fire drills, and make “shipping” something you can rely on.",
        items: [
            {
                title: "CEO Metrics Dashboard Build-Out",
                description:
                    "One central dashboard for founders that pulls in revenue, traffic, product usage, and ops signals into a single “is today healthy?” view.",
            },
            {
                title: "Engineering / Delivery Workflow Setup",
                description:
                    "Git branching strategies, PR process, ticket and workflow templates, and lightweight project management tuned for small teams.",
            },
            {
                title: "Infra & Logging Health Check",
                description:
                    "Review your current infra, logs, and monitoring; fix blind spots, set alerts, and create a simple “ops status” view.",
            },
            {
                title: "Error Tracking & Incident Flow Setup",
                description:
                    "Implement or tighten error tracking, runbooks, and notification flows so issues are seen quickly and handled the same way every time.",
            },
        ],
    },
    {
        id: "advisory",
        label: "E",
        kicker: "Advisory & Coaching",
        title: "Advisory & Coaching: A technical co-pilot",
        intro:
            "For founders who want a trusted technical brain in their corner without hiring a full-time CTO or PM yet.",
        items: [
            {
                title: "Technical Strategy Session (One-Off or Series)",
                description:
                    "A 60–90 minute deep dive to pick stack, architecture, hosting, and concrete next steps — delivered with a short written strategy doc.",
            },
            {
                title: "Product & Delivery Coaching for Founders",
                description:
                    "Ongoing check-ins to help non-technical or semi-technical founders make product decisions, manage dev work, and ship consistently.",
            },
            {
                title: "“Second Brain” Review of Existing Systems",
                description:
                    "Audit your current apps, scripts, APIs, and dashboards, and deliver a prioritized list of what to fix, automate, or simplify next.",
            },
        ],
    },
];

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-50">
            <div className="mx-auto max-w-5xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
                <header className="mb-12">
                    <p className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-400/80">
                        Digital Hooligan
                    </p>
                    <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-white">
                        Services for founders who actually want to ship
                    </h1>
                    <p className="mt-4 max-w-2xl text-sm sm:text-base text-zinc-300">
                        From Day 1 tech stack setup to API development, product management,
                        dashboards, and ongoing advisory — this is the menu of ways Digital
                        Hooligan can plug into your company and get things moving.
                    </p>
                    <p className="mt-3 text-xs sm:text-sm text-zinc-400">
                        Product Management and API development are called out clearly below,
                        but they can be bundled with anything else here.
                    </p>
                </header>

                <div className="mb-10 flex flex-wrap gap-3 text-xs text-zinc-400">
                    {sections.map((section) => (
                        <a
                            key={section.id}
                            href={`#${section.id}`}
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-950/80 px-3 py-1 hover:border-emerald-400/60 hover:text-emerald-300"
                        >
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-[0.7rem] font-mono text-emerald-400">
                                {section.label}
                            </span>
                            <span>{section.title}</span>
                        </a>
                    ))}
                </div>

                <div className="space-y-14">
                    {sections.map((section) => (
                        <section
                            key={section.id}
                            id={section.id}
                            className="scroll-mt-24 border border-white/5 bg-zinc-950/70 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.7)]"
                        >
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <p className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-400/80">
                                        {section.label}. {section.kicker}
                                    </p>
                                    <h2 className="mt-2 text-2xl font-semibold text-white">
                                        {section.title}
                                    </h2>
                                </div>
                            </div>
                            <p className="mt-3 max-w-3xl text-sm sm:text-base text-zinc-300">
                                {section.intro}
                            </p>

                            <div className="mt-6 grid gap-5 sm:grid-cols-2">
                                {section.items.map((item) => (
                                    <article
                                        key={item.title}
                                        className="rounded-xl border border-white/5 bg-black/40 p-4 sm:p-5"
                                    >
                                        <h3 className="text-sm font-semibold text-white">
                                            {item.title}
                                        </h3>
                                        <p className="mt-2 text-xs sm:text-sm text-zinc-300">
                                            {item.description}
                                        </p>
                                    </article>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                <footer className="mt-14 border-t border-white/5 pt-6 text-sm text-zinc-400">
                    <p>
                        Have something in mind that doesn&apos;t fit cleanly into a box?{" "}
                        <a
                            href="#contact"
                            className="font-medium text-emerald-400 hover:text-emerald-300"
                        >
                            Reach out
                        </a>{" "}
                        and we can design a custom engagement.
                    </p>
                </footer>
            </div>
        </div>
    );
}
