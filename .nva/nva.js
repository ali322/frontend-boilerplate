let OfflinePlugin = require("offline-plugin")
let glob = require("glob")
require('dist/vendor.json')

module.exports = {
    type: "frontend",
    spa: true,
    //   autocheck: ['vue', 'vuex', 'vue-router', 'vuex-router-sync'],
    jsExt: ".js",
    cssExt: ".styl",
    beforeBuild(conf) {
        let vendors = []
        vendors = glob.sync("dist/vendor/*.@(js|css)")
        vendors = vendors.map(v => v.replace("dist", ""))

        let offlinePlugin = new OfflinePlugin({
            externals: ["/"].concat(vendors)
        })
        return { plugins: conf.plugins.concat([offlinePlugin]) }
    }
}
