import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useThemeStore = defineStore('theme', () => {
  const theme = ref(localStorage.getItem('theme') || 'dark');

  watch(theme, (theme) => {
    localStorage.setItem('theme', theme);
  })

  const setToLight = () => {
    theme.value = 'light';
  }

  const setToDark = () => {
    theme.value = 'dark';
  }

  return { theme, setToDark, setToLight }
});