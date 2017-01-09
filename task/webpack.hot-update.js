var webpack = require('webpack'),
    path = require('path'),
    _ = require("lodash");

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var InjectHtmlPlugin = require("inject-html-webpack-plugin")
var node_modules_dir = path.resolve(__dirname, '../node_modules');
var env = require('./environment.js');

/*build pages*/
var entry = {};
var commonChunks = [];
var htmls = [];

_.each(env.modules, function(moduleObj) {
    var moduleObjEntry = {};
    moduleObjEntry[moduleObj.name] = [
        "webpack-hot-middleware/client",
        'webpack/hot/dev-server',
        moduleObj.entryJS,
        moduleObj.entryCSS
    ];
    _.extend(entry, moduleObjEntry);
    moduleObj.html.forEach(function(html) {
        var _chunks = [moduleObj.name]
        if (moduleObj.vendor) {
            moduleObj.vendor.js && _chunks.push(moduleObj.vendor.js)
            moduleObj.vendor.css && _chunks.push(moduleObj.vendor.css)
        }
        htmls.push(new InjectHtmlPlugin({
            prefixURI:env.hmrPath,
            chunks: _chunks,
            filename: html
        }))
    })
});

/*build vendors*/
_.each(env.vendors['js'], function(vendor, key) {
    commonChunks.push(new webpack.optimize.CommonsChunkPlugin({
        name: key,
        chunks: [key],
        filename: env.vendorPath + env.buildFolder + key + ".js"
    }))
    entry[key] = vendor
});
_.each(env.vendors['css'], function(vendor, key) {
    entry[key] = vendor;
})

module.exports = {
    entry: entry,
    module: {
        loaders: [{
            test: /\.json/,
            exclude: [node_modules_dir],
            loader: 'json'
        }, {
            test: /\.(es6|jsx)$/,
            exclude: [node_modules_dir],
            loader: 'babel'
        }, , {
            test: /\.html/,
            exclude: [node_modules_dir],
            loader: 'html'
        }, {
            test: /\.styl/,
            exclude: [node_modules_dir],
            loader: 'style!css!autoprefixer!stylus'
        }, {
            test: /\.css/,
            loader: 'style!css'
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&minetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }, {
            test: /\.(png|jpg)$/,
            exclude: [node_modules_dir],
            loader: 'url?limit=25'
        }]
    },
    devtool: "#eval-source-map",
    watch: true,
    resolve: {
        extensions: ["", ".js", ".json", ".es6", ".jsx", ".style"]
    },
    output: {
        path: path.join(__dirname, "../src"),
        filename: "[name].js",
        chunkFilename: "[id].chunk.js",
        publicPath: env.hmrPath
    },
    plugins: _.union([
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ], commonChunks,htmls)
}