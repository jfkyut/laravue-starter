<script setup>

import { RouterLink } from 'vue-router';
import { useProfileStore } from '@/stores/profile';
import { onMounted } from 'vue';

const profileStore = useProfileStore();

onMounted( async () => {
  profileStore.getProfile()
})

</script>

<template>
  <div class="flex justify-center items-center dark:text-gray-400 dark:bg-gray-800 min-h-screen">
    <div class="absolute top-5 left-5">
      <div v-if="profileStore.user">
        <router-link to="/home">Home</router-link>
      </div>
      <div class="flex gap-4" v-else>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">register</router-link>
      </div>
    </div>
    <slot />
  </div>
</template>