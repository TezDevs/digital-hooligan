**Atlas — Dev Executor (DH Standard)**
**Track Served:** **Both** (Track 1: Gravity explainability posture; Track 2: OpsOS Platform governance integrity)

---

# Implementation Guardrail Ruleset (IGR-0.7)

**Derived from:** Product Enforcement Checklist (PEC-0.7)
**Status:** **LOCKING** (Governance & Guardrails Standard hard gate)
**Applies to:** any **product, feature, prompt, artifact, UI copy, docs, release notes, or API-facing narrative** that touches:

* explainability / validation language
* governance semantics
* Solum / RadixOS / Custos / Pondus boundary descriptions
* “review”, “approval”, “enforcement”, “decision”, “signal” framing

**Enforcement rule:** Any **BLOCKER** = **block merge / block launch**.

---

## 0) RadixOS Object Mapping

This ruleset enforces clean separation between **context** and **system truth**:

* **WorkItem:** the unit of change (PR must reference a WorkItem or equivalent task record).
* **Decision:** **never created or implied** by explainability artifacts; Decisions are separate, explicit, and human-owned.
* **Incident:** any guardrail breach that ships becomes an Incident (with owner + corrective action).
* **HealthCheck:** periodic sampling (cadence) to ensure guardrails remain active and not bypassed.
* **Cadence:** PR review gate (continuous) + pre-launch gate (weekly / launch cadence).

---

## 1) Definitions

### 1.1 Explainability Surface

Any output that **summarizes, validates, reviews, evaluates, or frames** system state, governance posture, safety posture, evidence, or boundaries—especially anything “Solum-powered”.

### 1.2 Authority Language

Language that implies the artifact **approves, decides, enforces, certifies, guarantees, or directs action**.

### 1.3 Boundary Leakage

When an artifact blurs roles:

* **Solum** behaving advisory/decisional (advice-first, “what to do”)
* **RadixOS** implied to be triggered/logged by narrative
* **Custos** implied enforcement from a summary
* Any blending of **context + decision + signal** in one artifact

---

## 2) Linting Rules

These are **implementation-agnostic** rules intended to be enforced via:

* text linting (markdown, mdx, prompts, UI copy, release notes)
* PR templates / checklists
* CI “content gate” jobs
* optional commit hooks

Each rule includes **Severity** and **What to check**.

---

### 2.1 Explainability-Safe Language Rules

**LINT-LANG-01 (BLOCKER) — No outcome guarantees**
**Check:** disallow language that promises outcomes or certainty.
**Examples (blocked):** “will ensure”, “guarantees”, “prevents”, “eliminates risk”, “always”, “never fails”.

**LINT-LANG-02 (BLOCKER) — No authority leakage**
**Check:** artifact must not claim to approve, authorize, certify, or enforce.
**Examples (blocked):** “approved”, “certified”, “authorized”, “compliant”, “enforced”, “cleared”.

**LINT-LANG-03 (BLOCKER) — No prescriptive directives in explainability surfaces**
**Check:** disallow “should/must/recommended” *when used as directives* in explainability summaries.
**Allowed exception:** purely internal engineering requirements in code comments/docs **not** presented as Solum/governance output.

**LINT-LANG-04 (WARN → BLOCKER if missing in high-risk surfaces) — Time-bounded scoping**
**Check:** statements must be explicitly scoped (“during this review…”, “as observed…”, “based on the provided inputs…”).
**Escalation:** becomes **BLOCKER** if the artifact is user-facing or release-facing.

**LINT-LANG-05 (WARN) — Observational phrasing preference**
**Check:** prefer descriptive/contextual language.
**Preferred phrases:** “observed”, “identified during review”, “supports use pending human approval”, “evidence suggests”, “within scope”.

---

### 2.2 Required Disclosures for Explainability Surfaces

**LINT-DISC-01 (BLOCKER) — Scope declaration present**
**Check:** artifact must state what is and is not covered.

**LINT-DISC-02 (BLOCKER) — Non-decision / non-approval disclaimer present**
**Check:** explicit: “This is not a decision, approval, certification, or enforcement action.”

**LINT-DISC-03 (BLOCKER) — Human ownership handoff present where relevant**
**Check:** when outcomes or next steps are mentioned, the artifact must point to designated human process (RadixOS decision flow).

**LINT-DISC-04 (WARN) — Out-of-scope derivative implementations**
**Check:** if artifact could be reused downstream, include: “Derivative implementations are out of scope.”

---

### 2.3 Boundary Integrity Rules (Solum / RadixOS / Custos / Pondus)

**LINT-BND-01 (BLOCKER) — No implied Decision emission**
**Check:** the artifact must not state or imply it triggers/logs/creates a RadixOS Decision.

**LINT-BND-02 (BLOCKER) — No signal/alert/inference emission claims**
**Check:** do not frame narrative as producing “signals”, “alerts”, “risk flags” unless explicitly part of a defined signaling system (and even then: uncertainty bounded, evidence-first).

**LINT-BND-03 (BLOCKER) — No enforcement claims (Custos boundary)**
**Check:** explainability artifacts must not claim controls were enforced or actions were compelled by the artifact.

