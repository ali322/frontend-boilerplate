#Frontend Boilerplate
[![Build Status](https://travis-ci.org/ali322/frontend-boilerplate.svg?branch=master)](https://travis-ci.org/ali322/frontend-boilerplate)
[![Dependency Status](https://gemnasium.com/badges/github.com/ali322/frontend-boilerplate.svg)](https://gemnasium.com/github.com/ali322/frontend-boilerplate)

yet another simple boilerplate for frontend project [中文文档](./README_zh.md)

Develop
===

1. clone to your local disk `git clone https://github.com/ali322/frontend-boilerplate`
2. run `npm install`
3. run `npm start` to start develop server

Deploy
===

1. run `npm run build`
2. check your all the pages and related css,jss in "dist" directory and related image,font in "asset" directory

Directory Structure
===

```sh
assets/ #dist images,fonts and so on
dist/
    |-- index/ 
        |-- index-[hash].js #dist js come here
        |-- index-[hash].css #dist css come here
        |-- index.html #dist index.html
    |-- .../ #more dist pages
src/
    |-- asset/ #images,fonts and so on
    |-- bundle/
        |-- common/ #css and js in common use
        |-- index/ #index page's bundle
            |-- script/ #index page'js folder
            |-- stylesheet/ #index page'css folder
            |-- index.js #entry js
            |-- index.css #entry css
        |-- .../  #more pages
    |-- page/ #page's html
task/
    |-- config/
        |-- module.json #define page's path and other compile config
        |-- vendor.json #define third party libraries
    |-- environment.js  #define page build's env variables
    |-- develop-sever.js   #develop server entry
    |-- webpack.production.js #compile source code and vendors for production
    |-- webpack.hot-update.js #compile source code and vendors for develop in HMR
```


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)