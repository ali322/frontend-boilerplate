var webpack = require('webpack'),
    path = require('path'),
    del = require("del"),
    fs = require('fs'),
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
var happypackPlugin = helper.happypackPlugin()

/** build variables*/
var entry = {};
var htmls = [];
var ASSET_IMAGE_OUTPUT = path.join(env.distFolder, env.assetFolder, 'image', path.sep)
var ASSET_FONT_OUTPUT = path.join(env.distFolder, env.assetFolder, 'font', path.sep)
var HTML_OUPUT = path.join(env.distFolder, path.sep)
var ASSET_INPUT = path.join(env.sourcePath, env.assetFolder)

/** clean build assets*/
del.sync([path.join(env.distFolder,env.assetFolder)])

/** build vendors*/
var dllRefs = []
var vendorJS = fs.readdirSync(path.join(env.distFolder,env.vendorFolder))
_.each(env.vendors['js'], function(vendor, key) {
    var _manifest = require(path.join("..",env.distFolder,env.vendorFolder,key+'-manifest.json'))
    dllRefs.push(new webpack.DllReferencePlugin({
        context:__dirname,
        manifest:_manifest,
    }))
});
_.each(env.vendors['css'], function(vendor, key) {
    entry[key] = vendor;
})

_.each(env.modules, function(moduleObj) {
    del.sync(path.join(env.distFolder,moduleObj.name))
    var moduleEntry = {};
    moduleEntry[moduleObj.name] = [moduleObj.entryJS, moduleObj.entryCSS].concat(moduleObj.html);
    var _chunks = [moduleObj.name]
    var _more = {js:[]}
    if (moduleObj.vendor) {
        if(moduleObj.vendor.js){
            _more.js = vendorJS.filter(function(v){
                var _regexp = new RegExp(moduleObj.vendor.js+"-\\w+\\.js$")
                return _regexp.test(v)
            }).map(function(v){
                return path.join(env.vendorFolder,env.distFolder,v)
            })
        }
        moduleObj.vendor.css && _chunks.push(moduleObj.vendor.css)
    }
    moduleObj.html.forEach(function(html) {
        htmls.push(new InjectHtmlPlugin({
            processor: function(_url) {
                var _urls = _url.split(path.sep)
                return _urls.indexOf(env.vendorFolder) > -1?path.join('..',_urls.slice(-2).join(path.sep)):_urls.slice(-1)[0]
            },
            more:_more,
            chunks: _chunks,
            filename: html,
            customInject: [{
                start: '<!-- start:bundle-time -->',
                end: '<!-- end:bundle-time -->',
                content: helper.bundleTime()
            }]
        }))
    })
    _.extend(entry, moduleEntry)
});

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
            loader: 'happypack/loader?id=js'
        }, , {
            test: /\.html/,
            exclude: [node_modules_dir],
            loader: 'file?outputPath=' + HTML_OUPUT + '&name=[name]'+path.sep+'[name].[ext]!extract!html'
        }, {
            test: /\.styl/,
            exclude: [node_modules_dir],
            loader: ExtractTextPlugin.extract('style', 'css!postcss!happypack/loader?id=stylus')
        }, {
            test: /\.css/,
            loader: ExtractTextPlugin.extract('style', 'css!postcss')
        }, {
            test: /\.(png|jpg)$/,
            exclude: [node_modules_dir],
            loaders: [
                'file?outputPath=' + ASSET_IMAGE_OUTPUT + '&hash=sha512&digest=hex&name=[hash:8].[ext]',
                'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]
        }, {
            test: /\.(eot|ttf|woff2|svg|woff)/,
            loaders: [
                'file?outputPath=' + ASSET_FONT_OUTPUT + '&hash=sha512&digest=hex&name=[hash:8].[ext]',
            ]
        }]
    },
    fileLoader: {
        publicPath: function(url) {
            var _prefix = /\.(jpg|png|bmp|gif)$/.test(url) ? path.join('..', env.assetFolder, 'image') :
                path.join('..', env.assetFolder, 'font')
            return path.join(_prefix, url)
        }
    },
    postcss: function(webpack) {
        return [postcssImport({ addDependencyTo: true }),
            autoPrefixer(),
            cssURL({
                url: function(originURL, decl, from, dirname, to, options, result) {
                    return helper.urlResolver(originURL, from, to, ASSET_INPUT)
                }
            }),
            sprites({
                spritePath: path.join(env.distFolder, env.assetFolder, 'sprites')
            })
        ]
    },
    resolve: {
        extensions: ["", ".js", ".json", ".es6", ".jsx", ".styl"]
    },
    output: {
        path: path.resolve(process.cwd()),
        filename: path.join(env.distFolder, "[name]", "[name]-[hash:8].js"),
        chunkFilename: path.join(env.distFolder, "[name]", "[id]-[hash:8].chunk.js")
    },
    plugins: _.union([
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify('production') }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: false
        }),
        new ExtractTextPlugin(path.join(env.distFolder, "[name]", "[name]-[hash:8].css")),
        new ChunkTransformPlugin({
            chunks: ['common'],
            test: /\.css/,
            filename: function(filename) { return path.join(env.distFolder, env.vendorFolder, path.basename(filename)) }
        })
    ],dllRefs,happypackPlugin, htmls)
}