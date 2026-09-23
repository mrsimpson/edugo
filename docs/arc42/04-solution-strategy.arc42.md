# Solution Strategy

<!--
Arc42 chapter 4. The coherent strategy that shapes the whole architecture.
-->

The architecture of edugo is shaped by one overriding insight: **the safest thing to build is
also the easiest thing to build**. A frontend-only app with no backend has no data exfiltration
surface. GitHub as a backend has no operating cost, no procurement barrier, and no DSGVO
complexity. The architecture rewards the correct behavior by making it the path of least
resistance — for edugo itself and for every app builder in the ecosystem.

```arc42
:::solution-strategy
id: strategy-static-github
title: Static-first, GitHub-as-backend, vaporware-before-infrastructure
addresses: qg-dsgvo-safety, qg-zero-server, qg-forkability, qg-contributor-friendliness
:::
```

## System Decomposition

The system is a single deployable unit: a flat repository that is both the data store and the
application source. There are no separately deployed services. Building blocks are logical
separations within the same codebase, not deployment units.

The four top-level building blocks correspond to the four platform jobs:

1. **Website / Landing Page** — the narrative surface; the Phase 0 deliverable; the entry point
   for all personas.
2. **Capability Map** — the strategic core; rendered from YAML+Markdown data files; shows what
   exists, what is missing, and what is worth building.
3. **Solution Registry** — the tool catalog; rendered from structured data files; filterable
   client-side; trust signals computed from file metadata.
4. **Architecture Guidelines & Docs** — VitePress-rendered documentation including the arc42
   architecture, contribution guidelines, and builder patterns.

A fifth building block, **Data Layer**, is not a deployable component but a structural
convention: all capability nodes and registry entries are stored as YAML-frontmatter Markdown
files under `data/`, validated by JSON Schema on every PR.

## Technology Approach

| Decision | Choice | Rationale |
|---|---|---|
| Frontend framework | Vue 3 | Progressive enhancement compatible; large contributor pool; composable for capability map UI |
| Toolchain | Vite+ (`vp` CLI) | Unified build, lint, format, test under one tool; Rolldown-powered fast builds; first-class Vue support |
| Styling | UnoCSS | First-class Vite integration; utility-first; smaller runtime than Tailwind; preset-wind4 for Tailwind v4 compat |
| Docs rendering | VitePress | Vue-native; excellent Markdown support; can import arc42 `.arc42.md` files as pages; deploys to static files |
| Data format | YAML frontmatter + Markdown body | Human-editable in GitHub UI; standard in static site ecosystems; validated by JSON Schema |
| Schema validation | JSON Schema + GitHub Action | Machine-enforced on every PR; single source of truth for data contract |
| Deployment | GitHub Pages | Zero cost; consistent with GitHub-as-backend constraint; single push-to-deploy |
| Repository structure | Flat (single package) | Sufficient for Phase 1 scope; avoids monorepo overhead until separate deployments are needed |

## How Quality Goals Are Addressed

**DSGVO safety by design** — No server means no data collection surface. No third-party scripts
in the build. UnoCSS and Vue are bundled; there are no CDN-loaded external dependencies in
production. Frontend-only apps in the registry earn a no-backend badge because they have no
server of their own that could store student data. A green DSGVO status additionally requires a
verified absence of third-party requests (see the DSGVO concept in chapter 8).

**Zero-server deployability** — GitHub Pages serves the static build output. The CI pipeline
(`vp build` → GitHub Pages deploy action) is the only infrastructure. No secrets, no API keys,
no runtime configuration.

**Contributor friendliness** — Data files are YAML+Markdown: editable in the GitHub web UI
without cloning the repo. PR templates pre-fill the required structure. AI-assisted submission
(Phase 2) reduces the time from idea to valid entry to under 15 minutes.

**Forkability** — The entire platform is a single git repository with no external dependencies
in the data layer. Anyone can fork it, add their own data files, and deploy their own instance
to GitHub Pages within minutes.

**Performance on mobile** — Vite+ produces a small, tree-shaken bundle. UnoCSS generates only
the CSS actually used. Vue 3 is lightweight. VitePress produces pre-rendered HTML, so core
content is readable without JavaScript.
