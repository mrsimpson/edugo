<!--
  RegistryView — the full solution registry (/apps).

  Design principles:
  - 3.3: Filter state in URL params
  - 2.5: Teaser from frontmatter, not body
  - 3.2: View wires composables to components; no inline data loading
-->
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Page header -->
    <div class="mb-6 flex items-start justify-between gap-4 flex-wrap">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">{{ t.registry.pageTitle }}</h1>
        <p class="mt-1 text-sm text-gray-500">
          {{ t.registry.resultCount(filteredEntries.length, entries.length) }}
          <template v-if="filters.dsgvo.length > 0 || filters.capability">
            {{ t.registry.resultCountFiltered }}
          </template>
          <span aria-live="polite" aria-atomic="true" class="sr-only">
            {{ t.registry.resultLiveAnnouncement(filteredEntries.length) }}
          </span>
        </p>
      </div>
      <!-- Contribution CTA -->
      <a
        :href="newEntryUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        :aria-label="t.registry.addButtonAriaLabel"
      >
        {{ t.registry.addButtonLabel }}
      </a>
    </div>

    <div class="flex flex-col lg:flex-row gap-6">
      <!-- Filter panel -->
      <div class="lg:w-64 shrink-0">
        <RegistryFilterPanel
          :filters="filters"
          :dsgvo-counts="dsgvoCounts"
          @toggle-dsgvo="toggleDsgvo"
          @set-capability="setCapability"
          @reset-filters="resetFilters"
        />
      </div>

      <!-- Entry grid -->
      <div class="flex-1">
        <div
          v-if="filteredEntries.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
          role="list"
          :aria-label="t.registry.listAriaLabel"
        >
          <router-link
            v-for="entry in filteredEntries"
            :key="entry.id"
            :to="`/apps/${entry.id}`"
            class="block no-underline"
            role="listitem"
          >
            <RegistryEntryCard :entry="entry" :nodes="nodes" />
          </router-link>
        </div>

        <!-- Empty state -->
        <div
          v-else
          class="text-center py-16 text-gray-500"
          role="status"
          aria-live="polite"
        >
          <p class="text-lg font-medium">{{ t.registry.emptyHeading }}</p>
          <p class="text-sm mt-1">{{ t.registry.emptyBody }}</p>
          <button
            class="mt-4 text-sm text-blue-600 underline"
            @click="resetFilters"
          >
            {{ t.common.filterReset }}
          </button>
        </div>

        <!-- "Registry is young" notice when unfiltered -->
        <div
          v-if="!filters.dsgvo.length && !filters.capability && entries.length < 10"
          class="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4"
        >
          <p class="text-sm font-medium text-blue-900">{{ t.registry.youngNoticeHeading }}</p>
          <p class="text-sm text-blue-700 mt-0.5">
            {{ t.registry.youngNoticeBody }}
            <a
              :href="newEntryUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="underline font-medium"
            >{{ t.registry.youngNoticeLink }}</a>.
            {{ t.registry.youngNoticeSuffix }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRegistryEntries } from '../composables/useRegistryEntries.js'
import { useCapabilityNodes } from '../composables/useCapabilityNodes.js'
import { useRegistryFilters } from '../composables/useRegistryFilters.js'
import RegistryEntryCard from '../components/RegistryEntryCard.vue'
import RegistryFilterPanel from '../components/RegistryFilterPanel.vue'
import { de as t } from '../i18n/de.js'

const { entries } = useRegistryEntries()
const { nodes } = useCapabilityNodes()
const { filters, filteredEntries, dsgvoCounts, toggleDsgvo, setCapability, resetFilters } =
  useRegistryFilters(entries)

const newEntryUrl =
  'https://github.com/mrsimpson/edugo/new/main/data/entries?filename=my-tool.md&message=feat%3A+add+registry+entry+my-tool&value=---%0Aid%3A+my-tool%0Atitle%3A+%22Mein+Tool%22%0Acapabilities%3A%0A++-%20%3Cnode-id%3E%0Ateaser%3A+%22Sch%C3%BCler+...%22%0Adsgvo%3A+unknown%0A---'
</script>
