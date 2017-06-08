module.exports = {
    type: "frontend",
    mock: require('./mock/'),
    spa: [{
        from: /\/(\S+)?$/,
        to: '/index/index.html'
    }],
    jsExt: ".jsx",
    cssExt: ".styl"
}
