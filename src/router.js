import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/shopping-list',
      name: 'ShoppingList',
      component: () => import('./views/ShoppingList.vue')
    },
    {
      path: '/refrigerator-list',
      name: 'RefrigeratorList',
      component: () => import('./views/RefrigeratorList.vue')
    },
    {
      path: '/add-list',
      name: 'AddList',
      component: () => import('./views/AddList.vue')
    },
    {
      path: '/setting',
      name: 'Setting',
      component: () => import('./views/Setting.vue')
    }
  ]
})
