<script setup>

defineProps({ message: Object })

</script>

<template>
  
  <div class="flex items-start gap-2.5">
    <img class="w-8 h-8 rounded-full" src="https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg" alt="Jese image">
    <div class="flex flex-col gap-1 max-w-[300px] sm:max-w-[400px] md:max-w-[650px] lg:max-w-3xl">
      <div class="flex items-center space-x-2 rtl:space-x-reverse">
          <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ message?.sender.name }}</span>
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
      </div>
      <div class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
          <p class="text-sm font-normal text-gray-900 dark:text-white">{{ message?.content }}</p>
      </div>
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
        {{ message?.read_status !== 0 ? 'Seen' : 'Sent' }}
      </span>
    </div>
  </div>

</template>