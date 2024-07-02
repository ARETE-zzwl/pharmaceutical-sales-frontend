import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@/css/global.css';
import '@/css/basic.css';
import '@/css/login.css';
import '@/css/nav.css';
import '@/css/tailwind.css';
import '@fortawesome/fontawesome-free/css/all.css';


createApp(App).use(router).mount('#app');
