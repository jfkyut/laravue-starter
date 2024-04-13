<script setup>

import { RouterLink } from 'vue-router';
import TextInput from '@/components/inputs/TextInput.vue'
import { ref, getCurrentInstance, onMounted } from 'vue';
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';
import LoadingButton from '@/components/buttons/LoadingButton.vue';
import { useHttpAuth } from '@/http/auth';
import { useRouter } from 'vue-router';

const { login } = useHttpAuth();

const router = useRouter();
const instance = getCurrentInstance();

const emailInputRef = ref(null);
const isLoading = ref(false);

const form = ref({
  email: null,
  password: null,
  remember: false
})

const loginUser = async () => {
  isLoading.value = true;  

  (await login(form.value)) && router.push('/home')
  
  isLoading.value = false;
}

const onRememberCheckboxChange = (e) => form.value.remember = (e.target.checked) ? true : false;

onMounted(() => {
  instance.refs.emailInputRef.$el.focus();
})

</script>

<template>
  <form @submit.prevent="loginUser" class="space-y-6">
    <h5 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
    <div>
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
      <TextInput 
        ref="emailInputRef"
        type="email"
        name="email"
        placeholder="johndoe@email.com"
        :required="true"
        v-model="form.email" />
    </div>
    <div>
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
      <TextInput 
        type="password"
        name="password"
        placeholder="••••••••"
        :required="true"
        v-model="form.password" />
    </div>
    <div class="flex items-start">
      <div class="flex items-start">
        <div class="flex items-center h-5">
          <input 
            id="remember" 
            type="checkbox" 
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            @change="onRememberCheckboxChange" />
        </div>
        <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
      </div>
      <RouterLink to="/forgot-password" class="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</RouterLink>
    </div>
    <PrimaryButton 
      v-if="!isLoading"
      class="w-full"
      type="submit">
      Login to your account
    </PrimaryButton>
    <LoadingButton v-else class="w-full" />
    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
      Not registered? <RouterLink to="/register" class="text-blue-700 hover:underline dark:text-blue-500">Create account</RouterLink>
    </div>
  </form>
</template>