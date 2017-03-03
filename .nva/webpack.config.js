module.exports = [{
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
        }
    }
}, {
    name: "vendor:js",
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
        }
    }
}]
