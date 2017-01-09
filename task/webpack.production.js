var webpack = require('webpack'),
    path = require('path'),
    fs = require("fs"),
    del = require("del"),
    _ = require("lodash");

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var InjectHtmlPlugin = require("inject-html-webpack-plugin");
var ChunkTransformPlugin = require("chunk-transform-webpack-plugin");
var node_modules_dir = path.resolve(__dirname, '../node_modules');
var env = require('./environment.js');
var helper = require('./helper')
var autoPrefixer = require('autoprefixer')
var postcssImport = require('postcss-import')
var sprites = require('postcss-sprites')
var cssURL = require('postcss-url')
var mime = require('mime')

/*build const*/
var entry = {};
var commonChunks = [];
var htmls = [];

/*build pages*/
var moduleEntries = {}

del.sync(path.resolve(env.distFolder))
_.each(env.modules, function(moduleObj) {
    // fs.emptydirSync(path.join(moduleObj.path, env.distFolder))
    var moduleEntry = {};
    moduleEntry[moduleObj.name] = [moduleObj.entryJS, moduleObj.entryCSS].concat(moduleObj.html);
    moduleObj.html.forEach(function(html) {
        var _chunks = [moduleObj.name]
        if (moduleObj.vendor) {
            moduleObj.vendor.js && _chunks.push(moduleObj.vendor.js)
            moduleObj.vendor.css && _chunks.push(moduleObj.vendor.css)
        }
        htmls.push(new InjectHtmlPlugin({
            prefixURI:"../",
            chunks: _chunks,
            filename: html,
            customInject: [{
                start: '<!-- start:bundle-time -->',
                end: '<!-- end:bundle-time -->',
                content: helper.bundleTime()
            }]
        }))
    })
    _.extend(moduleEntries, moduleEntry)
});

/*build vendors*/
_.each(env.vendors['js'], function(vendor, key) {
    commonChunks.push(new webpack.optimize.CommonsChunkPlugin({
        name: key,
        chunks: [key],
        filename: path.join(env.distFolder,env.vendorFolder,key+"-[hash:8].js")
    }))
    entry[key] = vendor;
});
_.each(env.vendors['css'], function(vendor, key) {
    entry[key] = vendor;
})

/*add modules and vendors to entry point*/
_.extend(entry, moduleEntries)

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
            loader: 'file?publicPath=../&name=dist/page/[name].[ext]!extract!html'
        }, {
            test: /\.styl/,
            exclude: [node_modules_dir],
            loader: ExtractTextPlugin.extract('style', 'css!postcss!stylus')
        }, {
            test: /\.css/,
            loader: ExtractTextPlugin.extract('style', 'css!postcss')
        }, {
            test: /\.(png|jpg)$/,
            exclude: [node_modules_dir],
            loaders: [
                'file?publicPath=../../&hash=sha512&digest=hex&name=asset/image/[hash:8].[ext]',
                'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]
        }]
    },
    postcss: function(webpack) {
        return [postcssImport({ addDependencyTo: true }),
            autoPrefixer(),
            cssURL({
                url: function(URL, decl, from, dirname, to, options, result) {
                    var _url = path.join(path.relative(to, 'asset'), URL)
                    var _file = path.resolve(path.join('asset', URL))
                    var _stats = fs.statSync(_file)
                    var mimeType = mime.lookup(_file)
                    if (_stats.size <= 500) {
                        _file = fs.readFileSync(_file)
                        return "data:" + mimeType + ";base64," + _file.toString("base64")
                    }
                    return _url
                }
            }),
            sprites({
                spritePath: path.join('asset', 'sprites')
            })
        ]
    },
    resolve: {
        extensions: ["", ".js", ".json", ".es6", ".jsx", ".styl"]
    },
    output: {
        path: path.resolve(process.cwd()),
        filename: path.join(env.distFolder,"[name]","[name]-[hash:8].js"),
        chunkFilename: path.join(env.distFolder,"[name]","[id]-[hash:8].chunk.js")
    },
    plugins: _.union([
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify('production') }
        }),
        // new webpack.optimize.DedupePlugin(),
        // new webpack.optimize.OccurenceOrderPlugin(true),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     },
        //     output: {
        //         comments: false
        //     },
        //     sourceMap: false
        // }),
        new ExtractTextPlugin(path.join(env.distFolder,"[name]","[name]-[hash:8].css")),
        new ChunkTransformPlugin({
            chunks: ['common'],
            test: /\.css/,
            filename: function(filename) { return path.join(env.distFolder,env.vendorFolder, path.basename(filename)) }
        })
    ], commonChunks, htmls)
}