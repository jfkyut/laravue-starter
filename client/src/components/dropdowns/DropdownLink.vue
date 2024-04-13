<script setup>

import { RouterLink } from 'vue-router';

defineProps({ to: String })

</script>

<template>
  <li>
    <RouterLink 
      :to="to" 
      active-class="bg-gray-100 dark:bg-gray-600" 
      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-start">
      <slot/>
    </RouterLink>
  </li>
</template>