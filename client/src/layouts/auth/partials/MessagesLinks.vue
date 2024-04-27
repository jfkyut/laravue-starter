<script setup>

import { onMounted, ref, watch } from 'vue';
import NavDropdownTrigger from '@/widgets/nav/NavDropdownTrigger.vue';
import NavDropdownLink from '@/widgets/nav/NavDropdownLink.vue';
import NavDropdownButton from '@/widgets/nav/NavDropdownButton.vue';
import { useHttpMessage } from '@/http/message';
import { storeToRefs } from 'pinia';
import { useChatStore } from '@/stores/chat';
import { useProfileStore } from '@/stores/profile';

defineProps({ chats: Object })

const emit = defineEmits(['onAccessLink'])

const { getAllChatRequest } = useHttpMessage();

const { chats } = storeToRefs(useChatStore())
const { user } = storeToRefs(useProfileStore())

const isDropdownLinkShow = ref(JSON.parse(sessionStorage.getItem('messages-dropdown')) || false);

const toggleDropdown = () => {
  (!isDropdownLinkShow.value)
    ? isDropdownLinkShow.value = true
    : isDropdownLinkShow.value = false
}

watch(isDropdownLinkShow, (dropdownState) => {
  sessionStorage.setItem('messages-dropdown', JSON.stringify(dropdownState));
});

onMounted( async () => {
  if (chats.value.length < 1) {
    const { data } = await getAllChatRequest();

    chats.value = data;
  }
});

</script>

<template>
  <NavDropdownTrigger 
    button-text="Messages" 
    icon-class="fa fa-message" 
    @toggle-dropdown="toggleDropdown" 
    :is-links-show="isDropdownLinkShow"
    :route-contains="'/chat'">

    <NavDropdownButton v-if="chats.length === 0" :disabled="true">
      No Message
    </NavDropdownButton>

    <NavDropdownLink 
      v-else
      v-for="(chat, index) in chats" 
      :key="index"
      :to="`/chat/${chat.id}`" 
      @click="emit('onAccessLink')"
      :chat="chat"
      :title=" 
        chat.name ||
        chat.participants.filter((participant) => participant.id !== user.id) 
                          .map((participant) => participant.name)
                          .join(', ')
      ">

      <div class="truncate">
        {{ 
          chat.name ||
          chat.participants.filter((participant) => participant.id !== user.id) 
                            .map((participant) => participant.name)
                            .join(', ')
        }}
      </div>

    </NavDropdownLink>

  </NavDropdownTrigger>
</template>