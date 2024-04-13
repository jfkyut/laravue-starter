import './assets/main.css'
import './config/http';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification';
import "vue-toastification/dist/index.css";

import App from './App.vue'
import router from './router'

const app = createApp(App)

const options = {
  position: "top-center",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false
}

app.use(Toast, options);
app.use(createPinia())
app.use(router)

app.mount('#app')
