import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import StatsQuery from "@/components/StatsQuery.vue";
import DrugInventory from '../components/DrugInventory.vue';
import DrugSearch from '../components/DrugSearch.vue';
import FinancialStats from '../components/FinancialStats.vue';
import DrugBatchCreate from '../components/DrugBatchCreate.vue';
import DrugManage from '../components/DrugManage.vue';
import DrugPredict from '../components/DrugPredict.vue';
import SalesQuery from "@/components/SalesQuery.vue";
const routes = [
    {
        path: '/',
        redirect: '/login'
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
        path: '/home',
        name: 'Home',
        component: HomeView,
        meta: { requiresAuth: true }
    },
    {
        path: '/stats-query',
        name: 'StatsQuery',
        component: StatsQuery,
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
    },
    {
        path: '/financial-stats',
        name: 'FinancialStats',
        component: FinancialStats,
        meta: { requiresAuth: true }
    },
    {
        path: '/drug-batch-create',
        name: 'DrugBatchCreate',
        component: DrugBatchCreate,
        meta: { requiresAuth: true }
    },
    {
        path: '/drug-manage',
        name: 'DrugManage',
        component: DrugManage,
        meta: { requiresAuth: true }
    },
    {
        path: '/drug-predict',
        name: 'DrugPredict',
        component: DrugPredict,
        meta: { requiresAuth: true}
    },
    {
        path: '/sales-query',
        name: 'SalesQuery',
        component: SalesQuery,
        meta: { requiresAuth: true}
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
