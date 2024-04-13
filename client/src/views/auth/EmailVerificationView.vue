<script setup>

import PrimaryButton from '@/components/buttons/PrimaryButton.vue';
import SecondaryButton from '@/components/buttons/SecondaryButton.vue';
import { useProfileStore } from '@/stores/profile';
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toastification';
import LoadingButton from '@/components/buttons/LoadingButton.vue';
import { ref } from 'vue';
import { useHttpAuth } from '@/http/auth';
import { useRouter } from 'vue-router';

const { logout, requestEmailVerificationLink } = useHttpAuth();

const toast = useToast();
const router = useRouter();

const { user } = storeToRefs(useProfileStore());

const isLoading = ref(false);

const sendEmailVerificationLink = async () => {
  isLoading.value = true;
  
  const { status } = await requestEmailVerificationLink();

  (status) && toast.success(status)

  isLoading.value = false;
}

const logoutUser = async () => {
  if (await logout()) {
    user.value = null;
    router.push('/login');
  }
}

</script>

<template>
  <div class="space-y-6" action="#">
    <div class="space-y-2">
      <h5 class="text-xl font-medium text-gray-900 dark:text-white">Email verification notice</h5>
      <p>Registration complete! We've sent a verification to your email. If not received, use the resend button below. Welcome aboard!</p>
    </div>
    <PrimaryButton 
      v-if="!isLoading"
      @click="sendEmailVerificationLink"
      class="w-full"
      type="submit">
      Resend email verification
    </PrimaryButton>
    <LoadingButton v-else class="w-full" />
    <SecondaryButton
      @click="logoutUser"
      class="w-full">
      <i class="fa fa-sign-out"></i>
      Sign out
    </SecondaryButton>
  </div>
</template>