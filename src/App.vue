<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Skip navigation link for keyboard users -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-blue-700 focus:font-semibold focus:rounded focus:shadow"
    >Zum Inhalt springen</a>

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
    <main id="main-content">
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
