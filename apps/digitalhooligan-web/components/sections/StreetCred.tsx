import Link from "next/link";
import Container from "../layout/Container";

export default function StreetCred() {
  return (
    <section id="street-cred" className="border-b border-dh-street-gray/40 bg-dh-black">
      <Container>
        <div className="flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between md:py-16">
          {/* Left */}
          <div className="space-y-3">
            <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-dh-street-gray/70">
              Street cred
            </p>
            <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Built by someone who&apos;s lived in test plans and ticket queues.
            </h2>
            <p className="max-w-md text-sm text-dh-street-gray/80">
              Digital Hooligan pulls from years of engineering and test work in
              defense, government, and enterprise environments—requirements,
              traceability, and “did we prove it?” included.
            </p>
          </div>

          {/* Right */}
          <div className="grid max-w-md gap-3 text-xs">
            <div className="space-y-2 rounded-2xl border border-dh-street-gray/60 bg-dh-deep-void/50 p-3">
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-dh-street-gray/70">
                Government &amp; enterprise
              </p>
              <p className="text-dh-street-gray/80">
                Used to requirements, verification, and structured processes when it matters.
                Operates under NAICS 541511 with SAM.gov registration.
              </p>

              <div className="mt-2 inline-flex flex-wrap gap-2">
                <span className="rounded-full border border-dh-street-gray/60 bg-dh-black/60 px-3 py-1 text-[11px] text-dh-offwhite">
                  NAICS 541511 · SAM.gov registered
                </span>
                <Link
                  href="/gov"
                  className="rounded-full border border-dh-electric-mint/70 bg-dh-electric-mint/10 px-3 py-1 text-[11px] font-semibold text-dh-electric-mint transition hover:bg-dh-electric-mint/20"
                >
                  View gov services →
                </Link>
              </div>
            </div>

            <div className="space-y-1 rounded-2xl border border-dh-street-gray/60 bg-dh-deep-void/50 p-3">
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-dh-street-gray/70">
                Build style
              </p>
              <p className="text-dh-street-gray/80">
                Short, focused builds with demos over slide decks. Strong bias toward dashboards,
                logs, and observability from day one.
              </p>
            </div>

            <div className="space-y-1 rounded-2xl border border-dh-street-gray/60 bg-dh-deep-void/50 p-3">
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-dh-street-gray/70">
                Small on purpose
              </p>
              <p className="text-dh-street-gray/80">
                You work directly with the builder. No handoffs through layers of account managers
                before a single line of code ships.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
