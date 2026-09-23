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

### 2.8 Controlled vocabularies: Zod is the source, JSON Schema is the artifact

Platform-owned vocabularies (DSGVO status) live in `data/taxonomies/*.yaml` and are referenced by the Zod schema at build time.

External reference data from stable external authorities (KMK domains) is defined **directly in the Zod schema** using `.meta()` annotations — not in a YAML file. There are exactly 6 KMK domains, defined by a published government document; they will not change. Storing them in a YAML file adds indirection with no benefit.

The full schema pipeline:
1. **Source**: `schemas/capability-node.ts`, `schemas/registry-entry.ts` — Zod v4 schemas; TypeScript types inferred from them via `z.infer<>`
2. **Generate**: `npm run generate-schemas` runs `zod-to-json-schema` → produces `schemas/generated/capability-node.v1.schema.json` and `schemas/generated/registry-entry.v1.schema.json`
3. **Commit**: generated JSON Schema files are committed to the repo — they are distribution artifacts, not build outputs to ignore
4. **Validate**: CI runs `ajv` against the generated JSON Schema on every PR touching `data/`
5. **Publish**: generated JSON Schemas are included in the GitHub Pages deploy under `/schemas/` for remote `$schema` references
6. **Editor**: `.vscode/settings.json` associates `data/capabilities/*.md` and `data/entries/*.md` with the local generated schemas — contributors get live YAML frontmatter validation in VS Code without file-level `$schema` comments

**Defect signal:** if the generated JSON Schema is out of sync with the Zod source, the CI `--check` flag fails the build.

### 2.9 KMK domains use slugs, not numbers

KMK domain values in YAML frontmatter are lowercase hyphen-separated slugs — not integers. `problemloesen-handeln` is self-documenting in the file; `5` is not. The display number ("KMK 5") is stored in the Zod `.meta()` annotation and used only in the UI — it is never in the data files.

The six slug values (validated by the Zod enum):
- `suchen-verarbeiten` — Suchen, Verarbeiten und Aufbewahren
- `kommunizieren-kooperieren` — Kommunizieren und Kooperieren
- `produzieren-praesentieren` — Produzieren und Präsentieren
- `schuetzen-agieren` — Schützen und sicher Agieren
- `problemloesen-handeln` — Problemlösen und Handeln
- `analysieren-reflektieren` — Analysieren und Reflektieren

**Defect signal:** if a KMK domain value in a YAML file is a number or a free-text string not matching one of these slugs, schema validation fails.

### 2.10 Capability node identity

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
- Taxonomy files: `data/taxonomies/{name}.yaml` — platform-owned vocabularies only (e.g. `dsgvo-status.yaml`); external reference data lives in Zod schemas, not YAML files
- Zod schema sources: `schemas/{type}.ts` — the edit target; TypeScript types inferred from these
- Generated JSON Schemas: `schemas/generated/{type}.v1.schema.json` — committed artifacts; produced by `npm run generate-schemas`; never edited directly
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

1. Create `data/capabilities/{new-id}.md` with required YAML frontmatter (validated by generated JSON Schema on PR).
2. Write the German title and a rich Markdown body: what this outcome means, why it matters, example learning scenarios.
3. Set `status: needed` initially — coverage updates as entries are linked.
4. Set `kmk-domains` to one or more slug values from the Zod `KmkDomain` enum.
5. No code changes required.

### Add a new registry entry

1. Create `data/entries/{tool-id}.md` with required YAML frontmatter.
2. Reference one or more capability node IDs in the `capabilities` field.
3. Add a `teaser` (one German sentence) — optional but strongly encouraged.
4. The UI automatically surfaces the entry in the registry and on the relevant capability node pages.
5. No code changes required.

### Add a new trust signal type

1. Add the field to `schemas/registry-entry.ts` (Zod schema) as an optional field with `.meta()` description.
2. Run `npm run generate-schemas` to update the generated JSON Schema.
3. Add the renderer to the `useTrustSignals` composable.
4. Add a badge component or update the existing trust signal component.
5. Do not add signal logic to the entry card component directly.

### Add a new platform-owned vocabulary (e.g. future active/passive taxonomy)

1. Create `data/taxonomies/{name}.yaml` with a `values` array.
2. Add the enum to the relevant Zod schema file, reading values from the YAML at build time.
3. Run `npm run generate-schemas` to regenerate JSON Schemas.
4. Update the relevant filter composable.
5. No component changes unless a new filter UI element is needed.

### Add a new capability map view (projection)

1. Create a composable `useCapabilityMapProjection{Name}.ts` that transforms the loaded nodes array.
2. Create a view component in `src/views/` that uses the composable.
3. Add the route to Vue Router config.
4. No data model or schema changes required.


