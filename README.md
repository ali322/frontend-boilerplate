#Frontend Boilerplate
[![Build Status](https://travis-ci.org/ali322/frontend-boilerplate.svg?branch=master)](https://travis-ci.org/ali322/frontend-boilerplate)
[![Dependency Status](https://gemnasium.com/badges/github.com/ali322/frontend-boilerplate.svg)](https://gemnasium.com/github.com/ali322/frontend-boilerplate)

yet another simple boilerplate for frontend project

Start to work
===

1. clone to your local disk `git clone https://github.com/ali322/frontend-boilerplate`
2. run `npm install`
3. run `npm start` to start,just simple and clean

Release to publish
===

1. run `npm run release`
2. check your all the pages and related css,jss,assets in the "dist" directory

Directory Structure
===

```sh
src/
    |-- vendor/ #third party libraries like 'jquery'
    |-- asset/ #images,fonts and so on
    |-- bundle/
        |-- common/ #css and js in common use
        |-- index/ #index page's bundle
            |-- script/ #partial js of index page
            |-- stylesheet/ #partial css of index page
            |-- index.js #entry js
            |-- index.css #entry css
        |-- .../  #more your own page
    |-- page/ #page's html
dist/
    |-- index/
        |-- index.html #dist index.html
        |-- js/ #dist js come here
        |-- css/ #dist css come here
    |-- .../ #more dist pages
task/
    |-- config/
        |-- page.json #define page's path and other setup
        |-- vendor.json #define third party libraries
    |-- environment.js  #define page build's env variables
    |-- develop-sever.js   #develop server entry
    |-- webpack-inject.js #inject compiled js and css into pages
    |-- webpack.develop.js #compile source code and vendors for develop
    |-- webpack.production.js #compile source code and vendors for production
    |-- webpack.hot-update.js #compile source code and vendors for develop in HMR
server.js #webpack dev server entry file
gulpfile.js #task entry
```