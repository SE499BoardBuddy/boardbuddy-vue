import './assets/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from "primevue/config";
import 'primeicons/primeicons.css'
import ConfirmationService from 'primevue/confirmationservice';

import App from './App.vue'
import router from './router'

import './assets/nprogress.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    unstyled: true
});
app.use(ConfirmationService);

app.mount('#app')
