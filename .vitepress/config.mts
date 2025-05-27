import { defineConfig } from 'vitepress'
import footnote from 'markdown-it-footnote'


// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/native-controls/',
  title: "Native Controls",
  description: "Showcase of Native HTML Controls",
  appearance: 'force-auto', // oder 'force-dark', 'dark', false
    markdown: {
    config: (md) => {
      md.use(footnote)
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: [
      {
        text: 'About',
        items: [
          { text: '', link: '/' },
          { text: 'Introduction', link: '/introduction' },
          { text: 'Showcase', link: '/showcase' }
        ]
      },
      {
        text: 'Components',
        items: [
          { text: 'Controls & Selection', link: '/components/buttons-select' },
          // { text: 'Input Fields', link: '/input' },
          // { text: 'Form Structure & Validation', link: '/form' },
          // { text: 'Icons & Symbol Techniques', link: '/icons' },
          // { text: 'Containers & Layout Components', link: '/containers' },
          // { text: 'Navigation & Focus', link: '/navigation' },
          // { text: 'Overlays & Helpers', link: '/overlays' },
          // { text: 'Windows & System Dialogs', link: '/windows' },
        ]
      },
      {
        text: 'Guides',
        items: [
          { text: 'Dark / Light', link: '/guides/dark-light' },
          { text: 'Icons', link: '/guides/icons' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/axeljaeger/native-controls' }
    ]
  }
})
