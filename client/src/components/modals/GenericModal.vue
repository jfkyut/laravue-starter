<script setup>

import LoadingButton from '../buttons/LoadingButton.vue';

defineProps({
  show: {
    type: Boolean,
    default: true
  },
  isForm: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: 'Title'
  },
  cancelButtonText: {
    type: String,
    default: 'Cancel'
  },
  confirmButtonText: {
    type: String,
    default: 'Confirm'
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['onConfirm', 'onCancel']);

</script>

<template>
  <div 
    tabindex="-1" 
    aria-hidden="true" 
    @click.self="emit('onCancel')"
    :class="show ? 'opacity-100' : 'opacity-0 invisible'"
    class="backdrop-sepia-0 bg-gray-400/70 duration-200 dark:bg-gray-950/70 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] min-h-screen">
    <form @submit.prevent="emit('onConfirm')" class="relative p-4 w-full max-w-2xl max-h-full">
        <!-- Modal content -->
      <div class="bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ title }}
          </h3>
          <button @click="emit('onCancel')" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-4 md:p-5 space-y-4 text-base leading-relaxed text-gray-500 dark:text-gray-400">
          <slot/>
        </div>
        <!-- Modal footer -->
        <div class="flex items-center gap-3 p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
          <button v-if="isForm && !isLoading" data-modal-hide="default-modal" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {{ confirmButtonText }}
          </button>
          <LoadingButton v-else />
          <button @click="emit('onCancel')" data-modal-hide="default-modal" type="button" class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            {{ cancelButtonText }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>