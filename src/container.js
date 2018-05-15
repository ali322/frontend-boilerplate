import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store'
import Container from './container.vue'

sync(store, router)

const app = new Vue({
  router,
  store,
  render (h) {
    return h(Container)
  }
})

export default app
