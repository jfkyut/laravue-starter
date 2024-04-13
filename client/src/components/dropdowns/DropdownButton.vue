<script setup>

const emit = defineEmits(['click', 'mouseover', 'mouseout']);

</script>

<template>
  <li>
    <button
      @click="emit('click')"
      @mouseover="emit('mouseover')"
      @mouseout="emit('mouseout')"
      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-start">
      <slot/>
    </button>
  </li>
</template>