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
- [x] Define GitHub Actions workflow structure (single deploy.yml, triggered on push to main)

### Implementation plan (for Code phase)

#### Files to create:
- `package.json` — scripts: `docs:dev`, `docs:build`, `docs:preview`; devDep: vitepress
- `docs/.vitepress/config.ts` — VitePress config: srcDir='..', base='/edugo/', nav+sidebar for README+vision
- `.github/workflows/deploy.yml` — build VitePress → dist/, arc42 build → dist/architecture/, deploy to gh-pages
- `.gitignore` — add dist/, node_modules/, docs/.vitepress/cache/

#### VitePress config key points:
- `srcDir: '..'` (relative to docs/.vitepress — resolves to repo root)
- `srcExclude: ['.vibe/**', 'docs/.vitepress/**', 'docs/arc42/**', 'node_modules/**', '.github/**']`
- `base: '/edugo/'`
- `cleanUrls: true`
- Nav: Home (/) → README.md, Vision (/docs/vision) → docs/vision.md, Architecture link → /edugo/architecture/
- Sidebar: Overview group with Home + Vision

#### arc42 build command:
```
arc42 --dir docs/arc42 build --out dist/architecture --base /edugo/architecture/
```

#### GitHub Actions deploy.yml structure:
```yaml
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write  # for peaceiris/actions-gh-pages
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run docs:build          # → dist/
      - run: npx arc42 --dir docs/arc42 build --out dist/architecture --base /edugo/architecture/
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: dist
```

### Completed
- [x] Plan defined (2026-09-23)

## Finalize
### Tasks
- [ ] *To be added when this phase becomes active*

### Completed
*None yet*

---
*This plan is maintained by the LLM. Tool responses provide guidance on which section to focus on and what tasks to work on.*
