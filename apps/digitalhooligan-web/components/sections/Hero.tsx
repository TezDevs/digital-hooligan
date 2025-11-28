import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="top" className="scroll-mt-24 bg-dh-black pt-20 pb-16 md:pt-24 md:pb-20">
      {/* Left: text */}
      <div className="space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-dh-electric-mint/40 bg-dh-black/70 px-3 py-1 text-xs font-mono uppercase tracking-[0.2em] text-dh-electric-mint/80">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-dh-electric-mint animate-pulse" />
          Digital Hooligan · App Studio
        </div>

        {/* Heading + body */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            Break the rules.{" "}
            <span className="text-dh-electric-mint">
              Ship dangerous ideas.
            </span>
          </h1>
          <p className="max-w-xl text-sm sm:text-base text-dh-street-gray">
            I build small, vicious products that feel like they shouldn&apos;t
            exist in a corporate roadmap. Scrapers, alert bots, sneaker tools,
            and anything else that gives the misfits an edge.
          </p>
        </div>

        {/* Primary CTAs */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="#apps"
            className="inline-flex items-center justify-center rounded-full border border-dh-electric-mint/80 bg-dh-electric-mint/10 px-5 py-2.5 text-sm font-medium text-dh-electric-mint hover:bg-dh-electric-mint hover:text-dh-black transition"
          >
            Explore the apps
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-full border border-dh-street-gray/70 px-5 py-2.5 text-sm font-medium text-dh-street-gray hover:border-dh-electric-mint/60 hover:text-dh-electric-mint transition"
          >
            Work with the hooligan
          </Link>
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap gap-6 text-xs text-dh-street-gray">
          <div className="space-y-1">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dh-electric-mint/80">
              Currently shipping
            </p>
            <p>PennyWize · DropSignal · HypeWatch · Hooligan Labs</p>
          </div>
          <div className="space-y-1">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dh-electric-mint/80">
              Built by
            </p>
            <p>Courtez “TezDevs” Cannady · Solo founder &amp; engineer</p>
          </div>
        </div>
      </div>

      {/* Right: hero bear image */}
      <div className="relative mx-auto h-64 w-64 sm:h-72 sm:w-72 md:h-80 md:w-80">
        {/* Glow background */}
        <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-dh-electric-mint/15 via-transparent to-dh-electric-mint/25 blur-2xl" />

        {/* Image frame */}
        <div className="relative flex h-full w-full items-center justify-center rounded-[2.2rem] border border-dh-electric-mint/50 bg-dh-black/90 p-4 shadow-[0_0_40px_rgba(30,255,203,0.55)]">
          <Image
            src="/hero/dh-hero-bear.png"
            alt="Digital Hooligan mascot bear artwork"
            width={512}
            height={512}
            priority
            className="h-full w-full rounded-[1.8rem] object-contain"
          />
        </div>

        {/* Accent label */}
        <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 translate-y-1/2 items-center gap-2 rounded-full border border-dh-street-gray/70 bg-dh-black/90 px-3 py-1 text-[11px] text-dh-street-gray">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
          <span>Hooligan-grade experiments only</span>
        </div>
      </div>
    </section>
  );
}
