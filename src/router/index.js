import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import SalesQuery from '../components/SalesQuery.vue';
import DrugInventory from '../components/DrugInventory.vue';
import DrugSearch from '../components/DrugSearch.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/sales-query',
        name: 'SalesQuery',
        component: SalesQuery
    },
    {
        path: '/drug-inventory',
        name: 'DrugInventory',
        component: DrugInventory
    },
    {
        path: '/drug-search',
        name: 'DrugSearch',
        component: DrugSearch
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;