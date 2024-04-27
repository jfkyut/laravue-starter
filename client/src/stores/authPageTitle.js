import { defineStore } from "pinia"
import { ref } from "vue"

export const useAuthPageTitleStore = defineStore('auth-page', () => {
  const routeTitle = ref(null);

  return {
    routeTitle
  }
})