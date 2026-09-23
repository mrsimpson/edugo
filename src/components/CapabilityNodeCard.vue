<!--
  CapabilityNodeCard — displays a single capability node in the map grid.

  Layout: title, status badge, KMK domain chips, linked entry count.
  3-second scannable — no click needed to assess relevance.

  Design principles:
  - 3.2: Component receives data; does not fetch it
  - 1.5: User-visible text sourced from i18n
-->
<template>
  <article
    class="bg-white rounded-lg border border-gray-200 p-4 flex flex-col gap-3 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
    :aria-label="t.catalog.nodeCardAriaLabel(node.title)"
  >
    <!-- Status badge + title -->
    <div class="flex items-start gap-3">
      <span
        class="mt-0.5 shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
        :class="statusClass"
        :aria-label="t.status.ariaLabel(statusLabel)"
      >
        {{ statusLabel }}
      </span>
    </div>

    <h3 class="text-sm font-semibold text-gray-900 leading-snug">
      {{ node.title }}
    </h3>

    <!-- KMK domain chips -->
    <div
      v-if="node['kmk-domains']?.length"
      class="flex flex-wrap gap-1"
      :aria-label="t.catalog.filterKmkHeading"
    >
      <span
        v-for="domain in node['kmk-domains']"
        :key="domain"
        class="inline-flex items-center px-2 py-0.5 rounded text-xs bg-blue-50 text-blue-700 border border-blue-100"
      >
        KMK {{ domainMeta(domain)?.number }} · {{ domainMeta(domain)?.short }}
      </span>
    </div>

    <!-- Linked entry count -->
    <div class="mt-auto pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
      <span v-if="(node.linkedEntryCount ?? 0) > 0">
        {{ t.catalog.nodeToolCount(node.linkedEntryCount ?? 0) }}
      </span>
      <span v-else class="text-amber-600 font-medium">{{ t.catalog.nodeNoTools }}</span>
      <span class="text-blue-600 font-medium">{{ t.common.details }}</span>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { KMK_DOMAIN_META } from '../../schemas/capability-node.js'
import type { CapabilityNodeWithBody } from '../composables/useCapabilityNodes.js'
import type { KmkDomainValue } from '../../schemas/capability-node.js'
import { de as t } from '../i18n/de.js'

const props = defineProps<{
  node: CapabilityNodeWithBody
}>()

const statusClass = computed(() => ({
  'bg-red-100 text-red-700': props.node.status === 'needed',
  'bg-amber-100 text-amber-700': props.node.status === 'partial',
  'bg-green-100 text-green-700': props.node.status === 'well-covered',
}))

const statusLabel = computed(() => t.status[props.node.status] ?? props.node.status)

function domainMeta(slug: string) {
  return KMK_DOMAIN_META[slug as KmkDomainValue] ?? null
}
</script>
