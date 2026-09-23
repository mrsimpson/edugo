/**
 * useRegistryEntries — loads all data/entries/*.md at build time.
 * Parses YAML frontmatter and exposes flat array of typed entries.
 */
import { ref, readonly, type Ref } from 'vue'
import { parse as parseYaml } from 'yaml'
import type { RegistryEntry } from '../../schemas/registry-entry.js'

export interface RegistryEntryWithBody extends RegistryEntry {
  body: string
}

const rawFiles = import.meta.glob('/data/entries/*.md', {
  eager: true,
  query: '?raw', import: 'default',
}) as Record<string, string>

function parseFrontmatter(raw: string): { fm: Record<string, unknown>; body: string } {
  const normalized = raw.replace(/\r\n/g, '\n')
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) return { fm: {}, body: normalized }
  return {
    fm: parseYaml(match[1]) as Record<string, unknown>,
    body: match[2].trim(),
  }
}

let _entries: RegistryEntryWithBody[] | null = null

function loadEntries(): RegistryEntryWithBody[] {
  if (_entries) return _entries
  _entries = Object.entries(rawFiles)
    .map(([, raw]) => {
      const { fm, body } = parseFrontmatter(raw)
      return { ...fm, body } as RegistryEntryWithBody
    })
    .sort((a, b) => a.title.localeCompare(b.title, 'de'))
  return _entries
}

export function useRegistryEntries(): {
  entries: Readonly<Ref<RegistryEntryWithBody[]>>
} {
  const entries = ref<RegistryEntryWithBody[]>(loadEntries())
  return { entries: readonly(entries) }
}
