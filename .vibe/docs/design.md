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

Capability nodes are flat, well-tagged articles about learning outcomes — not nodes in a hierarchy. There is no `parent` field, no tree to navigate, no placement decisions to make. The "map" is the queryable space of all capability articles. Different users navigate different projections of the same flat dataset: the Contributor sees the gap view (status: needed), the Adopter filters by subject and age, the Navigator groups by KMK domain.

**Defect signal:** if the capability model requires a placement decision ("does this node belong under domain 5 or domain 6?"), the model is wrong — the node should carry both as facet values.

### 2.2 Facets describe; they do not organize

A capability node's facets (KMK domain alignment, subject areas, age range, active/passive type) are multi-value tags for discovery and navigation. They do not impose structure. A node may align to multiple KMK domains, multiple subjects, and a broad age range simultaneously. This reflects how cognitive outcomes actually work in education — they are not discrete, subject-locked, or age-bounded.

**Defect signal:** if a facet field is single-value and mandatory, it is probably being used as a structural organizer rather than a discovery tag — reconsider whether it should be multi-value and optional.

### 2.3 Capability node identity

A capability node's `id` is its slug: lowercase, hyphen-separated, English, unique across `data/capabilities/`. It is permanent — once published, a node ID is never renamed (entries reference it by ID). Deprecation is via a `deprecated: true` field and a `replaced-by` reference, never by deleting the file.

### 2.4 Registry entry identity

A registry entry's `id` is the slug of the tool it describes. It is unique across `data/entries/`. The file name is `{id}.md`. If a tool is forked, the fork gets a new ID; the `forked-from` field records the parent ID. IDs are not namespaced by author — the tool's identity, not the author's identity, is what's permanent.

### 2.5 Controlled vocabularies are files, not code

The active/passive taxonomy, DSGVO status values, evidence levels, KMK domain slugs, and subject area slugs are defined in `data/taxonomies/` as YAML files — not as TypeScript enums or hardcoded arrays in component files. A new vocabulary value is added by editing one taxonomy file. No component or schema changes required unless the new value needs a new UI treatment.

### 2.6 Schema evolution is additive

New optional fields may be added at any time. Existing required fields are never removed — that is a major version bump requiring a data migration. The minimum required fields for a registry entry to be listed are: `id`, `title`, one `capabilities` reference, and `active-passive`. Everything else is optional. DSGVO defaults to `unknown` if absent — honest, not blocked.

### 2.7 Markdown body is display content, not structured data

The Markdown body of a capability node or registry entry is freeform display content. It renders as rich text and is never parsed for structured values. All queryable values live in the YAML frontmatter. A filter or query that depends on Markdown body content is a design defect.

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


