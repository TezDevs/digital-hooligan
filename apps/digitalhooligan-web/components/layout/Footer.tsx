import Container from "./Container";

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
    return (
        <footer className="mt-24 border-t border-dh-street-gray/70 bg-dh-black/95">
            <Container className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
                {/* Left: brand + tagline */}
                <div className="space-y-1">
                    <p className="text-sm font-semibold tracking-wide text-dh-electric-mint">
                        Digital Hooligan
                    </p>
                    <p className="text-xs md:text-sm text-dh-street-gray">
                        © {CURRENT_YEAR} Digital Hooligan. Built by one troublemaker with
                        too many ideas.
                    </p>
                    <p className="text-xs md:text-sm text-dh-street-gray">
                        Break the rules. Ship dangerous ideas.
                    </p>
                </div>

                {/* Right: contact info */}
                <div className="space-y-1 text-xs md:text-sm text-dh-street-gray md:text-right">
                    <p>
                        Email:{" "}
                        <a
                            href="mailto:ceo@digitalhooligan.io"
                            className="text-dh-electric-mint hover:underline"
                        >
                            ceo@digitalhooligan.io
                        </a>
                    </p>
                    <p>
                        Phone:{" "}
                        <a
                            href="tel:+15402876266"
                            className="text-dh-electric-mint hover:underline"
                        >
                            (540) 287-6266
                        </a>
                    </p>
                    <p>
                        GitHub:{" "}
                        <a
                            href="https://github.com/TezDevs"
                            target="_blank"
                            rel="noreferrer"
                            className="text-dh-electric-mint hover:underline"
                        >
                            @TezDevs
                        </a>
                    </p>
                </div>
            </Container>
        </footer>
    );
}
