<script setup>
import TextInput from '@/components/inputs/TextInput.vue';
import { useProfileStore } from '@/stores/profile';
import { storeToRefs } from 'pinia';
import EditProfile from '@/views/profile/partials/EditProfile.vue';
import EditPassword from './partials/EditPassword.vue';
import DeleteProfile from './partials/DeleteProfile.vue';

  const { user } = storeToRefs(useProfileStore());
</script>

<template>
  <div class="flex justify-center">
    <div class="space-y-6 mt-5">

      <section>
        <header class="mb-6 pb-2 border-b dark:border-b-gray-700">
          <h2 class="text-2xl font-medium dark:text-white">General</h2>
        </header>
        <div class="bg-white dark:bg-gray-800 shadow border dark:border-gray-700 max-w-4xl p-4 rounded-md space-y-4 relative">
          <div class="space-y-2">
            <h3 class="text-lg font-medium">Profile Information</h3>
            <p class="text-sm">Notice: Updating your email would require you to reverify your new chosen email.</p>
          </div>
          <div class="flex flex-col lg:flex-row gap-4">
            <div class="space-y-2 w-full">
              <label for="name">Name</label>
              <TextInput 
                :readOnly="true"
                :value="user.name" />
            </div>
            <div class="space-y-2 w-full">
              <label for="email">Email</label>
              <TextInput 
                :readOnly="true"
                :value="user.email" />
            </div>
          </div>
          <EditProfile />
        </div>
      </section>
  
      <section>
        <header class="mb-6 pb-2 border-b dark:border-b-gray-700">
          <h2 class="text-2xl font-medium dark:text-white">Advance Settings</h2>
        </header>

        <div class="bg-white dark:bg-gray-800 shadow border dark:border-gray-700 max-w-4xl p-4 space-y-4 rounded-t-md">
          <div class="space-y-2">
            <h3 class="text-lg font-medium">Password settings</h3>
            <p>For security reasons, it's a good practice to update your password regularly. Click here to change your password now.</p>
          </div>
          <div>
            <EditPassword />
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 shadow border dark:border-gray-700 max-w-4xl p-4 space-y-4 rounded-b-md">
          <div class="space-y-2">
            <h3 class="text-lg font-medium">Account deletion</h3>
            <p>If you wish to delete your account, please be aware that this action is irreversible and will permanently delete all your data. Click here if you are sure you want to proceed with account deletion.</p>
          </div>
          <div>
            <DeleteProfile />
          </div>
        </div>
      </section>

    </div>
  </div>
</template>