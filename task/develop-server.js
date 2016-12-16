var webpack = require('webpack');
// var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.hot-update.js');
var browserSync = require("browser-sync");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");

var bundler = webpack(config);

var listenPort = process.env.LISTEN_PORT || 5000;
browserSync({
    port:listenPort,
    server: {
        baseDir: "./src",
        middleware: [
            webpackDevMiddleware(bundler, {
                publicPath: config.output.publicPath,
                stats: {
                    colors: true
                },
                hot:true,
                noInfo:true
            }),
            webpackHotMiddleware(bundler)
        ],
    },
    files: [
        "src/bundle/**/*.es6",
        "src/bundle/**/*.scss",
        "src/page/*.html"
    ],
    online: true,
    open: false,
    watchOptions: {
        debounceDelay: 1000
    },
    ghostMode: {
        clicks: true,
        forms: true,
        scroll: true
    },
    // logConnections: true,
    logLevel: "info"
}, function() {
  console.log('🌎  browserSync Listening at port %d',listenPort);
})