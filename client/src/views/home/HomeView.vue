<script setup>

import { useProfileStore } from '@/stores/profile';

const { user } = useProfileStore();

</script>

<template>
  <div>
    Welcome home {{ user.name }}
  </div>
</template>