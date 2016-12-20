#Frontend Boilerplate
[![Build Status](https://travis-ci.org/ali322/frontend-boilerplate.svg?branch=master)](https://travis-ci.org/ali322/frontend-boilerplate)
[![Dependency Status](https://gemnasium.com/badges/github.com/ali322/frontend-boilerplate.svg)](https://gemnasium.com/github.com/ali322/frontend-boilerplate)

前端项目模板 [English Document](./README.md)

开发
===

1. 克隆至本地 `git clone https://github.com/ali322/frontend-boilerplate`
2. 运行 `npm install`
3. 运行 `npm run develop` 编译源码并注入至html
3. 运行 `npm start` 启动开发服务器

部署
===

1. 运行 `npm run deploy`
2. 打开 `dist` 文件夹查看部署结果,并发布或上传此文件夹

目录结构
===

```sh
src/
    |-- vendor/ #第三方库 比如 'jquery'
    |-- asset/ #图片,字体等等
    |-- bundle/
        |-- common/ #公共的css和js
        |-- index/ #index页面模块
            |-- script/ #index页面js目录
            |-- stylesheet/ #index页面css目录
            |-- index.js #入口js
            |-- index.css #入口css
        |-- .../  #更多的页面模块
    |-- page/ #页面html目录
dist/
    |-- asset/ #已编译的图片,字体等等
    |-- js/ #已编译的js目录
    |-- css/ #已编译的css目录
    |-- index.html #已编译的html
    |-- .../ #更多的已编译的html
task/
    |-- config/
        |-- page.json #定义页面路径和源文件编译配置
        |-- vendor.json #定义第三方库
    |-- environment.js  #编译时环境变量
    |-- develop-sever.js   #开发服务器启动脚本
    |-- webpack-inject.js #注入css和js至html的任务
    |-- webpack.develop.js #开发环境源码编译任务
    |-- webpack.production.js #发布环境源码编译任务
    |-- webpack.hot-update.js #热更新环境源码编译任务
gulpfile.js #任务入口
```


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)