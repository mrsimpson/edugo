# edugo — Vision

> The infrastructure layer that turns isolated educational micro-innovations into a coherent, trustworthy ecosystem.

---

## The context: PISA 2026 and what it actually means

In September 2026, Germany recorded its lowest PISA scores since the study began in 2000. A third of 15-year-olds cannot reach the baseline level in reading or mathematics. The proportion of students who consider school a "waste of time" is a third — well above the OECD average. "Flüchtig Lesende" — students who skim rather than read — have nearly doubled since 2018.

Study director Samuel Greiff named three systemic causes: weak early childhood education, teacher shortage, and inadequate digitalization.

The Digitalpakt had already invested €11.5 billion by that point. The devices exist. The WiFi exists. What the Digitalpakt could not buy was the right kind of software, used in the right kind of way. Devices in classrooms without a supporting ecosystem mostly produce passive consumption — more screen time, not better learning.

edugo exists to fill that gap.

---

## The structural problem: five interlocking failures

### 1. The landscape changes faster than institutions can track

What children need to know to be fit for their future is not a stable list. AI capabilities, civic demands, labour market needs, and social competencies shift faster than curriculum revision cycles. Schools operate on five-year plans. The KMK Kompetenzrahmen was last substantially revised in 2021. The world has moved considerably since then.

No single authority can keep this current. The gap between "what children need" and "what is officially taught" widens continuously — and teachers feel this gap every day without a structured way to navigate it.

### 2. Education still happens in schools — which depend on what's officially provided

Even the most motivated, forward-thinking teacher operates within an institutional system: approved tools, official platforms, procurement cycles, Schulträger decisions, DSGVO review processes. Good ideas exist at the margins but cannot enter the classroom without clearing a high, slow bureaucratic bar. The pipeline from innovation to classroom is long and lossy.

### 3. Public authorities are structurally slow

The Digitalpakt invested primarily in infrastructure. KMK frameworks are updated rarely. The AIS.chat project (an AI chatbot for schools, launched 2025) gives students LLM access with no pedagogical framing — potentially deepening passive consumption rather than addressing it. State solutions are built for scale and stability, not for speed and experimentation. By the time a public authority has procured and deployed a new approach, the learning science has moved on.

### 4. Professional ed-tech offerings are conservative by necessity

sofatutor (2.1M users), Anton App, Bettermarks — these are polished, tested, DSGVO-compliant, and trusted. They are also fundamentally passive: watch a video, do an exercise, repeat. Their business models require mass adoption and low risk. They cannot experiment. They cannot pivot quickly to address emerging gaps. They solve the problem of accessible content delivery. They do not solve the problem of active learning.

### 5. Engaged individuals exist but are isolated

There are teachers, developers, media educators, and researchers building remarkable things. Tools born from real classroom problems. Methods that actually change student engagement. Prompt chains that turn a tablet into a creative instrument. These people share their work on Bildungstwitter, at OEB, at Barcamps. Then it disappears. Nobody finds it. Nobody builds on it. The next person starts from scratch. The ecosystem does not accumulate.

---

## The new condition: agentic engineering changed the cost of building

A motivated teacher or developer can now build a working educational app prototype in a weekend with AI assistance. The cost of creating a small, focused digital learning tool has dropped by an order of magnitude.

This is a profound shift. But it creates a second-order problem: **when personal software is cheap, many isolated "software islands" proliferate.** Without coordination infrastructure, these islands don't connect. Their capabilities cannot be compared. Their quality cannot be trusted. They cannot be extended systematically. The proliferation of cheap tools without a unifying layer produces noise, not progress.

edugo's fundamental job is to prevent the island problem — to provide the coordination layer that makes cheap creation compound into a coherent ecosystem.

---

## The roles engaged

### The Builder (Contributor)

**Who they are:**  
A teacher who built a classroom tool and wants others to use it. A developer who cares about education and built something over a weekend. A media educator who designed an approach that worked and wants to share it. A researcher who has a method backed by evidence.

**Their current situation:**  
Their work is invisible. It exists in a tweet, a Barcamp session, a GitHub repo nobody can find, or a private folder. Even if they share it, there is no structure that makes it trustworthy or findable for a busy teacher.

