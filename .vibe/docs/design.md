# Design Document — edugo

> **Status:** Active — Plan phase, 2026-09-23
> **Scope:** All phases through Phase 1 (capability map + registry). Phase 2+ extensions noted where relevant.
> **Boundary with architecture:** Architecture answers "what and why". This document answers "how, by what rules".

---

## 1. Core Principles

### 1.1 Data is the source of truth; code is a view over data

Every capability node and every registry entry is a file. The Vue components, the capability map UI, and the trust signal badges are renderers — they have no business logic of their own that doesn't derive from reading and displaying data files. If a UI decision requires changing a data file structure, that is a data model change, not a UI change.

**Defect signal:** if a component contains hard-coded capability IDs, trust thresholds, or taxonomy labels, something is wrong.

### 1.2 The capability map is a graph; the UI is a projection of it

The capability map data model is a directed graph (nodes with optional parent references). The UI offers multiple projections of this graph — tree view, domain view, gap view — but none of these projections change the underlying graph. A new projection is a new filter/render function, not a new data structure.

**Defect signal:** if adding a new map view requires adding new fields to the capability node schema, something is wrong.

### 1.3 Trust signals are computed, never editorial

Trust signals (DSGVO status, evidence level, frontend-only badge) are derived mechanically from YAML frontmatter fields. There is no human editorial layer that overrides the computation. The only human action is writing a correct YAML field when submitting an entry.

**Defect signal:** if a trust signal value is stored anywhere other than the source YAML file of the entry it describes, something is wrong.

### 1.4 Client-side filtering is the only permitted query layer

There is no server. Filtering and search operate on the full dataset loaded at page render time. The dataset must remain small enough (< 500KB uncompressed) for this to be fast. When the dataset grows beyond this limit, the solution is static pre-filtering at build time, not a server.

**Defect signal:** if a component makes a network request to filter, search, or load registry entries at interaction time, something is wrong.

### 1.5 Every user-visible text is in German; every identifier is in English

Capability node titles, descriptions, and classroom scenarios are German. Component names, file names, YAML field keys, JSON Schema `$id` values, CSS class names, and git branch names are English. This separation is strict — it prevents the contribution workflow (GitHub-native, English) from mixing with the content (German-first).

**Defect signal:** if a YAML field *key* is in German, or a rendered page heading is in English (without a deliberate bilingual context), something is wrong.

### 1.6 Build output is assembled, not generated twice

The deployment pipeline produces exactly one directory (`dist/`) that is uploaded to GitHub Pages. VitePress owns the root of `dist/`. The arc42 static site is built separately and placed under `dist/architecture/` before the single Pages upload. No content is built twice; no build step overwrites output from another.

**Defect signal:** if the GitHub Actions deploy workflow uploads more than one artifact to GitHub Pages, or if `dist/` is cleared after arc42 has written to `dist/architecture/`, something is wrong.

### 1.7 The platform is forkable at zero cost

No file in the repository may reference any account-specific secret, username, or URL that would break after a fork without editing source code. The GitHub Pages URL in config is derived from the repository URL, not hard-coded. The only hard-coded value is the base path `/edugo/` — which is the repository name, not an account name.

**Defect signal:** if a fork of this repository must change any file other than a deployment configuration file to produce a working site, something is wrong.

---

## 2. Data Model Principles

### 2.1 The capability map is a structured wiki, not a taxonomy tree

Capability nodes are flat, well-tagged articles about learning outcomes — not nodes in a hierarchy. There is no `parent` field, no tree to navigate, no placement decisions. The "map" is the queryable space of all capability articles. Different users navigate different projections of the same flat dataset: the Contributor sees the gap view (`status: needed`), the Adopter filters by subject and age band, the Navigator groups by KMK domain.

The litmus test for a capability node: *can you imagine 2–5 genuinely different tools that address this node?* If yes, the grain is right. If only one tool could ever match, the node is too narrow. If fifty tools match, it is too broad.

**Defect signal:** if the capability model requires a placement decision ("does this node belong under domain 5 or domain 6?"), the model is wrong — the node should carry both as `kmk-domains` facet values.

### 2.2 Facets describe; they do not organize

All facets on capability nodes and registry entries are multi-value tags for discovery. They do not impose structure. KMK domain alignment is a multi-value facet (`kmk-domains: [5, 6]`) — not a structural parent. Subject alignment is multi-value. Age range is a band, not a strict bound.

**Defect signal:** if a facet field is single-value and mandatory, it is probably being used as a structural organizer rather than a discovery tag — reconsider.

### 2.3 Discovery filters on capability nodes

Capability nodes carry only what is needed to navigate the map:
- `status` — required; `needed` / `partial` / `well-covered`; the gap signal
- `kmk-domains` — optional, multi-value; populated by maintainers, not contributors; for institutional navigation

