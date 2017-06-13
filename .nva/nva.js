const baseConf = {
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.esm.js',
            "vue-router": 'vue-router/dist/vue-router.esm.js'
        }
    }
}

module.exports = {
    type: "frontend",
    spa: [{
        from: /\/(\S+)?$/,
        to: '/index.html'
    }],
    jsExt: ".js",
    mock: require('./mock'),
    cssExt: ".styl",
    beforeDev(config) {
        return baseConf
    },
    beforeBuild(config) {
        return baseConf
    },
    beforeVendor(config) {
        return config.map(v => {
            return v.name === 'js' ? baseConf : null
        })
    }
}
