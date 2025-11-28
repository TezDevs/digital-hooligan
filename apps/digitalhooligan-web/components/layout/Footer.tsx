import Container from "./Container";

const year = new Date().getFullYear();

export default function Footer() {
    return (
        <footer className="border-t border-dh-street-gray/70 bg-[#040406]">
            <Container>
                <div className="flex flex-col gap-4 py-6 text-xs text-dh-street-gray/80 md:flex-row md:items-center md:justify-between">
                    {/* Left: brand + tagline */}
                    <div className="space-y-1">
                        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-dh-street-gray">
                            Digital Hooligan
                        </p>
                        <p className="text-xs text-dh-street-gray/80">
                            Break the rules. Ship dangerous ideas.
                        </p>
                        <p className="text-[11px] text-dh-street-gray/70">
                            &copy; {year} Digital Hooligan. All rights reserved.
                        </p>
                    </div>

                    {/* Right: you + services */}
                    <div className="flex flex-wrap items-center gap-3 md:justify-end">
                        <p className="text-[11px] text-dh-street-gray/70">
                            Built by Courtez &quot;Tez&quot; Cannady.
                        </p>
                        <span className="hidden h-1 w-1 rounded-full bg-dh-street-gray/60 md:inline-block" />
                        <p className="text-[11px] text-dh-street-gray/60">
                            App studio · experiments · APIs &amp; services.
                        </p>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
