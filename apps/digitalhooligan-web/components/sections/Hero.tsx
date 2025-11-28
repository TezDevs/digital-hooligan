import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="border-b border-dh-street-gray/60 bg-dh-black">
      <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:flex-row lg:gap-12 lg:px-8 lg:py-24">
        {/* Left: Copy */}
        <div className="w-full max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-dh-electric-mint/40 bg-dh-black/80 px-3 py-1 text-xs font-medium text-dh-electric-mint/90">
            <span className="h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
            Break the rules. Ship dangerous ideas.
          </div>

          <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Digital Hooligan is your
            <span className="block text-dh-electric-mint">
              one-person app studio.
            </span>
          </h1>

          <p className="mt-3 max-w-md text-sm text-dh-street-gray sm:text-base">
            I’m Tez — building scrappy, high-utility tools for people who live
            on drops, side hustles, and signal. No committees. Just fast,
            opinionated software.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="#apps"
              className="inline-flex h-10 items-center justify-center rounded-full border border-dh-electric-mint bg-dh-electric-mint px-4 text-sm font-medium text-dh-black transition hover:bg-dh-electric-mint/90"
            >
              View apps
            </Link>
            <Link
              href="#contact"
              className="inline-flex h-10 items-center justify-center rounded-full border border-dh-street-gray/60 px-4 text-sm font-medium text-dh-street-gray transition hover:border-dh-electric-mint/70 hover:text-white"
            >
              Talk to the hooligan
            </Link>
          </div>

          <p className="mt-4 text-xs text-dh-street-gray/80 sm:text-sm">
            Currently cooking: PennyWize, DropSignal, HypeWatch, and more.
          </p>
        </div>

        {/* Right: Hero image */}
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-md">
          <div className="relative overflow-hidden rounded-3xl border border-dh-electric-mint/40 bg-gradient-to-br from-dh-black to-dh-deep-purple/40 p-3 shadow-[0_0_40px_rgba(30,255,203,0.25)]">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-dh-black">
              <Image
                src="/hero/digital-hooligan-hero.png"
                alt="Digital Hooligan hero artwork"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-dh-street-gray">
              <span>Digital Hooligan Labs</span>
              <span className="text-dh-electric-mint/90">Since 2024</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
