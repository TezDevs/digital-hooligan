import Container from "../layout/Container";

export default function BrandStory() {
  return (
    <section
      id="why"
      className="scroll-mt-24 border-t border-dh-street-gray/60 bg-[#050608]"
    >
      <Container>
        <div className="py-12 md:py-16">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 rounded-full border border-dh-electric-mint/40 bg-dh-black/60 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.28em] text-dh-electric-mint">
            <span className="h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
            <span>Why DH?</span>
          </div>

          <div className="mt-4 grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)] md:items-start">
            {/* Left: headline + story */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold leading-snug text-white md:text-3xl">
                Not a startup factory.{" "}
                <span className="text-dh-electric-mint">A trouble lab.</span>
              </h2>
              <p className="text-sm text-dh-street-gray/80 md:text-base">
                I don&apos;t ship pitch decks. I ship working tools — scrapers,
                dashboards, bots, and weird little apps that solve real problems
                for real people. Digital Hooligan is my label for all the
                experiments that made it out of the lab.
              </p>
            </div>

            {/* Right: quick bullets */}
            <div className="grid gap-4 md:grid-cols-1">
              <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/60 p-4">
                <p className="text-[11px] font-mono uppercase tracking-[0.26em] text-dh-electric-mint/90">
                  Built &amp; shipped
                </p>
                <p className="mt-2 text-sm text-white">
                  Multiple live apps and experiments — PennyWize, DropSignal,
                  HypeWatch, Hooligan Labs prototypes — all designed, built, and
                  deployed solo.
                </p>
              </div>

              <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/60 p-4">
                <p className="text-[11px] font-mono uppercase tracking-[0.26em] text-dh-electric-mint/90">
                  How I work
                </p>
                <p className="mt-2 text-sm text-white">
                  Small, fast, dangerous. Tight scopes, short feedback loops,
                  and shipping useful things instead of endless plans.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

