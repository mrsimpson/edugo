# Quality Requirements

<!--
Arc42 chapter 10. Quality goals and measurable scenarios for the architecture.
-->

## DSGVO Safety by Design

The platform must be structurally safe under German data protection law without requiring
configuration or opt-out. This is the single most important quality goal because it is the
adoption blocker for schools. A teacher who cannot verify DSGVO compliance will not recommend
the platform — and neither will a school's data protection officer.

```arc42
:::quality-goal
id: qg-dsgvo-safety
title: DSGVO Safety by Design
priority: high
scenario: qs-no-third-party-data
:::
```

## Zero-Server Deployability

The platform must be fully deployable from a single `git push` with no server infrastructure,
no secrets management, and no operating cost. This ensures it remains viable as a community
project indefinitely and can be forked and run independently by any school or organization.

```arc42
:::quality-goal
id: qg-zero-server
title: Zero-server deployability
priority: high
scenario: qs-zero-server-cost
:::
```

## Contributor Friendliness

Submitting a new capability node or registry entry must take less than 15 minutes for a
contributor who has never contributed before. If submission is hard, contributors will not come —
and without contributors, the capability map cannot grow.

```arc42
:::quality-goal
id: qg-contributor-friendliness
title: Contributor friendliness (submission < 15 min)
priority: high
scenario: qs-first-submission
:::
```

## Forkability

The entire platform must be forkable and independently runnable within 30 minutes. Any school,
research group, or national education authority must be able to run their own instance with
their own data and branding. This is both a trust signal (no single point of control) and a
resilience mechanism.

```arc42
:::quality-goal
id: qg-forkability
title: Forkability (independent instance in < 30 min)
priority: medium
scenario: qs-fork-and-deploy
:::
```

## Performance on Mobile

The landing page must load in under 1.5 seconds on a mid-range mobile device on a 4G connection.
Core content must be readable without JavaScript. This reflects the reality of teacher usage
patterns: mobile phones in staffrooms, on the way to class, or during a planning break.

```arc42
:::quality-goal
id: qg-performance-mobile
title: Performance on mobile (LCP < 1.5s, works without JS)
priority: medium
scenario: qs-mobile-load
:::
```

---

## Quality Scenarios

### Zero Operating Cost

The platform runs at zero incremental cost to the maintainer. A community organization or
individual can keep the platform live indefinitely with no server bills, no database subscriptions,
and no hosting costs beyond the free GitHub Pages tier. This is the economic sustainability
guarantee that allows an open-source community to own the platform long-term.

```arc42
:::quality-scenario
id: qs-zero-server-cost
title: Platform operates at zero incremental server cost
quality: qg-zero-server
stimulus: Platform has been running for 12 months with 50+ registry entries and 200 monthly visitors
response: No server infrastructure, no database, no API hosting charges incurred
metric: Monthly infrastructure cost = 0 EUR (GitHub Free/Pro tier only)
:::
```

### No Third-Party Data Transfer

A teacher opens the edugo landing page on a school network with a strict firewall that blocks
all non-whitelisted external hosts. All page assets load successfully. No requests are made to
analytics services, font CDNs, tracking pixels, or social media widgets. The browser's network
log shows requests only to the GitHub Pages CDN domain and no others.

```arc42
:::quality-scenario
id: qs-no-third-party-data
title: No third-party data transfer on page load
quality: qg-dsgvo-safety
stimulus: Teacher opens edugo on a school network with external host blocking
response: All assets load; no requests to third-party domains
metric: Zero network requests to non-GitHub Pages domains in production build
:::
```

### Fork and Deploy

A developer forks the edugo GitHub repository, makes no configuration changes other than
enabling GitHub Pages in the fork's settings, and triggers the deploy workflow. A working
instance of the platform is live at their GitHub Pages URL within 30 minutes of forking.

```arc42
:::quality-scenario
id: qs-fork-and-deploy
title: Fork and deploy an independent instance
quality: qg-forkability
stimulus: Developer forks the repository and enables GitHub Pages
response: Working platform instance deployed at fork's GitHub Pages URL
metric: Time from fork to live instance < 30 minutes; zero configuration beyond GitHub Pages toggle
:::
```

### First Submission Under 15 Minutes

A teacher who has never submitted a GitHub PR before opens edugo, finds a gap in the capability
map, clicks "Submit a tool", and completes a valid registry entry. The entry passes schema
validation on the first attempt. Total elapsed time from clicking "Submit a tool" to a
merged PR (excluding maintainer review time) is under 15 minutes.

```arc42
:::quality-scenario
id: qs-first-submission
title: First-time contributor submits a valid entry in under 15 minutes
quality: qg-contributor-friendliness
stimulus: Teacher with no prior GitHub PR experience submits a registry entry
response: Valid PR opened with schema-passing YAML frontmatter entry
metric: Time from "Submit a tool" click to valid PR opened < 15 minutes
:::
```

### Mobile Landing Page Load

A teacher opens the edugo landing page on a mid-range Android phone on a 4G connection (20 Mbps,
50ms RTT). The Largest Contentful Paint (LCP) is under 1.5 seconds. The headline, problem
statement, and primary call-to-action are visible without scrolling and without JavaScript.

```arc42
:::quality-scenario
id: qs-mobile-load
title: Landing page LCP < 1.5s on mobile 4G
quality: qg-performance-mobile
stimulus: Mid-range Android phone on 4G opens the landing page
response: Page renders with LCP < 1.5s; core content readable without JavaScript
metric: Lighthouse mobile LCP < 1.5s; Core Web Vitals green; HTML renders meaningful content without JS
:::
```
