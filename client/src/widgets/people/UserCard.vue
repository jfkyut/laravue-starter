<script setup>

import MessageUser from './MessageUser.vue';

defineProps({ user: Object })

</script>

<template>
  <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

    <div class="flex flex-col items-center py-10">
      <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg" alt="Bonnie image"/>
      <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{{ user.name }}</h5>
      <span class="text-sm text-gray-500 dark:text-gray-400">{{ user.email }}</span>
      <div class="flex mt-4 md:mt-6 space-x-2">
        <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</a>
        <MessageUser :target-user="user" />
      </div>
    </div>
  </div>
</template>