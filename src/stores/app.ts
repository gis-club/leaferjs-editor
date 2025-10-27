import { defineStore } from "pinia"
import type { App } from "leafer-ui"
import { shallowRef } from "vue"

export const useAppStore = defineStore('app', () => {
  const app = shallowRef<App>()
  return {
    app,
    setApp(instance: App) {
      app.value = instance
    },
  }
})
