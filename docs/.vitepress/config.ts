import { defineConfig } from 'vitepress'

export default defineConfig({
  srcDir: '..',
  base: '/edugo/',
  cleanUrls: true,
  title: 'edugo',
  description: 'The missing infrastructure layer for educational innovation',

  srcExclude: [
    '.vibe/**',
    'docs/.vitepress/**',
    'docs/arc42/**',
    'node_modules/**',
    '.github/**',
  ],

  rewrites: {
    'README.md': 'index.md',
  },

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Vision', link: '/docs/vision' },
      { text: 'Beitragen', link: '/docs/contributing' },
      {
        text: 'Architecture',
        link: '/edugo/architecture/',
        target: '_self',
      },
    ],

    sidebar: [
      {
        text: 'Overview',
        items: [
          { text: 'Home', link: '/' },
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
