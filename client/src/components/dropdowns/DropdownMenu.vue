<script setup>

defineProps({
  position: {
    type: String,
    default: 'right-0 top-12'
  },
  show: {
    type: Boolean,
    default: true
  }
});

</script>

<template>
  <div 
    id="dropdownBottom"
    :class="[show ? 'opacity-100' : 'opacity-0 invisible', position]" 
    class="z-10 absolute bg-white divide-y divide-gray-100 duration-300 rounded-lg shadow-lg w-44 dark:bg-gray-700 border dark:border-gray-600">
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownBottomButton">
      <slot />
    </ul>
  </div>
</template>