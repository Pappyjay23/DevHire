import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const isAuthenticated = () => {
  return !!localStorage.getItem('user')
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: () => import('../views/JobsView.vue')
    },
    {
      path: '/jobs/api/:id',
      name: 'api-job-details',
      component: () => import('../views/JobDetailsView.vue')
    },
    {
      path: '/jobs/site/:id',
      name: 'site-job-details',
      component: () => import('../views/JobDetailsView.vue')
    },
    {
      path: '/post-job',
      name: 'post-job',
      component: () => import('../views/PostJobView.vue')
    },
    {
      path: '/edit-job/:title/:id',
      name: 'edit-job',
      component: () => import('../views/EditJobView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

// Global before guard
router.beforeEach((to, from, next) => {
  // Define the routes that do not require authentication
  const publicRoutes = ['home', 'login', 'sign-up']

  // Check if the route is public or requires authentication
  if (publicRoutes.includes(to.name) || isAuthenticated()) {
    next() // Allow navigation
  } else {
    next({ name: 'login' }) // Redirect to login if not authenticated
  }
})

export default router
