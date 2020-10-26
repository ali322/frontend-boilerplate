// let OfflinePlugin = require("offline-plugin")
// let glob = require("glob")
const { name } = require('../package.json')
const subappURL = 'http://localhost:5000/'

function conf() {
  return {
      output: {
          // publicPath: subappURL, // used by subapp
          library: `${name}-[name]`,
          libraryTarget: "umd"
      }
  };
}

module.exports = {
    type: "frontend",
    spa: true,
    strict: false,
    autocheck: ['vue', 'vuex', 'vue-router', 'vuex-router-sync'],
    jsExt: ".js",
    cssExt: ".styl",
    beforeDev() {
      return conf()
    },
    beforeBuild() {
      let result = conf()
      result.output = {
        publicPath: '/'
      }
      return result
    },
    outputPrefix: '/',
    // hmrPath: subappURL, // used by subapp
    // imagePrefix: url => `${subappURL}/asset/image/${url}`, // used by subapp
    // fontPrefix: url => `${subappURL}/asset/font/${url}`, // used by subapp
}
