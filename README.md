# edugo

**The missing infrastructure layer for educational innovation.**

---

Germany's schools have devices. They have WiFi. After €11.5 billion in Digitalpakt funding, the hardware is there.

What's missing is the software ecosystem — and the connective tissue that makes it trustworthy, findable, and buildable-upon.

PISA 2026 confirmed what teachers already knew: digital media in classrooms mostly means passive consumption. Students watch. Students click through. They don't create, don't solve, don't collaborate. The tools that would change this exist — built by motivated teachers, developers, and educators over weekends and evenings. But they're invisible. Isolated. Untrusted. Unreachable.

edugo changes that.

---

## What edugo is

A platform that turns isolated educational micro-innovations into a coherent, trustworthy ecosystem.

**For builders** (teachers, developers, educators who build things):  
A structured way to share what you've made — so it's findable, credible, and buildable-upon by others.

**For teachers** (who need something that works next Monday):  
A fast path to tools that are safe, active-learning-focused, and proven in real classrooms.

**For the ecosystem** (everyone who cares about the future of education):  
A living map of what educational capabilities exist, what's missing, and where the next thing should be built.

---

## Core principles

**Active over passive.**  
The tools that matter most are the ones where students create, solve, collaborate, and reflect — not just receive. Every entry in edugo is classified on this axis. It is the first filter. It is the point.

**The capability map, not a tool list.**  
edugo doesn't just catalogue what exists. It maps what *should* exist. Gaps are first-class citizens. A contributor opening edugo can immediately see where the ecosystem needs them.

**Frontend-only = DSGVO-safe by design.**  
An app with no backend cannot exfiltrate data. edugo rewards this architecture with a visible trust badge — aligning the easiest thing to build with the safest thing to trust.

**Quality signals, not certification.**  
edugo doesn't approve tools. It makes quality visible: data safety status, evidence level, how many teachers have actually used it. Trust accumulates through use, not committees.

**Fork and build.**  
Every entry links to its source. Derivatives show their lineage. One weekend experiment by a teacher in Freiburg becomes the foundation for ten tools built by others. Ideas accumulate instead of disappearing.

**Agentic creation, ecosystem-connected.**  
Building a new educational tool starts from the capability map — not a blank page. edugo provides scaffolding, patterns, and starting points so that what gets built fills a real gap and fits the ecosystem from day one.

**GitHub as backbone.**  
The registry lives in structured files in this repo. Contributions are pull requests. The whole platform can be forked, audited, and run independently. This is not a constraint — it is the architecture we recommend for the tools we list.

---

## Status

Early. The idea is solid. The landing page comes first.

If you're a teacher who has built something, an educator who wants to find something, or a developer who wants to build something — [watch this space / get in touch].

---

## Structure of this repo

```
/data/capabilities  — The capability map (structured Markdown + YAML files)
/data/entries       — The solution registry (structured Markdown + YAML files)
/data/taxonomies    — Platform-owned controlled vocabularies (YAML)
/schemas            — Zod v4 schema sources + generated JSON Schemas
/scripts            — Validation and build scripts
/docs               — Vision, contributing guide, arc42 architecture docs
```

---

> *"We are not dramatically behind. But we are not meeting our own standards as a nation of education."*  
> — Samuel Greiff, PISA 2026 study director, TU Munich
