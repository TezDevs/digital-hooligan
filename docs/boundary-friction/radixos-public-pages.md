# Boundary Friction Log — RadixOS Public Pages

Scope: /radixos public surfaces

- /radixos
- /radixos/decisions
- /radixos/decisions/[decisionId]
- /radixos/governance
- /radixos/architecture

---

## BF-001 — Public Decisions ledger has no public data source

Where: /radixos/decisions  
Friction: Layout requires a ledger UI structure and retrieval controls. Repo does not (yet) provide a declared public data contract for Decisions on this surface.  
Resolution applied: Rendered retrieval controls and an explicit empty state: “No Decisions are displayed on this surface without an attached public data source.”  
Why not resolved creatively: No inferred data, no invented API, no reuse of CEO/private endpoints without explicit authorization.

Decision required: Declare whether /radixos/decisions is permitted to consume the same contract as /ceo/decisions or whether a separate public contract exists.

---

## BF-002 — Decision detail required fields vs missing public contract

Where: /radixos/decisions/[decisionId]  
Friction: Detail page layout specifies a full immutable record display, but there is no declared public decision record contract for this route.  
Resolution applied: Rendered required labels with explicit “Not available on this public surface.” values, and “Not declared” / “None referenced” where applicable.  
Why not resolved creatively: No system inference, no fabricated record, no cross-surface leakage.

Decision required: Declare whether this public surface should:

- (A) remain read-only with explicit missing data, or
- (B) consume a public Decision record contract.

---

## BF-003 — Append-only retrospective input permission is undefined

Where: /radixos/decisions/[decisionId]  
Friction: Layout allows append-only retrospective input only if publicly permitted. Public permission is not declared.  
Resolution applied: Retrospective section is view-only with explicit statement; input omitted.  
Why not resolved creatively: Avoid implying creation/authorship/workflow on a public surface.

Decision required: Confirm whether public append-only notes are permitted (and under what auth boundary).

---

## BF-004 — Global theme background conflicts with grayscale text choice

Where: all /radixos pages  
Friction: Global layout appears to render a dark background. Using near-black text (neutral-900) makes content illegible.  
Resolution applied: Pages now use light neutral primary text (neutral-100) and neutral secondary text (neutral-400), still grayscale-only. Links are forced to inherit text color to avoid browser default blue.

Decision required: Confirm whether RadixOS public surfaces must follow global theme or enforce a page-level neutral scheme. Current implementation is page-level neutral text only (no background panels added).

---

## BF-005 — No canonical navigation path to /radixos defined

Where: site-wide navigation  
Friction: Routes exist, but no canonical “path established” (no link from existing navigation). The binding spec defines top nav within RadixOS pages, but does not define how the public site must route users into /radixos.  
Resolution applied: RadixOS pages contain internal top navigation. No changes made to the site’s global navigation to avoid guessing the canonical nav component.

Decision required: Identify the canonical public navigation surface that is authorized to link to /radixos (header, footer, sitemap, or other).

---

## BF-005 — No canonical navigation path to /radixos defined (Resolved)

Where: site-wide navigation  
Resolution applied: Added a single public nav link in `GlobalNav.tsx`: “RadixOS” → “/radixos”.  
Notes: Inserted append-only as the last item to avoid implied re-ranking of existing nav items.

---

## BF-006 — Global nav link placement may imply hierarchy

Where: GlobalNav  
Friction: Any placement of a new link implies ordering.  
Resolution applied: Link added as the final item with identical styling and no additional grouping.  
Why not resolved creatively: No re-architecture of IA, no new categories, no emphasis patterns.
