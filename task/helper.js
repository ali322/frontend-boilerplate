var path = require('path'),
    mime = require('mime'),
    fs = require('fs')

function bundleTime() {
    const dateObj = new Date()
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth() + 1
    const date = dateObj.getDate()
    const hour = dateObj.getHours()
    const minute = dateObj.getMinutes()
    return "" + year + month + date + hour + minute
}

function urlResolver(originURL, from, to,input) {
    var _url = path.join(path.relative(from, input), originURL)
    var _file = path.resolve(path.join(input, originURL))
    if (/node_modules/.test(from)) {
        _url = originURL
        _file = path.resolve(from, _url)
        _file = _file.replace(/[\?#]\S+/, '')
    }
    var _stats
    try {
        _stats = fs.statSync(_file)
    } catch (e) {
        return _url
    }
    var mimeType = mime.lookup(_file)
    if (_stats.size <= 500) {
        _file = fs.readFileSync(_file)
        return "data:" + mimeType + ";base64," + _file.toString("base64")
    }
    return _url
}

module.exports = {
    bundleTime: bundleTime,
    urlResolver: urlResolver
}