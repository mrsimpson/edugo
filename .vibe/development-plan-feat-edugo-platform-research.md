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
- [x] Remove generated .vibe/docs/architecture.md — architecture will use arc42 CLI
- [x] Push all ideation artefacts to main

### Completed
- [x] All Ideation tasks completed (2026-09-23)

---

### KD-12: GitHub is Phase 1 Implementation of a Forge-Agnostic Pattern
GitHub chosen because it has the largest contributor community and lowest onboarding friction — reach is the primary constraint in Phase 1. The underlying pattern is "Git-hosting provider as backend", not "GitHub specifically". The data layer (YAML+MD files under `data/`) must contain zero GitHub-specific markup. All forge-specific implementation (Actions workflows, PR templates, CODEOWNERS) isolated under `.github/`. A future migration to GitLab, Gitea, Forgejo, or delta.dev requires rewriting `.github/` only — no data migration. Adapter layer for multi-forge support is a future option once contributor base is established.
- **Decision**: Forge-agnostic data layer; GitHub first for reach; migration path is rewrite of `.github/` only.

### KD-13: Technology Stack
- **Frontend framework**: Vue 3 — progressive enhancement compatible, composition API suits capability map filtering, same framework as VitePress
- **Toolchain**: Vite+ (`vp` CLI) — unified build/lint/format/test under one tool, Rolldown-powered fast builds
- **Styling**: UnoCSS with preset-wind4 — first-class Vite integration, generates only used CSS, Tailwind v4 compatible
- **Docs rendering**: VitePress — Vue-native, renders arc42 `.arc42.md` files as pages, deploys to static files
- **Deployment**: GitHub Pages — zero cost, consistent with GitHub-as-backend constraint

### KD-14: Repository Structure
- **Flat repo** (no monorepo packages in Phase 1): Vue app at root, VitePress docs under `docs/`, data under `data/`
- Monorepo can be introduced later if the capability map component needs to be published as a standalone npm package

### KD-15: Data Format
- **YAML frontmatter + Markdown body** for all capability nodes and registry entries
- **JSON Schema** files under `schemas/` define required structure
- **CI Action** validates every PR touching `data/` against schemas before merge (forge-agnostic tooling, adapter per forge)

### KD-16: VitePress + arc42 Coexistence
- arc42 source files (`.arc42.md`) live in `docs/arc42/`
- arc42 CLI used for authoring and validation (`arc42 validate`, `arc42 serve`)
- VitePress renders arc42 chapters as standard Markdown pages in the docs site
- VitePress deployed to `/docs/` on GitHub Pages; main Vue app deployed to `/`

### KD-17: Arc42 Validation Status (2026-09-23)
- 0 errors in model (3 E013 are arc42 CLI v0.0.10 + Node 24 DOMPurify bug — not our code)
- 2 warnings (W019/W020 — caused by E013 preventing flowchart diagram parsing — diagrams exist and are correct)
- 13 hints (all H014 "no implementation path" — expected pre-code; paths added as code is written)

## Architecture
### Tasks
- [x] Clarify monorepo vs flat structure decision
- [x] Decide data format for capability nodes and registry entries (YAML + MD + JSON Schema)
- [x] Decide VitePress + arc42 CLI coexistence model
- [x] Decide CSS strategy (UnoCSS)
- [x] Decide deployment target (GitHub Pages)
- [x] Author arc42 chapters 1-12 in docs/arc42/
- [x] Create architecture-evidence.md
- [x] Validate arc42 workspace (arc42 validate — 0 model errors)

### Completed
- [x] All Architecture tasks completed (2026-09-23)

## Plan
### Tasks
- [x] Define deployment target: GitHub Pages at https://mrsimpson.github.io/edugo/ — base path = /edugo/
- [x] Define VitePress scope: serves README.md + docs/vision.md from repo root (srcDir: '..')
- [x] Define arc42 build scope: arc42 build --dir docs/arc42 --out dist/architecture --base /edugo/architecture/
- [x] Define deploy merge: VitePress dist/ + arc42 dist/architecture/ → single GitHub Pages deploy root
- [x] Define GitHub Actions workflow structure — GitHub-native upload/deploy pages actions (no third-party)
- [x] Document design principles in .vibe/docs/design.md — data model, components, pipeline, naming, extension rules
- [x] Break down all Code phase work into milestones and tasks (see below)

