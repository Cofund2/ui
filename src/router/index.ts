import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import WelcomeView from '../views/WelcomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'welcome',
    component: WelcomeView
  },
  {
    path: '/create',
    name: 'create',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
