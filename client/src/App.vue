<script setup>

import { RouterView } from 'vue-router';
import { useThemeStore } from './stores/theme';

const themeStore = useThemeStore();

</script>

<template>
  <div :class="{ dark: themeStore.theme === 'dark' }" class="bg-gray-50 dark:bg-gray-900">
    <component :is="$route.meta.layout || 'div'">
      <RouterView/>
    </component>
  </div>
  
</template>