let webpackConfig = require('./fixture/webpack.test')

/* eslint-disable func-names */
module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'sinon-chai'],
        files: [
            './fixture/index.js'
        ],
        exclude: [],
        preprocessors: {
            "./fixture/index.js": ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noinfo: true
        },
        coverageReporter: {
            dir: './coverage',
            reporters: [
                { type: 'lcov', subdir: '.' },
                { type: 'text-summary' }
            ]
        },
        reporters: ['spec', 'coverage'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true,
        concurrency: Infinity
    })
}
