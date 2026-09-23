# Building Blocks

<!--
Arc42 chapter 5. The static decomposition of edugo into building blocks and their interfaces.
-->

edugo is a single deployable unit — a static site built from one repository. The building blocks
below are logical separations within that unit, not independently deployed services. They share
a build pipeline (`vp build`) and a deployment target (GitHub Pages), but each has distinct
responsibilities, data sources, and rendering concerns.

```arc42
:::diagram
id: bb-diagram
notation: mermaid
aliases: bb_website=bb-website, bb_cap=bb-capability-map, bb_reg=bb-registry, bb_data=bb-data, bb_docs=bb-docs, bb_cicd=bb-cicd
:::
```

```mermaid
graph TD
  subgraph edugo["edugo — single deployable unit"]
    bb_website["Website / Landing Page"]
    bb_cap["Capability Map"]
    bb_reg["Solution Registry"]
    bb_data["Data Layer\n(YAML + Markdown files)"]
    bb_docs["Architecture Guidelines & Docs"]
    bb_cicd["CI/CD Pipeline"]
  end

  bb_cap -->|reads capability nodes| bb_data
  bb_reg -->|reads registry entries| bb_data
  bb_cicd -->|validates schema| bb_data
  bb_cicd -->|builds| bb_website
  bb_cicd -->|builds| bb_cap
  bb_cicd -->|builds| bb_reg
  bb_cicd -->|builds| bb_docs
```

## Website / Landing Page

The primary narrative surface of edugo. Tells the story of the problem (PISA 2026, isolated
innovators, passive consumption), the vision (capability map + trusted ecosystem), and the
mechanism (cheap creation + quality layer). Phase 0 delivers this as a polished static page
with no functional registry or map. It must be compelling enough to generate genuine interest
before the platform infrastructure is built. It also serves as the persistent entry point for
all personas in Phase 1 and beyond.

Responsibility: story, calls to action, persona entry points, links to the capability map and registry.

```arc42
:::building-block
id: bb-website
title: Website / Landing Page
technology: Vue 3, Vite+, UnoCSS
implements: concept-dsgvo-by-design
:::
```

### Interface: Website Navigation

The navigation interface consumed by all human actors to move between the site's sections
(landing page, capability map, registry, docs).

```arc42
:::interface
id: if-site-nav
title: Website Navigation
provider: bb-website
protocol: HTML / SPA routing (Vue Router)
:::
```

## Capability Map

The strategic core of the platform. Renders the living map of educational capabilities from
structured data files. Shows each capability node with its coverage status (Needed / Partially /
Well covered), linked solutions, and gap signals. The gap view surfaces nodes with poor coverage
as build opportunities for contributors.

Responsibility: render capability nodes from data files; show coverage status; link to registry
entries; surface gap signals; provide a browsable and filterable view.

```arc42
:::building-block
id: bb-capability-map
title: Capability Map
technology: Vue 3, Vite+, UnoCSS
implements: concept-capability-map
:::
```

### Interface: Capability Map Read

The read interface provided to all actors who consume the capability map (contributors finding
gaps, adopters understanding what exists, navigators assessing school coverage, signal readers
tracking ecosystem health).

```arc42
:::interface
id: if-capability-map-read
title: Capability Map Read
provider: bb-capability-map
protocol: HTML (rendered static page + client-side filter)
:::
```

## Solution Registry

The tool catalog. Renders structured registry entries from YAML+Markdown data files. Supports
client-side filtering by capability node, active/passive classification, DSGVO status, age
range, subject, and cost. Displays trust signals (DSGVO badge, evidence level, architecture
compliance). Links outbound to the actual tools.

Responsibility: render registry entries; compute and display trust signals; support client-side
filtering; provide the GitHub PR contribution entry point.

```arc42
:::building-block
id: bb-registry
title: Solution Registry
technology: Vue 3, Vite+, UnoCSS
implements: concept-active-passive, concept-trust-signals, concept-composability
:::
```

### Interface: Registry Read

The read and filter interface consumed by adopters, contributors, and external tools linking
back to their registry entry.

```arc42
:::interface
id: if-registry-read
title: Registry Read
provider: bb-registry
protocol: HTML (rendered static page + client-side filter)
:::
```

### Interface: Submission Flow

The contribution entry point: a pre-filled GitHub PR template opened from the registry UI.
In Phase 2 this becomes an AI-assisted web form that still terminates in a GitHub PR.

```arc42
:::interface
id: if-submission-flow
title: Submission Flow (GitHub PR)
provider: bb-registry
protocol: Deep-link to GitHub PR template (URL construction)
:::
```

## Data Layer

The structured data that populates the capability map and solution registry. Not a deployable
component — a file system convention. All capability nodes live under `data/capabilities/` as
YAML-frontmatter Markdown files. All registry entries live under `data/entries/` in the same
format. JSON Schema files under `schemas/` define the required structure. A GitHub Action
validates every PR that touches `data/` against these schemas before merging.

Responsibility: persistent storage of all platform content; schema-validated structure;
human-editable in the GitHub web UI; open format for programmatic consumption.

```arc42
:::building-block
id: bb-data
title: Data Layer
technology: YAML frontmatter + Markdown, JSON Schema, GitHub Actions
implements: concept-data-formats, concept-schema-validation
:::
```

## Architecture Guidelines & Docs

VitePress-rendered documentation covering the arc42 architecture (sourced from `docs/arc42/`),
contribution guidelines, builder patterns, and the active/passive taxonomy. This building block
is the vehicle for edugo's third platform job: providing architecture guidelines to app builders.
Arc42 CLI is used for authoring and validation of the architecture documents; VitePress renders
them alongside other documentation pages.

Responsibility: render architecture docs; publish builder patterns and contribution guidelines;
serve as the living record of platform decisions.

```arc42
:::building-block
id: bb-docs
title: Architecture Guidelines and Docs
technology: VitePress, arc42 CLI (authoring and validation)
implements: concept-vitepress-arc42
:::
```

## CI/CD Pipeline

The GitHub Actions workflows that validate, build, and deploy the platform on every push to
`main`. Not a user-facing building block but architecturally significant because it is the only
"server" in the system — the automated layer that enforces schema validity and produces the
deployable artifact.

Responsibility: schema validation on PRs; build (`vp build` + VitePress build) on merge to
`main`; deploy to GitHub Pages.

```arc42
:::building-block
id: bb-cicd
title: CI/CD Pipeline
technology: GitHub Actions, Vite+, arc42 CLI
:::
```

### Interface: Repository Push

The interface consumed by GitHub (the external actor) to trigger CI/CD. When GitHub pushes to
`main` (or opens a PR), workflows are triggered.

```arc42
:::interface
id: if-repo-push
title: Repository Push / PR Event
provider: bb-cicd
protocol: GitHub Actions event (push, pull_request)
:::
```
