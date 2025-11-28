export default function StreetCred() {
  return (
    <section id="street-cred" className="scroll-mt-24 border-t border-dh-street-gray/60 bg-dh-black pt-16 pb-16 md:pt-20 md:pb-20">
      <header className="space-y-3 max-w-2xl">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-dh-electric-mint/80">
          Street Cred
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Not a startup factory.{" "}
          <span className="text-dh-electric-mint">A trouble lab.</span>
        </h2>
        <p className="text-sm md:text-base text-dh-street-gray">
          I don&apos;t ship pitch decks. I ship working tools — scrapers,
          dashboards, and bots that solve real problems for real people.
          Digital Hooligan is my label for all the experiments that made it out
          of the lab.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/70 p-4 space-y-2">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-dh-electric-mint/80">
            Built &amp; Shipped
          </p>
          <p className="text-lg font-semibold">Multiple live apps</p>
          <p className="text-xs md:text-sm text-dh-street-gray">
            PennyWize, DropSignal, HypeWatch, and Hooligan Labs prototypes —
            all designed, built, and deployed solo.
          </p>
        </div>

        <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/70 p-4 space-y-2">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-dh-electric-mint/80">
            Background
          </p>
          <p className="text-lg font-semibold">Senior engineer &amp; builder</p>
          <p className="text-xs md:text-sm text-dh-street-gray">
            Engineering + ops background, used to owning the stack: infra,
            code, and the ugly glue in between.
          </p>
        </div>

        <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/70 p-4 space-y-2">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-dh-electric-mint/80">
            How I work
          </p>
          <p className="text-lg font-semibold">Small, fast, dangerous</p>
          <p className="text-xs md:text-sm text-dh-street-gray">
            I work like a one-person skunkworks: tight scopes, fast loops,
            shipping useful things instead of endless plans.
          </p>
        </div>
      </div>
    </section>
  );
}
