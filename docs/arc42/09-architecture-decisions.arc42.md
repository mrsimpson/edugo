# Architecture Decisions

<!--
Arc42 chapter 9. Significant architectural choices with rationale and rejected alternatives.
-->

## ADR-01: Git-hosting Provider as Backend — GitHub First, Provider-Agnostic Data Layer

**Context:** edugo needs persistent storage for capability nodes and registry entries, a
contribution workflow, CI/CD execution, and static site hosting. Options include a managed
database, a headless CMS, a serverless backend, or storing all data as files in a Git repository
hosted by a Git forge (GitHub, GitLab, Gitea, Forgejo, delta.dev, etc.).

**Decision:** All persistent data lives as structured files in a Git repository. Contributions
are submitted as pull/merge requests. Deployments are triggered by pushes to `main`. **GitHub
is the Phase 1 implementation** because it has the largest contributor community and the lowest
friction for first-time contributors. However, the data layer and content format must remain
forge-agnostic so the platform can be migrated to or replicated on any Git-hosting provider.

**Rationale — why Git forge over a server:** A server-side backend introduces operating cost,
a DSGVO data processing surface, a procurement barrier for forks, and operational complexity.
None of these are acceptable for a platform that must be zero-cost, fully forkable, and
DSGVO-clean by design. A Git forge also demonstrates the architecture pattern edugo recommends:
frontend-only, no persistent user data, forkable at zero cost.

**Rationale — why GitHub first:** GitHub has the largest developer community in the world and
the lowest barrier to first-time open-source contribution. Reach is the primary constraint in
Phase 1. GitLab has stronger institutional adoption in some European school systems but a
steeper onboarding curve for casual contributors. A future GitLab-first or multi-forge strategy
becomes viable once the contributor base is established.

**Forge-agnosticism rule:** No GitHub-specific markup, API references, or platform identifiers
may appear in the data files under `data/`. PR templates, GitHub Actions workflows, and
`CODEOWNERS` are forge-specific implementation details, isolated under `.github/`. A migration
to GitLab requires rewriting `.github/` → `.gitlab/` and CI workflow syntax — it does not
require touching any data file.

**Future path:** When multi-forge reach becomes a priority, a thin adapter layer can be
introduced to abstract the forge-specific contribution workflow (PR vs. MR, Actions vs.
GitLab CI) while keeping the data layer and frontend unchanged.

**Consequences:** Content is not real-time. Community validation is deferred to Phase 2.
Moderation is PR-based. The `.github/` directory is not portable but the rest of the repository
is forge-agnostic by design.

```arc42
:::decision
id: adr-01-github-backend
title: Git-hosting provider as backend — GitHub first, forge-agnostic data layer
status: accepted
date: 2026-09-23
addresses: con-no-server, con-github-backend, con-dsgvo, con-open-formats, qg-dsgvo-safety, qg-zero-server, qg-forkability, risk-github-lockin
:::
```

## ADR-02: Vue 3 + Vite+ as Frontend Stack

**Context:** The registry and capability map UI need a reactive component model for client-side
filtering, trust signal display, and gap view rendering. Options: Vue 3, React, Svelte, or
plain JavaScript with web components.

**Decision:** Vue 3 with Vite+ (`vp` CLI) as the unified toolchain.

**Rationale:** Vue 3's progressive enhancement model aligns with the WCAG and no-JS requirements:
the HTML is meaningful without JavaScript, and Vue enhances it. The composition API is well-suited
for the capability map's reactive filtering. Vite+ bundles Vite 8, Vitest, Oxlint, and Oxfmt
under one CLI — eliminating the toolchain maintenance overhead that would otherwise deter
open-source contributors. Vue is also the framework used by VitePress, which renders the docs
site, so there is a coherent single-framework codebase.

**Rejected alternatives:** React adds bundle overhead and requires more boilerplate. Svelte is
excellent but has a smaller contributor pool, increasing the bus-factor risk for a community
platform. Plain JS / web components has no component model overhead but makes the capability map
filtering logic significantly harder to maintain.

```arc42
:::decision
id: adr-02-vue-viteplus
title: Vue 3 + Vite+ as the frontend framework and toolchain
status: accepted
date: 2026-09-23
addresses: qg-contributor-friendliness, qg-performance-mobile, con-a11y
:::
```

## ADR-03: Flat Repository Structure (No Monorepo Packages)

**Context:** The platform has three distinct concerns: the Vue app (website + map + registry),
the VitePress docs site, and the data layer. These could be separated into monorepo packages
(pnpm workspaces + Turborepo) or kept in a single flat repo.

**Decision:** Flat repository structure. The Vue app lives at the repo root, VitePress docs
under `docs/`, and data under `data/`. No separate npm packages.

**Rationale:** In Phase 1, nothing needs to be independently deployable or published to npm.
A monorepo adds workspace configuration, inter-package dependency management, and CI complexity
without providing any benefit at this scale. The flat structure is simpler to fork, simpler to
contribute to, and simpler to understand. The decision can be revisited if the capability map
component needs to be published as a standalone package for use in builder blueprints.

