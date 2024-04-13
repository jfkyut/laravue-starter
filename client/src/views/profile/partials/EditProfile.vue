  <script setup>

  import GenericModal from '@/components/modals/GenericModal.vue';
  import { ref, getCurrentInstance } from 'vue';
  import ExtraButton from '@/components/buttons/ExtraButton.vue';
  import TextInput from '@/components/inputs/TextInput.vue';
  import { useProfileStore } from '@/stores/profile';
  import { storeToRefs } from 'pinia';
  import { useHttpProfile } from '@/http/profile';
  import { useToast } from 'vue-toastification';

  const { updateProfileRequest } = useHttpProfile();

  const profileStore = useProfileStore();
  const { user } = storeToRefs(profileStore);

  const instance = getCurrentInstance();
  const toast = useToast();

  const nameInputRef = ref(null);

  const isModalShow = ref(false);
  const isLoading = ref(false);
  const form = ref({
    name: null,
    email: null,
  })

  const openModal = () => {
    isModalShow.value = true;

    form.value.name = user.value.name;
    form.value.email = user.value.email;

    setTimeout(() => {
      instance.refs.nameInputRef.$el.focus();
    }, 200)
  }

  const closeModal = () => {
    isModalShow.value = false;
  }

  const updateProfile = async () => {
    isLoading.value = true;
    
    (await updateProfileRequest(form.value))
      ? (
          toast.success('Profile update successful.'), 
          profileStore.updateProfile(form.value), 
          closeModal()
        )
      : openModal();

    isLoading.value = false;
  }
  </script>

  <template>
    <div>
      <ExtraButton @click="openModal" class="absolute top-4 right-4">
        <i class="fa fa-edit"></i>
      </ExtraButton>
    
      <GenericModal 
        title="Edit Profile"
        :show="isModalShow"
        confirmButtonText="Update"
        :isLoading="isLoading"
        @onConfirm="updateProfile"
        @onCancel="closeModal">
      
        <div class="space-y-2">
          <label for="name">Name</label>
          <TextInput 
            ref="nameInputRef" 
            name="name" 
            v-model="form.name"/>
        </div>
        <div class="space-y-2">
          <label for="email">Email</label>
          <TextInput
            name="email" 
            v-model="form.email" />
        </div>
    
      </GenericModal>
    </div>
  </template>