let nvaServer = require('nva-server')
let http = require('http')

process.chdir('dist')

let app = nvaServer({
    path: '.',
    asset: '.',
    rewrites: true,
    mock: { path: '../.nva/mock/*.js' }
})

let server = http.createServer(app).listen(9090)

module.exports = server