### KD-18: GitHub Pages Deploy — Native Actions Only
Use `actions/configure-pages`, `actions/upload-pages-artifact`, and `actions/deploy-pages` (GitHub-native). No `peaceiris/actions-gh-pages` or other third-party deploy actions. Permissions: `pages: write` + `id-token: write` only. Node pinned to 22 (LTS) to avoid arc42 CLI / Node 24 DOMPurify incompatibility. `.nojekyll` file ensured by VitePress build step.

### KD-19: Capability Map is a Structured Wiki, Not a Taxonomy Tree
Capability nodes are flat, well-tagged articles about learning outcomes. No parent/child hierarchy — no placement decisions, no tree. The "map" is a queryable space of all capability articles. Different users navigate different projections: Contributor sees gap view (status: needed), Adopter filters by subject + age, Navigator groups by KMK domain. An app may address multiple outcomes; an outcome may align to multiple KMK domains and subjects. This is handled by multi-value facet fields, not by duplicating nodes in a tree.

Facets on a **capability node** (multi-value, all optional except id/title/status):
- `kmk-domains` — institutional alignment facet for Navigator navigation; does NOT impose structure
- Minimum required: `id`, `title`, `status`

Facets on a **registry entry** (all optional except the 4 required):
- Required: `id`, `title`, one `capabilities` reference, `active-passive`
- Optional: `dsgvo` (defaults to `unknown`; `frontend-only` is auto-trust), `subjects`, `min-age`/`max-age`, `teaser` (one German sentence visible on card — the discovery hook), `classroom-moment` (Einstieg/Erarbeitung/Sicherung/Differenzierung/Vertretungsstunde), `setup-time` (sofort/10-minuten/planung), `source-url`

Seed strategy: 6–10 real learning outcomes spanning at least 3 subjects, 2 age bands, 3 active/passive levels. Derived from real tool examples. Start with the Contributor persona — outcomes where real apps could immediately be registered.

### KD-20: Filter State in URL
All active filter state (kmk-domain, DSGVO status, gap-only toggle) is encoded as URL query parameters. Filtered views are bookmarkable and shareable. The gap view is a named filter preset (`?gap=true`), not a separate route. Filter composable reads from and writes to `useRoute()` / `useRouter()`.

### KD-24: Active/Passive Classification Deferred to Future Phase
Dropped as a required or optional schema field for Phase 1. The capability node description already conveys what students will be doing — a tool that claims to address "Students develop probabilistic intuition through simulation" is by definition active. Explicit active/passive classification adds contributor friction for marginal discovery gain in Phase 1. Added to requirements as a named future capability for when filtering by engagement type becomes a real user need.

### KD-25: Schema Extensibility via `x-` Prefix + Additive Evolution
All fields beyond the 3-field minimum (`id`, `title`, `capabilities`) are optional. Extension fields prefixed with `x-` are always permitted by the schema and ignored by the platform UI — contributors can experiment with new fields without schema changes or PRs to the schema. Graduation path: when an `x-` field proves broadly useful, a PR adds it as a named optional field. Schema files versioned in filename (`v1`, `v2`) — version bumps only for breaking changes (removal/rename of required fields). Additive changes never require a version bump.

### KD-26: KMK Tagging is Maintainer Work, Not Contributor Work
`kmk-domains` is an optional multi-value facet on capability nodes. It is populated by platform maintainers — not required from contributors. Contributors write a German outcome description; maintainers add the KMK alignment tags. This keeps contribution friction minimal while ensuring KMK accuracy. KMK sub-competency detail (~40 sub-competencies) is a future refinement targeting school directors and Schulaufsicht — added to requirements as a named future capability.

