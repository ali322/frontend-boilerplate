#Frontend Boilerplate
[![Build Status](https://travis-ci.org/ali322/frontend-boilerplate.svg?branch=master)](https://travis-ci.org/ali322/frontend-boilerplate)
[![Dependency Status](https://gemnasium.com/badges/github.com/ali322/frontend-boilerplate.svg)](https://gemnasium.com/github.com/ali322/frontend-boilerplate)

前端项目模板 [English Document](./README.md)

开发
===

1. 克隆至本地 `git clone https://github.com/ali322/frontend-boilerplate`
2. 运行 `npm install`
3. 运行 `npm install nva -g`
4. 运行 `nva vendor` 打包第三方库
5. 运行 `nva dev` 启动开发服务器
6. 运行 `npm run lint` 检查代码
7. 运行 `npm test` 执行测试用例

部署
===

1. 运行 `nva build`
2. 打开 `dist` 和 `asset` 文件夹 查看部署结果,并发布或上传文件夹

目录结构
===

```sh
.nva/
    |-- module.json #模块配置
    |-- nva.json    #项目配置
    |-- vendor.json #第三方包配置
src/
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
    |-- index/
        |-- index-[hash].js #已编译的js
        |-- index-[hash].css #已编译的css
        |-- index.html #已编译的html
    |-- .../ #更多的已编译的html
```


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
