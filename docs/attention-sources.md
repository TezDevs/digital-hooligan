# Attention → Sources
Digital Hooligan LLC

## Purpose

This document defines the **approved source types** used to earn attention,
trust, and credibility for Digital Hooligan content.

Sources are not citations for their own sake.
They are **signals of real-world competence**.

If a source does not increase trust with a technical buyer,
it does not belong here.

---

## Source Hierarchy (Highest → Lowest Trust)

### 1. Primary Sources (Highest Trust)

These come directly from work performed by Digital Hooligan.

Examples:
- Internal builds (apps, dashboards, APIs, embedded prototypes)
- Architecture decisions and tradeoffs
- Failure modes, bugs, and fixes
- Metrics, benchmarks, and before/after results
- Postmortems and lessons learned

Usage:
- Preferred backbone of all content
- Must be explained in plain language
- Screenshots, diagrams, or code excerpts allowed

Rule:
If a piece of content has no primary source, it must justify why.

---

### 2. Practitioner Documentation

Official documentation used by people who actually ship systems.

Examples:
- Platform or vendor documentation
- SDK / API references
- Hardware datasheets and specs
- RFCs, standards, and protocol definitions

Usage:
- Used to support or validate a design choice
- Never quoted blindly
- Always contextualized with “why this matters in practice”

Rule:
Documentation is evidence, not authority by itself.

---

### 3. Industry Signal & Shared Reality

Widely accepted practices that define the current technical landscape.

Examples:
- Incident response frameworks
- Reliability and observability patterns
- Security baselines
- Common deployment or architecture models

Usage:
- Used to orient the reader
- Helps establish shared mental models
- Not used as justification for shallow conclusions

Rule:
If it’s controversial, say so.
If it’s outdated, say so.

---

### 4. Inspiration & Secondary Commentary (Lowest Trust)

Used sparingly and never as a foundation.

Examples:
- Blog posts
- Talks
- Opinion pieces
- Community discussions

Usage:
- Framing, contrast, or narrative support
- Never the primary justification
- Must be clearly labeled as opinion or inspiration

Rule:
If removed, the content should still stand.

---

## Explicitly Disallowed Sources

The following are not valid foundations for Digital Hooligan content:

- SEO listicles
- Beginner tutorials without original insight
- Influencer summaries without firsthand experience
- Rewritten documentation with no added value

These may be referenced only to critique or contrast.

---

## Source Reuse Strategy

Sources should be reusable across formats:

- Blog posts
- Docs
- Internal demos
- Talks / presentations
- Sales or capability discussions

Each source should answer at least one:
- What broke?
- What changed?
- Why this decision?
- What tradeoff was accepted?
- What would we do differently next time?

---

## Quality Gate

Before publishing any “Attention” content, verify:

- At least one Primary or Practitioner source is present
- All sources are current and relevant
- No source exists purely for credibility theater
- The content would still be valuable without external links

If this gate fails, the content does not ship.

---

## Status

Locked as the authoritative source policy
for the Attention phase.