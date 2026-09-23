/**
 * useCapabilityNodes — loads all data/capabilities/*.md at build time,
 * parses YAML frontmatter, returns typed flat array.
 *
 * Design principles:
 * - 1.4: All loading at build time via import.meta.glob, no runtime requests
 * - 1.1: Data is the source of truth; this composable is a read-only view
 */
import { ref, type Ref } from 'vue'
import { parse as parseYaml } from 'yaml'
import type { CapabilityNode } from '../../schemas/capability-node.js'

export interface CapabilityNodeWithBody extends CapabilityNode {
  body: string
  /** count of registry entries linked to this node — populated by useRegistryEntries */
  linkedEntryCount?: number
}

// Load all capability markdown files at build time
const rawFiles = import.meta.glob('/data/capabilities/*.md', {
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

let _nodes: CapabilityNodeWithBody[] | null = null

function loadNodes(): CapabilityNodeWithBody[] {
  if (_nodes) return _nodes
  _nodes = Object.entries(rawFiles)
    .map(([path, raw]) => {
      const { fm, body } = parseFrontmatter(raw)
      return { ...fm, body } as CapabilityNodeWithBody
    })
    .sort((a, b) => a.title.localeCompare(b.title, 'de'))
  return _nodes
}

export function useCapabilityNodes(): {
  nodes: Ref<CapabilityNodeWithBody[]>
} {
  const nodes = ref<CapabilityNodeWithBody[]>(loadNodes())
  return { nodes }
}
