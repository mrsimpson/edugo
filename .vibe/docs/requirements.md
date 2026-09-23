# Requirements — edugo

> **Status:** Active — Plan phase, 2026-09-23
> **Replaces:** the earlier verbose ideation-phase requirements document
> **Scope:** Essential platform features only — what must exist for edugo to be useful

---

## Problem in one sentence

Engaged educators and developers build good educational tools in isolation. Those tools are invisible, untrustworthy to cautious schools, and never built upon. The ecosystem does not accumulate.

---

## What edugo must do

### 1. Discoverability

A teacher looking for "something that makes students reason about evidence, safe for school, usable next week" must be able to find relevant tools quickly without knowing any taxonomy in advance.

A contributor looking to build something must be able to see where the gaps are — which learning outcomes have no good tools yet.

**The mechanism:** a structured, filterable index of learning outcomes (capability nodes) and tools (registry entries). Discovery works through faceted search, not hierarchical navigation. The facets that matter:
- What cognitive outcome does this address? (the capability node)
- How active is the student experience? (Create / Solve / Collaborate / Reflect / Receive)
- Is it safe for school use? (DSGVO status)
- What age range is it for?
- What subject area does it fit?
- What KMK competency domain does it align to? (for institutional justification)

### 2. Trust signals

A teacher in a German school cannot simply try a random tool with students. They need to know: is it DSGVO-compliant? Has anyone else used it in a classroom? Is it maintained?

Trust signals must be honest, specific, and non-bureaucratic. They are derived from structured metadata, not editorial committees.

**The signals that matter for Phase 1:**
- DSGVO status: green (no backend — structurally safe) / amber (claimed compliant, unverified) / unknown
- Evidence level: anecdotal (contributor says it works) / community-validated (others have tried it) 
- Active/passive classification: how much agency does the student have?

Reviews and community validation are a **future capability** — noted here as intended direction, not Phase 1 scope.

### 3. Guidance for builders

A developer or teacher who wants to build a new educational tool must be able to:
- See which learning outcomes currently have no good tools (the gap view)
- Understand what makes a tool trustworthy and ecosystem-connected (architecture guidelines)
- Submit their tool to the registry via a structured but low-friction process

**Phase 1 contribution flow:** GitHub PR with a structured template. Non-developers are supported by clear documentation. Issue-to-PR automation is a future increment.

### 4. Platform coherence

Tools in the registry should feel like they belong to an ecosystem, not a random list. This requires:
- A shared vocabulary for learning outcomes (capability nodes) that contributors reference
- Clear architecture guidelines so tools built for edugo follow compatible patterns
- Fork lineage — when someone builds on an existing tool, that relationship is visible

---

## The capability map — what it actually is

The capability map is a **structured wiki of learning outcomes**. Each entry is:
- A human-readable article in German explaining the cognitive goal and why it matters
- Tagged with queryable facets: KMK domain alignment, subject areas, age range, active/passive type
- Linked to registry entries (tools that address this outcome)
- Given a coverage status: `needed` (no good tools exist), `partial` (something exists but gaps remain), `well-covered`

It is **not a hierarchy**. Apps touch multiple outcomes; outcomes span multiple subjects and domains. The structure is facets, not a tree. Different users navigate different projections of the same data:
- The **Contributor** sees the gap view: outcomes marked `needed` with zero entries
- The **Adopter** filters by subject, age range, and active/passive level
- The **Navigator** groups by KMK domain for institutional alignment

### Seed approach

The initial seed set should be 6–10 real, carefully chosen learning outcomes — not a complete taxonomy. They should come from the kinds of tools that already exist in the community (like the Yahtzee probabilistics app or the essay-comparison critical thinking app) so that real tools can be registered against real outcomes from day one.

---

## Registry entries — what they actually are

A registry entry is a **structured wiki article about a tool or approach**. It contains:
- A human-readable description and at least one classroom scenario (Unterrichtsidee)
- Structured metadata: capability nodes addressed, active/passive level, DSGVO status, age range, subject, cost, source URL
- Optional: fork lineage (forked-from), evidence links, architecture compliance flag

**Minimum required to be listed:** title + at least one capability node reference + active/passive classification. Everything else is optional but enriches discoverability and trust.

DSGVO status defaults to `unknown` if not provided — honest, not blocked.

---

## What is explicitly out of scope

- User accounts or authentication of any kind
- Server-side processing or databases
- Official tool certification or endorsement
- Hosting student data
- Replacing LMS infrastructure
- Real-time community features (deferred to future phase)
- Issue-to-PR automation for contributions (deferred to future phase)

---

## Success criteria for Phase 1

- A contributor can add a real tool to the registry via GitHub PR in under 20 minutes
- A teacher can find tools filtered by subject + age range + active/passive level without reading documentation
- The gap view shows at least 5 real capability outcomes with no registry entries — genuine build opportunities
- Zero external network requests in the built output (DSGVO-clean by inspection)
