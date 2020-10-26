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

if (!window.__POWERED_BY_QIANKUN__) {
  createApp()
}

export function bootstrap() {
  return Promise.resolve().then(() => {
    console.log(`${PKGJson.name} app bootstraped`)
  })
}

export async function mount(props) {
  return Promise.resolve().then(() => {
    console.log(`${PKGJson.name} app mounted`)
    createApp(props)
  })
}

export async function unmount() {
  return Promise.resolve().then(() => {
    app.$destroy()
    app.$el.innerHTML = ''
    app = null
    store = null
    router = null
  })
}
