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

const schemas = [
  {
    name: 'capability-node.v1.schema.json',
    schema: z.toJSONSchema(CapabilityNodeSchema, {
      target: 'draft-2020-12',
    }),
  },
  {
    name: 'registry-entry.v1.schema.json',
    schema: z.toJSONSchema(RegistryEntrySchema, {
      target: 'draft-2020-12',
    }),
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
