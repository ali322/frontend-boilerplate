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

createApp()
