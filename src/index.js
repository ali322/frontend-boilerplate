import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import Container from './container.vue'
import './common/responsive'
import createStore from './store'
import createRouter from './router'
// import * as offlinePluginRuntime from 'offline-plugin/runtime'

// offlinePluginRuntime.install()

let router = null
let store = null

function createApp(props = {}) {
  const { container } = props
  router = createRouter()
  store = createStore()

  sync(store, router)

  if (module.hot) {
    module.hot.accept()
  }

  new Vue({
    store,
    router,
    render(h) {
      return h(Container)
    }
  }).$mount(container ? container.querySelector('#app') : '#app')
}

createApp()
