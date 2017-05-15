let { resolve } = require('path')
let webpackConf = {
    resolve: {
        alias: {
            'taurus': resolve('src/index.js')
        }
    }
}

module.exports = {
    entry: resolve('test','unit', 'fixture', 'setup.js'),
    reportFolder: resolve('test','unit', 'coverage'),
    webpack: webpackConf
}
