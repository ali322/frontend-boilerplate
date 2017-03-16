let nodeStatic = require('node-static')
let http = require('http')

let file = new nodeStatic.Server('dist')

let server = http.createServer((req,res)=>{
    req.addListener('end',()=>{
        file.serve(req,res)
    }).resume()
}).listen(8080)

module.exports = server
