import Image from "next/image";
import Link from "next/link";
import Container from "../layout/Container";

export default function Hero() {
  return (
    <section id="top" className="scroll-mt-24 bg-dh-black">
      <Container>
        {/* Match the general vertical rhythm of Apps / Labs */}
        <div className="flex flex-col gap-10 py-16 md:flex-row md:items-center md:gap-16 md:py-20">
          {/* Left: copy + CTAs */}
          <div className="max-w-xl space-y-6">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-dh-electric-mint/40 bg-dh-black/60 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.28em] text-dh-electric-mint">
              <span className="h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
              <span>Digital Hooligan · App Studio</span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold leading-tight text-white md:text-5xl">
                Break the rules.{" "}
                <span className="text-dh-electric-mint">
                  Ship dangerous ideas.
                </span>
              </h1>
              <p className="text-sm text-dh-street-gray/80 md:text-base">
                I build small, vicious products that feel like they shouldn&apos;t
                exist in a corporate roadmap. Scrapers, bots, sneaker tools, and
                anything else that gives the misfits an edge.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="#apps"
                className="inline-flex items-center justify-center rounded-full border border-dh-electric-mint bg-dh-electric-mint px-4 py-2 text-xs font-medium text-dh-black transition hover:brightness-110"
              >
                Explore the apps
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-dh-street-gray/70 bg-dh-black px-4 py-2 text-xs font-medium text-dh-street-gray transition hover:border-dh-electric-mint/70 hover:text-white"
              >
                Work with the hooligan
              </Link>
            </div>

            {/* Meta row */}
            <div className="mt-2 flex flex-wrap gap-6 text-[11px] text-dh-street-gray/70 md:text-xs">
              <div className="space-y-1">
                <p className="font-mono uppercase tracking-[0.26em] text-dh-street-gray">
                  Currently shipping
                </p>
                <p>PennyWize · DropSignal · HypeWatch · Hooligan Labs</p>
              </div>
              <div className="space-y-1">
                <p className="font-mono uppercase tracking-[0.26em] text-dh-street-gray">
                  Built by
                </p>
                <p>Courtez &quot;TezDevs&quot; Cannady · Solo founder &amp; engineer</p>
              </div>
            </div>
          </div>

          {/* Right: hero image card */}
          <div className="mx-auto w-full max-w-xs md:max-w-sm">
            <div className="relative overflow-hidden rounded-[2rem] border border-dh-street-gray/60 bg-dh-black shadow-[0_0_80px_rgba(30,255,203,0.35)]">
              <div className="relative h-72 w-full md:h-80">
                <Image
                  // ⬇️ change this to whatever src you were using before
                  src="/images/hero-bear.png"
                  alt="Digital Hooligan bear spraying graffiti"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="border-t border-dh-street-gray/60 bg-black/60 px-4 py-3 text-[11px] text-dh-street-gray/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
                    <span className="font-mono uppercase tracking-[0.26em]">
                      Hooligan-grade
                    </span>
                  </div>
                  <span>Experiments only</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
