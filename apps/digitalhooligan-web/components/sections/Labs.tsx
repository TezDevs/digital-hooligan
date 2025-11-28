import Image from "next/image";

export default function Labs() {
    return (
        <section
            id="labs"
            className="border-b border-dh-street-gray/60 bg-dh-black"
        >
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
                    {/* Left: Copy */}
                    <div className="w-full max-w-xl">
                        <h2 className="text-xl font-semibold text-white sm:text-2xl">
                            Hooligan Labs
                        </h2>
                        <p className="mt-2 max-w-lg text-sm text-dh-street-gray sm:text-base">
                            This is where the experiments live — bots, scrapers, monitors, and
                            half-crazy utilities that may or may not graduate into full apps.
                            Fast iterations, ugly prototypes, useful results.
                        </p>

                        <ul className="mt-4 space-y-3 text-sm text-dh-street-gray">
                            <li>
                                <span className="font-medium text-white">
                                    ⚙️ Market & drop scrapers:
                                </span>{" "}
                                pipelines that watch news, listings, and prices so you don&apos;t
                                have to sit in five tabs all day.
                            </li>
                            <li>
                                <span className="font-medium text-white">
                                    📊 Signal dashboards:
                                </span>{" "}
                                experiments in surfacing only what matters: velocity, volume,
                                and real movement.
                            </li>
                            <li>
                                <span className="font-medium text-white">
                                    🤖 Automation tooling:
                                </span>{" "}
                                little bots to handle alerts, summaries, and nightly cleanups.
                            </li>
                        </ul>
                    </div>

                    {/* Right: Visual */}
                    <div className="w-full max-w-md lg:max-w-sm">
                        <div className="relative overflow-hidden rounded-3xl border border-dh-street-gray/70 bg-dh-black p-3">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-dh-black">
                                <Image
                                    src="/labs/hooligan-labs.png"
                                    alt="Hooligan Labs icon"
                                    fill
                                    className="object-cover"
                                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 280px, 100vw"
                                />
                            </div>
                            <div className="mt-3 flex items-center justify-between text-xs text-dh-street-gray">
                                <span>Experimental zone</span>
                                <span className="text-dh-electric-mint/90">
                                    Shipping &gt; perfection
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
