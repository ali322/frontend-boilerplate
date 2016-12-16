var path = require("path"),
    _ = require("lodash");
var env = {
    buildFolder: "build/",
    distFolder: "dist/",
    vendorPath: "./src/vendor/",
    pagePath: "./src/page/",
    hmrPath: "/hmr/"
};

var pageConfig = require('./config/page.json'),
    pages = [];
_.each(pageConfig, function(pageObj, pageName) {
    var entryJS = pageObj.path + pageObj.entryJS;
    var entryCSS = pageObj.path + pageObj.entryCSS;
    var entryHtml = [];
    _.each(pageObj.html, function(pageHtml) {
        entryHtml.push(env.pagePath + pageHtml);
    })
    var page = _.extend(pageObj, {
        name: pageName,
        entryCSS: entryCSS,
        entryJS: entryJS,
        html: entryHtml
    });
    pages.push(page);
})
env.pages = pages;

var vendorConfig = require('./config/vendor.json'),
    vendors = [];
_.each(vendorConfig, function(vendorJS, vendorName) {
    var vendor = {
        name: vendorName,
        entryJS: vendorJS,
        // entryCSS:vendorObj.css
        // entry:_.union(vendorObj.js,vendorObj.css)
    };
    vendors.push(vendor);
});
env.vendors = vendors;

module.exports = env;
