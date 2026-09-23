/**
 * RegistryEntryCard — recipe-card layout for a registry entry.
 *
 * The teaser is the primary display element — it tells the teacher what students
 * will DO, not what the tool IS. It must be visible without clicking.
 *
 * Design principle 2.5: teaser comes from frontmatter, never from body parsing.
 * Design principle 3.2: component receives data; does not fetch it.
 */
<template>
  <article
    class="bg-white rounded-lg border border-gray-200 p-4 flex flex-col gap-3 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer h-full"
    :aria-label="`Tool: ${entry.title}`"
  >
    <!-- Title + DSGVO badge -->
    <div class="flex items-start justify-between gap-2">
      <h3 class="text-sm font-semibold text-gray-900 leading-snug flex-1">
        {{ entry.title }}
      </h3>
      <DsgvoBadge :status="entry.dsgvo ?? 'unknown'" class="shrink-0 mt-0.5" />
    </div>

    <!-- Teaser — the hook -->
    <p
      v-if="entry.teaser"
      class="text-sm text-gray-700 leading-relaxed italic"
    >
      „{{ entry.teaser }}"
    </p>
    <p v-else class="text-sm text-gray-400 italic">
      Kein Teaser eingetragen.
    </p>

    <!-- Capability nodes -->
    <div
      v-if="capabilityTitles.length"
      class="flex flex-wrap gap-1"
      aria-label="Adressierte Kompetenzen"
    >
      <span
        v-for="cap in capabilityTitles"
        :key="cap.id"
        class="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-50 text-gray-600 border border-gray-200"
      >
        {{ cap.title }}
      </span>
    </div>

    <!-- Footer: source link -->
    <div class="mt-auto pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
      <span v-if="entry['source-url']" class="text-blue-600 truncate max-w-[70%]">
        {{ sourceDomain }}
      </span>
      <span v-else class="text-gray-400">Kein Link eingetragen</span>
      <span class="text-blue-600 font-medium shrink-0">Details →</span>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import DsgvoBadge from './DsgvoBadge.vue'
import type { RegistryEntryWithBody } from '../composables/useRegistryEntries.js'
import type { CapabilityNodeWithBody } from '../composables/useCapabilityNodes.js'

const props = defineProps<{
  entry: RegistryEntryWithBody
  /** Pass the full nodes array so the card can resolve titles without fetching */
  nodes: CapabilityNodeWithBody[]
}>()

const capabilityTitles = computed(() =>
  props.entry.capabilities
    .map(id => {
      const node = props.nodes.find(n => n.id === id)
      return node ? { id, title: node.title } : { id, title: id }
    })
    .slice(0, 3), // show max 3 on card to keep layout compact
)

const sourceDomain = computed(() => {
  try {
    return new URL(props.entry['source-url'] ?? '').hostname
  } catch {
    return props.entry['source-url'] ?? ''
  }
})
</script>
