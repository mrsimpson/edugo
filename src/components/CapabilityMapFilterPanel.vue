<!--
  CapabilityMapFilterPanel — KMK domain checkboxes + gap toggle.
  Writes directly to URL query params via the filter composable.

  Design principles:
  - 3.3: Filter state lives in URL
  - Shows result counts per domain to prevent dead-end filtering
-->
<template>
  <aside
    class="bg-white rounded-lg border border-gray-200 p-4 flex flex-col gap-4"
    :aria-label="t.catalog.filterPanelAriaLabel"
  >
    <!-- Gap toggle -->
    <div>
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
        {{ t.catalog.filterViewHeading }}
      </h3>
      <label class="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          :checked="filters.gap"
          class="rounded border-gray-300 text-blue-600"
          :aria-label="t.catalog.filterGapAriaLabel"
          @change="setGap(!filters.gap)"
        />
        <span class="text-sm text-gray-700">{{ t.catalog.filterGapLabel }}</span>
        <span class="text-xs text-gray-400">({{ gapCount }})</span>
      </label>
    </div>

    <!-- KMK domain filter -->
    <div>
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
        {{ t.catalog.filterKmkHeading }}
      </h3>
      <div
        role="group"
        :aria-label="t.catalog.filterKmkAriaLabel"
        class="flex flex-col gap-1.5"
      >
        <label
          v-for="domain in KMK_DOMAINS"
          :key="domain.slug"
          class="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="checkbox"
            :checked="filters.kmk.includes(domain.slug)"
            :aria-label="t.catalog.filterKmkDomainAriaLabel(domain.title, domainCount(domain.slug))"
            class="rounded border-gray-300 text-blue-600"
            @change="toggleKmk(domain.slug)"
          />
          <span class="text-sm text-gray-700 flex-1">
            KMK {{ domain.number }} · {{ domain.short }}
          </span>
          <span class="text-xs text-gray-400">{{ domainCount(domain.slug) }}</span>
        </label>
      </div>
    </div>

    <!-- Reset -->
    <button
      v-if="filters.kmk.length > 0 || filters.gap"
      class="text-xs text-blue-600 hover:text-blue-800 underline text-left"
      :aria-label="t.common.filterResetAriaLabel"
      @click="resetFilters"
    >
      {{ t.common.filterReset }}
    </button>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { KMK_DOMAIN_META, type KmkDomainValue } from '../../schemas/capability-node.js'
import type { CapabilityNodeWithBody } from '../composables/useCapabilityNodes.js'
import type { CapabilityMapFilters } from '../composables/useCapabilityMapFilters.js'
import { de as t } from '../i18n/de.js'

const props = defineProps<{
  filters: CapabilityMapFilters
  allNodes: CapabilityNodeWithBody[]
}>()

const emit = defineEmits<{
  'toggle-kmk': [domain: KmkDomainValue]
  'set-gap': [value: boolean]
  'reset-filters': []
}>()

const KMK_DOMAINS = Object.entries(KMK_DOMAIN_META).map(([slug, meta]) => ({
  slug: slug as KmkDomainValue,
  ...meta,
}))

const gapCount = computed(() =>
  props.allNodes.filter(n => n.status === 'needed' || n.status === 'partial').length,
)

function domainCount(slug: KmkDomainValue): number {
  return props.allNodes.filter(n => n['kmk-domains']?.includes(slug)).length
}

function toggleKmk(slug: KmkDomainValue) {
  emit('toggle-kmk', slug)
}

function setGap(value: boolean) {
  emit('set-gap', value)
}

function resetFilters() {
  emit('reset-filters')
}
</script>
