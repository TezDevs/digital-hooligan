## WorkItem
- Link / reference:

## Change Summary
- What changed:
- Why:

## Verification
- Steps taken:
- Local checks run:

## IGR-0.7 Explainability Surface Gate (Hard)

**Does this PR change any Explainability Surface?**
- An Explainability Surface is any file that includes this marker:
  `guardrail-scope: explainabilitysurface`

If **YES**, you must:
1) Ensure the marker is present in each applicable file, and
2) Complete the checklist below, and
3) Run `pnpm igr:check` (or ensure CI passes).

**IGR-0.7 Standard:** `docs/governance/igr/IGR-0.7.md`

### Required Attestation (BLOCKER if missing when applicable)
- [ ] **PEC alignment:** I reviewed PEC-0.7 sections A–I relevant to this change.
- [ ] **Language posture:** No guarantees, no authority leakage, no prescriptive directives in explainability output.
- [ ] **Temporal scoping present:** Statements are time-bounded (“during this review…”, “as observed…”).
- [ ] **Disclosures present:** Scope + non-decision/non-approval disclaimer included.
- [ ] **Boundary integrity:** No blending of context + decision + signal; no implied RadixOS Decision emission; no Custos enforcement claims.
- [ ] **Solum lens (if applicable):** Evidence-first; uncertainty bounded; provenance/citations included where claims exist.
- [ ] **Human ownership:** Where outcomes are mentioned, human handoff is explicit.
- [ ] **No secrets / no PII:** Confirmed.
- [ ] **Verification steps included:** How you checked the guardrails (lint job, manual review, etc.).

### Required When Applicable (BLOCKER if applicable but missing)
- [ ] **Entity typing:** Entities enumerated are typed using the EntityType canon.
- [ ] **Routes/docs updated:** If public-facing routes or surfaces changed, route map updated (repo-standard).

### Declared Outcome
- [ ] **PASS — Cleared for merge / launch**
- [ ] **BLOCKED — Language or boundary violation detected**
- [ ] **DEFERRED — Non-blocking issues logged with owner + rationale + follow-up WorkItem**
