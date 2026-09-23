# Runtime View

<!--
Arc42 chapter 6. Representative runtime scenarios for edugo.
-->

Three scenarios cover the architecturally significant flows: a teacher finding and assessing a
tool, a contributor submitting a new entry, and the CI/CD pipeline validating and deploying a
merged PR.

## Scenario 1: Teacher Discovers a Tool

A classroom teacher arrives at edugo, filters the registry for tools that are active-learning
focused and DSGVO-green for primary school maths, and follows a link to an external tool. The
entire flow is static-page rendering and client-side JavaScript — no server call is made after
the initial page load.

```arc42
:::runtime-scenario
id: rs-teacher-discovery
title: Teacher discovers a tool via the registry
trigger: Teacher opens edugo from a link shared in Bildungstwitter
involves: bb-website, bb-capability-map, bb-registry
:::
```

```arc42
:::diagram
id: seq-teacher-discovery
notation: mermaid-sequence
scenario: rs-teacher-discovery
aliases: bb_website=bb-website, bb_cap=bb-capability-map, bb_reg=bb-registry
:::
```

```mermaid
sequenceDiagram
  actor Teacher
  participant bb_website as Website / Landing Page
  participant bb_cap as Capability Map
  participant bb_reg as Solution Registry

  Teacher->>bb_website: GET / (static HTML served by GitHub Pages)
  bb_website-->>Teacher: Rendered landing page (Vue hydration)
  Teacher->>bb_cap: Click "Explore capability map"
  bb_cap-->>Teacher: Capability nodes loaded from data files
  Teacher->>bb_reg: Click capability node — see linked registry entries
  bb_reg-->>Teacher: Registry entries filtered client-side
  Teacher->>Teacher: Reads DSGVO badge, evidence level, trust signals
  Teacher->>Teacher: Clicks outbound link — external tool (leaves edugo)
```

## Scenario 2: Contributor Submits an Entry

A developer has built a Vue-based interactive grammar trainer. They open edugo, find the
relevant capability gap in the map, click "Submit a tool", and are taken to a pre-filled
GitHub PR template. They complete the YAML frontmatter fields (or use the AI-assisted form
in Phase 2), open the PR, and a maintainer reviews and merges it. The CI/CD pipeline then
redeploys the site with the new entry.

```arc42
:::runtime-scenario
id: rs-contributor-submission
title: Contributor submits a new registry entry via GitHub PR
trigger: Contributor finds a gap in the capability map and wants to register their tool
involves: bb-capability-map, bb-registry, bb-data, bb-cicd
:::
```

```arc42
:::diagram
id: seq-contributor-submission
notation: mermaid-sequence
scenario: rs-contributor-submission
aliases: bb_cap=bb-capability-map, bb_reg=bb-registry, bb_data=bb-data, bb_cicd=bb-cicd
:::
```

```mermaid
sequenceDiagram
  actor Contributor
  participant bb_cap as Capability Map
  participant bb_reg as Solution Registry
  actor GitHub
  participant bb_data as Data Layer
  participant bb_cicd as CI/CD Pipeline

  Contributor->>bb_cap: Browses gap view — finds uncovered capability node
  Contributor->>bb_reg: Clicks "Submit a tool" for capability node
  bb_reg-->>Contributor: Deep-links to GitHub PR template (pre-filled)
  Contributor->>GitHub: Opens PR with YAML frontmatter entry in data/entries/
  GitHub->>bb_cicd: pull_request event triggers validate workflow
  bb_cicd->>bb_data: Validates YAML against JSON Schema
  bb_data-->>bb_cicd: Validation result
  bb_cicd-->>GitHub: PR check status — blocks merge on failure
  GitHub->>GitHub: Maintainer reviews and merges
  GitHub->>bb_cicd: push event on main triggers deploy workflow
  bb_cicd-->>Contributor: New entry appears in live registry
```

## Scenario 3: CI/CD Validation and Deployment

Every PR that touches `data/` triggers schema validation. Every merge to `main` triggers a
full build and deploy. This is the only "server-side" logic in the system — and it runs
entirely within GitHub's infrastructure, not on any edugo-owned server.

