# Risks and Technical Debt

<!--
Arc42 chapter 11. Architectural risks and technical debt items, ordered by priority.
-->

## Capability Map Governance — Who Defines the Nodes?

The capability map is edugo's strategic core, but the most politically sensitive design question
is unresolved: who has the authority to add, modify, or deprecate capability nodes? If a
small team controls this, the map reflects their perspective. If it is fully open, the map
may fragment or be gamed. The KMK Kompetenzrahmen provides a starting taxonomy, but it is
not granular enough for the full capability map.

Without a clear governance model, the capability map cannot be seeded credibly — and without
a seeded map, there is no gap view to attract contributors.

Mitigation: Start with a curated seed set authored by the founding team, clearly marked as
`version: 0.1 / seeded by maintainers`. Establish a visible `OPEN: governance` issue in the
repository to invite community input. Define a lightweight RFC process for new node proposals
before the first public launch.

```arc42
:::risk
id: risk-map-governance
title: No governance model for capability map node authorship
severity: high
mitigation: Seed map from founding team with explicit versioning; establish RFC process before public launch; open community discussion issue
:::
```

## Trust Badge Overclaims DSGVO Safety

The registry awards trust signals from metadata that contributors declare themselves. If
`backend: none` alone produced a "structurally DSGVO-safe" badge, the platform would certify
something it never checked. A frontend-only tool can still load CDN fonts, embed videos, or
call an LLM API directly from the browser — each of which sends personal data to a third
party. A single tool that carries the badge but leaks student data would damage edugo's core
promise: honest, factual trust signals. Schools and data protection officers would stop
relying on the badge, and teachers would lose the fast path the platform exists to provide.

Mitigation: Separate the no-backend badge from the DSGVO status (see chapter 8). Mark every
self-declared signal as such. Grant DSGVO green only after a network audit in CI or a
documented maintainer check. Re-run audits periodically, because a tool can change after it
was listed.

```arc42
:::risk
id: risk-badge-overclaim
title: Self-declared no-backend badge overclaims DSGVO safety
severity: high
mitigation: Separate no-backend badge from DSGVO status; label self-declared signals; require network audit or maintainer check for green; periodic re-audit
:::
```

## Moderation at Scale

GitHub PR-based contribution works well for small contributor counts (< 50 active contributors).
At larger scale, PR review becomes a bottleneck for maintainers. Schema validation reduces the
review burden for structural issues but cannot replace human judgment on content quality,
duplicate detection, or bad-faith submissions.

Without a moderation model that scales beyond a handful of reviewers, the platform will either
overwhelm maintainers or reject legitimate contributions due to backlog.

Mitigation: Define "trusted contributor" status (contributors with 3+ merged PRs can merge
without maintainer review for minor updates). Use CODEOWNERS to distribute review
responsibility. Evaluate GitHub Actions bots for duplicate detection in Phase 2.

```arc42
:::risk
id: risk-moderation-scale
title: Contribution moderation does not scale beyond a handful of PR reviewers
severity: medium
mitigation: Trusted contributor status after 3+ merged PRs; CODEOWNERS distribution; bot-assisted duplicate detection in Phase 2
:::
```

## Git-hosting Provider Dependency

The platform depends on GitHub in Phase 1 for repository hosting, CI/CD, Pages deployment, and
the PR contribution workflow. A GitHub policy change (pricing, API restrictions, terms of service)
could force a platform migration.

Mitigation: ADR-01 establishes the forge-agnosticism rule: no GitHub-specific markup in data
files; all forge-specific configuration isolated under `.github/`. Migration to GitLab Pages or
any static host requires rewriting CI workflows and deployment configuration only — zero data
migration cost. The build pipeline (`vp build`, `vitepress build`) runs on any CI system.

```arc42
:::risk
id: risk-github-lockin
title: Platform depends on GitHub as forge provider in Phase 1
severity: medium
mitigation: Forge-agnostic data layer (ADR-01); forge-specific config isolated to .github/; migration requires only CI rewrite, not data migration
:::
```

## PISA 2026 Window Closing

The PISA 2026 publication (September 2026) creates a narrow window of public discourse in
Germany where edugo's narrative has maximum resonance. If the landing page (Phase 0) is not
live within 4–6 weeks of the PISA publication, the political moment passes and the narrative
anchor loses its urgency.

Mitigation: Phase 0 is scoped to a single polished page with no functional infrastructure.
This is the fastest possible deliverable. Prioritize it above all Phase 1 work.

```arc42
:::risk
id: risk-pisa-window
title: PISA 2026 political window closes before landing page ships
severity: high
mitigation: Phase 0 is scoped to a single static page — fastest possible deliverable; must ship before any Phase 1 work
:::
```

## VitePress + arc42 Rendering Compatibility

VitePress treats `.arc42.md` files as standard Markdown. The `:::block` DSL syntax inside
``arc42` fences renders as code blocks. This is acceptable for readability but loses the
semantic structure (actors, building blocks, decisions are not visually distinguished from
prose). A dedicated VitePress plugin for arc42 blocks does not currently exist.

Mitigation: The `arc42 serve` and `arc42 build` commands provide semantically aware rendering
for architecture review purposes. VitePress rendering is sufficient for contributor-facing
documentation. Evaluate a custom VitePress plugin if the presentation gap becomes a blocker.

```arc42
:::risk
id: risk-vitepress-arc42-rendering
title: VitePress renders arc42 DSL blocks as unstyled code, not semantic elements
severity: low
mitigation: Use arc42 serve/build for semantic review; VitePress sufficient for contributor docs; custom plugin as Phase 2 option
:::
```

## Mobile Performance Budget

The performance target (LCP < 1.5s on mobile 4G) is achievable with the chosen stack but requires
discipline. Vue 3 + UnoCSS + VitePress are all lightweight, but adding third-party components
(maps, visualizations for the capability map) or large images to the landing page could push
the bundle over budget.

Mitigation: Establish a Lighthouse CI check in the GitHub Actions deploy workflow. Set a
bundle size budget in `vp build` configuration. Treat any Lighthouse mobile score below 90 as
a PR blocker for the landing page and capability map routes.

```arc42
:::risk
id: risk-mobile-perf-budget
title: Capability map visualization may exceed mobile performance budget
severity: low
mitigation: Lighthouse CI in deploy workflow; bundle size budget enforced by Vite+; lazy-load heavy visualization components
:::
```
