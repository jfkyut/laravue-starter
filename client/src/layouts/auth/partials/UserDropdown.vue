<script setup>

import DropdownButton from '@/components/dropdowns/DropdownButton.vue';
import DropdownMenu from '@/components/dropdowns/DropdownMenu.vue';
import DropdownLink from '@/components/dropdowns/DropdownLink.vue'
import { getCurrentInstance, ref, watch } from 'vue';
import ExtraButton from '@/components/buttons/ExtraButton.vue';
import { useRouter } from 'vue-router';
import { useHttpAuth } from '@/http/auth';
import { useProfileStore } from '@/stores/profile';
import { storeToRefs } from 'pinia';

const { user } = storeToRefs(useProfileStore());
const { logoutRequest } = useHttpAuth();

const instance = getCurrentInstance();

const dropdownRef = ref(null);

const router = useRouter();

const logout = async () => {
  if (await logoutRequest()) {
    user.value = null;
    router.push('/login');
  }
}

const isDropdownShow = ref(false);

const showDropdown = () => {
  isDropdownShow.value = true;
}

const hideDropdown = () => isDropdownShow.value = false;

watch(isDropdownShow, (dropdownState) => {
  (dropdownState) 
    ? document.addEventListener('click', handleClickOutside)
    : document.removeEventListener('click', handleClickOutside)
})

const handleClickOutside = (e) => {
  (
    !instance.refs.dropdownRef.$el.contains(e.target) || 
    !instance.refs.dropdownTriggerRef.$el.contains(e.target)
  ) && hideDropdown()
}

</script>

<template>
  <div class="relative">
    <ExtraButton @click.stop="showDropdown" class="border dark:border-gray-700">
      {{ user?.name }}
    </ExtraButton>

    <DropdownMenu :show="isDropdownShow" ref="dropdownRef">
      <DropdownLink to="/account">
        <i class="fa fa-user mr-2"></i>
        <span>Account</span>
      </DropdownLink>
      <DropdownButton @click="logout">
        <i class="fa fa-sign-out mr-2"></i>
        <span>Sign out</span>
      </DropdownButton>
    </DropdownMenu>
  </div>
</template>