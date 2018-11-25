import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/refrigerator-list',
      name: 'RefrigeratorList.vue',
      component: () => import('./views/RefrigeratorList.vue')
    }
  ]
})
