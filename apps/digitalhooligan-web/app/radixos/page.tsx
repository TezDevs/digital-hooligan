import Link from "next/link";

const containerClass =
  "mx-auto w-full max-w-[760px] px-[20px] py-[24px] text-[15px] leading-6 text-neutral-900";
const titleClass = "text-[22px] leading-7 font-normal";
const h2Class = "mt-[18px] text-[17px] leading-6 font-normal";
const pClass = "mt-[10px]";
const metaClass = "mt-[8px] text-[13px] leading-5 text-neutral-600";
const listClass = "mt-[10px] space-y-[6px]";

function TopNav() {
  return (
    <nav className="mb-[18px]">
      <div className="flex flex-wrap gap-x-[14px] gap-y-[6px]">
        <Link href="/radixos">RadixOS</Link>
        <Link href="/radixos/decisions">Decisions</Link>
        <Link href="/radixos/governance">Governance</Link>
        <Link href="/radixos/architecture">Architecture</Link>
      </div>
    </nav>
  );
}

export default function RadixOSOverviewPage() {
  return (
    <main className={containerClass}>
      <TopNav />

      <h1 className={titleClass}>RadixOS is a Decision &amp; Accountability OS.</h1>

      <p className={pClass}>
        It records explicit human judgment as immutable, first-class objects—binding who decided what,
        when, under which constraints, with which assumptions and confidence bounds, and with what
        declared review cadence.
      </p>
      <p className={pClass}>RadixOS sits above tools and execution, below judgment.</p>

      <h2 className={h2Class}>What RadixOS Does</h2>
      <p className={pClass}>RadixOS exists to record and preserve executive judgment.</p>
      <p className={pClass}>
        A Decision exists only when a human explicitly authors it. Each Decision is stored as an
        immutable record with:
      </p>
      <div className={listClass}>
        <div>A single Owner</div>
        <div>Declared constraints (including time, resources, and irreversibility)</div>
        <div>Assumptions and confidence bounds</div>
        <div>A timestamp and attribution</div>
        <div>An optional review cadence (declared, not enforced)</div>
      </div>
      <p className={pClass}>RadixOS preserves decision history, not outcomes or evaluations.</p>

      <h2 className={h2Class}>What RadixOS Does Not Do</h2>
      <p className={pClass}>
        RadixOS does not detect signals, recommend actions, infer truth, or execute work.
      </p>
      <p className={pClass}>
        It does not evaluate decision quality, score correctness, monitor environments, or drive
        execution. Those capabilities collapse authority and create post-hoc rationalization risk.
      </p>

      <h2 className={h2Class}>Position in the System</h2>
      <p className={pClass}>RadixOS is a governance layer, not an execution layer.</p>
      <p className={pClass}>It consumes context without owning it</p>
      <p className={pClass}>It records decisions without validating them</p>
      <p className={pClass}>It preserves history without interpretation</p>
      <p className={metaClass}>context ≠ decide ≠ signal ≠ execute</p>
    </main>
  );
}
