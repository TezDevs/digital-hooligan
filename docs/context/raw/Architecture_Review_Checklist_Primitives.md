# Architecture Review Checklist — Shared Platform Primitives

**Purpose:** Enforce the shared primitives boundaries during review.  
**Track Served:** Both  
**Applies To:** Any change touching shared primitives, consumers, or boundary adapters.

---

## Required Checks (Must Pass)

### CI / Repo Guardrails

- [ ] `pnpm guardrails:shared-primitives` passes locally and in CI.
- [ ] No new top-level `shared/` or `primitives_boundary_tests/` directories created.

### Shared Primitives Package

- [ ] `pnpm -C packages/shared-platform-primitives run build`
- [ ] `pnpm -C packages/shared-platform-primitives run typecheck:tests`
- [ ] `pnpm -C packages/shared-platform-primitives run test`

### Consumer Packages (Radix + Others)

- [ ] Consumer uses an explicit `AuthorityContext` edge builder.
- [ ] Consumer includes compile-time boundary proofs (`@ts-expect-error`) that:
  - missing authority fields do not compile
  - primitives cannot be invoked without authority context

---

## Boundary Assertions (Must Be True)

### Authority

- [ ] No primitive applies defaults for authority fields (fail-closed only).
- [ ] No primitive encodes workflow semantics or authority (no recommendations, approvals, or decisions).

### Context (Pondus)

- [ ] Context retrieval/packaging crosses a Pondus boundary (client/interface).
- [ ] No consumer stores context locally as “truth”; context is retrieved, not prescriptive.

### Audit & Logs

- [ ] Audit is append-only (no overwrite/delete).
- [ ] No secrets/PII/PHI in logs, errors, traces, or audit events.

### Entity Resolution

- [ ] No “convenience merges”; contested ambiguity remains contested.
- [ ] Time-ranged alias mappings are preserved.

---

## Reviewer Notes (What to flag immediately)

- Any use of fields like `"severity"`, `"priority"`, `"decision"`, `"execute"`, `"approve"`, `"recommend"` in primitives/boundary layers
- Any cross-workspace access not explicitly denied by default
- Any attempt to hide partial failures or “best-effort” without disclosure
