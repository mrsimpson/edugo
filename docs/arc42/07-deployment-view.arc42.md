# Deployment View

<!--
Arc42 chapter 7. The infrastructure and deployment mapping for edugo.
-->

The deployment topology is intentionally minimal. There is one environment (production) and one
infrastructure provider (GitHub). The entire platform is static files served by GitHub Pages.
There is no separate staging environment in Phase 1 — PRs include a GitHub Actions preview deploy
as the testing surface.

## GitHub (Infrastructure Provider)

GitHub provides the full infrastructure stack: repository hosting, CI/CD execution (GitHub
Actions), static site serving (GitHub Pages), and contribution workflow (Pull Requests).

```arc42
:::deployment-node
id: dn-github
title: GitHub
type: cloud-region
:::
```

## GitHub Pages (CDN / Static Host)

GitHub Pages serves the built static assets globally via CDN. It hosts the merged output of
the Vue app build (`dist/`) and the VitePress docs build (`docs/.vitepress/dist/`). No server-side
rendering, no API proxy, no runtime environment.

```arc42
:::deployment-node
id: dn-github-pages
title: GitHub Pages (Static Host / CDN)
type: server
parent: dn-github
hosts: bb-website, bb-capability-map, bb-registry, bb-docs
:::
```

## GitHub Actions (CI/CD Runner)

GitHub Actions provides the compute environment for validation, building, and deployment. Two
workflow types:
- **PR workflow**: triggered on pull_request events; runs schema validation against `data/`
- **Deploy workflow**: triggered on push to `main`; runs `vp build`, VitePress build, and
  deploys merged output to GitHub Pages

```arc42
:::deployment-node
id: dn-github-actions
title: GitHub Actions (CI/CD Runner)
type: container
parent: dn-github
hosts: bb-cicd, bb-data
:::
```

## Browser (User Agent)

The user's browser is the runtime for all application logic. Vue 3 renders and hydrates the
application client-side. UnoCSS styles are bundled. There is no server-side session, no
authentication, no cookies (beyond SPA navigation state).

```arc42
:::deployment-node
id: dn-browser
title: User Browser
type: device
hosts: bb-website, bb-capability-map, bb-registry
:::
```

## Deployment Diagram

```arc42
:::diagram
id: dep-diagram
notation: mermaid
:::
```

```mermaid
graph TD
  subgraph github["GitHub"]
    subgraph pages["GitHub Pages (CDN)"]
      site["Website + Capability Map\n+ Solution Registry\n(dist/)"]
      docs["Architecture Docs\n(docs/.vitepress/dist/)"]
    end
    subgraph actions["GitHub Actions"]
      validate["PR Validate workflow\n(schema check)"]
      deploy["Deploy workflow\n(vp build + vitepress build\n+ gh-pages deploy)"]
    end
    repo["Repository\n(source + data files)"]
  end

  browser["User Browser"] -->|HTTPS| site
  browser -->|HTTPS| docs

  repo -->|pull_request event| validate
  repo -->|push to main| deploy
  deploy -->|static files| pages
```

## Build Output Structure

The two build outputs are merged under a single deploy root to avoid base-path conflicts:

```
deploy-root/
├── index.html          # Website landing page (Vue app entry)
├── assets/             # Vue app JS/CSS bundle (Vite+ output)
├── capability-map/     # Capability map SPA routes
├── registry/           # Registry SPA routes
└── docs/               # VitePress docs site
    ├── index.html
    └── arc42/          # arc42 chapters rendered as pages
```

The base path for the Vue app is `/` (or the GitHub Pages repo sub-path if deployed under a
user/org repo rather than a custom domain). VitePress is configured with `base: '/docs/'` to
match the deploy root structure.
