/**
 * Validate all data files in data/capabilities/ and data/entries/ against their Zod schemas.
 * Used locally and in CI (after ajv is set up).
 * 
 * Usage: npx tsx scripts/validate-data.ts
 */
import { readFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse as parseYaml } from 'yaml'
import { CapabilityNodeSchema } from '../schemas/capability-node.js'
import { RegistryEntrySchema } from '../schemas/registry-entry.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

function parseFrontmatter(content: string): unknown | null {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return null
  return parseYaml(match[1])
}

let errors = 0

function validateDir(dir: string, schema: typeof CapabilityNodeSchema | typeof RegistryEntrySchema, label: string) {
  const files = readdirSync(dir).filter(f => f.endsWith('.md'))
  for (const file of files) {
    const content = readFileSync(join(dir, file), 'utf-8')
    const fm = parseFrontmatter(content)
    if (!fm) {
      console.error(`✗ ${label}/${file} — no YAML frontmatter found`)
      errors++
      continue
    }
    const result = schema.safeParse(fm)
    if (!result.success) {
      console.error(`✗ ${label}/${file}`)
      for (const issue of result.error.issues) {
        console.error(`  - ${issue.path.join('.')}: ${issue.message}`)
      }
      errors++
    } else {
      console.log(`✓ ${label}/${file}`)
    }
  }
}

validateDir(join(root, 'data/capabilities'), CapabilityNodeSchema, 'capabilities')
validateDir(join(root, 'data/entries'), RegistryEntrySchema, 'entries')

if (errors > 0) {
  console.error(`\n${errors} validation error(s) found.`)
  process.exit(1)
} else {
  console.log('\nAll data files valid.')
}
