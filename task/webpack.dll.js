var path = require('path'),
    webpack = require('webpack'),
    _ = require('lodash'),
    del = require('del')

var env = require("./environment")
var DEBUG = !(process.env.NODE_ENV === 'production')
var OUTPUT_PATH = DEBUG?path.join(env.distFolder, env.vendorFolder):path.join(env.distFolder, env.vendorFolder)
var MANIFEST_PATH = path.join(env.distFolder, env.vendorFolder)

var plugins = [
    new webpack.DllPlugin({
        name: '[name]_[hash]',
        path: path.resolve(path.join(MANIFEST_PATH,'[name]-manifest.json')),
        context: __dirname
    }),
    new webpack.optimize.OccurenceOrderPlugin()
]

if (!DEBUG) {
    plugins = plugins.concat([
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify('production') }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            output: { comments: false }
        })
    ])
}

del.sync(path.join(env.distFolder,env.vendorFolder))

var _entry = {}
_.each(env.vendors['js'],function(vendor,key){
    _entry[key] = vendor
})

module.exports = {
    // devtool: '#source-map',
    entry: _entry,
    output: {
        path:OUTPUT_PATH,
        filename: '[name]-[chunkhash:8].js',
        library: '[name]_[hash]'
    },
    plugins:plugins
}