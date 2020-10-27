import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import PKGJson from '../package.json'
import Container from './container.vue'
import './common/responsive'
import createStore from './store'
import createRouter from './router'
// import * as offlinePluginRuntime from 'offline-plugin/runtime'

// offlinePluginRuntime.install()

let router = null
let store = null
let app = null

function createApp(props = {}) {
  const { container } = props
  router = createRouter()
  store = createStore()

  sync(store, router)

  if (module.hot) {
    module.hot.accept()
  }

  app = new Vue({
    store,
    router,
    render(h) {
      return h(Container)
    }
  }).$mount(container ? container.querySelector('#app') : '#app')
}

function destroyApp() {
  app.$destroy()
  app = null
  store = null
  router = null
}

if (!window.__POWERED_BY_QIANKUN__) {
  createApp()
}

export async function bootstrap() {
  console.log('bootstrap')
}

export async function mount(props) {
  console.log('mount')
  createApp(props)
}

export async function unmount() {
  console.log('unmount')
  destroyApp()
}
