import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import SalesQuery from '../components/SalesQuery.vue';
import DrugInventory from '../components/DrugInventory.vue';
import DrugSearch from '../components/DrugSearch.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterView
    },
    {
        path: '/sales-query',
        name: 'SalesQuery',
        component: SalesQuery,
        meta: { requiresAuth: true }
    },
    {
        path: '/drug-inventory',
        name: 'DrugInventory',
        component: DrugInventory,
        meta: { requiresAuth: true }
    },
    {
        path: '/drug-search',
        name: 'DrugSearch',
        component: DrugSearch,
        meta: { requiresAuth: true }
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (to.matched.some(record => record.meta.requiresAuth) && !token) {
        next('/login');
    } else {
        next();
    }
});

export default router;
