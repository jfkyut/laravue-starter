<script setup>

import { RouterLink } from 'vue-router';
import TextInput from '@/components/inputs/TextInput.vue'
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';
import { ref, onMounted, getCurrentInstance } from 'vue';
import { useToast } from 'vue-toastification';
import LoadingButton from '@/components/buttons/LoadingButton.vue';
import { useHttpAuth } from '@/http/auth';

const { newPasswordRequest } = useHttpAuth();

const toast = useToast();
const instance = getCurrentInstance();

const nameInputRef = ref(null);
const isLoading = ref(false);

const form = ref({
  email: null,
})

const forgotPassword = async () => {
  isLoading.value = true;

  const { status } = await newPasswordRequest(form.value);

  status && toast.success(status)

  isLoading.value = false;
}

onMounted(() => {
  instance.refs.nameInputRef.$el.focus();
})

</script>

<template>
  <form @submit.prevent="forgotPassword" class="space-y-6" action="#">
    <div class="space-y-2">
      <h5 class="text-xl font-medium text-gray-900 dark:text-white">Forgot password</h5>
      <p>Forgot your password? No worries! Enter your email, and we'll send a reset link. Regain account access in no time. Thanks for your patience!</p>
    </div>
    <div>
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
      <TextInput 
        ref="nameInputRef"
        type="email"
        name="email"
        placeholder="johndoe@email.com"
        :required="true"
        v-model="form.email" />
    </div>
    <PrimaryButton 
      v-if="!isLoading"
      type="submit"
      class="w-full">Send password reset link</PrimaryButton>
    <LoadingButton v-else class="w-full" />
    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
      <RouterLink to="/login" class="text-blue-700 hover:underline dark:text-blue-500">Back to login page</RouterLink>
    </div>
  </form>
</template>