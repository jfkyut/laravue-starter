<script setup>
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';

const { theme } = storeToRefs(useThemeStore());
const { setToDark, setToLight } = useThemeStore();

const toggleTheme = (e) => {
  e.target.checked
    ? setToDark()
    : setToLight()
}
</script>

<template>
  <div class="flex items-center justify-between p-2 rounded-lg text-white hover:bg-gray-700 group">
    <div>
      <span class="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white">
          <i class="fa fa-moon"></i>
        </span>
      <span class="ms-3">Dark mode</span>
    </div>

    <label class="inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        class="sr-only peer" 
        :checked="theme === 'dark' ? true : false"
        @change="toggleTheme">
      <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </label>
  </div>
</template>