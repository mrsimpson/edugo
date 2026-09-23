/**
 * DsgvoBadge — renders the DSGVO trust signal for a registry entry.
 * Three states: frontend-only (green), claimed-safe (amber), unknown (grey).
 *
 * Design principle 1.3: Trust signals are computed from YAML fields, never editorial.
 */
<template>
  <span
    class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium"
    :class="meta.classes"
    :title="meta.tooltip"
    :aria-label="`DSGVO-Status: ${meta.label}`"
  >
    <span aria-hidden="true">{{ meta.icon }}</span>
    {{ meta.label }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DSGVO_STATUS_META, type DsgvoStatusValue } from '../../schemas/registry-entry.js'

const props = defineProps<{
  status: string
}>()

const CLASSES: Record<DsgvoStatusValue, string> = {
  'frontend-only': 'bg-green-100 text-green-800 border border-green-200',
  'claimed-safe': 'bg-amber-100 text-amber-800 border border-amber-200',
  unknown: 'bg-gray-100 text-gray-600 border border-gray-200',
}

const ICONS: Record<DsgvoStatusValue, string> = {
  'frontend-only': '🛡',
  'claimed-safe': '✓',
  unknown: '?',
}

const meta = computed(() => {
  const s = (props.status ?? 'unknown') as DsgvoStatusValue
  const m = DSGVO_STATUS_META[s] ?? DSGVO_STATUS_META.unknown
  return {
    label: m.label,
    tooltip: m.tooltip,
    classes: CLASSES[s] ?? CLASSES.unknown,
    icon: ICONS[s] ?? ICONS.unknown,
  }
})
</script>
