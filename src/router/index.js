import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth',
      name: 'auth',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Auth/Auth.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/Auth/Login.vue'),
        },
        {
          path: 'registration',
          name: 'registration',
          component: () => import('../views/Auth/Registration.vue'),
        }
      ]
    }
  ]
})

export default router
