import Link from "next/link";

export default function CTA() {
    return (
        <div className="relative overflow-hidden rounded-3xl border border-dh-electric-mint/40 bg-gradient-to-r from-dh-black via-dh-black to-dh-electric-mint/15 px-6 py-10 md:px-10 md:py-12">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -left-10 top-10 h-40 w-40 rounded-full border border-dh-electric-mint/30 blur-xl" />
                <div className="absolute -right-16 bottom-0 h-48 w-48 rounded-full border border-dh-electric-mint/40 blur-xl" />
            </div>

            <div className="relative max-w-2xl space-y-4">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-dh-electric-mint/80">
                    Work with Digital Hooligan
                </p>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                    Break the rules.{" "}
                    <span className="text-dh-electric-mint">Ship dangerous ideas.</span>
                </h2>
                <p className="text-sm md:text-base text-dh-street-gray">
                    Need a rogue engineer to build the app you&apos;ve been daydreaming
                    about? I design, build, and ship small but vicious products under the
                    Digital Hooligan flag.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                    <Link
                        href="#contact"
                        className="inline-flex items-center justify-center rounded-full border border-dh-electric-mint/70 bg-dh-electric-mint/10 px-5 py-2.5 text-sm font-medium text-dh-electric-mint hover:bg-dh-electric-mint hover:text-dh-black transition"
                    >
                        Start something reckless
                    </Link>
                    <Link
                        href="#apps"
                        className="inline-flex items-center justify-center rounded-full border border-dh-street-gray/70 px-5 py-2.5 text-sm font-medium text-dh-street-gray hover:border-dh-electric-mint/60 hover:text-dh-electric-mint transition"
                    >
                        Explore current experiments
                    </Link>
                </div>
            </div>
        </div>
    );
}
