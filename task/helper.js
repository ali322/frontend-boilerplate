var path = require('path'),
    os = require('os'),
    HappyPack = require('happypack')

function bundleTime() {
    const dateObj = new Date()
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth() + 1
    const date = dateObj.getDate()
    const hour = dateObj.getHours()
    const minute = dateObj.getMinutes()
    return "" + year + month + date + hour + minute
}

function urlResolver(originURL, from, to, input) {
    var _url = path.join(path.relative(from, input), originURL)
    if (/node_modules/.test(from)) {
        _url = originURL
    }
    return _url
}

function happypackPlugin(){
    var compilerThreadPool = HappyPack.ThreadPool({size:os.cpus().length})
    var _instances = [
        new HappyPack({
            id:'js',
            threadPool:compilerThreadPool,
            loaders:['babel?cacheDirectory=true'],
            verbose:false
        }),
        new HappyPack({
            id:'stylus',
            threadPool:compilerThreadPool,
            loaders:['stylus'],
            verbose:false
        })
    ]
    return _instances
}

module.exports = {
    bundleTime: bundleTime,
    urlResolver: urlResolver,
    happypackPlugin:happypackPlugin
}