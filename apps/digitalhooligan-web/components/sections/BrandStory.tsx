import Container from "../layout/Container";

export default function BrandStory() {
  return (
    <section
      id="why"
      className="scroll-mt-24 border-t border-dh-border bg-dh-carbon"
    >
      <Container>
        <div className="py-12 md:py-16">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 rounded-full border border-dh-steel-blue/40 bg-dh-panel/40 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.28em] text-dh-steel-blue">
            <span className="h-1.5 w-1.5 rounded-full bg-dh-steel-blue" />
            <span>Why DH?</span>
          </div>

          <div className="mt-4 grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)] md:items-start">
            {/* Left: headline + story */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold leading-snug text-dh-text md:text-3xl">
                Not a startup factory.{" "}
                <span className="text-dh-steel-blue">A trouble lab.</span>
              </h2>
              <p className="text-sm text-dh-muted md:text-base">
                I don&apos;t ship pitch decks. I ship working tools — scrapers,
                dashboards, bots, and weird little apps that solve real problems
                for real people. Digital Hooligan is my label for all the
                experiments that made it out of the lab.
              </p>
            </div>

            {/* Right: quick bullets */}
            <div className="grid gap-4 md:grid-cols-1">
              <div className="rounded-2xl border border-dh-border bg-dh-panel/60 p-4">
                <p className="text-[11px] font-mono uppercase tracking-[0.26em] text-dh-steel-blue">
                  Built &amp; shipped
                </p>
                <p className="mt-2 text-sm text-dh-text">
                  Multiple live apps and experiments — PennyWize, DropSignal,
                  HypeWatch, Hooligan Labs prototypes — designed, built, and
                  deployed with tight scope and clean delivery.
                </p>
              </div>

              <div className="rounded-2xl border border-dh-border bg-dh-panel/60 p-4">
                <p className="text-[11px] font-mono uppercase tracking-[0.26em] text-dh-steel-blue">
                  How I work
                </p>
                <p className="mt-2 text-sm text-dh-text">
                  Small, scope-bounded, and ship-focused. Tight scopes, short
                  feedback loops, and shipping useful things instead of endless
                  plans.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
