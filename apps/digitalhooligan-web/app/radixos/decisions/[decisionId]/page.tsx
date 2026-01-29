import Link from "next/link";

type PageProps = {
  params: { decisionId: string };
};

const containerClass =
  "mx-auto w-full max-w-[760px] px-[20px] py-[24px] text-[15px] leading-6 text-neutral-100";
const titleClass = "text-[20px] leading-7 font-normal";
const crumbClass = "mb-[10px] text-[13px] leading-5 text-neutral-400";
const pClass = "mt-[10px]";
const h2Class = "mt-[18px] text-[17px] leading-6 font-normal";
const labelClass = "mt-[14px] text-[13px] leading-5 text-neutral-400";
const valueClass = "mt-[6px] whitespace-pre-wrap";
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

export default function RadixOSDecisionDetailPage({ params }: PageProps) {
  const decisionId = params.decisionId;

  return (
    <main className={containerClass}>
      <TopNav />

      <div className={crumbClass}>
        <span>Decisions / </span>
        <span>{decisionId}</span>
      </div>

      <p className={pClass}>This page displays a single immutable Decision.</p>
      <p className={pClass}>
        It reflects intent at the time of authorship, preserved without
        modification.
      </p>

      <p className={metaClass}>This record is immutable.</p>

      <h1 className={titleClass + " mt-[18px]"}>Decision Record</h1>

      <div className={labelClass}>Decision ID</div>
      <div className={valueClass}>{decisionId}</div>

      <div className={labelClass}>Decision statement (intent)</div>
      <div className={valueClass}>Not available on this public surface.</div>

      <div className={labelClass}>Owner</div>
      <div className={valueClass}>Not available on this public surface.</div>

      <div className={labelClass}>Timestamp / attribution</div>
      <div className={valueClass}>Not available on this public surface.</div>

      <div className={labelClass}>
        Declared constraints (recorded, not validated)
      </div>
      <div className={valueClass}>Not available on this public surface.</div>

      <div className={labelClass}>Assumptions and confidence bounds</div>
      <div className={valueClass}>Not available on this public surface.</div>

      <div className={labelClass}>Declared review cadence</div>
      <div className={valueClass}>Not declared</div>

      <div className={labelClass}>Referenced prior Decisions</div>
      <div className={valueClass}>None referenced</div>

      <div className={labelClass}>Referenced context links</div>
      <div className={valueClass}>Not available on this public surface.</div>

      <h2 className={h2Class}>Change and Review</h2>
      <p className={pClass}>
        Change occurs only through new Decisions referencing prior Decisions.
      </p>
      <p className={pClass}>
        Retrospectives attach observations without mutating original intent.
      </p>
      <p className={pClass}>
        Outcomes are recorded as observed states, not judgments of correctness.
      </p>

      <h2 className={h2Class}>Retrospective (Notes)</h2>
      <p className={pClass}>
        No retrospective notes are displayed on this public surface.
      </p>
    </main>
  );
}
