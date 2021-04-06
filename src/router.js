import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from './index/app.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Index },
  {
    path: '/detail/:id',
    component: r => require.ensure([], () => r(require('./detail/app.vue')))
  },
  { path: '*', component: { template: '<div>not found</div>' } }
]

export default () => {
  const router = new VueRouter({
    // base: 'todo', // used by subapp
    mode: 'history',
    routes
  })
  router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0)
    next()
  })
  return router
}