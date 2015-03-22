var Hapi = require('hapi')
var plugins = require('./plugins')

var server = new Hapi.Server({ debug: { request: ['error'] } })

server.connection({
  host: '0.0.0.0',
  port: 8080
})

plugins(server, function ready(err) {
  if (err) throw err
  server.start()
})