**What they need from edugo:**  
- A structured way to describe what they've built (template that makes quality visible without being burdensome)
- A way to position it on the capability map (so it's findable by people with the matching need)
- A trust signal mechanism (so a teacher can evaluate it quickly)
- The knowledge that others can build on it (fork relationships, visible lineage)
- AI-assisted contribution tooling that makes the submission process fast

**What edugo needs from them:**  
Their work. Their energy. Their willingness to describe what they built honestly, including its limitations.

---

### The Adopter (Classroom Teacher)

**Who they are:**  
A classroom teacher. Time-poor. DSGVO-anxious. Has devices. Has motivation. Knows that most of what's available is passive. Doesn't have time to research, evaluate, or take risks on untested tools.

**Their current situation:**  
Every search leads to either a large passive content platform (sofatutor, Anton) or a 50-page procurement document. The tools that would actually make students create and think are invisible to them. When they do find something, they can't quickly assess whether it's safe for their school context.

**What they need from edugo:**  
- "Something I can use next week that is safe, appropriate for my students, and makes them *do* something"
- Fast, honest answers to: Is this DSGVO-safe? Is it active or passive? Has anyone else used it in a classroom like mine?
- Discovery that starts from their actual need, not a taxonomy they have to learn

**What edugo needs from them:**  
Their feedback when they try something. "I used this" signals. The knowledge that accumulates from actual classroom use.

---

### The Navigator (School Coordinator / Leadership)

**Who they are:**  
A school principal, digital coordinator, or Medienpädagoge responsible for school-wide digital strategy. Must justify tool choices. Must show alignment with KMK Kompetenzrahmen. Has a broader view than an individual teacher but less time than a researcher.

**Their current situation:**  
No structured overview exists of the community-built tool landscape. Official channels give them approved, procured solutions. Everything else is noise.

**What they need from edugo:**  
- A structured view of the capability map for their school context: what's well covered, what's missing
- Evidence-backed quality signals they can use to justify recommendations
- Alignment to KMK framework without having to do the mapping themselves

---

### The Signal Reader (Researcher / Policy-Adjacent)

**Who they are:**  
An education researcher, PISA follow-up analyst, education journalist, or policy advisor. Interested in ground-level signal about where innovation is actually happening — not what ministries say is happening.

**Their current situation:**  
The only data available about educational software in use is from large commercial platforms (user counts, ratings). Community-built tools are invisible to institutional observation.

**What they need from edugo:**  
- A real-time picture of what teachers and builders are actually making and using
- Capability map evolution over time: which gaps are being filled, which persist
- Evidence that certain approaches are gaining or losing community traction

---

## The gaps edugo fills

| Gap | Current state | What edugo provides |
|---|---|---|
| **Capability visibility** | No map of what should exist vs. what does | Living capability map with gap signals |
| **Data safety trust** | DSGVO review is slow, opaque, per-tool | Lightweight, honest trust signals; frontend-only badge |
| **Active/passive signal** | Almost no tool labels itself as passive | Explicit 5-level classification on every entry |
| **Composability** | Every tool is a dead end — no forks, no lineage | Fork relationships; visible derivative works |
| **Contribution infrastructure** | No structured way to share community-built tools | Structured registry with AI-assisted submission |
| **Creation scaffolding** | Builders start from scratch every time | Capability map + architecture guidelines + starter templates |
| **Community signal** | No "did this actually work in a classroom" data | Progressive trust: community-validated → research-backed |

---

## What edugo is not

**Not a content platform.** edugo does not host learning content. It links to and describes tools and approaches.

**Not an LMS.** edugo has nothing to do with class management, assignment submission, or student records.

**Not a certification body.** edugo does not officially approve or endorse tools. It makes quality signals visible.

**Not a procurement platform.** edugo does not help schools buy software or navigate procurement.

**Not a replacement for MUNDO, Serlo, or sofatutor.** edugo connects to and bridges these platforms. It fills the coordination layer they don't provide.

---

## The platform's own architecture as a statement

edugo's own infrastructure is deliberately minimal: structured data files in a GitHub repository, a static frontend, no server, no database. Contributions are pull requests — naturally auditable, forkable, and community-moderated.

This is not just pragmatism. It is a statement of values: the platform we build to recommend trustworthy, open, DSGVO-safe tools should itself be trustworthy, open, and DSGVO-safe. It should be possible to audit every decision, fork the whole thing, and run it independently.

The architecture we live is the architecture we recommend.

---

## Delivery: vaporware first

Before building infrastructure, edugo will launch a highly polished landing page. The purpose is not to ship — it is to validate. Does this idea resonate with the teachers and builders it's designed for? Is the framing right? Does the capability map concept land?

A compelling landing page that generates genuine signal from the education community is more valuable than a full platform that nobody uses.

The sequence:
1. **Landing page** — the pitch. Story, visuals, call to action.
2. **Static registry** — capability map and solution entries from data files; client-side discovery; GitHub PR contribution.
3. **Scaffolding layer** — architecture guidelines, starter templates, AI-assisted creation flow connected to capability map.
4. **Community layer** — validation signals, fork activity, evolution of the map over time.

---

## Principles summary

| Principle | Expression |
|---|---|
| Active over passive | Core classification on every entry; primary discovery filter |
| Capability map, not tool list | Gaps are first-class; creation starts here |
| Frontend-only = DSGVO-safe | Rewarded with a visible trust badge |
| Progressive trust | Quality accumulates through use, not committees |
| Fork and build | Lineage is visible; derivatives are celebrated |
| Ecosystem-connected creation | Build from the gap, not the blank page |
| GitHub as backbone | Open, auditable, forkable — we live what we recommend |
| Vaporware first | Validate the story before building the infrastructure |
