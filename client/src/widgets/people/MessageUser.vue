<script setup>

import SecondaryButton from '@/components/buttons/SecondaryButton.vue';
import GenericModal from '@/components/modals/GenericModal.vue';
import TextInput from '@/components/inputs/TextInput.vue';
import { ref, getCurrentInstance } from 'vue';
import { useHttpMessage } from '@/http/message';
import { useProfileStore } from '@/stores/profile';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const { user } = storeToRefs(useProfileStore())

const router = useRouter();

const { targetUser } = defineProps({ targetUser: Object })

const { sendNewTextMessageRequest } = useHttpMessage();

const isLoading = ref(false);
const isMessageModalShow = ref(false);
const textInputRef = ref(null);

const instance = getCurrentInstance();

const openModal = () => {
  isMessageModalShow.value = true;

  form.value.participants = [user.value.id, targetUser.id];

  setTimeout(() => {
    instance.refs.textInputRef.$el.focus();
  }, 200);
}

const closeModal = () => {
  isMessageModalShow.value = false;

  form.value.content = null;
  form.value.participants = [];
}

const form = ref({
  content: null,
  type: 1,
  participants: []
});

const sendMessage = async () => {
  const { data } = await sendNewTextMessageRequest(form.value);

  console.log(data);

  if (data) {
    closeModal();
    router.push(`/chat/${data.chat_id}`);
  }
}

</script>

<template>
  <SecondaryButton @click="openModal">
    Message
  </SecondaryButton>

  <div>
    <GenericModal 
      :title="`Send a message to ${targetUser.name}`"
      :show="isMessageModalShow"
      :isLoading="isLoading"
      confirmButtonText="Send"
      @onConfirm="sendMessage"
      @onCancel="closeModal">

      <TextInput 
        ref="textInputRef"
        v-model="form.content"
        placeholder="message" />

    </GenericModal>
  </div>
</template>