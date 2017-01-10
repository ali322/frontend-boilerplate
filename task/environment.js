var path = require("path"),
    _ = require("lodash");
var env = {
    buildFolder: "build",
    distFolder: "dist",
    vendorFolder: "vendor",
    bundleFolder: "bundle",
    assetFolder:'asset',
    sourcePath: "./src",
    pageFolder: "/page/",
    hmrPath: "/hmr/"
};

var moduleConfig = require('./config/module.json'),
    modules = [];
_.each(moduleConfig, function(moduleObj, moduleName) {
    var entryJS =path.resolve(path.join(env.sourcePath, env.bundleFolder, moduleObj.path,
         moduleObj.entryJS !== undefined ? moduleObj.entryJS : moduleObj.name + ".js"))
    var entryCSS =path.resolve(path.join(env.sourcePath, env.bundleFolder, moduleObj.path,
         moduleObj.entryCSS !== undefined ? moduleObj.entryCSS : moduleObj.name + ".css"))
    var entryHtml = [];
    _.each(moduleObj.html, function(pageHtml) {
        entryHtml.push(env.sourcePath+env.pageFolder+pageHtml);
    })
    var module = _.extend(moduleObj, {
        name: moduleName,
        entryCSS: entryCSS,
        entryJS: entryJS,
        html: entryHtml
    });
    modules.push(module);
})
env.modules = modules;

var vendorConfig = require('./config/vendor.json')
env.vendors = vendorConfig;

module.exports = env;