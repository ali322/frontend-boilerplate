import app from './container'
import './common/responsive'
import * as offlinePluginRuntime from 'offline-plugin/runtime'

offlinePluginRuntime.install()

if (module.hot) {
  module.hot.accept()
}

app.$mount('#app')
