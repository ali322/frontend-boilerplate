#Frontend Boilerplate
[![Build Status](https://travis-ci.org/ali322/frontend-boilerplate.svg?branch=master)](https://travis-ci.org/ali322/frontend-boilerplate)
[![Dependency Status](https://gemnasium.com/badges/github.com/ali322/frontend-boilerplate.svg)](https://gemnasium.com/github.com/ali322/frontend-boilerplate)

yet another simple boilerplate for frontend project [中文文档](./README_zh.md)

Develop
===

1. clone to your local disk `git clone https://github.com/ali322/frontend-boilerplate`
2. run `npm install`
3. run `npm install nva -g`
4. run `nva vendor` to build vendor libraries
5. run `nva dev` to start develop server
6. run `npm run lint` to lint source code
7. run `npm test` to run tests

Deploy
===

1. run `nva build`
2. check your all the pages and related css,jss in "dist" directory and related image,font in "asset" directory

Directory Structure
===

```sh
.nva/
    |-- module.json #module config
    |-- nva.json    #project config
    |-- vendor.json #third party libraries config
dist/
    |-- asset/ #images,fonts and so on
    |-- index/
        |-- index-[hash].js #dist js come here
        |-- index-[hash].css #dist css come here
        |-- index.html #dist index.html
    |-- .../ #more dist pages
    |-- vendor/ third party libraries
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
```


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
