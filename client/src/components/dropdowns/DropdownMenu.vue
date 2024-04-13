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

const emit = defineEmits(['onMouseover', 'onMouseout'])

</script>

<template>
  <div 
    @mouseover="emit('onMouseover')"
    @mouseout="emit('onMouseout')"
    id="dropdownBottom"
    :class="[show ? 'opacity-100' : 'opacity-0 invisible', position]" 
    class="z-10 absolute bg-white divide-y divide-gray-100 duration-200 rounded-lg shadow w-44 dark:bg-gray-700">
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownBottomButton">
      <slot />
    </ul>
  </div>
</template>