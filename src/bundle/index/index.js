import app from './container'
import "../common/responsive"

if (module.hot) {
    module.hot.accept()
}

app.$mount('#app')
