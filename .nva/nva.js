// let OfflinePlugin = require("offline-plugin")
// let glob = require("glob")
const { name } = require('../package.json')

module.exports = {
    type: "frontend",
    spa: true,
    strict: true,
    autocheck: ['vue', 'vuex', 'vue-router', 'vuex-router-sync'],
    jsExt: ".js",
    cssExt: ".styl",
    outputPrefix: '/',
    beforeDev() {
      return {
        output: {
            // publicPath: subappURL, // used by subapp
            library: `${name}-[name]`,
            libraryTarget: 'umd',
            // jsonpFunction: `webpackJsonp_${name}`
        } 
      }
    },
    beforeBuild() {
      return {
        output: {
            // publicPath: subappURL, // used by subapp
            library: `${name}-[name]`,
            libraryTarget: 'umd',
            // jsonpFunction: `webpackJsonp_${name}`
        } 
      }
    }
    //hmrPath: subappURL, // used by subapp
    //imagePrefix: url => `${subappURL}/asset/image/${url}`, // used by subapp
    //fontPrefix: url => `${subappURL}/asset/font/${url}`, // used by subapp
    // beforeBuild(conf) {
    //     let vendors = []
    //     vendors = glob.sync("dist/vendor/*.@(js|css)")
    //     vendors = vendors.map(v => v.replace("dist", ""))

    //     let offlinePlugin = new OfflinePlugin({
    //         externals: ["/"].concat(vendors)
    //     })
    //     return { plugins: conf.plugins.concat([offlinePlugin]) }
    // }
}
