let nvaServer = require('nva-server')
let http = require('http')

process.chdir('dist')

let app = nvaServer({
  path: '.',
  asset: '.',
  mock: { path: '../.nva/mock/*.js' },
  index: '/index/'
})

let server = http.createServer(app).listen(9000)

module.exports = server
