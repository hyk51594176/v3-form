import { defineConfig } from 'vitepress'
import { demoblockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock'
import path from 'path'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "vue3 form",
  description: "vue3 form 组件",
  lastUpdated: true,
  cleanUrls: true,
  markdown:{
    config: (md) => {
      md.use(demoblockPlugin, {
        customClass: 'demoblock-custom'
      })
    }
  },
  vite: {
    plugins: [demoblockVitePlugin()],
  },
  themeConfig: {
    outlineTitle: '本页目录',
    lastUpdatedText: '上次更新',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: '示例',
        items: [
          { text: 'test', link: '/markdown-examples' },
          { text: 'test2', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
