import Vue from 'vue'
import store from './store'
import app from './module/app.vue'

let container = Vue.component('container', {
    template: `<main><user /></main>`
})

export default new Vue({
    store,
    render(h) {
        return h('div', { attrs: { id: 'app' } }, [h('container')])
    }
})
