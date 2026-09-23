<!--
  RegistryEntryDetailView — full detail page for a registry entry (/apps/:id).

  Shows: DSGVO badge with explanation, capability node links, full Markdown body,
  source-url CTA. "Similar tools" = other entries sharing a capability node.
-->
<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Back link -->
    <router-link
      to="/apps"
      class="text-sm text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 mb-6"
      :aria-label="t.common.backTo(t.registryDetail.backLabel)"
    >
      {{ t.common.backTo(t.registryDetail.backLabel) }}
    </router-link>

    <!-- Not found -->
    <div v-if="!entry" class="text-center py-16 text-gray-500">
      <p class="text-lg font-medium">{{ t.common.notFound(t.registryDetail.entityName) }}</p>
      <router-link to="/apps" class="mt-2 text-sm text-blue-600 underline">
        {{ t.common.goTo(t.registryDetail.backLabel) }}
      </router-link>
    </div>

    <template v-else>
      <!-- Header -->
      <div class="mb-6">
        <div class="flex items-start justify-between gap-4 mb-2 flex-wrap">
          <h1 class="text-2xl font-bold text-gray-900">{{ entry.title }}</h1>
          <DsgvoBadge :status="entry.dsgvo ?? 'unknown'" class="text-sm" />
        </div>

        <!-- Teaser -->
        <p
          v-if="entry.teaser"
          class="text-base text-gray-700 italic mt-2"
        >
          „{{ entry.teaser }}"
        </p>

        <!-- Source URL -->
        <a
          v-if="entry['source-url']"
          :href="entry['source-url']"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-3 inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 underline"
          :aria-label="`${entry.title} öffnen`"
        >
          {{ entry['source-url'] }} ↗
        </a>
      </div>

      <!-- DSGVO explanation -->
      <div
        class="mb-6 rounded-lg p-4 text-sm flex items-start gap-3"
        :class="dsgvoBoxClass"
        role="note"
        :aria-label="`Datenschutzhinweis: ${dsgvoMeta.label}`"
      >
        <div>
          <p class="font-medium">{{ dsgvoMeta.label }}</p>
          <p class="mt-0.5 opacity-90">{{ dsgvoMeta.tooltip }}</p>
        </div>
      </div>

      <!-- Capability nodes -->
      <section class="mb-6">
        <h2 class="text-base font-semibold text-gray-900 mb-3">
          {{ t.registryDetail.capabilitiesSectionTitle }}
        </h2>
        <div class="flex flex-wrap gap-2">
          <router-link
            v-for="cap in linkedCapabilities"
            :key="cap.id"
            :to="`/catalog/${cap.id}`"
            class="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 hover:bg-blue-100 transition-colors no-underline"
          >
            <span
              class="inline-block w-2 h-2 rounded-full"
              :class="statusDot(cap.status)"
              aria-hidden="true"
            />
            {{ cap.title }}
          </router-link>
          <!-- Unresolved capability IDs -->
          <span
            v-for="id in unresolvedCapabilities"
            :key="id"
            class="inline-flex items-center px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500"
          >
            {{ id }}
          </span>
        </div>
      </section>

      <!-- Markdown body -->
      <div
        class="prose prose-sm max-w-none text-gray-800 mb-8"
        v-html="renderedBody"
        :aria-label="t.registryDetail.bodyAriaLabel"
      />

      <!-- Similar tools -->
      <section v-if="similarEntries.length > 0" class="mb-8">
        <h2 class="text-base font-semibold text-gray-900 mb-3">
          {{ t.registryDetail.similarSectionTitle }}
        </h2>
        <div class="flex flex-col gap-2">
          <router-link
            v-for="similar in similarEntries"
            :key="similar.id"
            :to="`/apps/${similar.id}`"
            class="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-300 no-underline"
          >
            <div>
              <p class="text-sm font-medium text-gray-900">{{ similar.title }}</p>
              <p v-if="similar.teaser" class="text-xs text-gray-500 mt-0.5">{{ similar.teaser }}</p>
            </div>
            <span class="text-blue-600 text-sm shrink-0 ml-3" aria-hidden="true">→</span>
          </router-link>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRegistryEntries } from '../composables/useRegistryEntries.js'
import { useCapabilityNodes } from '../composables/useCapabilityNodes.js'
import { DSGVO_STATUS_META, type DsgvoStatusValue } from '../../schemas/registry-entry.js'
import DsgvoBadge from '../components/DsgvoBadge.vue'
import { de as t } from '../i18n/de.js'

import { marked } from 'marked'

// Configure marked for safe inline rendering — no external images, no raw HTML
marked.use({ breaks: false, gfm: true })

function renderMarkdown(md: string): string {
  return marked.parse(md) as string
}

const route = useRoute()
const { entries } = useRegistryEntries()
const { nodes } = useCapabilityNodes()

const entry = computed(() => entries.value.find(e => e.id === route.params.id))

const linkedCapabilities = computed(() =>
  (entry.value?.capabilities ?? [])
    .map(id => nodes.value.find(n => n.id === id))
    .filter(Boolean) as typeof nodes.value,
)

const unresolvedCapabilities = computed(() =>
  (entry.value?.capabilities ?? []).filter(id => !nodes.value.find(n => n.id === id)),
)

const similarEntries = computed(() => {
  if (!entry.value) return []
  const caps = new Set(entry.value.capabilities)
  return entries.value.filter(
    e => e.id !== entry.value!.id && e.capabilities.some(c => caps.has(c)),
  )
})

const renderedBody = computed(() => (entry.value ? renderMarkdown(entry.value.body) : ''))

const dsgvoMeta = computed(() => {
  const s = (entry.value?.dsgvo ?? 'unknown') as DsgvoStatusValue
  return DSGVO_STATUS_META[s] ?? DSGVO_STATUS_META.unknown
})

const DSGVO_BOX: Record<DsgvoStatusValue, string> = {
  'frontend-only': 'bg-green-50 border border-green-200 text-green-900',
  'claimed-safe': 'bg-amber-50 border border-amber-200 text-amber-900',
  unknown: 'bg-gray-50 border border-gray-200 text-gray-700',
}

const dsgvoBoxClass = computed(() => {
  const s = (entry.value?.dsgvo ?? 'unknown') as DsgvoStatusValue
  return DSGVO_BOX[s] ?? DSGVO_BOX.unknown
})

function statusDot(status: string): string {
  return { needed: 'bg-red-400', partial: 'bg-amber-400', 'well-covered': 'bg-green-500' }[status] ?? 'bg-gray-400'
}
</script>
