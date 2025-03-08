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
                {
                  text: 'The Building Blocks',
                  link: '/python/basics/building_blocks',
                },
                {
                  text: 'The Essentials of Python ',
                  link: '/python/basics/the_essentials_of_python',
                },
                {
                  text: 'Control Flow and Loops',
                  link: '/python/basics/control_flow_and_loops',
                },
                {
                  text: 'Data Structures',
                  link: '/python/basics/data_structures',
                },
                {
                  text: 'Functions',
                  link: '/python/basics/functions',
                },
                {
                  text: 'How to organize python code',
                  link: '/python/basics/code_organize',
                },
              ],
            },
            { text: 'Advanced Topics', link: '/python/advanced' },
            {
              text: '🧪 Introduction to TDD & Pytest',
              collapsed: true,
              items: [
                {
                  text: 'Lets start!',
                  link: '/python/TDD/lets_start',
                },
                {
                  text: 'Key Concepts in TDD',
                  link: '/python/TDD/key_concepts',
                },
                {
                  text: 'Pytest Basics',
                  link: '/python/TDD/pytest_basics',
                },
                {
                  text: 'Fixtures',
                  link: '/python/TDD/fixtures',
                },
                {
                  text: 'Parameterized Tests',
                  link: '/python/TDD/parameterized_tests',
                },
                {
                  text: 'Mocking & Monkeypatching',
                  link: '/python/TDD/mocking_monkeypatch',
                },
                {
                  text: 'Integration and E2E Tests',
                  link: '/python/TDD/integration_e2e',
                },
                {
                  text: 'The Testing Pyramid',
                  link: '/python/TDD/the_testing_pyramid',
                },
              ],
            },
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
    lastUpdated: {
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short',
      },
    },
    editLink: {
      text: 'Edit this page on GitHub',
      pattern:
        'https://github.com/AkberJag/akberjag.github.io/edit/main/frontend/docs/:path',
    },
  },
})
