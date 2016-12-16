var gulp = require("gulp")
var cssurl = require("cssurl")
var fs = require("fs-extra")
var _ = require("lodash")
var path = require("path")
var env = require('./environment')

gulp.task("copy2dist",function(){
    var distPath = path.resolve(__dirname,"../dist")
    //copy bundle dist files to outter `dist` directory
    try{
        fs.removeSync(distPath)
    }catch(err){
        console.log(err)
    }

    //copy vendor files to outter `dist` directory
    try{
        fs.copySync(path.join(env.vendorPath, env.distFolder),"./dist/js")
    }catch(err){
        console.log('copy vendor files failed',err)
    }
    try{
        fs.copySync(path.join(env.vendorPath,"../asset/"),"./dist/asset")
    }catch(err){
        console.log('copy asset files failed',err)
    }
    for(var k in env.pages){
        var page = env.pages[k]
        page.html.forEach(function(html){
            try{
                fs.copySync(html,"./dist/"+path.basename(html))
            }catch(err){
                console.log('copy html files failed',err)
            }
        })
        var pageFiles = []
        try{
            pageFiles = fs.walkSync(path.join(page.path,env.distFolder))
        }catch(err){
            console.log("read page dist directory failed",err)
        }
        _.each(pageFiles,function(pageFile){
            try{
                if(path.extname(pageFile) === ".js"){
                    fs.copySync(pageFile,"./dist/js/"+path.basename(pageFile))
                }
                if(path.extname(pageFile) === ".css"){
                    fs.copySync(pageFile,"./dist/css/"+path.basename(pageFile))
                }
            }catch(err){
                console.log('copy page js/css files failed',err)
            }
        })
    }

    //clean original files
    _.each(env.pages, function(page) {
        try{
            fs.removeSync(path.join(page.path, env.distFolder));
        }catch(err){
            console.log('remove page dist directory failed',err)
        }
    })
    try{
        fs.removeSync(path.join(env.vendorPath,"../vendor"))
    }catch(err){
        console.log('remove vendor directory failed',err)
    }
})

gulp.task('resolve-css-url',function(){
    var distFiles
    try{
        distFiles = fs.walkSync(path.resolve(__dirname,"../dist"))
    }catch(err){
        console.log("read page dist directory failed",err)
    }
    _.each(distFiles,function(distFile){
        if(path.extname(distFile) === ".css"){
            var rewriter = new cssurl.URLRewriter(function(url){
                return ".." + url + "?v=" + Date.now()
            })
            try{
                var cssCode = fs.readFileSync(distFile,'utf8')
                cssCode = rewriter.rewrite(cssCode)
                fs.writeFileSync(distFile,cssCode)
            }catch(err){
                console.log("rewrite dist file failed",err)
            }
        }
        if(path.extname(distFile) === ".html"){
            try{
                var htmlCode = fs.readFileSync(distFile,'utf8')
                htmlCode = htmlCode.replace(/(<img[\s\S]+?)src=['"]\.\.\/asset([^'"]+)['"]/i,"$1src='asset$2'")
                fs.writeFileSync(distFile,htmlCode)
            }catch(err){
                console.log("rewrite dist file failed",err)
            }
        }
    })
})

gulp.task('deploy2dist',['copy2dist','resolve-css-url'])