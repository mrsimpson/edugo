#!/usr/bin/env node
/**
 * Validate arc42 architecture documents.
 * Exits 1 if there are real model errors (excluding E013 = DOMPurify/Node 24 bug).
 *
 * Usage: node scripts/arc42-validate.mjs [--strict]
 *   --strict  Also exit 1 when hints are found
 */
import { execSync, spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const docsDir = join(__dirname, '..', 'docs')
const strict = process.argv.includes('--strict')

// Check arc42 is available
const which = spawnSync('which', ['arc42'], { encoding: 'utf-8' })
if (which.status !== 0) {
  console.error('arc42 CLI not found. Install: npm install -g @doctc/arc42@0.24.0')
  process.exit(1)
}

// Run validation — arc42 exits 1 on errors/warnings, we handle that ourselves
const result = spawnSync('arc42', ['validate', '--format', 'json'], {
  cwd: docsDir,
  encoding: 'utf-8',
})

let data
try {
  data = JSON.parse(result.stdout)
} catch (e) {
  console.error('Failed to parse arc42 JSON output:', e.message)
  console.error(result.stdout?.slice(0, 500))
  process.exit(1)
}

const diags = data.diagnostics ?? []

// E013 and E014 = DOMPurify/Node 24 bug in arc42 CLI — not our code, not actionable
const domPurifyBugCodes = new Set(['E013', 'E014'])
const realErrors = diags.filter(d => d.severity === 'error' && !domPurifyBugCodes.has(d.code))
const warnings   = diags.filter(d => d.severity === 'warning')
const hints      = diags.filter(d => d.severity === 'hint')
const bugErrors  = diags.filter(d => domPurifyBugCodes.has(d.code))

// Print findings
for (const d of [...realErrors, ...warnings, ...hints]) {
  const file = d.file.replace(docsDir + '/', '')
  console.log(`${d.severity} ${d.code}  ${file}:${d.line}  ${d.message}`)
}

if (bugErrors.length > 0) {
  console.log(`\n(${bugErrors.length} E013/E014 errors suppressed — DOMPurify/Node 24 bug in arc42 CLI, not our code)`)
}

console.log(`\narc42 validate: ${realErrors.length} model errors, ${warnings.length} warnings, ${hints.length} hints`)

if (realErrors.length > 0) {
  console.error('FAIL: model errors found')
  process.exit(1)
}

if (strict && hints.length > 0) {
  console.error('FAIL (--strict): hints found')
  process.exit(1)
}

console.log('OK')
process.exit(0)
