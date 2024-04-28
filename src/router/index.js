import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
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
        beforeEnter: (to, from, next) => {
            if (!store.state.staff || (store.state.staff.quyentruycap != 1)) {
                next('/');
            }
            next();
        }
    },
    {
        path: '/nhan-vien/bep',
        name: 'kitchen-page',
        component: () => import('@/layouts/kitchenLayout.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.state.staff || (store.state.staff.quyentruycap != 3)) {
                next('/');
            }
            next();
        }
    },
    {
        path: '/nhan-vien/phuc-vu',
        name: 'order-staff-page',
        component: () => import('@/layouts/orderStaffLayout.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.state.staff || (store.state.staff.quyentruycap != 0)) {
                next('/');
            }
            next();
        }
    },
    {
        path: '/nhan-vien/lich-lam-viec',
        name: 'calendrier-work-page',
        component: () => import('@/layouts/calendrierWorkStaffLayout.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.state.staff) {
                next('/');
            }
            next();
        }
    },
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