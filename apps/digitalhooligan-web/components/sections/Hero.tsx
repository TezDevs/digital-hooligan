import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#050509]">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-[#1EFFCB22] via-transparent to-transparent" />

      <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 px-4 py-16 md:flex-row md:py-24">
        {/* LEFT: text */}
        <div className="relative z-10 max-w-xl space-y-6">
          <p className="text-sm uppercase tracking-[0.25em] text-[#1EFFCB]">
            DIGITAL HOOLIGAN
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Build, watch, and <span className="text-[#1EFFCB]">disrupt</span> your
            digital empire.
          </h1>

          <p className="text-base text-white/70 sm:text-lg">
            Sneaker scrapers, hype monitors, bots and dashboards—Hooligan HQ is
            where your experiments, apps, and automations live in one neon-lit
            alley.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button className="rounded-full bg-[#1EFFCB] px-5 py-2.5 text-sm font-medium text-black shadow-lg shadow-[#1EFFCB55] hover:bg-[#14cba0]">
              Launch Dev HQ
            </button>
            <button className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/80 hover:border-[#FF4DB2] hover:text-white">
              View Hooligan Apps
            </button>
          </div>

          <p className="text-xs text-white/40">
            Monorepo powered · PennyWize · SneakerScout · more in the lab…
          </p>
        </div>

        {/* RIGHT: hero image */}
        <div className="relative w-full max-w-lg">
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-[#1EFFCB33] via-[#FF4DB233] to-[#00C8FF33] blur-3xl" />

          <div className="overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#050509] shadow-2xl shadow-black/70">
            <Image
              src="/products/dh-hero-graffiti-bear.png"
              alt="Digital Hooligan bear spraying graffiti on a city alley wall"
              width={1052}
              height={768}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
