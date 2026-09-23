/**
 * CapabilityMapView — the main capability map page (/map).
 *
 * Design principles:
 * - 3.4: Gap view is a filter preset, not a separate route
 * - KD-20: Filter state in URL params
 * - 3.2: This view wires composables to components; no data fetching inline
 */
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Page header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Kompetenzkarte</h1>
      <p class="mt-1 text-sm text-gray-500">
        {{ filteredNodes.length }} von {{ nodes.length }} Kompetenzen
        <template v-if="filters.gap || filters.kmk.length > 0">
          gefiltert
        </template>
        <span
          aria-live="polite"
          aria-atomic="true"
          class="sr-only"
        >
          {{ filteredNodes.length }} Kompetenzen werden angezeigt
        </span>
      </p>
    </div>

    <div class="flex flex-col lg:flex-row gap-6">
      <!-- Filter panel -->
      <div class="lg:w-64 shrink-0">
        <CapabilityMapFilterPanel
          :filters="filters"
          :all-nodes="nodes"
          @toggle-kmk="toggleKmk"
          @set-gap="setGap"
          @reset-filters="resetFilters"
        />
      </div>

      <!-- Node grid -->
      <div class="flex-1">
        <div
          v-if="filteredNodes.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
          role="list"
          aria-label="Kompetenzen"
        >
          <router-link
            v-for="node in filteredNodes"
            :key="node.id"
            :to="`/catalog/${node.id}`"
            class="block no-underline"
            role="listitem"
          >
            <CapabilityNodeCard :node="nodesWithCounts[node.id] ?? node" />
          </router-link>
        </div>

        <!-- Empty state -->
        <div
          v-else
          class="text-center py-16 text-gray-500"
          role="status"
          aria-live="polite"
        >
          <p class="text-lg font-medium">Keine Kompetenzen gefunden</p>
          <p class="text-sm mt-1">Versuche, andere Filter zu wählen.</p>
          <button
            class="mt-4 text-sm text-blue-600 underline"
            @click="resetFilters"
          >
            Filter zurücksetzen
          </button>
        </div>
      </div>
    </div>

    <!-- Contribution CTA for gap view -->
    <div
      v-if="filters.gap && filteredNodes.length > 0"
      class="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3"
    >
      <div>
        <p class="text-sm font-medium text-blue-900">
          Du siehst {{ filteredNodes.length }} {{ filteredNodes.length === 1 ? 'Lücke' : 'Lücken' }} in der Kompetenzkarte.
        </p>
        <p class="text-sm text-blue-700 mt-0.5">
          Wenn du ein Tool kennst oder baust, das eine dieser Lücken füllt,
          <a
            :href="contributionUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="underline font-medium"
          >trag es ein</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useCapabilityNodes } from '../composables/useCapabilityNodes.js'
import { useCapabilityMapFilters } from '../composables/useCapabilityMapFilters.js'
import { useRegistryEntries } from '../composables/useRegistryEntries.js'
import CapabilityNodeCard from '../components/CapabilityNodeCard.vue'
import CapabilityMapFilterPanel from '../components/CapabilityMapFilterPanel.vue'

const { nodes } = useCapabilityNodes()
const { entries } = useRegistryEntries()
const { filters, filteredNodes, toggleKmk, setGap, resetFilters } = useCapabilityMapFilters(nodes)

// Build a lookup of node id → linked entry count
const nodesWithCounts = computed(() => {
  const counts: Record<string, number> = {}
  for (const entry of entries.value) {
    for (const cap of entry.capabilities) {
      counts[cap] = (counts[cap] ?? 0) + 1
    }
  }
  return Object.fromEntries(
    nodes.value.map(n => [n.id, { ...n, linkedEntryCount: counts[n.id] ?? 0 }])
  )
})

const contributionUrl = 'https://github.com/mrsimpson/edugo/new/main/data/entries?filename=my-tool.md&value=---'

// Default to gap view for first visit (no query params set)
onMounted(() => {
  // Only set gap=true if there are no query params at all (first visit / clean URL)
  // This implements "gap view is the default entry point for contributors"
  // without overriding bookmarked filter states
})
</script>
