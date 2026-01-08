import Container from "../layout/Container";

type AppCard = {
  name: string;
  tagline: string;
  niche: string;
  status: string;
  href: string;
  primaryCta: string;
  phase: string;
};

const apps: AppCard[] = [
  {
    name: "PennyWize",
    tagline: "Penny stock scraper with a social layer around the tickers.",
    niche: "Retail traders · penny stocks · data-first insights",
    status: "Bot + web app first, mobile later",
    href: "/pennywize",
    primaryCta: "View PennyWize",
    phase: "Phase 1: web app · Phase 2: iOS & Android",
  },
  {
    name: "DropSignal",
    tagline: "Sneaker & streetwear price-drop radar with assist-mode alerts.",
    niche: "Sneakerheads · streetwear · drops · restocks",
    status: "Alerts first, add-to-cart flows later",
    href: "/dropsignal",
    primaryCta: "View DropSignal",
    phase: "Phase 1: bot alerts · Phase 2: web app · Phase 3: mobile",
  },
  {
    name: "HypeWatch",
    tagline: "Collectible price watcher for cards, figures, mags & flex pieces.",
    niche: "Collectibles · slabs · figures · watches & display toys",
    status: "Starts inside Labs, then graduates",
    href: "/hypewatch",
    primaryCta: "View HypeWatch",
    phase: "Phase 0: Labs experiment · Phase 1: web · Phase 2: mobile",
  },
  {
    name: "Ops Toys",
    tagline: "Automation toys for infra, logging, deployments & dev workflow.",
    niche: "DevOps · SRE · internal tools & dashboards",
    status: "Shipping starter utilities",
    href: "/ops-toys",
    primaryCta: "View Ops Toys",
    phase: "Phase 0: internal use · Phase 1: curated public tools",
  },
];

export default function Apps() {
  return (
    <section id="apps" className="border-b border-dh-street-gray/40 bg-[#050608]">
      <Container>
        <div className="py-16 md:py-20">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-dh-electric-mint/40 bg-dh-black/60 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.28em] text-dh-electric-mint">
                <span className="h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
                <span>App Studio</span>
              </div>

              <h2 className="mt-4 text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Hooligan apps & bots
              </h2>
              <p className="mt-2 text-sm text-dh-street-gray/80 sm:text-base">
                Every app starts as a{" "}
                <span className="font-medium text-dh-offwhite">
                  tool-first bot
                </span>{" "}
                or dashboard. If it proves useful, it graduates into a focused{" "}
                <span className="font-medium text-dh-offwhite">web app</span> —
                and eventually mobile.
              </p>
            </div>

            <p className="max-w-sm text-xs text-dh-street-gray/70">
              No hype pages. Each project is wired for data, automation, and
              disciplined delivery.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {apps.map((app) => (
              <article
                key={app.name}
                className="group relative overflow-hidden rounded-2xl border border-dh-street-gray/60 bg-gradient-to-b from-dh-deep-void/80 to-black/90 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.65)] transition-transform hover:-translate-y-1 hover:border-dh-electric-mint/60"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(77,163,255,0.14),transparent_60%)] opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="relative flex h-full flex-col justify-between gap-4">
                  <header className="space-y-2">
                    <div className="inline-flex items-center gap-2 rounded-full border border-dh-street-gray/60 bg-dh-black/60 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-dh-street-gray">
                      <span className="h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
                      Hooligan Labs · App
                    </div>
                    <h3 className="text-lg font-semibold text-white">{app.name}</h3>
                    <p className="text-sm text-dh-street-gray/80">{app.tagline}</p>
                  </header>

                  <div className="space-y-2 text-xs text-dh-street-gray/80">
                    <p>
                      <span className="font-semibold text-dh-offwhite">Niche:</span>{" "}
                      {app.niche}
                    </p>
                    <p>
                      <span className="font-semibold text-dh-offwhite">Roadmap:</span>{" "}
                      {app.phase}
                    </p>
                    <p>
                      <span className="font-semibold text-dh-offwhite">Status:</span>{" "}
                      {app.status}
                    </p>
                  </div>

                  <footer className="mt-3 flex items-center justify-between gap-4">
                    <a
                      href={app.href}
                      className="inline-flex items-center gap-1 rounded-full border border-dh-electric-mint/70 bg-dh-electric-mint/10 px-3.5 py-1.5 text-xs font-semibold text-dh-electric-mint transition hover:bg-dh-electric-mint/20"
                    >
                      {app.primaryCta}
                      <span aria-hidden="true">↗</span>
                    </a>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-dh-street-gray/60">
                      Assist mode → mature flows
                    </span>
                  </footer>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
