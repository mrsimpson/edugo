<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <a href="/edugo/" class="text-xl font-bold text-gray-900">edugo</a>
      <nav class="flex gap-6 text-sm font-medium">
        <router-link
          to="/map"
          class="text-gray-600 hover:text-gray-900"
          active-class="text-blue-600"
        >
          Kompetenzkarte
        </router-link>
        <router-link
          to="/registry"
          class="text-gray-600 hover:text-gray-900"
          active-class="text-blue-600"
        >
          Tool-Registry
        </router-link>
        <a
          href="https://github.com/mrsimpson/edugo"
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-600 hover:text-gray-900"
        >
          GitHub
        </a>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>
