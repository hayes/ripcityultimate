module.exports = setup
module.exports.attributes = {name: 'routes'}

function setup(server, options, done) {
  server.route({
    method: 'GET',
    path: '/static/{file*}',
    handler: {directory: {path: './static'}},
  })

  server.route({
    method: 'GET',
    path: '/roster',
    handler: function handler(request, reply) {
      view('roster', request, reply)
    },
  })

  server.route({
    method: 'GET',
    path: '/goals',
    handler: function handler(request, reply) {
      view('goals', request, reply)
    },
  })

  server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
      view('index', request, reply)
    }
  })

  done()
}

function view(view, request, reply) {
  reply.view(view, {
    active: view,
    account: request.auth.credentials && request.auth.credentials.account
  })
}
