import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    { path: '/details', name: 'result', component: () => import('@/views/Details') },
    { path: '/result', name: 'result', component: () => import('@/views/Result') },
    { path: '/classification', name: 'classification', component: () => import('@/views/Classification') },
    { path: '/recent', name: 'recent', component: () => import('@/views/Recent') },
    { path: '/publication', name: 'publications', component: () => import('@/views/Publication') },
    { path: '/profile', name: 'profile', component: () => import('@/views/Profile') },
    { path: '/videos', name: 'videos', component: () => import('@/views/lesson/Create') },
    { path: '/home', name: 'home', component: () => import('@/views/Home') },
    { path: '/login', name: 'login', component: () => import('@/views/Login') },
    { path: '/dashboard', name: 'dashboard', component: () => import('@/views/Dashboard') },
    { path: '/users', name: 'users', component: () => import('@/views/Users') },
    { path: '/register', name: 'register', component: () => import('@/views/Register') },
    { path: '/express', name: 'register', component: () => import('@/views/Express') }
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
