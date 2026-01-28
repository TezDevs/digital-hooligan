# Shared Platform Primitives Spec v1.0 (FROZEN)

**Status:** FROZEN / v1.0  
**Effective:** 2026-01-27  
**Track Served:** Both  
**Scope:** Shared platform primitives enabling RadixOS + Solum without boundary collapse.

## Canonical Invariant

**context ≠ signal ≠ decision ≠ execution**  
Violations are design errors.

## Non-Negotiable Rules (Fail Closed)

1. **No primitive may silently assume authority.**
   - All operations MUST require an explicit `AuthorityContext`.
   - No defaults for `workspaceId`, actor, environment, appId, version, requestId, traceId, dataClass.

2. **Workspace isolation is default-deny.**
   - Cross-workspace reads/writes MUST be denied by default.

3. **Primitives are meaning-free infrastructure.**
   - No severity/priority inference.
   - No recommendations, approvals, decisions, or workflow semantics.

4. **Context packaging and retrieval is Pondus-owned.**
   - Shared primitives may define interfaces/contracts.
   - Any implementation must traverse the Pondus boundary (client API), never internal reach-through.

5. **Auditable honesty.**
   - Partial failures must be visible.
   - No silent failure paths for audit emission.

## Primitive Set (v1.0)

1. Identity & Provenance
2. Entity Resolution
3. Event & Timeline
4. Evidence & Citation
5. Audit & Traceability
6. Context Packaging & Retrieval (Pondus boundary)
7. Explainability Surface
8. Alerting & Notification

## Prohibited Behaviors

- Inferring identity from payloads or paths
- Convenience merges in Entity Resolution
- Deleting or overwriting historical events/audit
- Storing secrets/PII/PHI in logs
- Primitive-level workflow semantics (approve/execute/decide)
- Any attempt to collapse ambiguity into certainty

## Enforcement

- Repo-level guardrail command:
  - `pnpm guardrails:shared-primitives`
- Boundary tests live in:
  - `packages/shared-platform-primitives/primitives_boundary_tests/*`

## Change Control

This document is frozen.
Changes require an explicit architecture decision and a version bump (v1.1+).
