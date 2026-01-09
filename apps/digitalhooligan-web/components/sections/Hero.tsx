import Container from "../layout/Container";

export default function Hero() {
  const highlights = [
    "Out-of-the-box ops brain",
    "Apps, bots & automation toys",
    "Gov & enterprise ready",
    "Labs-first experiments",
  ];

  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-dh-street-gray/40 bg-dh-black"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(77,163,255,0.16),transparent_60%)]"
        aria-hidden="true"
      />

      <Container>
        <div className="relative flex flex-col gap-12 py-16 md:py-20 lg:flex-row lg:items-center lg:py-24">
          {/* Left: main copy */}
          <div className="flex-1 space-y-6">
            <p className="inline-flex items-center rounded-full border border-dh-electric-mint/40 bg-dh-deep-void/60 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.22em] text-dh-electric-mint">
              Digital Hooligan LLC · Hooligan Labs
            </p>

            <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="block">Apps, bots, & dashboards</span>
              <span className="mt-1 block text-dh-electric-mint">
                for hooligan-minded builders.
              </span>
            </h1>

            <p className="max-w-xl text-balance text-sm text-dh-street-gray sm:text-base">
              Digital Hooligan is a one-person studio building{" "}
              <span className="font-medium text-dh-offwhite">
                tool-first apps with a social layer
              </span>{" "}
              around the data: price-watching for sneakers and collectibles,
              penny-stock scrapers, ops automation toys, and internal dashboards
              for operators, founders, and gov/enterprise teams.
            </p>

            <div className="flex flex-wrap gap-3">
              {/* Conversion = red */}
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-dh-rebel-red px-5 py-2.5 text-sm font-semibold text-black shadow shadow-dh-rebel-red/30 transition hover:opacity-90"
              >
                Start a conversation
              </a>

              {/* Secondary = steel blue */}
              <a
                href="/labs"
                className="inline-flex items-center justify-center rounded-full border border-dh-electric-mint/70 bg-dh-electric-mint/10 px-5 py-2.5 text-sm font-medium text-dh-electric-mint transition hover:bg-dh-electric-mint/20"
              >
                Explore Hooligan Labs
              </a>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-dh-street-gray">
              <span className="inline-flex items-center gap-2 rounded-full border border-dh-street-gray/50 bg-dh-deep-void/50 px-3 py-1">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[#4DA3FF] shadow-[0_0_0_3px_rgba(77,163,255,0.16),0_0_10px_rgba(77,163,255,0.32)]"
                  aria-hidden="true"
                />
                Single-member LLC · Software, SaaS & automation
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-dh-street-gray/50 bg-dh-deep-void/50 px-3 py-1">
                NAICS 541511 · SAM.gov registered · SDVOSB / VOSB · SBA 8(a)
              </span>
            </div>
          </div>

          {/* Right: highlight cards */}
          <div className="flex-1">
            <div className="mx-auto grid max-w-md gap-4 sm:grid-cols-2 sm:gap-5">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="relative overflow-hidden rounded-2xl border border-dh-street-gray/60 bg-gradient-to-b from-dh-deep-void/80 to-black/90 p-4 shadow-[0_18px_45px_rgba(0,0,0,0.65)]"
                >
                  <div className="relative space-y-2">
                    <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-dh-street-gray/80">
                      Hooligan mode
                    </p>
                    <p className="text-sm font-semibold text-white">{item}</p>
                    <p className="text-xs text-dh-street-gray/80">
                      Built like an ops tool, presented like a product.
                    </p>
                  </div>
                </div>
              ))}

              <div className="relative col-span-full mt-1 overflow-hidden rounded-2xl border border-dh-electric-mint/40 bg-dh-deep-void/60 p-4 text-xs text-dh-offwhite">
                <p className="font-semibold text-dh-electric-mint">
                  Built for sneakers, collectibles & ops.
                </p>
                <p className="mt-1 text-dh-street-gray/80">
                  <span className="font-medium text-dh-offwhite">
                    PennyWize, DropSignal, HypeWatch, Ops Toys
                  </span>{" "}
                  start as bots & dashboards, graduating to web + mobile once
                  they earn it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
