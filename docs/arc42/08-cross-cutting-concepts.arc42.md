# Cross-cutting Concepts

<!--
Arc42 chapter 8. Recurring patterns, standards, and rules applied across multiple building blocks.
-->

## DSGVO Safety by Design

edugo embodies the same principle it recommends to app builders: structural safety over configuration safety.

The architecture structurally prevents data collection by removing the server-side surface
entirely. There is no backend to store user data, no analytics scripts to include, and no
authentication system to manage. This is not a configuration choice — it is a structural
guarantee derived from the `con-no-server` constraint.

For apps in the registry, the same principle applies — but only partly. A frontend-only app
has no server of its own that could store student data. That removes the largest data
processing surface, but it does not prove the app is DSGVO-safe. The browser can still send
personal data (at minimum the IP address, often also input) to third parties through several
channels:

- scripts, fonts, or stylesheets loaded from a CDN at runtime
- analytics, error tracking, or telemetry built into bundled dependencies
- direct calls from the browser to external APIs (LLM APIs, cloud storage, translation services)
- embedded third-party content (videos, maps, social widgets)
- the static host that serves the app and logs requests

"No backend" is therefore a necessary condition, not a sufficient one. The platform separates
the two claims:

1. **No-backend badge** — the entry declares `backend: none`. The badge shows that the tool
   runs no server of its own. It is labelled as self-declared until verified.
2. **DSGVO status green** — requires `backend: none` *and* `external-requests: none` *and* a
   verification. A self-declaration alone caps the status at amber.

Verification is a network audit: a headless browser opens the tool's URL, performs the
documented main interaction, and records every request to an origin other than the tool's own.
The audit runs as a GitHub Actions job on the registry PR, so it needs no edugo server. Where
the audit cannot run (for example, tools behind a login), a maintainer checks the tool
manually and records the result in the entry.

OPEN: exact audit tooling, which interactions count as "main interaction", and how often
audits re-run to detect regressions after a tool changes.

Implementation rule: no third-party scripts may be loaded at runtime. All dependencies must
be bundled at build time. No CDN-hosted fonts, analytics, or widgets in production output.

```arc42
:::concept
id: concept-dsgvo-by-design
title: DSGVO Safety by Design
category: security
:::
```

## Active/Passive Taxonomy

The five-level active/passive classification is first-class in the data model and the discovery
UI. Every registry entry must declare its level. The taxonomy is:

