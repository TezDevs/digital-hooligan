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
