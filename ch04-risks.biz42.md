# Chapter 4: Risks

## Island proliferation

As AI-assisted development makes it trivially cheap to build educational tools, there is a real risk that the community produces hundreds of isolated, incompatible tools with no shared vocabulary, no common capability map, and no coordination layer. Each tool reinvents the same patterns, and the ecosystem fragments instead of compounds. Likelihood is high given current trends; impact is high as it would undermine edugo's core value proposition.

```biz42
:::risk
id: risk-island
title: Island proliferation — fragmented tools with no coordination layer
severity: high
mitigation: edugo's capability map and registry provide the coordination layer; architecture guidelines ensure tools are ecosystem-connected from day one
:::
```

## DSGVO barrier and unsafe adoption

DSGVO compliance is a hard requirement in German schools. Tools that have not passed official review are technically off-limits, yet teachers adopt them anyway on personal accounts. This creates legal exposure for teachers and schools, and erodes trust in community-built tools generally when incidents occur. Likelihood is high; impact is high as it directly blocks or endangers the core adoption path.

```biz42
:::risk
id: risk-dsgvo
title: DSGVO non-compliance blocks or dangerously bypasses school adoption
severity: high
mitigation: frontend-only badge provides structural DSGVO guarantee; trust signal taxonomy makes compliance status visible at a glance
:::
```

## Tool invisibility

Genuinely effective educational tools are created by engaged individuals, shared briefly on social media or at barcamps, and then vanish. There is no registry, no canonical URL, no fork lineage — the community's creative output is structurally invisible and unreusable. Likelihood is certain (already observed); impact is high as it means the ecosystem never compounds.

```biz42
:::risk
id: risk-invisibility
title: Community-built tools are structurally invisible and unrecoverable
severity: high
mitigation: solution registry with PR-based contributions gives every tool a permanent, findable, linkable entry
:::
```

## Unsafe adoption driven by teacher isolation

When teachers cannot find safe, vetted tools through official channels, they resort to whatever they find informally — often passive content platforms or tools with unclear data practices. This is not a knowledge failure; it is a structural gap in the ecosystem that edugo is positioned to fill. Likelihood is high (already observed); impact is medium — harmful to individual teachers but not existential for edugo.

```biz42
:::risk
id: risk-unsafe-adoption
title: Teachers adopt unsafe or pedagogically passive tools by default
severity: high
mitigation: solution registry with active/passive taxonomy and DSGVO signals gives teachers a fast, trustworthy alternative discovery path
:::
```

## Endorsement reputation risk

If edugo lists or highlights a tool that later proves harmful — to student data, pedagogical outcomes, or community trust — it risks becoming associated with the failure, undermining the credibility of the entire platform. Likelihood is low in the short term; impact is medium.

```biz42
:::ignore H005 risk-endorsement is an internally-inferred reputational risk with no single external signal — accepted as a known gap
:::

:::risk
id: risk-endorsement
title: Reputational risk from endorsing a tool that later proves harmful
severity: medium
mitigation: progressive trust model (anecdotal → community-validated → research-backed) distributes responsibility; no single authority endorses tools
:::
```
