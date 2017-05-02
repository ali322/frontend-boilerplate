let nvaServer = require('nva-server')
let http = require('http')

let app = nvaServer({
    path: "dist",
    asset: 'dist',
    rewrites: true
})

let server = http.createServer(app).listen(8080)

module.exports = server
