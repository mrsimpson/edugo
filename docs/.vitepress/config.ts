import { defineConfig } from 'vitepress'

export default defineConfig({
  srcDir: '.',
  outDir: 'dist',
  base: '/edugo/docs/',
  cleanUrls: true,
  title: 'edugo — Docs',
  description: 'The missing infrastructure layer for educational innovation',

  // Explicitly set empty vite config to prevent VitePress from picking up
  // the root vite.config.ts (which imports UnoCSS and breaks VitePress's Vue SFC processing)
  vite: {
    configFile: false,
    plugins: [],
  },

  srcExclude: [
    'arc42/**',
    '.vitepress/**',
  ],

  themeConfig: {
    nav: [
      { text: '← edugo', link: 'https://mrsimpson.github.io/edugo/', target: '_self' },
      { text: 'Vision', link: '/docs/vision' },
      { text: 'Beitragen', link: '/docs/contributing' },
      {
        text: 'Architektur',
        link: 'https://mrsimpson.github.io/edugo/architecture/',
        target: '_self',
      },
    ],

    sidebar: [
      {
        text: 'Dokumentation',
        items: [
          { text: 'Vision', link: '/docs/vision' },
          { text: 'Beitragen', link: '/docs/contributing' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mrsimpson/edugo' },
    ],

    footer: {
      message: 'Built with VitePress · Deployed on GitHub Pages',
    },
  },
})
