# Architecture Constraints

<!--
Arc42 chapter 2. Non-negotiable boundaries on the architecture and its evolution.
-->

## No Server — Static Deployment Only

edugo Phase 1 must deploy with no server, no database, and no backend runtime. All data lives in
structured files in the GitHub repository. All dynamic behaviour runs in the browser. This
constraint is intentional: it models the DSGVO-safe, zero-operating-cost architecture that edugo
recommends for app builders in the ecosystem. A platform that preaches "frontend-only is safe"
must itself be frontend-only.

```arc42
:::constraint
id: con-no-server
title: No server — static deployment only
category: technical
source: Product decision KD-06; requirements.md §8 Phase 1 technical constraint
:::
```

## Git-hosting Provider as the Sole Backend (GitHub in Phase 1)

All persistent state lives in this repository as structured files in a Git repository. There is
no server-side database, no alternative storage layer. Contributions arrive as pull/merge requests.
GitHub is the Phase 1 implementation because it maximizes contributor reach. The data layer must
remain forge-agnostic so a future migration to GitLab, Gitea, or another provider requires only
rewriting forge-specific CI and workflow configuration — not the data files themselves.

```arc42
:::constraint
id: con-github-backend
title: Git-hosting provider as sole backend — forge-agnostic data layer
category: technical
source: Product decision KD-06; requirements.md §8; architecture discussion 2026-09-23
:::
```

## DSGVO Compliance by Design

The platform itself must be fully DSGVO-compliant. No third-party trackers. No analytics services
that transfer data outside the EU. No user accounts. No cookies beyond what the browser requires
for navigation. This is both a legal obligation and a product signal: if edugo demands DSGVO
compliance from the tools it lists, it must demonstrate it itself.

```arc42
:::constraint
id: con-dsgvo
title: DSGVO compliance by design — no trackers, no user data
category: organizational
source: DSGVO (EU 2016/679); requirements.md §10 NFRs
:::
```

## Open Data Formats

All capability nodes and registry entries must be stored in open, human-readable formats (YAML
frontmatter with Markdown body). No proprietary formats. No binary files for structured data. This
enables the fork-and-run independently guarantee and makes the platform useful to Signal Readers
who consume data programmatically.

```arc42
:::constraint
id: con-open-formats
title: All structured data in open, human-readable formats
category: convention
source: requirements.md §10 NFRs
:::
```

## GitHub Pages as Deployment Target

The platform is deployed to GitHub Pages. This constrains base path handling, routing strategy
(no server-side redirects), and the CI/CD model. All build outputs must be static files consumable
by a CDN without server-side logic.

```arc42
:::constraint
id: con-github-pages
title: GitHub Pages as deployment target
category: technical
source: Product owner decision (architecture discussion 2026-09-23)
:::
```

## Accessibility — WCAG 2.1 AA

The landing page and registry UI must meet WCAG 2.1 Level AA. Teachers in Germany work in
institutionally mandated contexts where accessibility is a legal requirement
(Barrierefreiheitsstärkungsgesetz). This constrains component choices, contrast ratios, keyboard
navigation, and screen-reader support.

```arc42
:::constraint
id: con-a11y
title: WCAG 2.1 AA accessibility
category: organizational
source: Barrierefreiheitsstärkungsgesetz (BFSG); requirements.md §10 NFRs
:::
```
