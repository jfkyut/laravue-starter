import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useHttpProfile } from "@/http/profile";

const { getProfileRequest } = useHttpProfile();

export const useProfileStore = defineStore('profile', () => {

  const user = ref(null);
  const isAuthenticated = computed(() => !user.value ? false : true)
  const isVerified = computed(() => !user.value?.email_verified_at ? false : true);

  const getProfile = async () => {
    if (!user.value) {
      const { data } = await getProfileRequest();

      if (data) {
        user.value = data;
      }
    }
  }

  const updateProfile = async (form) => {
    user.value.name = form.name;
    user.value.email = form.email;
  }

  const destroyProfile = async () => user.value = null

  return {
    user,
    isAuthenticated,
    isVerified,
    updateProfile,
    destroyProfile,
    getProfile
  }
});