**LINT-BND-04 (BLOCKER) — No blended artifact (context + decision + signal)**
**Check:** single artifact must not mix: (a) evidence/context summary, (b) decision record, (c) operational signal.

**LINT-BND-05 (WARN) — Dual-Spine invariant statement on high-sensitivity artifacts**
**Check:** for governance-heavy docs: include a simple invariant line (e.g., “Solum explains; RadixOS decides.”) without implying automation.

---

### 2.4 Solum-Powered Lens Rules

**LINT-SOL-01 (BLOCKER) — Evidence-first, not advice-first**
**Check:** summaries must focus on “why surfaced” and evidence, not “what to do”.

**LINT-SOL-02 (BLOCKER) — No fiduciary / buy-sell framing**
**Check:** disallow “buy/sell/hold”, “financial advice”, “fiduciary”, “guaranteed return”, “risk-free”.

**LINT-SOL-03 (WARN → BLOCKER if claims exist) — Citations / provenance required**
**Check:** if the artifact makes claims, it must include evidence trail / provenance boundaries.

**LINT-SOL-04 (WARN) — Uncertainty bounded**
**Check:** include confidence/limits: “unknown”, “insufficient data”, “cannot be determined from provided inputs.”

**LINT-SOL-05 (BLOCKER) — No “Solum knows/decides/confirms”**
**Check:** disallow anthropomorphic certainty: “Solum knows”, “Solum confirms”, “Solum verified correctness”.

---

### 2.5 Entity & Taxonomy Guardrail Rules (Prompt/Artifacts)

**LINT-ENT-01 (BLOCKER) — Typed entities required when enumerating actors/objects**
**Check:** when listing entities in prompts or governance artifacts, each entity must carry a type from the EntityType canon (company, ticker, repo, service, endpoint, feature, person, regulation, document, dataset, other).
**Fail condition:** untyped entities or dual-typed entities. (Matches the “Auto-Reject” posture.)

---

## 3) PR Checklist Items (Hard Gate)

These checklist items must appear in the PR template (or equivalent PR description) when the change touches an Explainability Surface.

### 3.1 Required (BLOCKER if missing)

* [ ] **PEC alignment:** I reviewed PEC-0.7 sections A–I relevant to this change.
* [ ] **Language posture:** No guarantees, no authority leakage, no prescriptive directives in explainability output.
* [ ] **Temporal scoping present:** Statements are time-bounded (“during this review…”, “as observed…”).
* [ ] **Disclosures present:** Scope + non-decision/non-approval disclaimer included.
* [ ] **Boundary integrity:** No blending of context + decision + signal; no implied RadixOS Decision emission; no Custos enforcement claims.
* [ ] **Solum lens (if applicable):** Evidence-first; uncertainty bounded; provenance/citations included where claims exist.
* [ ] **Human ownership:** Where outcomes are mentioned, human handoff is explicit.
* [ ] **No secrets / no PII:** Confirmed.
* [ ] **Verification steps included:** How you checked the guardrails (lint job, manual review, etc.).

### 3.2 Required When Applicable (BLOCKER if applicable but missing)

* [ ] **Entity typing:** Entities enumerated are typed using the EntityType canon.
* [ ] **Routes/docs updated:** If public-facing routes or surfaces changed, route map updated (repo-standard).

### 3.3 Allowed Status Outcomes (must be declared)

* [ ] **PASS — Cleared for merge / launch**
* [ ] **BLOCKED — Language or boundary violation detected**
* [ ] **DEFERRED — Non-blocking issues logged with owner + rationale + follow-up WorkItem**

---

## 4) Red-Flag Language Patterns (Detectable)

These are **pattern triggers** for linting and PR review. They are intentionally conservative.

### 4.1 Authority Leakage (BLOCKER triggers)

* “approved”, “certified”, “authorized”, “cleared”, “endorsed”
* “this approves…”, “this authorizes…”, “this certifies…”
* “official”, “regulator-approved”, “compliance confirmed”

### 4.2 Guarantees / Certainty / Permanence (BLOCKER triggers)

* “guarantees”, “will ensure”, “ensures”, “prevents”, “eliminates”, “cannot fail”
* “always”, “never”, “definitely”, “proves”, “100%”

### 4.3 Prescriptive / Directive Framing (BLOCKER triggers in explainability surfaces)

* “should”, “must”, “recommended”, “need to”, “required to”
* “we advise”, “do not do X”, “take action”, “proceed with”

### 4.4 Governance / Legal / Regulatory Claims (BLOCKER triggers)

* “compliant with”, “meets regulatory requirements”, “legally compliant”
* “fiduciary”, “duty of care”, “legal guarantee”, “regulatory safe”

### 4.5 Solum Acting Decisional (BLOCKER triggers)

* “Solum decides”, “Solum confirms”, “Solum verifies correctness”
* “Solum recommends”, “Solum says you should…”
* “Solum flagged as a decision”

### 4.6 Hidden Directives in Conclusions (BLOCKER triggers)

