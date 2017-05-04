module.exports = {
    type: "frontend",
    entryJSExt: ".jsx",
    entryCSSExt: ".styl",
    beforeDev(conf) {
        let entry = {}
        for (let k in conf.entry) {
            entry[k] = ['react-hot-loader/patch'].concat(conf.entry[k])
        }
        return { entry }
    }
}
