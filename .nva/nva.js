let {
  join
} = require('path')
const { name } = require('../package.json')

const subappURL = 'http://localhost:5000/'

function rules(config) {
  return {
    output: {
      publicPath: subappURL, // 作为子应用必须启用
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      // jsonpFunction: `webpackJsonp_${name}`
    }
  }
}
module.exports = {
  type: "frontend", // 项目类型
  spa: true, //是否单页应用,url rewrites 规则
  jsExt: ".js", //入口js文件后缀名
  cssExt: ".styl", //入口css文件后缀名
  // autocheck: ['aid-elements-desktop', 'aid-font', 'aid-desktop'],
  strict: false,
  beforeDev(config) {
    return rules(config)
  },
  beforeBuild(config) {
    let result = rules(config)
    result.output = {
      publicPath: '/'
    }
    return result
  },
  hmrPath: subappURL, // 作为子应用必须启用
  imagePrefix: url => `${subappURL}/asset/image/${url}`, // 作为子应用必须启用
  fontPrefix: url => `${subappURL}/asset/font/${url}`, // 作为子应用必须启用
  outputPrefix: '/' // 构建后index.html中资源路径的前缀
}
