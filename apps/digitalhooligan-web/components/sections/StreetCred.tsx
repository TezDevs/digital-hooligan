import Container from "../layout/Container";

export default function StreetCred() {
  return (
    <section
      id="street-cred"
      className="scroll-mt-24 border-t border-dh-street-gray/60 bg-dh-black"
    >
      <Container>
        {/* Match contact section spacing */}
        <div className="py-12 md:py-16">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 rounded-full border border-dh-electric-mint/40 bg-dh-black/60 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.28em] text-dh-electric-mint">
            <span className="h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
            <span>Street Cred</span>
          </div>

          {/* Heading + intro */}
          <div className="mt-4 max-w-3xl space-y-3">
            <h2 className="text-2xl font-semibold leading-snug text-white md:text-3xl">
              Not a startup factory.{" "}
              <span className="text-dh-electric-mint">A trouble lab.</span>
            </h2>
            <p className="text-sm text-dh-street-gray/80 md:text-base">
              I don&apos;t ship pitch decks. I ship working tools&mdash;scrapers,
              dashboards, and bots that solve real problems for real people.
              Digital Hooligan is my label for all the experiments that made it
              out of the lab.
            </p>
          </div>

          {/* Cards */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {/* Built & shipped */}
            <article className="rounded-2xl border border-dh-street-gray/60 bg-[#050608] p-4 md:p-5">
              <p className="text-[11px] font-mono uppercase tracking-[0.26em] text-dh-electric-mint">
                Built &amp; shipped
              </p>
              <h3 className="mt-2 text-sm font-semibold text-white md:text-base">
                Multiple live apps
              </h3>
              <p className="mt-2 text-xs text-dh-street-gray/80 md:text-sm">
                PennyWize, DropSignal, HypeWatch, and Hooligan Labs prototypes
                &mdash; all designed, built, and deployed solo.
              </p>
            </article>

            {/* Background */}
            <article className="rounded-2xl border border-dh-street-gray/60 bg-[#050608] p-4 md:p-5">
              <p className="text-[11px] font-mono uppercase tracking-[0.26em] text-dh-electric-mint">
                Background
              </p>
              <h3 className="mt-2 text-sm font-semibold text-white md:text-base">
                Senior engineer &amp; builder
              </h3>
              <p className="mt-2 text-xs text-dh-street-gray/80 md:text-sm">
                Engineering + ops background, used to owning the stack:
                infrastructure, code, and the ugly glue in between.
              </p>
            </article>

            {/* How I work */}
            <article className="rounded-2xl border border-dh-street-gray/60 bg-[#050608] p-4 md:p-5">
              <p className="text-[11px] font-mono uppercase tracking-[0.26em] text-dh-electric-mint">
                How I work
              </p>
              <h3 className="mt-2 text-sm font-semibold text-white md:text-base">
                Small, fast, dangerous
              </h3>
              <p className="mt-2 text-xs text-dh-street-gray/80 md:text-sm">
                One-person skunkworks: tight scopes, fast loops, and shipping
                useful things instead of endless plans.
              </p>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}