### Completed
- [x] Plan phase completed (2026-09-23)

### Completed
- [x] Plan phase completed (2026-09-23)

---

## Code
### Milestone M0: Deployment Pipeline (do first — gets something live immediately)
*Acceptance: a push to main triggers a workflow; https://mrsimpson.github.io/edugo/ serves the VitePress docs site; /architecture/ serves the arc42 site.*

- [ ] **M0-1** Create `package.json` with scripts `docs:dev`, `docs:build`, `docs:preview`; devDep: `vitepress@latest`
- [ ] **M0-2** Create `docs/.vitepress/config.ts`:
  - `srcDir: '..'`, `base: '/edugo/'`, `cleanUrls: true`
  - `srcExclude: ['.vibe/**', 'docs/.vitepress/**', 'docs/arc42/**', 'node_modules/**', '.github/**']`
  - `rewrites: { 'README.md': 'index.md' }` (treats README.md as the home page)
  - Nav: Home `/`, Vision `/docs/vision`, Architecture (external link `/edugo/architecture/`)
  - Sidebar: Overview → Home + Vision
  - socialLinks: GitHub repo link
- [ ] **M0-3** Create `.gitignore`: dist/, node_modules/, docs/.vitepress/cache/, docs/.vitepress/dist/
- [ ] **M0-4** Create `.github/workflows/deploy.yml`:
  - Trigger: `push: branches: [main]`
  - Permissions: `pages: write`, `id-token: write`
  - Node 22 (pinned — arc42 CLI / Node 24 DOMPurify bug)
  - Steps: checkout → setup-node (cache: npm) → npm ci → npm run docs:build → arc42 build into dist/architecture → actions/configure-pages → actions/upload-pages-artifact (path: dist) → actions/deploy-pages
- [ ] **M0-5** Enable GitHub Pages in repo settings (source: GitHub Actions) and verify deploy
- [ ] **M0-6** Smoke test: verify `/edugo/`, `/edugo/docs/vision`, `/edugo/architecture/` all load correctly

### Milestone M1: Data Foundations
*Acceptance: `data/` directory structure exists with schemas and seed data; schema validation CI workflow passes on a correct PR and fails on a malformed PR; a contributor can understand what to submit by reading `docs/contributing.md`.*

#### Taxonomies (controlled vocabularies — flat YAML files)
- [ ] **M1-1** Create `data/taxonomies/dsgvo-status.yaml` — 3 values: `frontend-only` (no backend, structurally safe), `claimed-safe` (contributor-asserted), `unknown` (default); German labels + one-line explanation of what each means in practice
- [ ] **M1-2** Create `data/taxonomies/kmk-domains.yaml` — 6 KMK Kompetenzrahmen domains; each with `id` (slug), `number` (1–6), `title` (full German), `short` (one-word German label for UI chips)

#### Schemas (JSON Schema v1 — validate YAML frontmatter on PR)
- [ ] **M1-3** Create `schemas/capability-node.v1.schema.json`:
  - Required: `id` (slug pattern), `title` (non-empty German string), `status` (enum: `needed`/`partial`/`well-covered`)
  - Optional: `kmk-domains` (array of kmk-domain ids — maintainer-populated, not required from contributors)
  - Extension: `patternProperties: { "^x-": {} }` + `additionalProperties: false` for all other fields
- [ ] **M1-4** Create `schemas/registry-entry.v1.schema.json`:
  - Required: `id` (slug pattern), `title` (non-empty string), `capabilities` (array, minItems: 1, items reference capability node ids)
  - Optional: `dsgvo` (enum from dsgvo-status vocabulary, defaults to `unknown`), `teaser` (string, max 200 chars), `source-url` (URI format)
  - Extension: `patternProperties: { "^x-": {} }` + `additionalProperties: false` for all other fields
  - No `active-passive` field — deferred; capability node description conveys student engagement implicitly

