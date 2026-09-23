# Requirements Document — edugo

> **Status:** Ideation phase — living document  
> **Last updated:** 2026-09-23  
> **Reference study:** PISA 2026 (published 08.09.2026; Germany at all-time low; 1/3 below baseline in reading & math)

---

## 1. Problem Statement

### The five-part structural failure edugo addresses

**1. The landscape of "what children need" changes faster than institutions track.**  
No single authority can keep current. Schools, curricula, and official frameworks perpetually lag reality.

**2. Education depends on what schools officially receive — and that pipeline is slow.**  
Even the most motivated teacher is constrained by what is officially approved and procured.

**3. Public authorities move on 3–5 year cycles.**  
The Digitalpakt invested €11.5B total — primarily in infrastructure. The pedagogy and software quality layer was left unfilled.

**4. Professional offerings are polished but conservative and consumption-heavy.**  
sofatutor, Anton, etc. are trusted but passive. They don't experiment. They can't adapt quickly.

**5. Engaged individuals innovate but are isolated — their work doesn't accumulate.**  
Great teachers and developers build things. Their work disappears. Nobody finds it. Nobody builds on it.

### The new opportunity: agentic engineering changed the cost equation

A motivated teacher or developer can now build a working educational app in a weekend with AI assistance. The bottleneck is no longer *building* — it is:

- **Discoverability**: How does someone find what exists?
- **Trust**: Is this safe for school use? Does it actually work?
- **Composability**: Can I build on what someone else started?
- **Reach**: How does a tool built in Freiburg reach a teacher in Rostock?

But there is a second-order problem: when personal software is cheap, many small "software islands" appear. Without coordination, these islands don't connect. Their capabilities can't be compared. Their quality can't be trusted. They can't be extended systematically. **edugo's deeper job is to prevent the proliferation of disconnected islands and instead build a coherent, quality-assured ecosystem.**

---

## 2. Vision

**edugo is the infrastructure layer that turns isolated educational micro-innovations into a coherent, trustworthy ecosystem.**

It does four things that no existing platform does:

1. **Maps capabilities** — maintains a living map of what educational capabilities *should exist*, what currently exists, and what is missing. Software islands are located on this map.
2. **Ensures essential quality** — provides clear, lightweight standards for data safety and pedagogical approach so that data-sensitive users (teachers, schools) can confidently adopt community-built tools.
3. **Provides architecture guidelines** — publishes patterns and scaffolding so that new apps feel coherent and connected to the ecosystem rather than re-inventing everything from scratch.
4. **Makes agentic creation ecosystem-connected** — a developer who wants to build a new tool starts from the capability map (not a blank page), uses edugo-provided scaffolding, and submits to the registry when done. Creation is connected to the gap it fills.

---

## 3. The Capability Map — Core Concept

The capability map is the strategic heart of edugo. It answers: **"What educational capabilities do we need, and which currently exist?"**

### Structure
- **Capability nodes** — discrete educational outcomes or activities (e.g. "Students practice collaborative text writing", "Students get immediate feedback on mathematical thinking", "Students create and publish digital media")
- **Status per node** — Needed / Partially covered / Well covered
- **Linked solutions** — which tools/apps currently address this node
- **Gap signals** — nodes with no or poor coverage are surfaced as "build opportunities"

### Why this matters
Without a capability map, the ecosystem is reactive — people build what they're inspired to build, and there's no signal about what's missing. With a capability map, a developer opening edugo for the first time can immediately see "this capability has zero good solutions — I could build this."

The capability map also provides the vocabulary for quality assessment: a tool's quality is evaluated *relative to the capability it claims to address*.

---

## 4. Quality Standards — Essential, Not Exhaustive

edugo provides **lightweight, non-bureaucratic quality standards** that app builders can voluntarily adopt. Meeting these standards earns a visible trust badge on the platform.

### Data Safety Standard (must-have for school adoption)
- No exfiltration of student data to third-party services without disclosure
- No persistent user tracking across sessions without consent
- Clear disclosure of what data is stored and where
- DSGVO-compliant by design (EU-hosted or zero-server for frontend-only apps)
- **Key signal**: a frontend-only app with no backend is trivially DSGVO-safe — edugo should make this architecture easy and visibly reward it

### Pedagogical Quality Standard
- Clear classification on the active/passive spectrum (Create / Solve / Collaborate / Reflect / Receive)
- Explicit statement of which capability node(s) the tool addresses
- At least one concrete classroom scenario ("Unterrichtsidee")

