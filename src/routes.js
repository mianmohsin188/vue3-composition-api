import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./components/dashboard/Index.vue";
import LoginView from "./components/auth/Login.vue";
import MainLayout from "./layout/MainLayout.vue";
import DocsView from "./components/docs/Index.vue";
import ProductsView from "./components/products/Index.vue";
import {useAuthStore} from "./store/auth.js";



const routes = [

    {
        path: "/",
        name: "home",
        component: MainLayout,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: "",
                component: HomeView
            }
        ]
    },
    {
        path: "/docs",
        name: "docs",
        component: MainLayout,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: "",
                component: DocsView
            }
        ]
    },
    {
        path: "/products",
        name: "products",
        component: MainLayout,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: "",
                component: ProductsView
            }
        ]
    },
    {
        path: "/login",
        name: "login",
        component: LoginView,
        meta: {
            requireGuest: true
        }
    }

]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

/*router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth && (authStore.user==null && localStorage.getItem('token')==null)) {
        next('/login');
    }
    else if (to.meta.requireGuest && ( authStore.user!=null || localStorage.getItem('token')!=null)) {
        next('/');
    }
    else {

        // Otherwise, proceed with navigation
        next();
    }




});*/

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const token = localStorage.getItem("token");

    if (to.meta.requiresAuth && !authStore.user && !token) {
        // Redirect to login if route requires authentication and user is not logged in
        next("/login");
    } else if (to.meta.requireGuest && (authStore.user || token)) {
        // Redirect to home if route requires guest access and user is logged in
        next("/");
    } else {
        // Store the last visited route in localStorage
        localStorage.setItem("lastVisitedRoute", to.fullPath);
        // Allow navigation to proceed
        next();
    }
});

export default router