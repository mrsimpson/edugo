<!--
  RegistryFilterPanel — DSGVO filter for the registry.
  Shows result counts per status value to prevent dead-end filtering.
-->
<template>
  <aside
    class="bg-white rounded-lg border border-gray-200 p-4 flex flex-col gap-4"
    :aria-label="t.registry.filterPanelAriaLabel"
  >
    <!-- DSGVO filter -->
    <div>
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
        {{ t.registry.filterDsgvoHeading }}
      </h3>
      <div
        role="group"
        :aria-label="t.registry.filterDsgvoAriaLabel"
        class="flex flex-col gap-1.5"
      >
        <label
          v-for="item in DSGVO_OPTIONS"
          :key="item.status"
          class="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="checkbox"
            :checked="filters.dsgvo.includes(item.status)"
            :aria-label="t.registry.filterDsgvoOptionAriaLabel(item.label, dsgvoCounts[item.status])"
            class="rounded border-gray-300 text-blue-600"
            @change="emit('toggle-dsgvo', item.status)"
          />
          <span class="flex items-center gap-1.5 flex-1 text-sm text-gray-700">
            <span
              class="inline-block w-2 h-2 rounded-full"
              :class="item.dot"
              aria-hidden="true"
            />
            {{ item.label }}
          </span>
          <span class="text-xs text-gray-400">{{ dsgvoCounts[item.status] }}</span>
        </label>
      </div>
    </div>

    <!-- Active capability filter indicator -->
    <div v-if="filters.capability" class="border-t border-gray-100 pt-3">
      <p class="text-xs text-gray-500 mb-1">{{ t.registry.filterCapabilityLabel }}</p>
      <div class="flex items-center gap-2">
        <span class="text-xs text-blue-700 bg-blue-50 border border-blue-200 rounded px-2 py-0.5 flex-1 truncate">
          {{ filters.capability }}
        </span>
        <button
          class="text-xs text-gray-400 hover:text-gray-700"
          :aria-label="t.registry.filterCapabilityRemoveAriaLabel"
          @click="emit('set-capability', null)"
        >
          ✕
        </button>
      </div>
    </div>

    <!-- Reset -->
    <button
      v-if="filters.dsgvo.length > 0 || filters.capability"
      class="text-xs text-blue-600 hover:text-blue-800 underline text-left"
      :aria-label="t.common.filterResetAriaLabel"
      @click="emit('reset-filters')"
    >
      {{ t.common.filterReset }}
    </button>
  </aside>
</template>

<script setup lang="ts">
import { DSGVO_STATUS_META, type DsgvoStatusValue } from '../../schemas/registry-entry.js'
import type { RegistryFilters } from '../composables/useRegistryFilters.js'
import { de as t } from '../i18n/de.js'

const props = defineProps<{
  filters: RegistryFilters
  dsgvoCounts: Record<DsgvoStatusValue, number>
}>()

const emit = defineEmits<{
  'toggle-dsgvo': [status: DsgvoStatusValue]
  'set-capability': [id: string | null]
  'reset-filters': []
}>()

const DOT_CLASSES: Record<DsgvoStatusValue, string> = {
  'frontend-only': 'bg-green-500',
  'claimed-safe': 'bg-amber-400',
  unknown: 'bg-gray-400',
}

const DSGVO_OPTIONS = (Object.entries(DSGVO_STATUS_META) as [DsgvoStatusValue, typeof DSGVO_STATUS_META[DsgvoStatusValue]][]).map(
  ([status, meta]) => ({
    status,
    label: meta.label,
    dot: DOT_CLASSES[status],
  }),
)
</script>