Subject, age, and active/passive facets do **not** belong on capability nodes. Learning outcomes are not subject-specific or age-bounded — a specific tool for them is. These facets live on registry entries only.

### 2.4 Discovery filters on registry entries

Registry entries carry facets that answer the teacher's practical questions:
- `capabilities` — required; multi-value array of capability node IDs
- `dsgvo` — optional; defaults to `unknown`; `frontend-only` is the strongest trust signal
- `teaser` — optional; one German sentence visible on the card; the hook that makes a teacher click; not a filter but a display field that must be in frontmatter (not the Markdown body)
- `source-url` — optional; without it the entry is a dead end

Facets deferred to future phases (schema supports them via `x-` prefix until graduated):
- `subjects`, `min-age`/`max-age`, `classroom-moment`, `setup-time`
- Active/passive classification (the capability node description conveys this implicitly for now)

**Minimum required to be listed:** `id` + `title` + at least one `capabilities` reference. DSGVO defaults to `unknown`.

### 2.5 Teaser is a frontmatter field, not body content

The `teaser` field (one German sentence) lives in YAML frontmatter so it is available at card render time without loading the full Markdown body. It is the single most important display field for the teacher discovery flow. Optional, but the contribution guide strongly encourages it.

**Defect signal:** if the entry card renders the Markdown body to extract a preview sentence, something is wrong — the teaser belongs in frontmatter.

### 2.6 Schema extensibility via `x-` prefix

Any YAML frontmatter field beginning with `x-` is explicitly permitted by the schema and ignored by the platform UI. This allows contributors to experiment with new fields without schema changes:

```yaml
x-lehrplan-bayern: "M7 Stochastik"   # community experiment
x-classroom-moment: einstieg          # future field being tested before graduation
```

When an `x-` field proves broadly useful, a PR graduates it to a named optional field in the schema. This is the only path from experiment to core field — no silent promotion.

The JSON Schema rule: `patternProperties: { "^x-": {} }` combined with `additionalProperties: false` for all other fields.

### 2.7 Schema versioning

Schema files are versioned in their filename: `schemas/registry-entry.v1.schema.json`. The validator always uses the current version. Breaking changes (removing or renaming a required field) increment the version and require a migration PR that updates all existing entries. Additive changes (new optional fields) do not increment the version.

### 2.8 Capability node identity

A capability node's `id` is its slug: lowercase, hyphen-separated, English, unique across `data/capabilities/`. It is permanent. Deprecation uses `deprecated: true` + `replaced-by` — never file deletion.

### 2.9 Registry entry identity

A registry entry's `id` is the slug of the tool. It is unique across `data/entries/`. The file name is `{id}.md`. IDs are not namespaced by author.

### 2.10 Controlled vocabularies are files, not code

DSGVO status values, KMK domain IDs, and any future taxonomy values are defined in `data/taxonomies/` as YAML files — not TypeScript enums or hardcoded arrays. Adding a vocabulary value means editing one file only.

### 2.11 Schema evolution is additive

New optional fields may be added at any time without a version bump. Removing or renaming a required field is a major version change requiring a migration. The `x-` prefix convention provides a safe experimentation path before any field becomes core.

---

## 3. Component Design Principles

### 3.1 One component per data concept

There is a component for a capability node card, a component for a registry entry card, a component for a trust signal badge, and a component for a filter panel. These are not composed differently for different views — the same component is reused. A view is a layout that arranges existing components with different data projections, not a new component that reimplements card rendering.

### 3.2 Components receive data; they do not fetch it

Vue components are pure renderers. Data loading, filtering, and transformation happen in composables (`use*.ts` files) or at build time (Vite data loaders). A component that directly reads a file or calls `import.meta.glob` in its `<script setup>` is violating this principle — that logic belongs in a composable.

### 3.3 Filter state lives in the URL

The active filter set (selected capability domain, active/passive level, DSGVO status) is encoded as URL query parameters. This means a filtered view is bookmarkable and shareable, and back-navigation restores the filter state. The filter composable reads from and writes to the URL — not to local component state.

### 3.4 Gap view is a filter preset, not a separate route

The "gap view" (capability nodes with `status: needed` or `status: partial`, with zero or few linked entries) is a named filter preset that sets URL query parameters. It is not a separate page or route. A contributor who clicks "Show gaps" sees the same capability map filtered differently — same component, same URL structure, different filter state. The gap view is the primary entry point for contributors; the full map is the primary entry point for adopters and navigators.

### 3.5 Trust signals are a separate concern from entry display

The trust signal computation (DSGVO badge, evidence level, frontend-only badge) is implemented as a composable (`useTrustSignals`) that accepts an entry's frontmatter and returns structured signal objects. The entry card component calls this composable and renders its output. Trust signal logic never lives in a template.

