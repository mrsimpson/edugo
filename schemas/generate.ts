/**
 * Generate JSON Schema files from Zod schemas using Zod v4's built-in toJSONSchema.
 *
 * Usage:
 *   npm run generate-schemas          — write schemas/generated/*.json
 *   npm run check-schemas             — fail if generated files are out of sync
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { z } from 'zod'
import { CapabilityNodeSchema } from './capability-node.js'
import { RegistryEntrySchema } from './registry-entry.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, 'generated')
const checkMode = process.argv.includes('--check')

mkdirSync(outDir, { recursive: true })

/**
 * Post-process a generated JSON Schema object to enforce the x- prefix convention:
 * Replace the unrestricted `additionalProperties: {}` that z.catchall() produces
 * with `patternProperties: { "^x-": {} }` + `additionalProperties: false`.
 * Also move optional-with-default fields (dsgvo) out of `required`.
 */
function enforceXPrefixConvention(schema: Record<string, unknown>, optionalFields: string[] = []): Record<string, unknown> {
  const result = { ...schema }

  // Replace catchall additionalProperties with x- pattern restriction
  if ('additionalProperties' in result && JSON.stringify(result.additionalProperties) === '{}') {
    delete result.additionalProperties
    result.patternProperties = { '^x-': {} }
    result.additionalProperties = false
  }

  // Move optional-with-default fields out of required (Zod v4 toJSONSchema includes
  // them in required because the *output* type always has them after default is applied,
  // but the *input* schema should treat them as optional)
  if (optionalFields.length > 0 && Array.isArray(result.required)) {
    result.required = (result.required as string[]).filter(f => !optionalFields.includes(f))
    if ((result.required as string[]).length === 0) delete result.required
  }

  return result
}

const schemas = [
  {
    name: 'capability-node.v1.schema.json',
    schema: enforceXPrefixConvention(
      z.toJSONSchema(CapabilityNodeSchema, { target: 'draft-2020-12' }) as Record<string, unknown>,
    ),
  },
  {
    name: 'registry-entry.v1.schema.json',
    schema: enforceXPrefixConvention(
      z.toJSONSchema(RegistryEntrySchema, { target: 'draft-2020-12' }) as Record<string, unknown>,
      ['dsgvo'], // optional with default — should not be required in JSON Schema
    ),
  },
]

let allInSync = true

for (const { name, schema } of schemas) {
  const outPath = join(outDir, name)
  const generated = JSON.stringify(schema, null, 2) + '\n'

  if (checkMode) {
    let existing: string
    try {
      existing = readFileSync(outPath, 'utf-8')
    } catch {
      console.error(`✗ ${name} — file missing (run npm run generate-schemas)`)
      allInSync = false
      continue
    }
    if (existing !== generated) {
      console.error(`✗ ${name} — out of sync with Zod source (run npm run generate-schemas)`)
      allInSync = false
    } else {
      console.log(`✓ ${name} — in sync`)
    }
  } else {
    writeFileSync(outPath, generated, 'utf-8')
    console.log(`✓ ${name} — written to ${outPath}`)
  }
}

if (checkMode && !allInSync) {
  process.exit(1)
}
