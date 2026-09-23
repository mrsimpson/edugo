# Glossary

<!--
Arc42 chapter 12. Domain and technical terms with project-specific meanings.
-->

## Capability Node

A discrete educational outcome or activity tracked by the edugo capability map. Each node records its coverage status, links to registry entries that address it, and a gap signal if coverage is poor.

```arc42
:::glossary-term
id: gl-capability-node
title: Capability Node
definition: A discrete educational outcome or activity that the edugo capability map tracks. Each node has a coverage status, links to registry entries that address it, and a gap signal if coverage is poor.
:::
```

## Capability Map

The strategic core of edugo. A living map of educational capabilities that shows what should exist, what does exist, and what is missing. Capability nodes are the units of the map; the gap view surfaces nodes with no or poor coverage as build opportunities.

```arc42
:::glossary-term
id: gl-capability-map
title: Capability Map
definition: The strategic core of edugo — a living map of educational capabilities that shows what should exist, what does exist, and what is missing. Capability nodes are the units of the map. The gap view surfaces nodes with no or poor coverage as build opportunities.
:::
```

## Registry Entry

A structured file under `data/entries/` describing one educational tool or approach. Contains YAML frontmatter (structured metadata fields) and a Markdown body (rich description and classroom scenario). Validated by JSON Schema on every PR.

```arc42
:::glossary-term
id: gl-registry-entry
title: Registry Entry
definition: A structured file in data/entries/ describing one educational tool or approach. Contains YAML frontmatter (metadata fields) and a Markdown body (description, classroom scenario). Validated by JSON Schema on every PR.
:::
```

## Contributor (Builder)

A person who submits capability nodes or registry entries via GitHub Pull Request. May be a teacher, developer, educator, or researcher. One of the two primary personas.

```arc42
:::glossary-term
id: gl-contributor
title: Contributor (Builder)
definition: A person who submits capability nodes or registry entries via GitHub Pull Request. May be a teacher, developer, educator, or researcher. Primary persona alongside the Adopter.
:::
```

## Adopter (Classroom Teacher)

A classroom teacher who browses the registry to find tools that are safe, active-learning focused, and usable in the near term. DSGVO-anxious and time-poor. One of the two primary personas.

```arc42
:::glossary-term
id: gl-adopter
title: Adopter (Classroom Teacher)
definition: A classroom teacher who browses the registry to find tools that are safe, active-learning focused, and usable in the near term. Primary persona alongside the Contributor. DSGVO-anxious and time-poor.
:::
```

## Active/Passive Taxonomy

The five-level classification of educational tools by the type of student engagement they require. Levels in ascending order of active engagement: Create (1), Solve (2), Collaborate (3), Reflect (4), Receive (5). First-class in the data model and the discovery UI.

```arc42
:::glossary-term
id: gl-active-passive
title: Active/Passive Taxonomy
definition: The five-level classification of educational tools by the type of student engagement they require. Levels: Create (1), Solve (2), Collaborate (3), Reflect (4), Receive (5). First-class in the data model and the discovery UI.
:::
```

## DSGVO Status

A trust signal on each registry entry indicating its data protection compliance posture. Values are: green (verified compliant), amber (probably fine, unverified), red (known issues), unknown. Green requires `backend: none`, `external-requests: none` and a passed network audit or maintainer check. A self-declaration alone caps the status at amber.

```arc42
:::glossary-term
id: gl-dsgvo-status
title: DSGVO Status
definition: A trust signal on each registry entry indicating its data protection compliance posture. Values: green (verified compliant), amber (probably fine, unverified), red (known issues), unknown. Green requires backend:none, external-requests:none and a passed network audit or maintainer check; self-declaration alone caps at amber.
:::
```

## No-backend Badge

A trust badge awarded to any registry entry that declares `backend: none`. It signals that the tool runs no server of its own. It does not prove DSGVO safety: the browser can still send data to CDNs, external APIs, or embedded third-party content. The badge shows "self-declared" until a network audit verifies it.

```arc42
:::glossary-term
id: gl-no-backend-badge
title: No-backend Badge
definition: A trust badge awarded to any registry entry that declares backend:none. It signals that the tool runs no server of its own — not that it is DSGVO-safe, since the browser can still send data to third parties. Shown as self-declared until verified by a network audit.
:::
```

## Gap View

A filtered view of the capability map that shows only nodes with `status: needed` or `status: partial`. It is the primary entry point for contributors looking for where to build.

```arc42
:::glossary-term
id: gl-gap-view
title: Gap View
definition: A filtered view of the capability map that shows only nodes with status needed or partial. It is the primary entry point for contributors looking for where to build.
:::
```

## GitHub-as-backend

The architectural pattern used by edugo in Phase 1: all persistent data lives as structured files in the GitHub repository; contributions are submitted as Pull Requests; deployments are triggered by pushes to `main`. There is no server-side database or API.

```arc42
:::glossary-term
id: gl-github-backend
title: GitHub-as-backend
definition: The architectural pattern used by edugo in Phase 1: all persistent data lives as structured files in the GitHub repository; contributions are submitted as Pull Requests; deployments are triggered by pushes to main. There is no server-side database or API.
:::
```

## Evidence Level

A trust signal indicating how well a registry entry has been validated by the community. Values: anecdotal (creator's claim only), community-validated (3+ teacher "I tried this" signals), research-backed (peer-reviewed evidence cited). Not editable by the submitter — accumulated through community signals or set by maintainers.

```arc42
:::glossary-term
id: gl-evidence-level
title: Evidence Level
definition: A trust signal indicating how well a registry entry has been validated. Values: anecdotal (creator's claim only), community-validated (3+ teacher I-tried-this signals), research-backed (peer-reviewed evidence cited). Not editable by the submitter — set by maintainers or accumulated through community signals.
:::
```

## KMK Kompetenzrahmen

The competency framework published by the Kultusministerkonferenz (Standing Conference of the Ministers of Education and Cultural Affairs of the Länder in Germany). Provides 6 domains used as the baseline taxonomy for capability map nodes.

```arc42
:::glossary-term
id: gl-kmk
title: KMK Kompetenzrahmen
definition: The competency framework published by the Kultusministerkonferenz (Standing Conference of the Ministers of Education and Cultural Affairs of the Länder in Germany). Provides 6 domains used as the baseline taxonomy for capability map nodes. Available at https://www.kmk.org.
:::
```

## Vaporware-first

The edugo delivery strategy: ship a polished landing page (Phase 0) before building any working infrastructure, to validate interest and generate community signal while the PISA 2026 political moment is alive.

```arc42
:::glossary-term
id: gl-vaporware-first
title: Vaporware-first
definition: The edugo delivery strategy: ship a polished landing page (Phase 0) before building any working infrastructure, to validate interest and generate community signal while the PISA 2026 political moment is alive.
:::
```
