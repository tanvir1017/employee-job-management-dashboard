import { createRouter, createWebHistory } from 'vue-router'

import AuthLayout from '@/layouts/AuthLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'

import Dashboard from '@/pages/Dashboard.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: "/dashboard",
    },
    {
      path: "/auth",
      component: AuthLayout,
      children: [
        {
          path: "login",
          name: "Login",
          component: Login,
        },
        {
          path: 'register',
          name: 'register',
          component: Register
        }

      ]
    },
    {
      path: '/dashboard',
      component: DashboardLayout,

      children: [
        {
          path: '',
          name: 'dashboard',
          component: Dashboard
        }
      ]
    }
  ],
})

export default router
