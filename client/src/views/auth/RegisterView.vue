<script setup>

import { RouterLink } from 'vue-router';
import TextInput from '@/components/inputs/TextInput.vue';
import { ref, getCurrentInstance, onMounted } from 'vue';
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';
import LoadingButton from '@/components/buttons/LoadingButton.vue';
import { useRouter } from 'vue-router';
import { useHttpAuth } from '@/http/auth';

const { registerRequest } = useHttpAuth();

const router = useRouter();
const instance = getCurrentInstance();

const nameInputRef = ref(null);
const isLoading = ref(false);

const form = ref({
  name: null,
  email: null,
  password: null,
  password_confirmation: null
})

const register = async () => {
  isLoading.value = true;
  (await registerRequest(form.value)) && router.push('/home');
  isLoading.value = false;
}

onMounted(() => {
  instance.refs.nameInputRef.$el.focus();
})

</script>

<template>
  <form @submit.prevent="register" class="space-y-6">
    <h5 class="text-xl font-medium text-gray-900 dark:text-white">Sign up to our platform</h5>
    <div>
      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
      <TextInput 
        ref="nameInputRef"
        type="text" 
        name="name" 
        placeholder="John Doe" 
        required 
        v-model="form.name" />
    </div>
    <div>
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
      <TextInput 
        type="email" 
        name="email" 
        placeholder="johndoe@email.com" 
        required
        v-model="form.email" />
    </div>
    <div>
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
      <TextInput 
        type="password" 
        name="password" 
        placeholder="••••••••" 
        required
        v-model="form.password" />
    </div>
    <div>
      <label for="password_confirmation" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password confirmation</label>
      <TextInput 
        type="password" 
        name="password_confirmation" 
        placeholder="••••••••" 
        required
        v-model="form.password_confirmation" />
    </div>
    <PrimaryButton v-if="!isLoading" type="submit" class="w-full">Create account</PrimaryButton>
    <LoadingButton class="w-full" v-else />
    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
      Already registered? <RouterLink to="/login" class="text-blue-700 hover:underline dark:text-blue-500">Sign in</RouterLink>
    </div>
  </form>
</template>