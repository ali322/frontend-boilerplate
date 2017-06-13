let { resolve } = require('path')

let webpackConf = {
    resolve: {
        alias: {
            '@': resolve('src')
        }
    }
}

module.exports = {
    webpack: webpackConf
}
