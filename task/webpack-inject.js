var gulp = require("gulp"),
    inject = require("gulp-inject"),
    // mapstream = require("map-stream"),
    path = require("path"),
    _ = require("lodash");

var env = require("./environment");

gulp.task("develop-webpack", function() {
    _.each(env.pages, function(page) {
        var injectTarget = page.html,
            injectedPath = path.dirname(injectTarget),
            cssFiles = [],
            jsFiles = [],
            //vendorCssFile = path.join(env.vendorPath, env.buildFolder + '*.css'),
            //pageCssFile = path.join(page.path, env.buildFolder + '*.css'),
            vendorJSFile = path.join(env.vendorPath, env.buildFolder + '*.js'),
            pageJSFile = path.join(page.path, page.name, env.buildFolder + '*.js');
        //cssFiles.push(vendorCssFile);
        jsFiles.push(vendorJSFile);
        jsFiles.push(pageJSFile);
        var sources = gulp.src(_.union(cssFiles, jsFiles), {
            read: false
        });
        // console.log('jsFiles',jsFiles)
        gulp.src(injectTarget).pipe(inject(sources, {
            relative: true,
            empty:true,
            transform: function(filepath) {
                var vendorPattern = new RegExp(".+" + page.vendor),
                    buildPattern = new RegExp(".+" + env.buildFolder);
                if (vendorPattern.test(filepath) === true) {
                    if (path.extname(filepath) === ".js") {
                        filepath = filepath.replace(buildPattern, env.hmrPath);
                    }
                } else if (vendorPattern.test(filepath) === false) {
                    if (path.extname(filepath) === ".js") {
                        filepath = filepath.replace(buildPattern, env.hmrPath);
                    }
                }
                return inject.transform.apply(inject.transform, arguments);
            }

        })).pipe(gulp.dest(injectedPath));
    });
});
gulp.task("deploy-webpack", function() {
    _.each(env.pages, function(page) {
        var injectTarget = page.html,
            injectedPath = path.dirname(injectTarget),
            cssFiles = [],
            jsFiles = [],
            // vendorCssFile = path.join(env.vendorPath, env.distFolder, page.vendor + '-*.css'),
            pageCssFile = path.join(page.path, page.name, env.distFolder + '/*.css'),
            vendorJsFile = path.join(env.vendorPath, env.distFolder, page.vendor + '-*.js'),
            pageJsFile = path.join(page.path, page.name, env.distFolder + '/*.js');
        // cssFiles.push(vendorCssFile);
        cssFiles.push(pageCssFile);
        jsFiles.push(vendorJsFile);
        jsFiles.push(pageJsFile);
        var sources = gulp.src(_.union(cssFiles, jsFiles), {
            read: false
        });
        gulp.src(injectTarget).pipe(inject(sources, {
            relative: true,
            transform: function(filepath) {
                var vendorPattern = new RegExp(".+" + env.vendorChunkName);
                if (vendorPattern.test(filepath) === true) {
                    if (path.extname(filepath) === ".js") {
                        filepath = filepath.replace(
                            new RegExp(".+" + env.distFolder),
                            './js/');
                    } else {
                        filepath = filepath.replace(
                            new RegExp(".+" + env.distFolder),
                            './css/');
                    }
                } else if (vendorPattern.test(filepath) === false) {
                    if (path.extname(filepath) === ".js") {
                        filepath = filepath.replace(
                            new RegExp(".+" + env.distFolder),
                            './js/');
                    } else {
                        filepath = filepath.replace(
                            new RegExp(".+" + env.distFolder),
                            './css/');
                    }
                }
                return inject.transform.apply(inject.transform, arguments);
            }
        })).pipe(gulp.dest(injectedPath));
    });
});
