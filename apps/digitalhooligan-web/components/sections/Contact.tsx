import Link from "next/link";
import Container from "../layout/Container";

type ContactMethod = {
    label: string;
    value: string;
    display: string;
    href: string;
    hint: string;
    type?: "github" | "linkedin" | "default";
};

const CONTACT_METHODS: ContactMethod[] = [
    {
        label: "Email",
        value: "ceo@digitalhooligan.io",
        display: "ceo@digitalhooligan.io",
        href: "mailto:ceo@digitalhooligan.io",
        hint: "Best for project ideas, collabs, and anything that needs detail.",
        type: "default",
    },
    {
        label: "Phone",
        value: "540-287-6266",
        display: "540-287-6266",
        href: "tel:15402876266",
        hint: "Quick calls for scoping, follow-ups, or talking through an idea.",
        type: "default",
    },
    {
        label: "GitHub",
        value: "github.com/TezDevs",
        display: "TezDevs",
        href: "https://github.com/TezDevs",
        hint: "See what I'm shipping and how I think about code.",
        type: "github",
    },
    {
        label: "LinkedIn",
        value: "linkedin.com/in/courtez-cannady-a8588a108",
        display: "Courtez M. Cannady",
        href: "https://linkedin.com/in/courtez-cannady-a8588a108",
        hint: "Connect professionally and keep up with what I'm building next.",
        type: "linkedin",
    },
];

function GitHubIcon() {
    return (
        <svg
            aria-hidden="true"
            className="h-4 w-4 flex-none"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.88-1.54-3.88-1.54-.53-1.35-1.3-1.71-1.3-1.71-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.72 1.26 3.39.96.11-.75.41-1.26.74-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.2-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.75.8 1.2 1.83 1.2 3.09 0 4.43-2.7 5.41-5.27 5.7.42.36.8 1.08.8 2.18 0 1.57-.01 2.83-.01 3.22 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
        </svg>
    );
}

function LinkedInIcon() {
    return (
        <svg
            aria-hidden="true"
            className="h-4 w-4 flex-none"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6A2.5 2.5 0 1 1 4.98 3.5ZM4.75 8H0.75V23H4.75V8ZM9.75 8H5.75V23H9.75V15.26C9.75 11.76 14.25 11.46 14.25 15.26V23H18.25V14.16C18.25 7.96 11.5 8.19 9.75 11.11V8Z" />
        </svg>
    );
}

function ContactIcon({ type }: { type?: "github" | "linkedin" | "default" }) {
    if (type === "github") return <GitHubIcon />;
    if (type === "linkedin") return <LinkedInIcon />;
    return null;
}

export default function Contact() {
    return (
        <section
            id="contact"
            aria-labelledby="contact-title"
            className="border-t border-dh-street-gray/60 bg-dh-black"
        >
            <Container>
                <div className="py-16 sm:py-20 lg:py-24">
                    <div className="max-w-3xl">
                        <p className="text-xs font-mono uppercase tracking-[0.25em] text-dh-electric-mint">
                            Contact
                        </p>
                        <h2
                            id="contact-title"
                            className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl"
                        >
                            Tell me about the thing you can&apos;t stop thinking about.
                        </h2>
                        <p className="mt-4 text-sm text-dh-street-gray md:text-base">
                            Whether it&apos;s a tiny internal tool or a full product, I&apos;m interested in
                            ideas that feel a little risky, a little niche, and very real. Reach out through
                            whatever channel fits best and we&apos;ll figure out the next step.
                        </p>
                    </div>

                    {/* Contact methods */}
                    <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                        {CONTACT_METHODS.map((item) => (
                            <div
                                key={item.label}
                                className="flex flex-col justify-between rounded-2xl border border-dh-street-gray/70 bg-dh-black/90 p-4 shadow-[0_0_24px_rgba(30,255,203,0.12)]"
                            >
                                <div>
                                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-dh-street-gray">
                                        {item.label}
                                    </p>
                                    <Link
                                        href={item.href}
                                        className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-white underline-offset-4 hover:underline break-all"
                                    >
                                        <ContactIcon type={item.type} />
                                        <span>{item.display}</span>
                                    </Link>
                                    <p className="mt-2 text-xs text-dh-street-gray">{item.hint}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Small note */}
                    <p className="mt-6 text-[0.75rem] text-dh-street-gray">
                        I&apos;m a one-person studio, so you&apos;re talking directly to the builder, not an
                        account manager. If I&apos;m in the middle of a deployment or workout, I&apos;ll get
                        back to you as soon as I can.
                    </p>
                </div>
            </Container>
        </section>
    );
}
