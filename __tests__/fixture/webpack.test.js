module.exports = {
    module: {
        rules: [{
                test: /\.(js|es6)/,
                loader: 'babel-loader',
                // include: ['../spec', '../../src']
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
    resolve: {
        extensions: ['.js', '.json', '.vue'],
        alias: {
            vue: "vue/dist/vue.esm.js",
            vuex: "vuex/dist/vuex.esm.js",
            "vue-router": "vue-router/dist/vue-router.esm.js"
        }
    }
}
