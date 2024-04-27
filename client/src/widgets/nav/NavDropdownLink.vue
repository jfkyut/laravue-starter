<script setup>

import { RouterLink } from 'vue-router';

defineProps({ 
  to: String, 
  class: String, 
})

</script>

<template>
  <li class="relative flex">
    <RouterLink 
      :to="to" 
      :class="class"
      active-class="bg-gray-700"
      class="p-2 w-full items-center transition duration-75 rounded-lg group text-white hover:bg-gray-700">
      <slot />
    </RouterLink>
  </li>
</template>