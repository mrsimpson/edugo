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
  Teacher->>Teacher: Reads DSGVO badge, active/passive level, evidence level
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
involves: bb-data, bb-cicd, bb-docs
:::
```

```arc42
:::diagram
id: seq-cicd-deploy
notation: mermaid-sequence
scenario: rs-cicd-deploy
aliases: bb_data=bb-data, bb_cicd=bb-cicd, bb_docs=bb-docs
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
