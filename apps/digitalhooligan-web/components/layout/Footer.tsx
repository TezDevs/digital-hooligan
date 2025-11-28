import Container from "./Container";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="mt-24 border-t border-dh-street-gray/70 bg-dh-black/95">
            <Container className="flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
                {/* Left side: brand + copyright */}
                <div className="space-y-2">
                    <p className="text-sm font-semibold tracking-wide text-dh-electric-mint">
                        Digital Hooligan
                    </p>
                    <p className="text-xs md:text-sm text-dh-street-gray">
                        © {year} Digital Hooligan. Built by one troublemaker with too many
                        ideas.
                    </p>
                </div>

                {/* Right side: tagline + links */}
                <div className="space-y-3 text-xs md:text-sm text-dh-street-gray md:text-right">
                    <p>Break the rules. Ship dangerous ideas.</p>

                    <div className="flex flex-wrap items-center gap-4 md:justify-end">
                        <a
                            href="mailto:your-email@digitalhooligan.io"
                            className="hover:text-dh-electric-mint transition"
                        >
                            Contact
                        </a>

                        <span className="hidden h-1 w-1 rounded-full bg-dh-street-gray md:inline-block" />

                        <a
                            href="https://github.com/TezDevs"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-dh-electric-mint transition"
                        >
                            GitHub
                        </a>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
