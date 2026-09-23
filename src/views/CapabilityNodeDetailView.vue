<!--
  CapabilityNodeDetailView — detail page for a single capability node (/catalog/:id).

  Shows: full Markdown body, KMK domain tags, linked registry entries,
  and a "build this" CTA for gap nodes.
-->
<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Back link -->
    <router-link
      to="/catalog"
      class="text-sm text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 mb-6"
      :aria-label="t.common.backTo(t.catalogDetail.backLabel)"
    >
      {{ t.common.backTo(t.catalogDetail.backLabel) }}
    </router-link>

    <!-- Not found -->
    <div v-if="!node" class="text-center py-16 text-gray-500">
      <p class="text-lg font-medium">{{ t.common.notFound(t.catalogDetail.entityName) }}</p>
      <router-link to="/catalog" class="mt-2 text-sm text-blue-600 underline">
        {{ t.common.goTo(t.catalogDetail.backLabel) }}
      </router-link>
    </div>

    <template v-else>
      <!-- Header -->
      <div class="mb-6">
        <div class="flex items-start gap-3 mb-2">
          <span
            class="mt-1 shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium"
            :class="statusClass"
            :aria-label="t.status.ariaLabel(statusLabel)"
          >
            {{ statusLabel }}
          </span>
        </div>
        <h1 class="text-2xl font-bold text-gray-900">{{ node.title }}</h1>

        <!-- KMK domain tags -->
        <div
          v-if="node['kmk-domains']?.length"
          class="mt-3 flex flex-wrap gap-2"
          :aria-label="t.catalog.filterKmkHeading"
        >
          <span
            v-for="domain in node['kmk-domains']"
            :key="domain"
            class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-800 border border-blue-200"
          >
            KMK {{ domainMeta(domain)?.number }} · {{ domainMeta(domain)?.title }}
          </span>
        </div>
      </div>

      <!-- Markdown body -->
      <div
        class="prose prose-sm max-w-none text-gray-800 mb-8"
        v-html="renderedBody"
        :aria-label="t.catalogDetail.bodyAriaLabel"
      />

      <!-- Linked registry entries -->
      <section class="mb-8">
        <h2 class="text-lg font-semibold text-gray-900 mb-3">
          {{ t.catalogDetail.toolsSectionTitle }}
          <span class="text-sm font-normal text-gray-500 ml-1">({{ linkedEntries.length }})</span>
        </h2>

        <div v-if="linkedEntries.length > 0" class="flex flex-col gap-3">
          <router-link
            v-for="entry in linkedEntries"
            :key="entry.id"
            :to="`/apps/${entry.id}`"
            class="block bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all no-underline"
          >
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-sm font-semibold text-gray-900">{{ entry.title }}</p>
                <p v-if="entry.teaser" class="text-sm text-gray-600 mt-0.5">{{ entry.teaser }}</p>
              </div>
              <span
                v-if="entry.dsgvo"
                class="shrink-0 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                :class="dsgvoClass(entry.dsgvo)"
                :aria-label="t.catalogDetail.dsgvoAriaLabel(entry.dsgvo)"
              >
                {{ dsgvoLabel(entry.dsgvo) }}
              </span>
            </div>
          </router-link>
        </div>

        <!-- Gap CTA -->
        <div
          v-if="node.status === 'needed' || (node.status === 'partial' && linkedEntries.length === 0)"
          class="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4"
        >
          <p class="text-sm font-medium text-amber-900">
            {{ node.status === 'needed' ? t.catalogDetail.gapCtaNoTools : t.catalogDetail.gapCtaFewTools }}
          </p>
          <p class="text-sm text-amber-700 mt-1">
            {{ t.catalogDetail.gapCtaBody }}
            <a
              :href="buildThisUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="underline font-medium"
            >
              {{ t.catalogDetail.gapCtaLink }}
            </a>
            — {{ t.catalogDetail.gapCtaSuffix }}
          </p>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCapabilityNodes } from '../composables/useCapabilityNodes.js'
import { useRegistryEntries } from '../composables/useRegistryEntries.js'
import { KMK_DOMAIN_META, type KmkDomainValue } from '../../schemas/capability-node.js'
import { DSGVO_STATUS_META, type DsgvoStatusValue } from '../../schemas/registry-entry.js'
import { de as t } from '../i18n/de.js'

import { marked } from 'marked'

// Configure marked for safe inline rendering — no external images, no raw HTML
marked.use({ breaks: false, gfm: true })

function renderMarkdown(md: string): string {
  return marked.parse(md) as string
}

const route = useRoute()
const { nodes } = useCapabilityNodes()
const { entries } = useRegistryEntries()

const node = computed(() => nodes.value.find(n => n.id === route.params.id))

const linkedEntries = computed(() =>
  entries.value.filter(e => e.capabilities.includes(route.params.id as string)),
)

const renderedBody = computed(() => node.value ? renderMarkdown(node.value.body) : '')

const statusClass = computed(() => ({
  'bg-red-100 text-red-700': node.value?.status === 'needed',
  'bg-amber-100 text-amber-700': node.value?.status === 'partial',
  'bg-green-100 text-green-700': node.value?.status === 'well-covered',
}))

const statusLabel = computed(() => t.status[node.value?.status ?? 'needed'] ?? '')

function domainMeta(slug: string) {
  return KMK_DOMAIN_META[slug as KmkDomainValue] ?? null
}

function dsgvoClass(status: string) {
  const meta = DSGVO_STATUS_META[status as DsgvoStatusValue]
  if (!meta) return ''
  return {
    green: 'bg-green-100 text-green-700',
    amber: 'bg-amber-100 text-amber-700',
    grey: 'bg-gray-100 text-gray-600',
  }[meta.color] ?? ''
}

function dsgvoLabel(status: string) {
  return DSGVO_STATUS_META[status as DsgvoStatusValue]?.label ?? status
}

const buildThisUrl = computed(() => {
  const id = route.params.id
  return `https://github.com/mrsimpson/edugo/new/main/data/entries?filename=my-tool.md&value=---%0Aid%3A+my-tool%0Atitle%3A+%22Mein+Tool%22%0Acapabilities%3A%0A++-%20${id}%0A---`
})
</script>
