import { createRouter, createWebHistory } from 'vue-router'

import AuthLayout from '@/layouts/AuthLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

import Login from '@/pages/auth/Login.vue'
import Register from '@/pages/auth/Register.vue'

import Dashboard from '@/pages/dashboard/Dashboard.vue'

import { useAuthStore } from '@/modules/auth/stores/auth.store'
import EmployeeDetails from '@/pages/employees/EmployeeDetails.vue'
import EmployeeEdit from '@/pages/employees/EmployeeEdit.vue'
import Employees from '@/pages/employees/Employees.vue'
import './guard'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },

    // Auth route
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login,
        },
        {
          path: 'register',
          name: 'register',
          component: Register,
        },
      ],
    },

    // Dashboard route
    {
      path: '/dashboard',
      component: DashboardLayout,

      children: [
        {
          path: '',
          name: 'dashboard',
          component: Dashboard,
        },

        // Employees routes
        {
          path: '/employees',
          component: Employees
        },

        {
          path: '/employees/:id',
          component: EmployeeDetails
        },

        {
          path: '/employees/:id/edit',
          component: EmployeeEdit
        }
      ],
    },

    // Employees routes

  ],
})



router.beforeEach((to) => {

  const { isAuthenticated } = useAuthStore()

  const isAuthPage = to.path.startsWith('/auth')

  const isProtectedPage = to.path.startsWith('/dashboard')

  if (isAuthenticated && isAuthPage) {
    return '/dashboard'
  }

  if (!isAuthenticated && isProtectedPage) {
    return '/auth/login'
  }
})

export default router
