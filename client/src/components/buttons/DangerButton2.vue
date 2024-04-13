<script setup>

defineProps({
  type: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean, 
    default: false
  }
})

</script>

<template>
  <button
    :disabled="disabled"
    :type="type" 
    class="focus:outline-none focus:ring-4 bg-gray-200 border border-gray-300 outline-none text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 dark:border-gray-600 dark:bg-gray-700 dark:text-red-400 dark:hover:bg-red-800 dark:hover:text-gray-200 dark:hover:border-red-700 duration-100 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-red-900">
    <slot/>
  </button>
</template>