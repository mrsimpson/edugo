# Architecture Evidence — edugo

> Traceability file for the arc42 architecture model. Not a chapter file — not parsed by arc42 validator.
> Last updated: 2026-09-23

| Source path:line, symbol, or command | Derived fact or relationship | Used in | Confidence | Open question / human decision |
| --- | --- | --- | --- | --- |
| `.vibe/docs/requirements.md:8` | Vision: edugo is an infrastructure layer, not a content platform or LMS | ch.1 / intro | high | — |
| `.vibe/docs/requirements.md:47` | Four platform jobs: map capabilities, ensure quality, provide guidelines, make agentic creation ecosystem-connected | ch.1 / intro, ch.4 / strategy | high | — |
| `.vibe/docs/requirements.md:58-68` | Capability map structure: nodes, status, linked solutions, gap signals | ch.5 / bb-capability-map | high | — |
| `.vibe/docs/requirements.md:76-80` | Frontend-only apps are structurally DSGVO-safe; edugo rewards this with a visible badge | ch.2 / con-no-server, ch.8 / concept-dsgvo-by-design | high | — |
| `.vibe/docs/requirements.md:199-203` | GitHub is the sole backend in Phase 1: all data in files, contributions via PRs | ch.2 / con-github-backend, ch.7 / deploy | high | — |
| `.vibe/docs/requirements.md:183-195` | Phase 0 = landing page (vaporware); Phase 1 = frontend-only use cases on static infra | ch.1 / intro, ch.4 / strategy | high | — |
| `.vibe/docs/requirements.md:110-127` | Four personas: Contributor (Builder), Adopter (Teacher), Navigator, Signal Reader | ch.3 / actors | high | — |
| `.vibe/docs/requirements.md:133-178` | Functional requirements FR-01 through FR-08 | ch.5 / building blocks | high | — |
| `.vibe/docs/requirements.md:254-264` | NFRs: <1.5s load on mobile, zero trackers, WCAG 2.1 AA, works without JS, all data in open formats | ch.10 / quality goals and scenarios | high | — |
| `.vibe/docs/requirements.md:145-152` | Active/Passive taxonomy: Create/Solve/Collaborate/Reflect/Receive — first-class in discovery | ch.8 / concept-active-passive, ch.5 / bb-registry | high | — |
| `.vibe/docs/requirements.md:153-158` | Trust signals: DSGVO status (green/amber/red/unknown), evidence level, architecture compliance badge | ch.8 / concept-trust-signals | high | — |
| `.vibe/docs/requirements.md:169-173` | Fork & composability: fork relationships visible, one-click fork for open-source entries | ch.8 / concept-composability | high | — |
| `.vibe/development-plan.md:KD-06` | GitHub as backend is a feature, not a constraint: it models the pattern edugo recommends | ch.4 / strategy | high | — |
| `agent inference` | Vite+ (vp CLI) chosen as unified toolchain; Vue 3 as frontend framework | ch.4 / strategy, ch.5 / building blocks | high | Confirmed by product owner in architecture discussion |
| `agent inference` | UnoCSS chosen for styling; GitHub Pages for deployment | ch.4 / strategy, ch.7 / deploy | high | Confirmed by product owner |
| `agent inference` | Flat repo structure (no monorepo packages); VitePress for docs at `docs/`; arc42 sources in `docs/arc42/` | ch.5 / building blocks, ch.7 / deploy | high | Confirmed by product owner |
| `agent inference` | YAML frontmatter + Markdown body for capability nodes and registry entries; JSON Schema for validation | ch.8 / concept-data-formats | high | Confirmed by product owner |
| `agent inference` | GitHub Actions validates schema on every PR touching `data/` | ch.8 / concept-schema-validation | medium | OPEN: exact schema tooling (ajv vs. others) not yet decided |
| `agent inference` | KMK Kompetenzrahmen (6 domains) as baseline taxonomy for capability map | ch.8 / concept-capability-map | high | — |
| `agent inference` | VitePress imports arc42 markdown files as pages; arc42 CLI used for validation and authoring, not rendering | ch.5 / bb-docs | high | OPEN: VitePress nav structure for arc42 chapters not yet designed |
| `.vibe/docs/requirements.md:288-292` | Open question: who defines initial capability map nodes? | ch.11 / risk-map-governance | high | OPEN: political sensitivity acknowledged; no resolution yet |
| `.vibe/docs/requirements.md:289` | Open question: moderation at scale beyond handful of PR reviewers | ch.11 / risk-moderation-scale | high | OPEN: no resolution yet |
