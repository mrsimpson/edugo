# Introduction and Goals

<!--
Arc42 chapter 1. The driving forces and requirements that shape the architecture of edugo.
-->

## 1.1 Requirements Overview

edugo is the infrastructure layer that turns isolated educational micro-innovations into a coherent,
trustworthy ecosystem for German K-12 education. It does not host content, replace an LMS, or
certify tools. It does four things:

1. **Maps capabilities** — maintains a living map of what educational capabilities should exist,
   what currently exists, and what is missing.
2. **Ensures essential quality** — provides lightweight, voluntary standards for data safety and
   pedagogical approach so that teachers and schools can confidently adopt community-built tools.
3. **Provides architecture guidelines** — publishes patterns and scaffolding so new apps feel
   coherent and ecosystem-connected rather than re-inventing everything from scratch.
4. **Makes agentic creation ecosystem-connected** — a developer who wants to build a new tool
   starts from the capability map, uses edugo scaffolding, and submits to the registry when done.

The immediate delivery context is the PISA 2026 political moment: Germany reached its all-time
PISA low, with one third of 15-year-olds below baseline in reading and mathematics. The landing
page (Phase 0) must launch while this discourse is alive. Phase 1 delivers the working
infrastructure on a zero-server, GitHub-as-backend model.

The full functional requirements are documented in `.vibe/docs/requirements.md`.

## 1.2 Quality Goals

The top five quality goals that drive architecture decisions, in priority order. See
[10-quality-requirements.arc42.md](10-quality-requirements.arc42.md) for the full catalog with
measurable scenarios.

| Priority | Quality Goal | Why it matters for the architecture |
|---|---|---|
| 1 | DSGVO safety by design | Schools will not adopt tools they cannot legally use. The architecture must make the safest path also the easiest path. |
| 2 | Zero-server deployability | No server means no operating cost, no data breach surface, and no procurement barrier. Everything must be deployable from a git push. |
| 3 | Contributor friendliness | If submitting an entry takes more than 15 minutes, contributors will not come. The contribution flow must be frictionless. |
| 4 | Forkability | The whole platform must be forkable and independently runnable. This is both a trust signal and a resilience mechanism. |
| 5 | Performance on mobile | Teachers use phones. The landing page must load in under 1.5 s on mobile. Core content must be readable without JavaScript. |

## 1.3 Stakeholders

| Role | Who | Expectations from the architecture |
|---|---|---|
| Contributor (Builder) | Engaged teacher, developer, or educator who builds educational tools | Fast submission path; structured data model that makes their work findable; fork-friendly repo |
| Adopter (Classroom Teacher) | Busy teacher, DSGVO-anxious, time-poor | Trust signals visible at a glance; active-learning filter first-class; works on mobile |
| Navigator | School principal or digital coordinator | Overview of capability coverage per school context; trusted entries clearly distinguished |
| Signal Reader | Researcher or policy advisor | Machine-readable data in open formats; capability map shows real gaps over time |
| Platform Maintainer | Repo maintainer reviewing PRs | Schema-validated contributions; low-friction CI; clear data format docs |
| Open-source contributor | Developer building on or forking the platform | Documented architecture; clear building block responsibilities; forkable at zero cost |
