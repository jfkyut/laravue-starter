<script setup>

import { RouterLink } from 'vue-router';
import { useThemeStore } from '@/stores/theme';
import { useSidebarStore } from '@/stores/sidebar';
import UserDropdown from '@/layouts/auth/partials/UserDropdown.vue';
import ExtraButton from '@/components/buttons/ExtraButton.vue';
import { storeToRefs } from 'pinia';

const { theme } = storeToRefs(useThemeStore());
const { setToDark, setToLight } = useThemeStore();

const { isShow } = storeToRefs(useSidebarStore())
const { setHide, setShow } = useSidebarStore();

const toggleTheme = (e) => {
  e.target.checked
    ? setToDark()
    : setToLight()
}

const toggleSidebar = () => {
  isShow.value === true
    ? setHide()
    : setShow()
}

const closeOnSmallScreen = () => {
  if (window.innerWidth <= 768) setHide()
}

</script>

<template>
<div class="relative">
  <div
    :class="isShow ? 'md:ml-64' : 'md:ml-0'"
    class="bg-white dark:bg-gray-800 pt-4 p-2 fixed top-0 right-0 left-0 flex justify-between border-b dark:border-gray-700 shadow transition-transform z-10">
    <ExtraButton @click="toggleSidebar">
      <span class="sr-only">Open sidebar</span>
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
      </svg>
    </ExtraButton>
    <UserDropdown />
  </div>
  
  <aside 
    id="default-sidebar" 
    :class="isShow ? 'translate-x-0' : '-translate-x-full'"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-gray-800 border-r border-gray-700" aria-label="Sidebar">
    <div class="px-3 py-4 pt-5">
      <h2 class="text-white font-black uppercase md:text-center">Vue Starter</h2>
      <button @click="setHide()" type="button" class="md:hidden text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
        <span class="sr-only">Close menu</span>
      </button>
    </div>
    <div class="h-full px-3 py-4 overflow-y-auto">
      <ul class="space-y-2 font-medium">
        <li>
          <RouterLink to="/home" @click="closeOnSmallScreen" active-class="bg-gray-700" class="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group">
            <span class="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white">
              <i class="fa fa-home"></i>
            </span>
            <span class="ms-3">Home</span>
          </RouterLink>
        </li>
        <li>
          <div class="flex items-center justify-between p-2 rounded-lg text-white hover:bg-gray-700 group">
            <div>
              <span class="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white">
                  <i class="fa fa-moon"></i>
                </span>
              <span class="ms-3">Dark mode</span>
            </div>

            <label class="inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                class="sr-only peer" 
                :checked="theme === 'dark' ? true : false"
                @change="toggleTheme">
              <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </li>
      </ul>
    </div>
  </aside>
  
  <div
    :class="isShow ? 'md:ml-64' : 'md:ml-0'"
    class="p-4 bg-gray-50 dark:bg-gray-900 min-h-screen dark:text-gray-400 transition-transform pt-20">
    <div
      :class="isShow ? 'opacity-100' : 'opacity-0 invisible'" 
      @click.self="setHide()"
      class="backdrop-sepia-0 bg-gray-400/70 duration-200 dark:bg-gray-950/70 md:hidden z-30 fixed left-0 right-0 top-0 bottom-0"></div>
    <slot/>
  </div>
</div>

</template>