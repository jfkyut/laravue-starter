<script setup>

import DangerButton2 from '@/components/buttons/DangerButton2.vue';
import GenericModal from '@/components/modals/GenericModal.vue';
import TextInput from '@/components/inputs/TextInput.vue';
import { ref, getCurrentInstance } from 'vue';
import { useHttpProfile } from '@/http/profile';
import { useToast } from 'vue-toastification';

const toast = useToast();

const { updatePasswordRequest } = useHttpProfile();

const instance = getCurrentInstance();

const currentPasswordRef = ref(null);

const isModalShow = ref(false);
const isLoading = ref(false);

const form = ref({
  current_password: null,
  password: null,
  password_confirmation: null
})

const showModal = () => {
  isModalShow.value = true;

  setTimeout(() => {
    instance.refs.currentPasswordRef.$el.focus()
  }, 200)
}

const closeModal = () => {
  isModalShow.value = false;
  
  form.value.current_password = null;
  form.value.password = null;
  form.value.password_confirmation = null;
}

const updatePassword = async () => {
  isLoading.value = true;

  (await updatePasswordRequest(form.value))
    ? (
        toast.success('Password update successful.'),
        closeModal()
      )
    : showModal()

  isLoading.value = false;
}

</script>

<template>
  <div>
    <DangerButton2 @click="showModal">Change Password</DangerButton2>

    <GenericModal 
      title="Change password"
      confirm-button-text="Update"
      :show="isModalShow"
      :is-loading="isLoading"
      @onConfirm="updatePassword"
      @onCancel="closeModal">

      <div class="space-y-2">
        <label for="current-password">Current password</label>
        <TextInput 
          ref="currentPasswordRef"
          name="current-password" 
          type="password" 
          placeholder="••••••••"
          v-model="form.current_password"
          required />
      </div>
      <div class="space-y-2">
        <label for="new-password">New password</label>
        <TextInput 
          name="new-password" 
          type="password" 
          placeholder="••••••••"
          v-model="form.password"
          required />
      </div>
      <div class="space-y-2">
        <label for="confirm-password">Confirm password</label>
        <TextInput 
          name="confirm-password" 
          type="password" 
          placeholder="••••••••"
          v-model="form.password_confirmation"
          required />
      </div>

    </GenericModal>
  </div>
</template>