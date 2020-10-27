import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from './layout.vue'
import SubAPP from './module/subapp.vue'
import SubRoute from './module/subroute.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/todo',
        name: 'todo',
        component: SubAPP
      },
      {
        path: '/subroute',
        name: 'subroute',
        component: SubRoute
      }
    ]
  },
    { path: '*', component: { template: '<div>not found</div>' } }
]

export default () => {
  const router = new VueRouter({
    mode: 'history',
    routes
  })
  router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0)
    next()
  })
  return router
}
