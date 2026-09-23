import { z } from 'zod'

// ─── KMK Kompetenzrahmen domains (KMK 2016, stable external reference) ────────
// Six competency domains from "Kompetenzen in der digitalen Welt"
// Slugs are used in YAML data files; display numbers come from .meta()

export const KmkDomain = z.union([
  z.literal('suchen-verarbeiten').describe('Suchen, Verarbeiten und Aufbewahren (KMK 1)'),
  z.literal('kommunizieren-kooperieren').describe('Kommunizieren und Kooperieren (KMK 2)'),
  z.literal('produzieren-praesentieren').describe('Produzieren und Präsentieren (KMK 3)'),
  z.literal('schuetzen-agieren').describe('Schützen und sicher Agieren (KMK 4)'),
  z.literal('problemloesen-handeln').describe('Problemlösen und Handeln (KMK 5)'),
  z.literal('analysieren-reflektieren').describe('Analysieren und Reflektieren (KMK 6)'),
])

export type KmkDomainValue = z.infer<typeof KmkDomain>

// Human-readable metadata for UI rendering — keyed by slug
export const KMK_DOMAIN_META: Record<KmkDomainValue, { title: string; short: string; number: number }> = {
  'suchen-verarbeiten': { title: 'Suchen, Verarbeiten und Aufbewahren', short: 'Suchen', number: 1 },
  'kommunizieren-kooperieren': { title: 'Kommunizieren und Kooperieren', short: 'Kommunizieren', number: 2 },
  'produzieren-praesentieren': { title: 'Produzieren und Präsentieren', short: 'Produzieren', number: 3 },
  'schuetzen-agieren': { title: 'Schützen und sicher Agieren', short: 'Schützen', number: 4 },
  'problemloesen-handeln': { title: 'Problemlösen und Handeln', short: 'Problemlösen', number: 5 },
  'analysieren-reflektieren': { title: 'Analysieren und Reflektieren', short: 'Reflektieren', number: 6 },
}

// ─── Capability Node schema ───────────────────────────────────────────────────

export const CapabilityNodeSchema = z
  .object({
    id: z
      .string()
      .regex(/^[a-z][a-z0-9-]*$/, 'id must be a lowercase hyphen-separated slug')
      .describe('Lowercase hyphen-separated English slug — also the filename without .md'),
    title: z
      .string()
      .min(1)
      .describe('German learning outcome title — what students will be able to do'),
    status: z
      .enum(['needed', 'partial', 'well-covered'])
      .describe(
        'Coverage status: needed = no tool exists, partial = some coverage, well-covered = good tools exist',
      ),
    'kmk-domains': z
      .array(KmkDomain)
      .min(1)
      .describe(
        'One or more KMK Kompetenzrahmen domain slugs this outcome aligns to. ' +
          'Valid values: suchen-verarbeiten, kommunizieren-kooperieren, produzieren-praesentieren, ' +
          'schuetzen-agieren, problemloesen-handeln, analysieren-reflektieren',
      ),
  })
  .catchall(z.unknown()) // allows x- extension fields

export type CapabilityNode = z.infer<typeof CapabilityNodeSchema>
