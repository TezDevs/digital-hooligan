import Container from "../layout/Container";

export default function Contact() {
  const email = "hello@digitalhooligan.io";

  return (
    <section id="contact" className="border-t border-dh-street-gray/40 bg-[#050608]">
      <Container>
        <div className="py-16 md:py-20">
          <div className="mx-auto max-w-3xl space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-dh-electric-mint/40 bg-dh-black/60 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.28em] text-dh-electric-mint">
                <span className="h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
                <span>Contact</span>
              </div>

              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Start a conversation
              </h2>
              <p className="mt-2 text-sm text-dh-street-gray/80 sm:text-base">
                Short, clear emails win. Share what you&apos;re building, your rough timeline,
                and whether this is for yourself, a team, or a government/enterprise program.
              </p>
            </div>

            <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/60 p-5 text-sm text-dh-offwhite">
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-dh-street-gray/70">
                Email
              </p>
              <p className="mt-1 text-base font-semibold text-dh-electric-mint">
                <a href={`mailto:${email}`} className="hover:underline">
                  {email}
                </a>
              </p>

              <ul className="mt-4 space-y-1.5 text-xs text-dh-street-gray/80">
                <li>• What you want to build or improve</li>
                <li>• Rough scope (MVP, experiment, internal tool, etc.)</li>
                <li>• Constraints (timeline, environment, budget band)</li>
                <li>• Any gov/enterprise or existing-system context</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
