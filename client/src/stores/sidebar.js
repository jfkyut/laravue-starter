import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useSidebarStore = defineStore('sidebar', () => {

  const isShow = ref(JSON.parse(sessionStorage.getItem('sidebar')) || false);

  watch(isShow, (isShow) => {
    sessionStorage.setItem('sidebar', JSON.stringify(isShow));
  });

  const setShow = () => {
    isShow.value = true;
  }

  const setHide = () => {
    isShow.value = false;
  }

  return { isShow, setShow, setHide }
});