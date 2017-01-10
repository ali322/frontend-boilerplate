var webpackConfig = require("./webpack.production");
var testPort = process.env.TEST_PORT || 6000;

module.exports = function(config) {
    config.set({
        basePath: "../",
        frameworks: ['mocha', "phantomjs-shim"],
        files: [
            'src/__tests__/**/*.es6',
            'src/bundle/**/*.es6'
        ],
        preprocessors: {
            'src/__tests__/**/*.es6': ['webpack', 'sourcemap'],
            'src/bundle/**/*.es6': ['webpack', "coverage", 'sourcemap']
        },
        webpack: {
            resolve: webpackConfig.resolve,
            module: webpackConfig.module
        },
        webpackMiddleware: {
            noInfo: true
        },
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            type: 'lcov',
            dir: 'src/__coverage__/',
            // subdir:"."
            subdir:function(browser){
                return browser.toLowerCase().split(/[ /-]/)[0]
            }
        },
        phantomjsLauncher: {
            exitOnResourceError: true
        },
        port: testPort,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: true
    });
};