---

## 4. Deployment Pipeline Principles

### 4.1 Two build tools, one artifact

The VitePress build produces the docs site. The arc42 CLI produces the architecture site. These are independent build steps. The pipeline runs them in sequence, with arc42 writing into a subdirectory of the VitePress output. The upload step uploads the assembled directory once.

### 4.2 Node version is pinned for reproducibility

The CI pipeline pins Node to version 22 (LTS). The arc42 CLI has a known DOMPurify incompatibility with Node 24 (E013 errors). The pin is documented in the workflow and revisited when arc42 CLI v0.0.11+ resolves the issue.

### 4.3 GitHub Pages permissions are minimal

The deploy job requests only `pages: write` and `id-token: write` permissions. No `contents: write`. The GitHub native deploy action (`actions/deploy-pages`) is used instead of third-party actions to avoid supply chain risk and to align with GitHub's recommended pattern.

### 4.4 The `.nojekyll` file is always present

GitHub Pages runs Jekyll by default, which strips directories prefixed with `_`. VitePress emits `_assets/`. The pipeline ensures a `.nojekyll` file is present at the root of `dist/` before upload. This is the responsibility of the VitePress build step, not a post-processing step.

### 4.5 PR validation and deploy are separate workflows

Schema validation on PRs (touching `data/`) is a separate workflow from the build-and-deploy workflow. They share no state. This means schema validation can run on forks' PRs without requiring Pages deployment permissions.

---

## 5. Naming Conventions

### Files and directories

- Capability node files: `data/capabilities/{id}.md` — slug is the canonical identifier
- Registry entry files: `data/entries/{id}.md` — slug is the canonical identifier
- Taxonomy files: `data/taxonomies/{name}.yaml` — name is the taxonomy type (e.g. `active-passive`, `dsgvo-status`)
- JSON Schema files: `schemas/{type}.schema.json` — type matches the data directory name
- Vue components: `src/components/{PascalCase}.vue` — named for the concept, not the view
- Composables: `src/composables/use{Concept}.ts` — always prefixed with `use`
- VitePress config: `docs/.vitepress/config.ts` — no alternative location

### YAML field keys

All YAML frontmatter field keys are lowercase, hyphen-separated English. Multi-word keys use hyphens, not underscores (`forked-from`, not `forkedFrom` or `forked_from`). This is consistent with the Markdown/YAML ecosystem convention and makes grep-based searching uniform.

### CSS classes

UnoCSS utility classes are used inline in templates. Custom semantic classes (when necessary) follow `eg-{concept}` naming (e.g. `eg-trust-badge`, `eg-gap-node`). The `eg-` prefix prevents collision with UnoCSS utilities and makes edugo-specific classes greppable.

### Git branches

Feature branches: `feat/{short-description}`. Fix branches: `fix/{short-description}`. Release branches: `release/v{major}.{minor}`. The current research/architecture branch (`feat/edugo-platform-research`) is retained for its history and merged when Phase 1 is complete.

---

## 6. How to Extend the System

### Add a new capability node

1. Create `data/capabilities/{new-id}.md` with required YAML frontmatter (validated by schema on PR).
2. Write the German title and a rich Markdown body: what this outcome means, why it matters, example learning scenarios.
3. Set `status: needed` initially — coverage updates as entries are linked.
4. Tag with applicable facets: `kmk-domains` (multi-value), `subjects` (multi-value), `min-age`, `active-passive`.
5. No code changes required. No placement decision required — there is no tree.

### Add a new registry entry

1. Create `data/entries/{tool-id}.md` with required YAML frontmatter.
2. Reference one or more capability node IDs in the `capabilities` field.
3. The UI automatically surfaces the entry in the registry and on the relevant capability node pages.
4. No code changes required.

### Add a new trust signal type

1. Define the signal in `schemas/registry-entry.schema.json` as an optional field.
2. Add the signal to the taxonomy file if it has controlled vocabulary values.
3. Add a renderer to the `useTrustSignals` composable.
4. Add a badge component or update the existing trust signal component.
5. Do not add signal logic to the entry card component directly.

### Add a new capability map view (projection)

1. Create a composable `useCapabilityMapProjection{Name}.ts` that transforms the loaded nodes array into the shape the view needs.
2. Create a view component (a route-level component in `src/views/`) that uses the composable.
3. Add the route to Vue Router config.
4. No data model changes required unless the projection reveals a missing data field.

### Add a new taxonomy vocabulary

1. Create `data/taxonomies/{name}.yaml` with a `values` array of vocabulary items.
2. Update the relevant JSON Schema to reference the new vocabulary as an `enum`.
3. Update the filter composable to expose the new vocabulary as a filter dimension.
4. No component changes unless a new filter UI element is needed.


