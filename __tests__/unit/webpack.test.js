let path = require('path')

function resolve(dir) {
    return path.join(__dirname, '..', '..', dir)
}

module.exports = {
    module: {
        rules: [{
                test: /\.(js|es6)/,
                loader: 'babel-loader',
                include: [resolve('__tests__/unit/spec'), resolve('__tests__/unit/fixture'), resolve('src')]
            },
            {
                test: /\.(tpl|html)/,
                loader: 'html-loader'
            },
            {
                test: /\.vue/,
                loader: 'vue-loader'
            }
        ]
    },
    devtool: '#inline-source-map',
    watch: true,
    resolve: {
        extensions: ['.js', '.json', '.vue'],
        alias: {
            vue: "vue/dist/vue.esm.js",
            vuex: "vuex/dist/vuex.esm.js",
            "vue-router": "vue-router/dist/vue-router.esm.js",
            "@": resolve("src/bundle")
        }
    }
}
