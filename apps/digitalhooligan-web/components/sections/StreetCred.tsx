export default function StreetCred() {
  return (
    <section
      id="why"
      className="border-b border-dh-street-gray/60 bg-dh-black/95"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        {/* Header */}
        <div className="max-w-2xl">
          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            Why Digital Hooligan?
          </h2>
          <p className="mt-2 max-w-xl text-sm text-dh-street-gray sm:text-base">
            You&apos;re not looking for an “enterprise partner.” You want someone
            who can think like a user, build like an engineer, and ship without
            asking for permission. That&apos;s the entire point of Digital
            Hooligan.
          </p>
        </div>

        {/* Stats / bullets */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/70 p-4">
            <div className="text-base font-semibold text-white sm:text-lg">
              Hands-on builder
            </div>
            <div className="mt-1 text-xs text-dh-street-gray">
              From infra to UI — not just specs. I actually ship the thing.
            </div>
          </div>

          <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/70 p-4">
            <div className="text-base font-semibold text-white sm:text-lg">
              Ops & reliability brain
            </div>
            <div className="mt-1 text-xs text-dh-street-gray">
              Background in real-time, always-on systems. Alerts, playbooks,
              steady hands.
            </div>
          </div>

          <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/70 p-4">
            <div className="text-base font-semibold text-white sm:text-lg">
              Built for weird niches
            </div>
            <div className="mt-1 text-xs text-dh-street-gray">
              Sneakerheads, collectors, side hustlers — the overlooked edges of
              the internet.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
