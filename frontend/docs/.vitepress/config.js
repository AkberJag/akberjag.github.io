import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Hi There!',
  description: 'Documenting my adventures in Python, Go, and beyond',
  base: '/docs',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Python', link: '/python/' },
      { text: 'Go', link: '/go/' },
    ],
    sidebar: {
      '/python/': [
        {
          text: 'Python Learning',
          items: [
            { text: 'Getting Started', link: '/python/' },
            {
              text: 'Basic Concepts',
              collapsed: true,
              items: [
                {
                  text: 'Before we begin',
                  link: '/python/basics/before_we_begin',
                },
                { text: 'Variables', link: '/python/basics/variables' },
                { text: 'Data Types', link: '/python/basics/data-types' },
                { text: 'Control Flow', link: '/python/basics/control-flow' },
                { text: 'Functions', link: '/python/basics/functions' },
                {
                  text: 'Error Handling',
                  link: '/python/basics/error-handling',
                },
              ],
            },
            { text: 'Advanced Topics', link: '/python/advanced' },
          ],
        },
      ],
      // Go section remains the same
      '/go/': [
        {
          text: 'Go Learning',
          items: [
            { text: 'Getting Started', link: '/go/' },
            { text: 'Basic Concepts', link: '/go/basics' },
            { text: 'Advanced Topics', link: '/go/advanced' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
})
