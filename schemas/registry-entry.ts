import { z } from 'zod'

// ─── DSGVO trust status ───────────────────────────────────────────────────────

export const DsgvoStatus = z.enum(['frontend-only', 'claimed-safe', 'unknown']).describe(
  'Data safety status: ' +
    'frontend-only = no backend, structurally no data exfiltration possible; ' +
    'claimed-safe = contributor asserts DSGVO compliance but not structurally verifiable; ' +
    'unknown = status not assessed (default)',
)

export type DsgvoStatusValue = z.infer<typeof DsgvoStatus>

// Human-readable metadata for UI rendering
export const DSGVO_STATUS_META: Record<DsgvoStatusValue, { label: string; color: string; tooltip: string }> = {
  'frontend-only': {
    label: 'Frontend-only',
    color: 'green',
    tooltip: 'Kein Backend — strukturell keine Datenweitergabe möglich',
  },
  'claimed-safe': {
    label: 'DSGVO-konform (Eigenauskunft)',
    color: 'amber',
    tooltip: 'Anbieter erklärt DSGVO-Konformität — nicht strukturell verifiziert',
  },
  unknown: {
    label: 'DSGVO-Status unbekannt',
    color: 'grey',
    tooltip: 'Datenschutzstatus nicht bewertet — bitte vor Einsatz prüfen',
  },
}

// ─── Registry Entry schema ────────────────────────────────────────────────────

export const RegistryEntrySchema = z
  .object({
    id: z
      .string()
      .regex(/^[a-z][a-z0-9-]*$/, 'id must be a lowercase hyphen-separated slug')
      .describe('Lowercase hyphen-separated slug — also the filename without .md'),
    title: z.string().min(1).describe('Tool or project name'),
    capabilities: z
      .array(z.string().regex(/^[a-z][a-z0-9-]*$/))
      .min(1)
      .describe('One or more capability node IDs this entry addresses'),
    dsgvo: DsgvoStatus.optional().default('unknown').describe(
      'DSGVO trust level. Defaults to unknown if not specified.',
    ),
    teaser: z
      .string()
      .max(200)
      .optional()
      .describe(
        'One German sentence — the discovery hook shown on the card. ' +
          'Example: "Schüler entdecken, warum die 7 am häufigsten fällt."',
      ),
    'source-url': z.string().url().optional().describe('URL to the source repository or project page'),
  })
  .catchall(z.unknown()) // allows x- extension fields

export type RegistryEntry = z.infer<typeof RegistryEntrySchema>
