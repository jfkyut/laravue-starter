<script setup>

import UserChatBubble from '@/components/chatBubbles/UserChatBubble.vue';
import ResponseChatBubble from '@/components/chatBubbles/ResponseChatBubble.vue';
import { useProfileStore } from '@/stores/profile';
import { storeToRefs } from 'pinia';

const { user } = storeToRefs(useProfileStore());

defineProps({ message: Object })

</script>

<template>
  <UserChatBubble v-if="message.user_id === user.id" :message="message" />
  <ResponseChatBubble v-else :message="message" />
</template>