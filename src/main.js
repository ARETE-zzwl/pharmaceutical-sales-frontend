import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@/css/basic.css'
import '@/css/login.css'
import '@/css/nav.css'

createApp(App).use(router).mount('#app');