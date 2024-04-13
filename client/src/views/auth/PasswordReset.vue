<script setup>

import TextInput from '@/components/inputs/TextInput.vue'
import { ref, onMounted, getCurrentInstance } from 'vue';
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';
import LoadingButton from '@/components/buttons/LoadingButton.vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useHttpAuth } from '@/http/auth';

const { registerRequest } = useHttpAuth();

const toast = useToast();
const route = useRoute();
const router = useRouter();
const instance = getCurrentInstance();

const passworfInputRef = ref(null);
const isLoading = ref(false);

const form = ref({
  token: null,
  email: null,
  password: null,
  password_confirmation: null
})

const resetPassword = async () => {
  isLoading.value = true;

  const { status } = await registerRequest(form.value)
  
  if (status) {
    toast.success(status);
    router.push('/login');
  }

  isLoading.value = false;
}

onMounted(() => {
  instance.refs.passworfInputRef.$el.focus();
  
  form.value.token = route.params.token;
  form.value.email = route.query.email;
})

</script>

<template>
  <form @submit.prevent="resetPassword" class="space-y-6">
    <div class="space-y-2">
      <h5 class="text-xl font-medium text-gray-900 dark:text-white">Password Reset</h5>
      <p>Set up a new password to regain access to your account.</p>
    </div>
    <div>
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New password</label>
      <TextInput 
        ref="passworfInputRef"
        type="password"
        name="password"
        placeholder="••••••••"
        :required="true"
        v-model="form.password" />
    </div>

    <div>
      <label for="password_confirmation" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
      <TextInput 
        type="password"
        name="password_confirmation"
        placeholder="••••••••"
        :required="true"
        v-model="form.password_confirmation" />
    </div>

    <PrimaryButton 
      v-if="!isLoading"
      class="w-full"
      type="submit">
      Set new password
    </PrimaryButton>
    <LoadingButton v-else class="w-full" />

  </form>
</template>