#### Seed data (spanning 3 subjects, 2 age bands, varied cognitive types)
- [ ] **M1-5** Create 6–8 capability node files under `data/capabilities/` — derive from real tool examples (argument evaluation, probabilistic reasoning via simulation, collaborative text production, peer feedback, computational thinking, media production). German titles, rich Markdown bodies explaining what students learn and why it matters. Required fields only (`id`, `title`, `status: needed`). `kmk-domains` tags added by maintainer after creation.
- [ ] **M1-6** Create 2 illustrative registry entry files under `data/entries/` as contributor reference examples — the essay-comparison critical thinking app and the Yahtzee probabilistics app, described as realistic entries with `teaser` and `source-url` filled in. Markdown body includes a classroom scenario.

#### CI validation and contribution flow
- [ ] **M1-7** Create `.github/workflows/validate-data.yml` — triggers on PRs touching `data/**`; uses `ajv-cli` with `--spec draft2020` to validate changed files against their schema (detected by path: `data/capabilities/` → capability-node schema, `data/entries/` → registry-entry schema); fails PR with readable error output; runs without Pages permissions
- [ ] **M1-8** Write `docs/contributing.md` — guide for adding a capability node or registry entry via GitHub web UI; minimum fields explained clearly; `teaser` field highlighted as the most important optional field; `x-` extension convention explained; explicitly states "your first submission doesn't need to be complete — we'll help fill in the gaps"
- [ ] **M1-9** Create `.github/PULL_REQUEST_TEMPLATE/capability-node.md` — checklist: title is German, status is `needed`, Markdown body explains the outcome with the "2–5 tools" litmus test
- [ ] **M1-10** Create `.github/PULL_REQUEST_TEMPLATE/registry-entry.md` — checklist: capabilities array references at least one existing node ID, teaser is one German sentence, DSGVO field is set if known, Markdown body includes a classroom scenario

### Milestone M2: Capability Map UI
*Acceptance: `/edugo/map` renders capability nodes from data files; KMK domain filter and gap toggle work client-side via URL params; a node detail page shows linked registry entries and a "build this" CTA for gap nodes.*

- [ ] **M2-1** Scaffold Vue 3 app at repo root: `src/main.ts`, `src/App.vue`, Vue Router config
- [ ] **M2-2** Configure Vite with UnoCSS (preset-wind4) and `import.meta.glob` for loading `data/` files at build time
- [ ] **M2-3** Implement composable `useCapabilityNodes()` — loads and parses all `data/capabilities/*.md`; exposes flat array of nodes with parsed frontmatter; no graph assembly needed
- [ ] **M2-4** Implement composable `useTaxonomies()` — loads all `data/taxonomies/*.yaml`; exposes vocabulary maps keyed by taxonomy id for use in filter components and badge renderers
- [ ] **M2-5** Implement composable `useCapabilityMapFilters()` — reads/writes URL query params; filter dimensions: `kmk` (multi-value), `gap` (boolean preset for status: needed/partial); exposes filtered node list
- [ ] **M2-6** Create `CapabilityNodeCard.vue` — title, status badge (needed=red/partial=amber/well-covered=green), KMK domain chips, linked entry count; 3-second scannable layout
- [ ] **M2-7** Create `CapabilityMapFilterPanel.vue` — KMK domain checkboxes with result counts, gap toggle; writes to URL params; shows how many nodes match each filter value
- [ ] **M2-8** Create `CapabilityMapView.vue` (route `/map`) — filterable grid of CapabilityNodeCards; gap preset as default for Contributor entry point; full view for Adopter/Navigator entry point
- [ ] **M2-9** Create `CapabilityNodeDetailView.vue` (route `/map/:id`) — full Markdown body rendered, KMK domain tags displayed, linked registry entries listed as entry cards, "build this" CTA for gap nodes that pre-selects the node in contribution flow
- [ ] **M2-10** Wire Vue Router: `/` → (VitePress home), `/map` → CapabilityMapView, `/map/:id` → CapabilityNodeDetailView, `/registry` → (stub for M3)
- [ ] **M2-11** Accessibility: keyboard navigation for filter panel; aria-labels on status badges; result count announced to screen readers on filter change

