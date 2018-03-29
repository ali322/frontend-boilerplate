module.exports = {
  runner: runner => runner.startApp('node ./test/e2e/server.js', 3000),
  spec: ['./test/e2e/spec/demo.js']
}