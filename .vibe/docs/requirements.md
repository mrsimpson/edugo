# Requirements — edugo

> **Status:** Active — Plan phase, 2026-09-23
> **Scope:** Essential platform features only — what must exist for edugo to be useful

---

## Problem in one sentence

Engaged educators and developers build good educational tools in isolation. Those tools are invisible, untrustworthy to cautious schools, and never built upon. The ecosystem does not accumulate.

---

## What edugo must do

### 1. Discoverability

A teacher looking for "something that makes students reason about evidence, safe for school, usable next week" must be able to find relevant tools quickly without knowing any taxonomy in advance.

A contributor looking to build something must be able to see where the gaps are — which learning outcomes have no good tools yet.

**The mechanism:** a structured, filterable index of learning outcomes (capability nodes) and tools (registry entries). Discovery works through faceted search, not hierarchical navigation.

Primary discovery path for a teacher: search or browse capability nodes → find a relevant outcome → see which tools address it → filter by DSGVO status. The capability node description — written in plain German — tells the teacher what students will be doing. No taxonomy knowledge required.

### 2. Trust signals

A teacher in a German school cannot simply try a random tool with students. They need to know: is it DSGVO-compliant?

**The signal that matters for Phase 1:**
- DSGVO status: `frontend-only` (no backend — structurally safe) / `claimed-safe` (contributor-asserted) / `unknown` (default)

The "no backend" signal is the most powerful: a tool with no server cannot exfiltrate student data. This structural guarantee is more honest than any claimed compliance.

Reviews, community validation, and evidence levels are **future capabilities** — intended direction, not Phase 1 scope.

### 3. Guidance for builders

A developer or teacher who wants to build a new educational tool must be able to:
- See which learning outcomes currently have no good tools (the gap view)
- Submit their tool to the registry via a structured but low-friction process (GitHub PR with a template)

Issue-to-PR automation for non-developers is a future increment.

### 4. Platform coherence

Tools in the registry feel like they belong to an ecosystem because they reference shared learning outcomes (capability nodes). The capability node is the connective tissue — it makes a random tool list into a map of what exists and what is missing.

---

## The capability map — what it actually is

The capability map is a **structured wiki of learning outcomes**. Each entry is:
- A human-readable article in German: what students learn to do, why it matters, an example scenario
- Tagged with `kmk-domains` for institutional navigation (optional, maintained by maintainers)
- Given a coverage status: `needed` / `partial` / `well-covered`
- Linked to registry entries (tools that address this outcome)

It is **not a hierarchy**. Outcomes span subjects and domains. The organizing principle is the outcome description itself. Different users navigate different projections:
- The **Contributor** sees the gap view: outcomes marked `needed` with no entries
- The **Teacher** browses outcomes by description and clicks through to tools
- The **Navigator / institutional stakeholder** filters by KMK domain (future feature — see below)

### Seed approach

6–10 real learning outcomes derived from tools that actually exist in the community. Not a complete KMK taxonomy dump. All seeded at `status: needed` so the gap view is meaningful from day one.

---

## Registry entries — what they actually are

A registry entry is a **structured wiki article about a tool**. It contains:
- A German description and ideally one classroom scenario (Unterrichtsidee) in the Markdown body
- A `teaser` — one German sentence visible on the discovery card, the hook that makes a teacher click
- Structured metadata: which capability nodes it addresses, DSGVO status, optional source URL

**Minimum required to be listed:** `id` + `title` + at least one `capabilities` reference. That's it. DSGVO defaults to `unknown`. Everything else is optional enrichment.

---

## Schema extensibility

The data schema is designed to evolve without breaking existing entries:
- All fields beyond the 3-field minimum are optional
- Extension fields prefixed with `x-` are always allowed and ignored by the platform — contributors can experiment with new fields without schema changes
- New core fields are always additive (optional); removing a required field is a breaking change requiring a migration
- Taxonomies are YAML files, not hardcoded enums — adding a vocabulary value never requires a schema change

---

## Future capabilities (not Phase 1 scope)

These are explicitly named as intended future direction:

**KMK-based institutional navigation:** capability nodes will carry `kmk-domains` tags (the 6 KMK Kompetenzrahmen domains) maintained by platform maintainers — not contributed per entry. This enables school directors, coordinators, and Schulaufsicht to navigate by the official framework. KMK sub-competency level detail (~40 sub-competencies) is an additional future refinement once the Navigator persona is actively using the platform.

**Community validation and reviews:** "I tried this in my classroom" signals, evidence level progression (anecdotal → community-validated → research-backed). Deferred until there is an active community to generate the signals.

**Issue-to-PR contribution flow:** a GitHub Issue form that auto-generates a draft PR, lowering the contribution barrier for non-developers.

**Active/passive classification:** a taxonomy for what kind of student engagement a tool produces (Create / Solve / Collaborate / Receive). Deferred — the capability node description already conveys this implicitly. Add as an explicit field when filtering by engagement type becomes a real user need.

---

## What is explicitly out of scope

- User accounts or authentication of any kind
- Server-side processing or databases
- Official tool certification or endorsement
- Hosting student data
- Replacing LMS infrastructure

---

## Success criteria for Phase 1

- A contributor can add a real tool to the registry via GitHub PR in under 20 minutes
- A teacher can find tools by browsing capability outcomes without reading documentation
- The gap view shows at least 5 real capability outcomes with no registry entries — genuine build opportunities
- Zero external network requests in the built output (DSGVO-clean by inspection)
