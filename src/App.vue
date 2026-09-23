<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hide the app nav on the landing page — it has its own full-page layout -->
    <header
      v-if="!isLanding"
      class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between"
    >
      <router-link to="/" class="text-xl font-bold text-gray-900">{{ t.nav.brand }}</router-link>
      <nav class="flex gap-6 text-sm font-medium" aria-label="Hauptnavigation">
        <router-link
          to="/catalog"
          class="text-gray-600 hover:text-gray-900"
          active-class="text-blue-600"
        >
          {{ t.nav.catalog }}
        </router-link>
        <router-link
          to="/apps"
          class="text-gray-600 hover:text-gray-900"
          active-class="text-blue-600"
        >
          {{ t.nav.apps }}
        </router-link>
        <a
          href="https://github.com/mrsimpson/edugo"
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-600 hover:text-gray-900"
        >
          {{ t.nav.github }}
        </a>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { de as t } from './i18n/de.js'

const route = useRoute()
const isLanding = computed(() => route.path === '/')
</script>