* “therefore you should…”, “the next step is to…”, “do X immediately…”
* “we conclude you must…”

---

## 5) Safe Language Allowlist (Preferred)

These phrases are recommended for explainability surfaces:

* “as observed during this review…”
* “based on the provided inputs…”
* “within the scope defined above…”
* “identified during review; not a decision or approval…”
* “supports use **pending human approval**…”
* “evidence suggests…”
* “uncertainty remains due to…”
* “out of scope: downstream implementation choices…”

---

## 6) Deferrals, Exceptions, and Enforcement

### 6.1 Deferrals

Allowed only when **non-blocking**, and must include:

* **Owner**
* **Rationale**
* **New WorkItem link/reference**
* **Timebox / cadence target** (e.g., next weekly review)

### 6.2 Exceptions

Exceptions are treated as **Decisions** (human-owned) and must be recorded as such (not embedded in the artifact). An exception is not a wording trick; it’s a governance action.

### 6.3 Incident Rule

If a **BLOCKER** ships to users, file an **Incident** and include:

* what shipped
* impact surface
* root cause (why lint/gate didn’t catch)
* preventive action (new lint rule, PR checklist update, training)

---

## 7) Minimal “Explainability Surface Footer” (Reusable)

Any high-sensitivity explainability artifact should include a short footer:

> **Scope & Limits:** This artifact summarizes observations within the scope described above, for the time window reviewed.
> **Non-Authority:** This is not a decision, approval, certification, or enforcement action.
> **Human Ownership:** Any outcomes or next steps require designated human review and the appropriate RadixOS decision process.

---

# Execution Plan to Make This “Executable” in Repo (Implementation-Agnostic)

Below is a repo-safe plan **without assuming paths or tooling specifics beyond existing DH contracts**.

## 1) Branch Setup

```bash
git checkout main
git pull
git checkout -b chore/igr-0.7-guardrails-gate
```

## 2) Implementation Steps

1. Add **IGR-0.7** as a versioned governance artifact in the repo docs (where governance standards live).
2. Update PR template(s) to include the **PR Checklist Items** above for explainability-touch changes.
3. Add a CI job that runs a **content guardrail scanner** over relevant artifacts (markdown, mdx, prompts, UI copy, release notes).
4. Configure the scanner to:

   * fail CI on **BLOCKER** patterns
   * warn on **WARN** patterns
   * require the disclosure footer when files are classified as Explainability Surfaces
5. Add a lightweight “classification mechanism” that is content-only (e.g., frontmatter tag or header marker like `Guardrail-Scope: ExplainabilitySurface`) so enforcement is deterministic and auditable.

> Path safety note: I’m not naming exact file paths here because we must not invent repo paths. If you want me to turn this into actual files + CI config, paste the target directory tree (or point me to the existing docs + PR template locations).

## 3) Local Check

```bash
pnpm -v
pnpm install
pnpm -r test || true
```

(Then run the content scanner locally if implemented.)

## 4) Git Workflow

```bash
git status
git add -A
git commit -m "chore(guardrails): add IGR-0.7 enforcement ruleset"
git push -u origin chore/igr-0.7-guardrails-gate
```

## 5) GitHub PR

**PR Title:** `chore(guardrails): lock IGR-0.7 enforcement ruleset`
**PR Description (paste-ready):**

* Adds the Implementation Guardrail Ruleset (IGR-0.7) derived from PEC-0.7
* Establishes enforceable language + boundary constraints for explainability surfaces
* Introduces PR checklist requirements for governance/explainability-touch changes
* Verification: reviewed against PEC-0.7; no secrets/PII included

**Post-deploy / verification comment template:**

* Deployed/merged guardrail updates verified (CI green)
* Confirmed PR template contains IGR-0.7 checklist
* Confirmed guardrail scanner blocks BLOCKER patterns

## 6) Cleanup / Close-Out

```bash
# after merge
git checkout main
git pull
git branch -d chore/igr-0.7-guardrails-gate
git push origin --delete chore/igr-0.7-guardrails-gate
```

---

[CSUITE_UPDATE]
Engineering Risks:

* **Removed:** reduces risk of authority leakage shipping via copy/prompt/docs by making violations mechanically detectable.
* **Introduced:** potential “false positive” friction if pattern list is too aggressive; mitigate via WARN vs BLOCKER tiers and explicit classification.

System Changes:

* Governance & Guardrails Standard becomes enforceable via CI + PR gate, not just policy text.
* Establishes deterministic “Explainability Surface” classification + required disclosure footer.

Dependencies:

* PR templates + CI pipeline integration.
* Optional: shared content-scanner package if multiple apps share governance surfaces.

Required Decisions:

* Owner decision to adopt IGR-0.7 as a **hard gate** for any Solum/RadixOS/Governance-touch PRs.
* Decide where “Explainability Surface classification” lives (frontmatter tag vs file convention) for auditability.

Stability Notes:

* No runtime behavior required; enforcement is content + process level unless/until integrated into build gates.
  [/CSUITE_UPDATE]

---

**Citations (governance sources loaded in this workspace):**      

