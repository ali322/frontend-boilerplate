let {
  join
} = require('path')
const { name } = require('../package.json')

const subappURL = 'http://localhost:5000/'

function rules(config) {
  return {
      output: {
          publicPath: subappURL, // used by subapp
          library: `${name}-[name]`,
          libraryTarget: "umd",
          // uniqueName: `webpackJsonp_${name}`
      }
  };
}
module.exports = {
    type: "frontend",
    spa: true,
    jsExt: ".js",
    cssExt: ".styl",
    autocheck: ["vue", "vuex", "vue-router"],
    strict: false,
    beforeDev(config) {
        return rules(config);
    },
    beforeBuild(config) {
        let result = rules(config);
        result.output = {
          publicPath: '/'
        }
        return result;
    },
    hmrPath: subappURL, // used by subapp
    imagePrefix: url => `${subappURL}asset/image/${url}`, // used by subapp
    fontPrefix: url => `${subappURL}asset/font/${url}`, // used by subapp
    outputPrefix: "/"
};