### Interoperability Expectation (not required, but encouraged)
- Follows edugo architecture guidelines for UI patterns and data format
- Can be forked and extended by others (open source preferred)

---

## 5. Architecture Guidelines — For App Builders

edugo publishes **architecture docs and UI patterns** that app builders can follow when creating new tools. This serves three purposes:
1. Apps feel coherent — a teacher who uses multiple edugo-ecosystem apps doesn't have to re-learn everything
2. Apps are easier to build — scaffolding and templates reduce the time from idea to working prototype
3. Apps are easier to trust — known patterns make security review straightforward

### What the guidelines cover (conceptually — detail in Architecture phase)
- Frontend-only app patterns (no backend = no DSGVO complexity)
- Standard data formats for learning interactions
- UI component conventions (accessibility, mobile-first)
- GitHub-based contribution and distribution model
- AI-assisted creation workflow (how to use agentic tools to bootstrap from a capability gap to a working prototype)

---

## 6. Users (Personas)

### Primary: The Contributor (Builder)
**Who**: Engaged teacher, developer, educator, or researcher who has built or wants to build something.  
**Core need**: A way to share it that makes it findable and credible — and a starting point (from the capability map + guidelines) that makes building faster and better-connected.  
**Current frustration**: Their work either disappears (if they don't share) or is re-invented by someone else (if they do share but it's not findable).

### Primary: The Adopter (Classroom Teacher)
**Who**: Busy classroom teacher. Has devices. Has motivation. DSGVO-anxious. Time-poor.  
**Core need**: "Something I can use next week that is safe, appropriate for my students, and makes them *do* something."  
**Current frustration**: Can't quickly assess if something is safe, and almost everything they find is passive consumption.

### Secondary: The Navigator (Coordinator / School Leadership)
**Who**: School principal, digital coordinator, Medienpädagoge.  
**Core need**: Overview of what the capability map looks like for their school — what's covered, what's missing, what's trusted.

### Secondary: The Signal Reader (Researcher / Policy)
**Who**: Education researcher, journalist, policy advisor.  
**Core need**: Real-time ground-level signal about where innovation is happening and what gaps exist.

---

## 7. Functional Requirements

### FR-01 — Capability Map
- The system SHALL maintain a living map of educational capabilities
- Each node: what it means, why it matters (evidence), current coverage status, linked solutions, gap signal
- Community-editable with editorial moderation; baseline aligned to KMK Kompetenzrahmen
- Versioned — the map's evolution is visible

### FR-02 — Solution Registry
- Contributors register tools/approaches using a structured template
- Required fields: name, description, capability node(s) addressed, active/passive classification, age range, subject, DSGVO status, cost, classroom scenario
- Optional: links to source code, architecture compliance, evidence level
- AI-assisted submission: describe in natural language → system structures into template

### FR-03 — Active/Passive Classification
Five-level taxonomy, first-class in discovery:
- **Create** — students produce an artefact
- **Solve** — students work through a problem with agency
- **Collaborate** — students interact meaningfully with peers
- **Reflect** — students evaluate, assess, or give feedback
- **Receive** — students watch/listen/read without active output

### FR-04 — Trust Signals
- DSGVO status: green (verified compliant) / amber (probably fine, unverified) / red (known issues) / unknown
- Frontend-only apps get an automatic "no backend — structurally DSGVO-safe" badge
- Evidence level: anecdotal → community-validated → research-backed
- Architecture compliance badge: follows edugo guidelines

### FR-05 — Architecture Guidelines & Scaffolding
- Published documentation: patterns, UI conventions, data formats, contribution model
- Starter templates (GitHub repos) for common app types in the capability map
- AI creation flow: "this capability gap → here's a starting prompt/skill/template → build it → submit it"

### FR-06 — Discovery & Matching
- Filter by: capability node, active/passive level, DSGVO status, age range, subject, cost
- Natural language search (AI-assisted)
- "Gap view": show capability nodes with poor or no coverage — especially useful for contributors looking for where to build

### FR-07 — Fork & Composability
- Entries can be forked; fork relationships are visible
- Open-source entries link to their GitHub repo; forking is one click
- The platform encourages and surfaces derivative works

### FR-08 — Community Validation
- "I tried this" signal from teachers
- Progressive trust: more validations → higher trust level
- No star ratings — honest qualitative signals only

---

## 8. Delivery Strategy — Vaporware First

### Phase 0: Landing Page (Vaporware)
**Goal**: Validate the idea and generate interest before building anything real.

