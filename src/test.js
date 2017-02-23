import Vue from 'vue/dist/vue'

const vm = new Vue({
    template: `<div>hello world!</div>`,
    data: {
        flag: 1
    }
})

vm.$mount('#app')
