import Link from "next/link";

export default function CTA() {
    return (
        <section
            id="cta"
            className="border-b border-dh-street-gray/60 bg-dh-black"
        >
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
                <div className="rounded-3xl border border-dh-electric-mint/40 bg-dh-black/80 px-5 py-8 text-center shadow-[0_0_35px_rgba(30,255,203,0.25)] sm:px-8 sm:py-10 sm:text-left">
                    <h2 className="text-xl font-semibold text-white sm:text-2xl">
                        Got a dangerous idea?
                    </h2>
                    <p className="mt-2 max-w-xl text-sm text-dh-street-gray sm:text-base">
                        If you&apos;re sitting on an app, tool, or automation idea that feels
                        a little too strange for a big team — that&apos;s exactly my lane.
                        Let&apos;s pressure test it and see if it belongs in the Digital
                        Hooligan universe.
                    </p>

                    <div className="mt-4 flex flex-wrap justify-center gap-3 sm:justify-start">
                        <Link
                            href="#contact"
                            className="inline-flex h-10 items-center justify-center rounded-full border border-dh-electric-mint bg-dh-electric-mint px-4 text-sm font-medium text-dh-black transition hover:bg-dh-electric-mint/90"
                        >
                            Reach out
                        </Link>
                        <Link
                            href="#apps"
                            className="inline-flex h-10 items-center justify-center rounded-full border border-dh-street-gray/60 px-4 text-sm font-medium text-dh-street-gray transition hover:border-dh-electric-mint/70 hover:text-white"
                        >
                            See what I&apos;m building
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