| Level | Name | What it means |
|---|---|---|
| 1 | Create | Students produce an artefact (text, image, video, code, game) |
| 2 | Solve | Students work through a problem with agency (math, logic, language puzzle) |
| 3 | Collaborate | Students interact meaningfully with peers to achieve a shared goal |
| 4 | Reflect | Students evaluate, assess, or give feedback (on their own or others' work) |
| 5 | Receive | Students watch, listen, or read without active output |

The taxonomy is stored as a controlled vocabulary in `data/taxonomies/active-passive.yaml` and
referenced by JSON Schema. UI components treat level 1–4 as "active" and level 5 as "passive"
for filter purposes, but all five levels are queryable.

```arc42
:::ignore W001 concept-active-passive is a domain vocabulary — it shapes the data model and future filter UI, but no Phase 1 building block implements active/passive filtering yet. The taxonomy is defined but deferred to Phase 2.
:::
```

```arc42
:::concept
id: concept-active-passive
title: Active/Passive Taxonomy (5-level)
category: domain
:::
```

## Trust Signals

Trust signals are computed from structured metadata in registry entry files, not from editorial
decisions. This makes trust transparent and auditable. Four signals are displayed:

| Signal | Values | Source |
|---|---|---|
| DSGVO status | green / amber / red / unknown | `dsgvo` field in entry YAML; green requires `backend: none`, `external-requests: none` and a passed network audit or maintainer check (see DSGVO Safety by Design); self-declaration alone caps at amber |
| Evidence level | anecdotal / community-validated / research-backed | `evidence` field; community-validated requires ≥3 "tried-this" signals |
| Architecture compliance | badge or absent | `architecture-compliance: true` declared in entry YAML and verified by maintainer |
| No-backend badge | verified / self-declared / absent | `backend: none` in entry YAML → badge marked "self-declared"; marked "verified" after a passed network audit. States only that the tool runs no server of its own — not that it is DSGVO-safe |

No star ratings. No aggregate scores. Signals are factual and source-cited. Every signal shows
whether it is self-declared or verified.

```arc42
:::concept
id: concept-trust-signals
title: Trust Signals (DSGVO, evidence level, architecture compliance)
category: domain
:::
```

## Capability Map Model

The capability map is a directed graph of educational capability nodes, each with a coverage
status and links to registry entries that address it. The graph structure (parent/child
relationships between capability nodes) enables both a flat list view and a hierarchical tree
view. The baseline taxonomy is the KMK Kompetenzrahmen (6 domains); new nodes can be proposed
via PR.

Each capability node file (`data/capabilities/`) contains:
- `id`: unique slug
- `title`: human-readable name (German)
- `domain`: KMK domain slug
- `parent`: parent node ID (optional)
- `status`: `needed` | `partial` | `well-covered`
- `description`: Markdown body explaining the capability and why it matters
- `evidence`: link(s) to research or curriculum documents

The gap view is a client-side filter that shows only nodes with `status: needed` or
`status: partial`. It is the primary entry point for contributors looking for where to build.

```arc42
:::concept
id: concept-capability-map
title: Capability Map Model (nodes, coverage, gap view)
category: domain
:::
```

## Data Formats and Schema Validation

All structured data uses YAML frontmatter with a Markdown body. This format is:
- Human-editable in the GitHub web UI without cloning the repository
- Parseable by standard static site tooling (Vite plugins, VitePress)
- Validatable by JSON Schema (applied to the YAML frontmatter fields only)
- Renderable as documentation (Markdown body is displayed as rich text)

JSON Schema files live under `schemas/`:
- `schemas/capability-node.schema.json` — required fields for capability nodes
- `schemas/registry-entry.schema.json` — required fields for registry entries
- `schemas/taxonomy-vocabulary.schema.json` — controlled vocabulary definitions

The GitHub Actions PR validation workflow runs the schema validator (ajv or equivalent) against
every modified file in `data/` before allowing merge.

OPEN: exact schema tooling (ajv CLI vs. a dedicated action) not yet decided.

```arc42
:::concept
id: concept-data-formats
title: YAML Frontmatter + Markdown Body (data format convention)
category: development
:::
```

## JSON Schema Validation on PR

Every PR that modifies files under `data/` triggers a GitHub Actions workflow that validates
the changed files against the JSON Schema for their type. This is the enforcement layer for
the data format contract: a PR cannot be merged if the YAML frontmatter is missing required
fields or uses invalid controlled vocabulary values. The validation step also serves as
documentation: schema validation errors name the missing or invalid field explicitly, guiding
first-time contributors without requiring a maintainer review comment.

```arc42
:::concept
id: concept-schema-validation
title: JSON Schema Validation on PR (CI enforcement)
category: development
:::
```

## Composability and Fork Lineage

Every open-source registry entry links to its GitHub repository. The data model tracks fork
relationships: a `forked-from` field in the registry entry YAML records the parent entry ID.
The UI surfaces fork lineage — a teacher or contributor can see that a tool is a derivative of
another, which builds trust (the parent was validated; the fork inherits that context) and
encourages remixing.

One-click forking: for GitHub-hosted tools, the registry links directly to the GitHub fork
button URL. This is a static link — no server call required.

```arc42
:::concept
id: concept-composability
title: Composability and Fork Lineage
category: domain
:::
```

## VitePress and arc42 Coexistence

The architecture documentation (arc42 chapters in `docs/arc42/*.arc42.md`) is rendered by
VitePress as part of the docs site. Arc42 CLI is used for authoring and validation; VitePress
is used for rendering. The two tools share the same source files but have distinct roles:

- `arc42 validate` — checks structural consistency, cross-references, and rule violations
- `arc42 build` — produces a standalone static site (used for local preview)
- VitePress — renders the full docs site including arc42 chapters, contribution guidelines,
  and builder patterns, deployed to `/docs/` on GitHub Pages

VitePress treats `.arc42.md` files as standard Markdown. The `:::block` DSL syntax inside
``arc42` fences renders as styled code blocks in GitHub and VitePress without breaking the
layout. Navigation for arc42 chapters is configured in `docs/.vitepress/config.ts`.

```arc42
:::concept
id: concept-vitepress-arc42
title: VitePress as Arc42 Rendering Layer
category: development
:::
```
