import Link from "next/link";

const containerClass =
  "mx-auto w-full max-w-[760px] px-[20px] py-[24px] text-[15px] leading-6 text-neutral-100";
const titleClass = "text-[20px] leading-7 font-normal";
const h2Class = "mt-[18px] text-[17px] leading-6 font-normal";
const pClass = "mt-[10px]";
const listItemClass = "mt-[10px]";
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

export default function RadixOSGovernancePage() {
  return (
    <main className={containerClass}>
      <TopNav />

      <h1 className={titleClass}>Governance</h1>

      <p className={pClass}>
        RadixOS exists to bind executive judgment as an authoritative record.
      </p>
      <p className={pClass}>
        Governance emerges from explicit Decisions, not inferred alignment or
        retroactive narratives.
      </p>

      <h2 className={h2Class}>Governance Principles</h2>

      <p className={listItemClass}>Authority is declared, not inferred</p>
      <p className={listItemClass}>Ownership is explicit and singular</p>
      <p className={listItemClass}>Constraints are declared, not enforced</p>
      <p className={listItemClass}>History is immutable</p>
      <p className={listItemClass}>Review cadence is an explicit choice</p>
      <p className={listItemClass}>
        Silence and absence are explicit states, not implied failure.
      </p>

      <h2 className={h2Class}>What Governance Is Not</h2>
      <p className={pClass}>RadixOS does not:</p>

      <p className={listItemClass}>RadixOS does not attempt compliance validation</p>
      <p className={listItemClass}>Replace leadership judgment</p>
      <p className={listItemClass}>Resolve conflict automatically</p>
      <p className={listItemClass}>Ensure alignment or performance</p>

      <p className={pClass}>
        It preserves what was decided, by whom, and under which constraints.
      </p>

      <p className={metaClass}>context ≠ decide ≠ signal ≠ execute</p>
    </main>
  );
}
