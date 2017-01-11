var webpack = require('webpack'),
    path = require('path'),
    fs = require('fs'),
    _ = require("lodash");

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var InjectHtmlPlugin = require("inject-html-webpack-plugin")
var node_modules_dir = path.resolve(__dirname, '../node_modules');
var env = require('./environment.js');
var autoPrefixer = require('autoprefixer')
var postcssImport = require('postcss-import')
var cssURL = require('postcss-url')
var helper = require('./helper')
var happypackPlugin  = helper.happypackPlugin()

/** build variables*/
var entry = {};
var htmls = [];
var ASSET_INPUT = path.join(env.sourcePath,env.assetFolder)

/*build vendors*/
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

/** build modules */
_.each(env.modules, function(moduleObj) {
    var moduleObjEntry = {};
    moduleObjEntry[moduleObj.name] = [
        "webpack-hot-middleware/client",
        'webpack/hot/dev-server',
        moduleObj.entryJS,
        moduleObj.entryCSS
    ];
    _.extend(entry, moduleObjEntry);
    var _chunks = [moduleObj.name]
    var _more = {js:[]}
    if (moduleObj.vendor) {
        if(moduleObj.vendor.js){
            _more.js = vendorJS.filter(function(v){
                var _regexp = new RegExp(moduleObj.vendor.js+"-\\w+\\.js$")
                return _regexp.test(v)
            }).map(function(v){
                return path.join('/',env.distFolder,env.vendorFolder,v)
            })
        }
        moduleObj.vendor.css && _chunks.push(moduleObj.vendor.css)
    }
    moduleObj.html.forEach(function(html) {
        htmls.push(new InjectHtmlPlugin({
            processor:env.hmrPath,
            more:_more,
            chunks: _chunks,
            filename: html
        }))
    })
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
            loader: 'html'
        }, {
            test: /\.styl/,
            exclude: [node_modules_dir],
            loader: 'style!css!postcss!happypack/loader?id=stylus'
        }, {
            test: /\.css/,
            loader: 'style!css'
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=1000&minetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }, {
            test: /\.(png|jpg)$/,
            exclude: [node_modules_dir],
            loader: 'url?limit=2500'
        }]
    },
    postcss: function(webpack) {
        return [postcssImport({ addDependencyTo: true }),
            autoPrefixer(),
            cssURL({
                url: function(originURL, decl, from, dirname, to, options, result) {
                    return helper.urlResolver(originURL,from,to,ASSET_INPUT)
                }
            })
        ]
    },
    devtool: "#eval-source-map",
    watch: true,
    resolve: {
        extensions: ["", ".js", ".json", ".es6", ".jsx", ".style"]
    },
    output: {
        path: path.resolve(process.cwd()),
        filename: path.join(env.distFolder,"[name]","[name]-[hash:8].js"),
        chunkFilename: path.join(env.distFolder,"[name]","[id]-[hash:8].chunk.js"),
        publicPath: env.hmrPath
    },
    plugins: _.union([
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],dllRefs, happypackPlugin,htmls)
}