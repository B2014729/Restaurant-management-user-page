import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'customer-page',
        component: () => import('@/layouts/customerLayout.vue'),
    },
    {
        path: '/nhan-vien/thu-ngan',
        name: 'cashier-page',
        component: () => import('@/layouts/cashierLayout.vue'),
    },
    // {
    //     path: '/nhan-vien/phuc-vu',
    //     name: 'customer-page',
    //     component: () => import('@/layouts/customerLayout.vue'),
    // },
    // {
    //     path: '/nhan-vien/bep',
    //     name: 'customer-page',
    //     component: () => import('@/layouts/customerLayout.vue'),
    // },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: 'active',
});

export default router;