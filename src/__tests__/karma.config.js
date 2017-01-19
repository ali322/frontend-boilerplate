// var webpackConfig = require("./webpack.production");
var testPort = process.env.TEST_PORT || 6000;
var path = require('path')
var node_modules_dir = path.resolve(__dirname, '../node_modules');

module.exports = function(config) {
    config.set({
        basePath: process.cwd(),
        frameworks: ['mocha'],
        files: [
            'src/__tests__/spec/**/*.es6',
            'src/bundle/**/*.es6'
        ],
        preprocessors: {
            'src/__tests__/spec/**/*.es6': ['webpack','sourcemap'],
            'src/bundle/**/*.es6': ['webpack','coverage','sourcemap']
        },
        webpack: {
            resolve: {
                extensions: ["", ".js", ".json", ".es6", ".jsx", ".styl"]
            },
            module: {
                loaders:[{
                    test: /\.(es6|jsx)$/,
                exclude: [node_modules_dir],
                loader: 'babel-loader'
                }]
            },
            devtool: 'inline-source-map'
        },
        webpackMiddleware: {
            noInfo: true
        },
        reporters: ['progress','coverage'],
        coverageReporter: {
            type: 'lcov',
            dir: 'src/__coverage__/',
            // subdir:"."
            subdir:function(browser){
                return browser.toLowerCase().split(/[ /-]/)[0]
            }
        },
        port: testPort,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['jsdom'],
        singleRun: true
    });
};