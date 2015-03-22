module.exports = setup

function setup(server, options, done) {
  var User = server.plugins.bookshelf.model('User')

  server.route({
    method: 'GET',
    path: '/register',
    handler: function handler(request, reply) {
      if (!request.auth.credentials) return reply.redirect('/login')
      if (request.auth.credentials.account) reply.redirect('/')
      var profile = request.auth.credentials.tempProfile
      if (!profile) return reply.redirect('/login')
      reply.view('register', {profile: profile})
    }
  })

  server.route({
    method: 'POST',
    path: '/register',
    handler: function handler(request, reply) {
      if (!request.auth.credentials) return reply.redirect('/login')
      if (request.auth.credentials.account) reply.redirect('/')
      var profile = request.auth.credentials.tempProfile
      request.auth.session.clear()
      if (!profile) return reply.redirect('/login')

      var account = {
        name: request.payload.name.trim(),
        email: request.payload.email.trim(),
        auth_provider: profile.provider,
        auth_token: profile.token,
        auth_secret: profile.secret,
        auth_id: profile.id,
        meta: {}
      }

      new User(account).save().exec(function created(err) {
        if (err) {
          request.auth.session.set({
            tempProfile: profile,
            errors: err.toString()
          })
          return reply(err)
        }

        request.auth.session.set({account: account})
        reply.redirect('/')
      })
    }
  })

  done()
}
