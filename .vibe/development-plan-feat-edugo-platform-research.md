# Development Plan: edugo (feat/edugo-platform-research branch)

*Generated on 2026-09-23 by Vibe Feature MCP*
*Workflow: [greenfield](https://codemcp.github.io/workflows/workflows/greenfield)*

## Goal

Build the **infrastructure layer** that turns isolated educational micro-innovations into a coherent, trustworthy ecosystem — by mapping educational capabilities, ensuring lightweight quality standards, providing architecture guidelines for app builders, and making agentic creation ecosystem-connected. Delivered vaporware-first: a highly polished landing page, then frontend-only use cases on top of a GitHub-as-backend model.

---

## Key Decisions

### KD-01: Problem Anchor — PISA 2026 + Structural Failure (5 interlocking failures)
1. "What children need" changes faster than institutions track
2. Education depends on officially approved tools — slow pipeline
3. Public authorities move on 3–5 year cycles (Digitalpakt = €11.5B, mostly infrastructure)
4. Professional offerings are polished but passive and conservative
5. Engaged individuals innovate but are isolated — work doesn't accumulate
- **Decision**: edugo addresses all five. PISA 2026 is the narrative anchor; structural coordination is the actual problem.

### KD-02: Second-Order Problem — Software Islands Without Coordination
Cheap agentic engineering creates many micro-tools. Without coordination, these become disconnected islands whose capabilities can't be compared, whose quality can't be trusted, and that can't be extended. edugo's job is to prevent the island problem and build a coherent ecosystem instead.
- **Decision**: edugo actively shapes the ecosystem via a capability map, quality standards, and architecture guidelines — not just a passive registry.

### KD-03: Four Platform Jobs (not one)
1. **Map capabilities** — living map of what should exist, what does exist, what's missing
2. **Ensure essential quality** — lightweight standards (especially data safety) so data-sensitive users can trust community-built tools
3. **Provide architecture guidelines** — patterns and scaffolding so new apps feel coherent and connected
4. **Make agentic creation ecosystem-connected** — creation starts from a capability gap, uses edugo scaffolding, ends with a registry entry
- **Decision**: All four jobs are in scope. The capability map is the strategic core; the others derive from it.

### KD-04: Capability Map is the Strategic Core
The capability map answers: "What educational capabilities do we need, and which currently exist?"
- Nodes = discrete educational outcomes/activities
- Status per node = Needed / Partially covered / Well covered
- Linked solutions per node
- Gap view = nodes with no/poor coverage surfaced as build opportunities
- **Decision**: The capability map is the differentiator. It transforms edugo from a list into a strategy.

### KD-05: Frontend-Only = DSGVO-Safe by Design
An app with no backend has structurally no data exfiltration risk. edugo rewards this architecture with a visible "no backend — structurally DSGVO-safe" badge. This aligns product incentives with data safety: the easiest thing to build is also the safest thing.
- **Decision**: Frontend-only architecture is first-class in the quality model. edugo's own infrastructure (Phase 1) is itself frontend-only.

### KD-06: GitHub as Backend (Phase 1)
- No server, no database — all data in structured files in this repo
- Contribution = GitHub PR (naturally moderated, fully auditable, forkable)
- Platform deployable from GitHub Pages
- This models the exact architecture edugo recommends for apps
- **Decision**: GitHub is the sole backend for Phase 1. This is a feature, not a constraint.

### KD-07: Vaporware-First Delivery Strategy
- **Phase 0**: Highly polished landing page. Tells the story, shows the concept visually, collects interest signals. Build the pitch before the product.
- **Phase 1**: Frontend-only use cases on static infrastructure (capability map browse, registry view, client-side filter, GitHub PR contribution flow)
- **Decision**: Ship Phase 0 first. Validate interest before building infrastructure.

### KD-08: Active vs. Passive — Core Taxonomy
Five levels: Create / Solve / Collaborate / Reflect / Receive.
- **Decision**: Most prominent filter in discovery UI. First-class in data model.

### KD-09: Progressive Trust Model
Anecdotal → Community-validated → Research-backed. DSGVO shown honestly: green/amber/red/unknown. Frontend-only badge is automatic.
- **Decision**: No editorial gatekeeping at submission; trust accumulates through use and evidence.

### KD-10: Two Primary Users
1. **Contributor (Builder)** — wants their work to reach others and be built upon
2. **Adopter (Teacher)** — wants something safe, active-learning-focused, usable next Monday
- **Decision**: Every product decision evaluated against both simultaneously.

### KD-11: Open Questions
- Who defines initial capability map nodes? (Most politically sensitive design choice)
- Moderation at scale beyond a handful of PR reviewers?
- Should edugo eventually host frontend-only apps as GitHub Pages sub-paths?
- Sustainability: community organization model (like Serlo) needed eventually
- Landing page CTA: email (DSGVO overhead) vs. GitHub star (frictionless but lossy)?
- German-first content with English-native GitHub workflow — reconciliation?

---

## Notes
- The island problem is the new framing: cheap software creation without coordination = chaos. edugo coordinates.
- "Frontend-only = DSGVO-safe" is a product insight that aligns incentives: easiest to build = safest to trust
- GitHub-as-backend means the whole platform is itself a demonstration of the pattern it recommends
- Vaporware-first is smart product strategy: generate signal before spending engineering time
- PISA 2026 political moment gives a narrow window — the landing page should launch while the public discourse is alive

---

## Ideation
### Tasks
- [x] Created development plan file
- [x] Initiated greenfield workflow and Ideation phase
- [x] Set up docs (arc42 architecture, freestyle requirements, comprehensive design)
- [x] Research PISA 2026 findings for Germany
- [x] Analyse existing competing solutions and their gaps
- [x] Reframe: catalogue → coordination layer
- [x] Identify second-order problem: software islands without coordination
- [x] Define four platform jobs: map / quality / guidelines / creation
- [x] Define capability map as strategic core
- [x] Define frontend-only = DSGVO-safe as product insight
- [x] Define GitHub-as-backend for Phase 1
- [x] Define vaporware-first delivery strategy (Phase 0 = landing page)
- [x] Define Phase 1 use cases (static browse, filter, PR contribution)
- [x] Define active/passive taxonomy (5-level)
- [x] Define progressive trust model
- [x] Define two primary personas: Contributor and Adopter
- [x] Define scope per phase
- [x] Define success metrics per phase
- [x] Document all findings in requirements.md
- [x] Capture all key decisions in this plan

- [x] Write README.md — terse, engaging, explains vision and principles
- [x] Write docs/vision.md — full elaboration of roles, gaps, principles, delivery strategy

### Completed
- [x] All Ideation tasks completed (2026-09-23)

---

## Architecture
### Tasks
- [ ] *To be added when this phase becomes active*

### Completed
*None yet*

## Plan
### Tasks
- [ ] *To be added when this phase becomes active*

### Completed
*None yet*

## Code
### Tasks
- [ ] *To be added when this phase becomes active*

### Completed
*None yet*

## Finalize
### Tasks
- [ ] *To be added when this phase becomes active*

### Completed
*None yet*

---
*This plan is maintained by the LLM. Tool responses provide guidance on which section to focus on and what tasks to work on.*