```arc42
:::runtime-scenario
id: rs-cicd-deploy
title: CI/CD validates PR and deploys on merge to main
trigger: PR opened or pushed to; or merge to main branch
involves: bb-data, bb-cicd, bb-arc42-docs
:::
```

```arc42
:::diagram
id: seq-cicd-deploy
notation: mermaid-sequence
scenario: rs-cicd-deploy
aliases: bb_data=bb-data, bb_cicd=bb-cicd, bb_docs=bb-arc42-docs
:::
```

```mermaid
sequenceDiagram
  actor GitHub
  participant bb_cicd as CI/CD Pipeline
  participant bb_data as Data Layer
  participant bb_docs as Docs

  GitHub->>bb_cicd: pull_request event (data/ changed)
  bb_cicd->>bb_data: Run JSON Schema validator on changed files
  bb_data-->>bb_cicd: Validation result (pass or field errors)
  bb_cicd-->>GitHub: PR check status — blocks merge on failure

  Note over GitHub,bb_docs: On merge to main:

  GitHub->>bb_cicd: push event on main
  bb_cicd->>bb_cicd: vp build (Vue app to dist/)
  bb_cicd->>bb_docs: vitepress build (docs to docs/.vitepress/dist/)
  bb_cicd->>GitHub: Deploy merged output to GitHub Pages
  GitHub-->>GitHub: Live site updated (typically under 2 min)
```

## Scenario 4: Evaluator Reads Business Model Docs

A foundation programme manager has been pointed to edugo and wants to understand the platform's
scope, objectives, risks, and financial model before scheduling a call. They navigate to the
business model section of the docs site and read through the biz42 chapters. The entire flow is
static-page serving — no dynamic server involvement.

```arc42
:::runtime-scenario
id: rs-evaluator-reads
title: Evaluator reads the business model documentation
trigger: Evaluator navigates to the business model docs to assess platform purpose and viability
involves: bb-docs-site, bb-biz42-docs
:::
```

```arc42
:::diagram
id: seq-evaluator-reads
notation: mermaid-sequence
scenario: rs-evaluator-reads
aliases: bb_docs=bb-docs-site, bb_biz42=bb-biz42-docs
:::
```

```mermaid
sequenceDiagram
  actor Evaluator
  participant bb_docs as Docs Site
  participant bb_biz42 as Business Model Docs

  Evaluator->>bb_docs: GET /edugo/docs/ (static HTML served by GitHub Pages)
  bb_docs-->>Evaluator: Docs site navigation rendered
  Evaluator->>bb_biz42: Navigates to business model section
  bb_biz42-->>Evaluator: Rendered scope, objectives, risks, products, financial model
  Evaluator->>bb_biz42: Navigates between chapters (client-side routing)
  bb_biz42-->>Evaluator: Chapter pages served statically
```

## Scenario 5: Arc42 Reader Browses Architecture Docs

An open-source contributor wants to understand the platform's building block structure before
opening a PR. They land on the docs site, navigate to the architecture section, and read through
the arc42 chapters.

```arc42
:::runtime-scenario
id: rs-arc42-reader
title: Arc42 reader browses architecture documentation
trigger: Contributor or maintainer navigates to architecture docs to understand building block responsibilities
involves: bb-docs-site, bb-arc42-docs
:::
```

```arc42
:::diagram
id: seq-arc42-reader
notation: mermaid-sequence
scenario: rs-arc42-reader
aliases: bb_docs=bb-docs-site, bb_arc42=bb-arc42-docs
:::
```

```mermaid
sequenceDiagram
  actor Reader
  participant bb_docs as Docs Site
  participant bb_arc42 as Architecture Docs

  Reader->>bb_docs: GET /edugo/docs/ (static HTML served by GitHub Pages)
  bb_docs-->>Reader: Docs site navigation rendered
  Reader->>bb_arc42: Navigates to architecture section
  bb_arc42-->>Reader: arc42 chapters rendered (building blocks, decisions, runtime view)
  Reader->>bb_arc42: Follows cross-references between chapters
  bb_arc42-->>Reader: Chapter pages served statically
```
