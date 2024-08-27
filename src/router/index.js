import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

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
      path: '/jobs/:id',
      name: 'job-details',
      component: () => import('../views/JobDetailsView.vue')
    },
    {
      path: '/post-job',
      name: 'post-job',
      component: () => import('../views/PostJobView.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    }
  ],
  scrollBehavior() {
    // Always scroll to top
    return { top: 0 }
  }
})

export default router
