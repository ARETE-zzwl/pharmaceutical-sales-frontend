import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue'; // 更新导入路径
import SalesQuery from '../components/SalesQuery.vue';
import DrugBatchCreate from '../components/DrugBatchCreate.vue';

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
        path: '/drug-batch-create',
        name: 'DrugBatchCreate',
        component: DrugBatchCreate
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;