### Milestone M3: Solution Registry UI
*Acceptance: `/edugo/registry` renders registry entries from data files; filters (subject, age, active/passive, DSGVO, classroom-moment) work client-side via URL params; DSGVO trust badges display correctly; the teaser is visible on the card; contribution CTA opens a pre-filled GitHub PR.*

- [ ] **M3-1** Implement composable `useRegistryEntries()` — loads and parses all `data/entries/*.md`; exposes flat array of entries with parsed frontmatter; cross-references capability node titles for display
- [ ] **M3-2** Implement composable `useTrustSignals(entry)` — computes DSGVO badge: `frontend-only` → green structural badge; `claimed-safe` → amber self-declared badge; `unknown` → grey; no other trust signals in Phase 1
- [ ] **M3-3** Implement composable `useRegistryFilters()` — URL-encoded filter state for: `active-passive` (multi), `dsgvo` (multi), `subject` (multi), `min-age`/`max-age` (range), `classroom-moment` (multi); shows result counts per filter value to prevent dead-end filtering
- [ ] **M3-4** Create `DsgvoBadge.vue` — renders the DSGVO trust signal (icon + label + tooltip explaining what it means); the primary trust signal in Phase 1
- [ ] **M3-5** Create `ActivePassiveBadge.vue` — renders the active/passive classification with color and German label
- [ ] **M3-6** Create `RegistryEntryCard.vue` — **recipe-card layout**: title, `teaser` (one German sentence — the hook, prominently displayed), active/passive badge, DSGVO badge, subject chips; 3-second scannable; no click needed to decide if worth exploring
- [ ] **M3-7** Create `RegistryFilterPanel.vue` — active/passive checkboxes, subject filter, DSGVO filter, age range, classroom-moment filter; all with result counts; writes to URL params
- [ ] **M3-8** Create `RegistryView.vue` (route `/registry`) — grid of RegistryEntryCards with FilterPanel; empty state with prominent contribution CTA; "show similar" links between entries sharing a capability node
- [ ] **M3-9** Create `RegistryEntryDetailView.vue` (route `/registry/:id`) — full Markdown body rendered, all metadata fields displayed, DSGVO badge explained, capability node links, `source-url` CTA
- [ ] **M3-10** Implement contribution CTA: constructs a GitHub PR URL with pre-filled template params (capability node pre-selected if coming from node detail) and opens in new tab — no server call

### Milestone M4: Landing Page (Phase 0 polish)
*Acceptance: the home page (`/`) is a compelling, polished narrative page; it tells the problem/vision/mechanism story; it visually illustrates the capability map concept; it has a clear CTA; it is fast, accessible, and DSGVO-clean.*

- [ ] **M4-1** Design the narrative flow: problem section (PISA 2026) → gap section (isolation) → vision section (map + ecosystem) → how it works (capability map visual) → CTA
- [ ] **M4-2** Create illustrated capability map mockup (SVG or CSS-only — no external assets)
- [ ] **M4-3** Create illustrated registry entry mockup (static example card)
- [ ] **M4-4** Implement CTA: GitHub star link (frictionless, no DSGVO overhead) as primary; link to `/map` and `/registry` as secondary (once those milestones are complete)
- [ ] **M4-5** Performance: measure LCP on mobile; ensure < 1.5s; use VitePress SSG output to guarantee content visible without JS
- [ ] **M4-6** DSGVO audit: confirm zero external requests in built output (no CDN fonts, no analytics, no third-party scripts)
- [ ] **M4-7** Accessibility audit: WCAG 2.1 AA check; at minimum: contrast ratios, heading hierarchy, image alt text, keyboard navigation

### Completed
*None yet — planning complete, implementation not started*

## Finalize
### Tasks
- [ ] *To be added when this phase becomes active*

### Completed
*None yet*

---
*This plan is maintained by the LLM. Tool responses provide guidance on which section to focus on and what tasks to work on.*
