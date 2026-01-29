import Link from "next/link";

const containerClass =
  "mx-auto w-full max-w-[760px] px-[20px] py-[24px] text-[15px] leading-6 text-neutral-100";
const titleClass = "text-[20px] leading-7 font-normal";
const h2Class = "mt-[18px] text-[17px] leading-6 font-normal";
const pClass = "mt-[10px]";
const metaClass = "mt-[10px] text-[13px] leading-5 text-neutral-400";
const linkClass = "text-inherit underline";

function TopNav() {
  return (
    <nav className="mb-[18px]">
      <div className="flex flex-wrap gap-x-[14px] gap-y-[6px]">
        <Link className={linkClass} href="/radixos">
          RadixOS
        </Link>
        <Link className={linkClass} href="/radixos/decisions">
          Decisions
        </Link>
        <Link className={linkClass} href="/radixos/governance">
          Governance
        </Link>
        <Link className={linkClass} href="/radixos/architecture">
          Architecture
        </Link>
      </div>
    </nav>
  );
}

export default function RadixOSArchitecturePage() {
  return (
    <main className={containerClass}>
      <TopNav />

      <h1 className={titleClass}>Architecture</h1>

      <p className={pClass}>RadixOS is a governance layer.</p>
      <p className={pClass}>
        It records Decisions without collapsing boundaries between: Context,
        Decision, Signal, Execution
      </p>

      <h2 className={h2Class}>System Boundaries</h2>
      <p className={pClass}>
        RadixOS consumes context; it does not generate or own it
      </p>
      <p className={pClass}>
        RadixOS records Decisions; it does not infer them
      </p>
      <p className={pClass}>
        RadixOS preserves history; it does not trigger actions
      </p>
      <p className={pClass}>
        It integrates with surrounding systems without becoming an execution
        hub.
      </p>

      <h2 className={h2Class}>Explicit Non-Capabilities</h2>
      <p className={pClass}>
        RadixOS does not observe external conditions, provide action guidance, infer truth, or execute work.
      </p>
      <p className={pClass}>This boundary is intentional by design.</p>

      <p className={metaClass}>context ≠ decide ≠ observe ≠ execute</p>
    </main>
  );
}
