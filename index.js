var Hapi = require('hapi')
var auth = require('./auth')
var templates = require('./templates')
var register = require('./register')
var routes = require('./routes')
var setup = require('./setup')

var server = new Hapi.Server({ debug: { request: ['error'] } })

server.connection({
  host: '0.0.0.0',
  port: 8080
})

setup(server, [auth, register, templates, routes], function ready(err) {
  if(err) throw err
  server.start()
})
