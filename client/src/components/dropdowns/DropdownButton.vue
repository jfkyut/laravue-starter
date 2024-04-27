<script setup>

defineProps({
  type: {
    type: String,
    default: 'button'
  },
  class: String
})
const emit = defineEmits(['click', 'mouseover', 'mouseout']);

</script>

<template>
  <li>
    <button
      :type="type"
      @click="emit('click')"
      @mouseover="emit('mouseover')"
      @mouseout="emit('mouseout')"
      :class="class"
      class="block px-4 py-2 lg:hover:bg-gray-100 lg:dark:hover:bg-gray-600 w-full text-start">
      <slot/>
    </button>
  </li>
</template>