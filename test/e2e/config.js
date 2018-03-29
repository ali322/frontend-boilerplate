module.exports = {
  process: runner => runner.startApp('node ./test/e2e/server.js'),
  spec: ['./test/e2e/spec/demo.js']
}