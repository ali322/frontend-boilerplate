let nvaServer = require('nva-server')
let http = require('http')

let app = nvaServer({
    path: "dist",
    asset: 'dist',
    rewrites: true,
    mock: '.nva/mock/*.json'
})

let server = http.createServer(app).listen(8080)

module.exports = server