**Rejected alternative:** pnpm workspaces with `packages/website`, `packages/docs`,
`packages/capability-map`. Rejected because it introduces accidental complexity before the
scale justifies it.

```arc42
:::decision
id: adr-03-flat-repo
title: Flat repository structure — no monorepo packages in Phase 1
status: accepted
date: 2026-09-23
addresses: qg-contributor-friendliness, qg-forkability, risk-moderation-scale
:::
```

## ADR-04: YAML Frontmatter + Markdown as Data Format

**Context:** Capability nodes and registry entries need a format that is human-editable, machine-
parseable, schema-validatable, and renderable as documentation.

**Decision:** YAML frontmatter (structured metadata) + Markdown body (rich description). JSON
Schema validates the YAML fields. The Markdown body is rendered by VitePress and the Vue app.

**Rationale:** YAML frontmatter is the established convention in static site ecosystems
(Jekyll, Hugo, Astro, VitePress). Contributors can edit files in the GitHub web UI without
cloning the repo. Markdown body gives descriptions the richness of headings, lists, and links
without requiring HTML. JSON Schema provides machine-enforceable contracts without requiring a
proprietary format or toolchain.

**Rejected alternatives:** Pure JSON — verbose, no Markdown body, harder to hand-edit. Pure
TOML — less known, fewer validators. A headless CMS — introduces a server and external
dependency.

```arc42
:::decision
id: adr-04-yaml-markdown
title: YAML frontmatter + Markdown body as the data format for all structured content
status: accepted
date: 2026-09-23
addresses: con-open-formats, qg-contributor-friendliness, con-github-backend, risk-github-lockin, risk-pisa-window
:::
```

## ADR-05: VitePress for Docs with arc42 CLI for Authoring

**Context:** Architecture documentation (arc42) and builder guidelines need to be written,
validated, and rendered. Options: render arc42 directly via `arc42 build`, use VitePress as
the rendering layer, or keep docs as plain Markdown in the repo.

**Decision:** VitePress renders all documentation including arc42 chapters. Arc42 CLI is used
for authoring, validation (`arc42 validate`), and local preview (`arc42 serve`). Arc42 source
files (`.arc42.md`) live in `docs/arc42/` and are included in the VitePress build as standard
Markdown pages.

**Rationale:** VitePress produces a polished, navigable docs site that integrates visually with
the rest of the edugo brand. Arc42 CLI provides structural validation that plain Markdown
rendering cannot. The two tools complement rather than compete: arc42 CLI enforces correctness,
VitePress enforces presentation. The `.arc42.md` extension is treated as Markdown by VitePress,
so no additional VitePress plugin is needed.

```arc42
:::decision
id: adr-05-vitepress-arc42
title: VitePress renders docs; arc42 CLI handles authoring and validation
status: accepted
date: 2026-09-23
addresses: qg-contributor-friendliness, con-github-pages, risk-vitepress-arc42-rendering
:::
```

## ADR-07: Vaporware-first — Landing Page Ships Before Registry Infrastructure

**Context:** The PISA 2026 political moment creates a narrow window. Building a full capability
map and registry before launching publicly risks missing the window. Shipping the registry without
a story risks shipping something nobody understands.

**Decision:** Phase 0 is a single polished landing page with no functional registry or map. It
tells the story, shows the concepts visually (illustrated/static), and collects interest signals.
No Phase 1 infrastructure is built until Phase 0 has shipped and generated signal.

**Rationale:** A landing page scoped to static HTML + Vue + UnoCSS can ship in days. The same
team time spent on registry infrastructure takes weeks. The PISA narrative is the platform's
best acquisition moment — it should not be wasted waiting for infrastructure.

**Consequences:** The platform is "vaporware" in Phase 0. This is intentional and transparent.
The landing page will say explicitly that the registry is "coming soon" to manage expectations.

```arc42
:::decision
id: adr-07-vaporware-first
title: Vaporware-first delivery — landing page before registry infrastructure
status: accepted
date: 2026-09-23
addresses: risk-pisa-window, risk-map-governance
:::
```

## ADR-06: UnoCSS for Styling

**Context:** The platform needs a CSS strategy that produces small bundles, supports utility-
first authoring, and integrates first-class with Vite.

**Decision:** UnoCSS with preset-wind4 (Tailwind v4 compatible utility classes).

**Rationale:** UnoCSS has native Vite integration via its Vite plugin. It generates only the
CSS actually used in the build — zero dead CSS in production. preset-wind4 provides full Tailwind
v4 class compatibility, so contributors familiar with Tailwind can contribute without learning a
new system. UnoCSS is faster than Tailwind's JIT at large scale and more flexible for custom
tokenization if the design system evolves.

```arc42
:::decision
id: adr-06-unocss
title: UnoCSS with preset-wind4 for styling
status: accepted
date: 2026-09-23
addresses: qg-performance-mobile, risk-mobile-perf-budget
:::
```