The landing page must:
- Tell the story compellingly: the problem (PISA 2026, isolated innovators, passive consumption), the vision (capability map + trusted ecosystem), the mechanism (cheap creation + quality layer)
- Show the capability map concept visually — even if static/illustrated
- Show what a solution entry looks like — even if fabricated/illustrated
- Have a clear call to action: "I'm a contributor" / "I'm a teacher looking for tools" / sign up for early access
- Be highly polished — this is the pitch, not the prototype
- Be fast, DSGVO-clean, mobile-perfect

**Success metric**: Does it generate genuine interest from the target community (Bildungstwitter, Barcamp participants, teachers)?

### Phase 1: Frontend-Only Use Cases on Static Infrastructure
**Goal**: Establish working infrastructure with zero server cost or complexity.

Technical constraint (from product owner):
- **Backend = GitHub** (repo in this project)
- **Skills/apps = part of this repo**
- **No server, no database** — all data lives in files, all interaction is frontend-only or GitHub-mediated
- This is not a limitation — it is a feature: it models exactly the DSGVO-safe, forkable, open architecture that edugo recommends

First use cases to implement on this infrastructure:
1. **Browse the capability map** — static rendering of the capability map from structured data files
2. **View solution registry** — static-rendered entries from structured markdown/JSON files in the repo
3. **Filter/search** — client-side filtering of the registry
4. **"Submit via GitHub PR"** — contribution flow that opens a pre-filled GitHub PR template

### Phase 2 and beyond
- AI-assisted submission (client-side, no server needed)
- Community validation via GitHub reactions / issue comments
- Starter templates and scaffolding in the repo
- Architecture guidelines as living docs in the repo

---

## 9. Scope

### In Scope — Phase 0 (Landing Page / Vaporware)
- Single-page marketing site
- Compelling narrative: problem → vision → mechanism
- Visual illustration of capability map concept
- Visual illustration of a solution entry
- Call to action / interest signal collection (email capture or GitHub star)
- DSGVO-clean (no tracking, no third-party analytics)
- Mobile-first, fast, polished

### In Scope — Phase 1 (Frontend-only MVP)
- Capability map rendered from data files in repo
- Solution registry rendered from structured files in repo
- Client-side filter and search
- GitHub PR-based contribution flow
- DSGVO badges (frontend-only badge for apps without backend)
- Active/Passive classification display

### Out of Scope (any phase involving a server)
- User accounts, authentication
- Server-side database
- Real-time community validation (deferred until community is established)
- AI-assisted submission with server calls (client-side AI only in Phase 1)

### Explicitly and permanently out of scope
- Replacing LMS infrastructure
- Hosting student data
- Official tool certification

---

## 10. Non-Functional Requirements

### Landing Page
- Loads in < 1.5s on mobile
- Zero third-party trackers
- Accessible (WCAG 2.1 AA)
- Works without JavaScript (core content readable)

### Platform (Phase 1)
- All data in open, human-readable formats (Markdown + JSON/YAML)
- Fully deployable from GitHub (GitHub Pages or similar static host)
- No secrets, no API keys in client code
- Fork-friendly: the whole platform can be forked and run independently

---

## 11. Success Metrics

### Phase 0 (Landing Page)
- Interest signal: >100 email/GitHub signups within 2 weeks of sharing in Bildungstwitter / Barcamp
- Qualitative: at least 5 unprompted "this is exactly what I've been waiting for" responses from teachers or contributors
- Shares/links from education community accounts

### Phase 1 (Frontend MVP)
- First 10 real solution entries submitted via GitHub PR (not seeded by the team)
- First fork of an existing entry
- At least 3 "I tried this" signals from teachers on real entries

### Long-term
- Capability map nodes with active coverage growing over time
- Ratio of "well-covered" nodes increasing
- Developer starts using edugo scaffolding to build new tools

---

## 12. Open Questions

1. **Capability map authoring**: Who defines the initial nodes? How are new nodes proposed? This is the most politically sensitive design decision.
2. **Moderation at scale**: GitHub PR-based contribution is naturally moderated (repo maintainers review PRs) — but how does this scale beyond a handful of contributors?
3. **App hosting**: Phase 1 links to external tools. Eventually, should edugo host frontend-only apps directly (as GitHub Pages sub-paths)? This would make "no backend = DSGVO-safe" trivially demonstrable.
4. **Sustainability**: Who maintains the repo and reviews PRs long-term? This is the Serlo question — at some point, a community organization is needed.
5. **Language**: German-first. But GitHub contribution workflow is English-native. How do we reconcile?
6. **Landing page call-to-action**: Email capture vs. GitHub star vs. something else? Email requires DSGVO handling. GitHub star is frictionless but lossy.
