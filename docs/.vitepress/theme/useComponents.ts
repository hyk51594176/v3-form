
// Don't remove this file, because it registers the demo components.
import Demo from 'vitepress-theme-demoblock/dist/client/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/dist/client/components/DemoBlock.vue'
import { defineAsyncComponent } from 'vue';

const components = import.meta.glob('../components/*.vue') as Record<string, () => Promise<{ default: any }>>

export function useComponents(app) {
  app.component('Demo', Demo)
  app.component('DemoBlock', DemoBlock)
  Object.entries(components).forEach(([path, component]) => {
    const key = path.match(/\.\/components\/(.*)\.vue$/)?.[1]
    if (key) {
      app.component(key, defineAsyncComponent(component))
    }
  })
}