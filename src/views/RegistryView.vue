<!-- RegistryView stub for M3 -->
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-2xl font-bold text-gray-900 mb-4">Tool-Registry</h1>
    <p class="text-gray-500 mb-8">
      Alle eingetragenen Tools und Projekte. Filterung und vollständige Ansicht folgen in Kürze.
    </p>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <router-link
        v-for="entry in entries"
        :key="entry.id"
        :to="`/registry`"
        class="block bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all no-underline"
      >
        <p class="text-sm font-semibold text-gray-900">{{ entry.title }}</p>
        <p v-if="entry.teaser" class="text-sm text-gray-500 mt-1">{{ entry.teaser }}</p>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRegistryEntries } from '../composables/useRegistryEntries.js'
const { entries } = useRegistryEntries()
</script>
