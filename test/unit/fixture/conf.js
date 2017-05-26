let { resolve } = require('path')

let webpackConf = {
    resolve: {
        alias: {
            '@': resolve('src', 'bundle')
        }
    }
}

module.exports = {
    webpack: webpackConf
}
