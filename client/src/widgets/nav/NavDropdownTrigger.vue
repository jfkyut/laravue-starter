<script setup>

import { useRoute } from 'vue-router';

const emit = defineEmits(['toggle-dropdown']);

defineProps({ 
  buttonText: String, 
  iconClass: String, 
  isLinksShow: 
  Boolean,
  routeContains: String
})

const route = useRoute();

</script>

<template>
  <button 
    @click="emit('toggle-dropdown')" 
    :class="route.path.includes(routeContains) && 'bg-gray-700'"
    class="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group w-full">
    <div class="flex justify-between items-end w-full">
      <div>
        <span class="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white">
          <i :class="iconClass"></i>
        </span>
        <span class="ms-3">{{ buttonText }}</span>
      </div>
      <div>
        <span>
          <i 
            :class="isLinksShow ? 'fa-angle-up' : 'fa-angle-down'"
            class="fa"></i>
        </span>
      </div>
    </div>
  </button>
  <ul 
    id="dropdown-example" 
    v-show="isLinksShow"
    class="p-2 space-y-2 duration-200 max-h-[30vh] overflow-y-auto bg-gray-900 z-[1000]">
    <slot/>
  </ul>
</template>