import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue'; // 更新导入路径
import SalesQuery from '../components/SalesQuery.vue';
import DrugInventory from '../components/DrugInventory.vue';
import DrugSearch from '../components/DrugSearch.vue';

const routes = [
    {
        path: '/',
        name: 'HomeView',
        component: HomeView
    },
    {
        path: '/sales-query',
        name: 'SalesQuery',
        component: SalesQuery
    },
    {
        path: '/drug-inventory', // 新增
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