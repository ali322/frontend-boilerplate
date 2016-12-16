var webpack = require('webpack'),
    path = require('path'),
    _ = require("lodash");

// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var node_modules_dir = path.resolve(__dirname, '../node_modules');
var env = require('./environment.js');

/*build const*/
var entry = {};
var commonChunks = [];

/*build modules*/
var pageEntries = {},
    pageEntryPath = "";
_.each(env.pages, function(page) {
    var pageEntry = {};
    pageEntryPath = page.path;
    pageEntry[page.name] = [page.entryJS, page.entryCSS];
    _.extend(pageEntries, pageEntry)
});

/*build vendors*/
_.each(env.vendors, function(vendor) {
    commonChunks.push(new webpack.optimize.CommonsChunkPlugin({
        name: vendor.name,
        filename:env.vendorPath + env.buildFolder + vendor.name + ".js"
    }))
    entry[vendor.name] = vendor.entryJS;
});

/*add modules and vendors to entry point*/
_.extend(entry, pageEntries)

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
            loader: 'babel-loader'
        }, , {
            test: /\.html/,
            exclude: [node_modules_dir],
            loader: 'html'
        }, {
            test: /\.styl/,
            exclude: [node_modules_dir],
            loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!stylus')
        }, {
            test: /\.css/,
            exclude: [node_modules_dir],
            loader: ExtractTextPlugin.extract('style', 'css')
        }, {
            test: /\.(png|jpg)$/,
            exclude: [node_modules_dir],
            loader: 'url?limit=25000'
        }]
    },
    resolve: {
        extensions: ["", ".webpack-loader.js", ".web-loader.js", ".loader.js", ".js", ".json", ".coffee"]
    },
    output: {
        path: "./",
        filename: pageEntryPath + env.buildFolder + "[name].js",
        chunkFilename: pageEntryPath + env.buildFolder + "[id].chunk.js",
    },
    plugins:_.union([
            // new webpack.optimize.OccurenceOrderPlugin(true),
            new ExtractTextPlugin(pageEntryPath + env.buildFolder + "[name].css"),
        ],commonChunks)
}
