<script setup>
import DangerButton2 from '@/components/buttons/DangerButton2.vue';
import DangerModal from '@/components/modals/DangerModal.vue';
import TextInput from '@/components/inputs/TextInput.vue';
import { getCurrentInstance, ref } from 'vue';
import { useProfileStore } from '@/stores/profile';
import { useHttpProfile } from '@/http/profile';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const { destroyProfileRequest } = useHttpProfile();

const toast = useToast();
const router = useRouter();
const instance = getCurrentInstance();
const profileStore = useProfileStore();

const isModalShow = ref(false);
const isLoading  =ref(false);
const passwordInputRef = ref(null);

const form = ref({
  password: null
})

const openModal = () => {
  isModalShow.value = true;

  setTimeout(() => {
    instance.refs.passwordInputRef.$el.focus()
  }, 200)
}

const closeModal = () => {
  isModalShow.value = false;
  form.value.password = null;
}

const destroyProfile = async () => {
  isLoading.value = true;
  
  (await destroyProfileRequest(form.value))
    ? (
        router.push('/login'),
        toast('You\'ve deleted your account. We are happy for having you.'),
        profileStore.destroyProfile(),
        closeModal()
      )
    : openModal()

  isLoading.value = false;
}

</script>

<template>
  <div>
    <DangerButton2 @click="openModal">Delete Account</DangerButton2>

    <DangerModal
      title="You will be deleting your account permanently. Are you sure you want to continue?"
      :show="isModalShow"
      :isLoading="isLoading"
      @onConfirm="destroyProfile"
      @onCancel="closeModal">

      <div class="space-y-2">
        <label for="password" class="sr-only">Password</label>
        <TextInput 
          ref="passwordInputRef"
          name="password" 
          type="password" 
          placeholder="Password"
          v-model="form.password" />
      </div>
    </DangerModal>
  </div>
</template>