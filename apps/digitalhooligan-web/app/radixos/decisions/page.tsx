import Link from "next/link";

const containerClass =
  "mx-auto w-full max-w-[760px] px-[20px] py-[24px] text-[15px] leading-6 text-neutral-900";
const titleClass = "text-[20px] leading-7 font-normal";
const h2Class = "mt-[18px] text-[17px] leading-6 font-normal";
const labelClass = "mt-[14px] text-[13px] leading-5 text-neutral-600";
const inputClass =
  "mt-[6px] w-full rounded-none border border-neutral-300 bg-transparent px-[10px] py-[8px] text-[15px] leading-6 text-neutral-900";
const radioRowClass = "mt-[6px] flex flex-col gap-y-[6px]";
const pClass = "mt-[10px]";
const metaClass = "mt-[10px] text-[13px] leading-5 text-neutral-600";

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

export default function RadixOSDecisionsIndexPage() {
  return (
    <main className={containerClass}>
      <TopNav />

      <p className={pClass}>This page is a ledger of recorded Decisions.</p>
      <p className={pClass}>
        Each entry represents a single, explicitly authored human Decision, stored as an immutable
        historical record.
      </p>

      <h1 className={titleClass + " mt-[18px]"}>Ledger</h1>

      <div className={labelClass}>Search (ID / Owner)</div>
      <input className={inputClass} type="text" aria-label="Search (ID / Owner)" />

      <div className={labelClass}>Owner</div>
      <input className={inputClass} type="text" aria-label="Owner" />

      <div className={labelClass}>Created timestamp (range)</div>
      <div className="mt-[6px] flex flex-col gap-y-[8px]">
        <input className={inputClass} type="text" aria-label="Created timestamp from" placeholder="From" />
        <input className={inputClass} type="text" aria-label="Created timestamp to" placeholder="To" />
      </div>

      <div className={labelClass}>Review cycle present</div>
      <div className={radioRowClass} role="radiogroup" aria-label="Review cycle present">
        <label className="text-[15px] leading-6">
          <input type="radio" name="reviewCyclePresent" defaultChecked /> Any
        </label>
        <label className="text-[15px] leading-6">
          <input type="radio" name="reviewCyclePresent" /> Present
        </label>
        <label className="text-[15px] leading-6">
          <input type="radio" name="reviewCyclePresent" /> Not present
        </label>
      </div>

      <p className={metaClass}>Order: Created timestamp</p>

      <h2 className={h2Class}>Results</h2>

      <p className={pClass}>
        No Decisions are displayed on this surface without an attached public data source.
      </p>

      <p className={metaClass}>
        Absence of a Decision indicates absence of a recorded decision, not inaction or failure.
      </p>
    </main>
  );
}
