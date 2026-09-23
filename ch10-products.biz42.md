# Chapter 10: Products and Services

## Landing page

The narrative entry point for all personas — contributors, adopters, navigators, researchers. It communicates the value proposition clearly, directs each stakeholder to the right next step, and establishes edugo's credibility during the PISA political window.

```biz42
:::product
id: prod-landing-page
title: Landing page — narrative entry point for all personas
fulfills: exp-contributor, exp-adopter, exp-navigator, exp-signal-reader
owner: owner-vorstand
:::
```

## Capability map

A publicly accessible, living map of educational capabilities organised by the six KMK Kompetenzrahmen domains. Each capability node carries a coverage status (`needed`, `partial`, `well-covered`). Gap nodes are surfaced as explicit build invitations for contributors. This is the strategic core that differentiates edugo from a plain tool list.

```biz42
:::product
id: prod-capability-map
title: Capability map — KMK-aligned living inventory of educational capabilities
fulfills: exp-navigator, exp-signal-reader, exp-contributor
owner: owner-vorstand
:::
```

## Solution registry

A structured, filterable catalog of community-built educational tools. Every entry is linked to capability nodes, carries DSGVO status, active/passive classification, and an evidence level. Contributions are submitted as GitHub Pull Requests with automated schema validation.

```biz42
:::product
id: prod-registry
title: Solution registry — structured, trusted catalog of community-built tools
fulfills: exp-adopter, exp-contributor, exp-navigator, exp-maintainer
owner: owner-vorstand
:::
```

## Scaffolding layer

Architecture guidelines, starter templates, and an AI-assisted creation flow that allows contributors to build new tools starting from a capability map gap. Ensures new tools are ecosystem-connected rather than reinvented from scratch.

```biz42
:::product
id: prod-scaffolding
title: Scaffolding layer — architecture guidelines and AI-assisted creation flow
fulfills: exp-contributor, exp-oss-contributor
owner: owner-vorstand
:::
```
